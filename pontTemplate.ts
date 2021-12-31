import * as Pont from '@td-design/pont-engine';
import { CodeGenerator, Interface, Property } from '@td-design/pont-engine';

export class FileStructures extends Pont.FileStructures {
  getDataSourcesTs() {
    const dsNames = this.getMultipleOriginsDataSourceName();

    const generatedCode = '(global as any)';

    return `
      ${dsNames
        .map(name => {
          return `import { defs as ${name}Defs, ${name} } from './${name}';
          `;
        })
        .join('\n')}

      ${generatedCode}.defs = {
        ${dsNames.map(name => `${name}: ${name}Defs,`).join('\n')}
      };
      ${generatedCode}.API = {
        ${dsNames.join(',\n')}
      };
    `;
  }
}

export default class MyGenerator extends CodeGenerator {
  enum: Array<string | number> = [];

  setEnum(enums: Array<string | number> = []) {
    this.enum = enums.map(value => {
      if (typeof value === 'string') {
        if (!value.startsWith("'")) {
          value = `'${value}`;
        }

        if (!value.endsWith("'")) {
          value = `${value}'`;
        }
      }

      return value;
    });
  }

  /** 获取总的类型定义代码 */
  getDeclaration() {
    return `
      type ObjectMap<Key extends string | number | symbol = any, Value = any> = {
        [key in Key]: Value;
      }

      interface AjaxResponse<T> {
        code: number;
        data: T;
        message: string;
        success: boolean;
      }

      ${this.getCommonDeclaration()}

      ${this.getBaseClassesInDeclaration()}

      ${this.getModsDeclaration()}
    `;
  }

  /** 获取所有基类文件代码 */
  getBaseClassesIndex() {
    const clsCodes = this.dataSource.baseClasses.map(
      base => `
      class ${base.name} {
        ${base.properties
          .map(prop => {
            return this.toPropertyCodeWithInitValue(prop, base.name);
          })
          .filter(id => id)
          .join('\n')}
      }
    `,
    );

    if (this.dataSource.name) {
      return `
      ${clsCodes.join('\n')}
      export const ${this.dataSource.name} = {
        ${this.dataSource.baseClasses.map(bs => bs.name).join(',\n')}
      }
    `;
    }

    return clsCodes.map(cls => `export ${cls}`).join('\n');
  }

  toPropertyCodeWithInitValue(prop: Property, baseName = '') {
    this.setEnum(prop.dataType.enum);
    const { typeName, isDefsType } = prop.dataType;
    let typeWithValue = `= ${this.getInitialValue(typeName, isDefsType, false)}`;

    if (prop.dataType.typeName === baseName) {
      typeWithValue = `= {}`;
    }

    let propName = prop.name;
    if (!propName.match(/^[a-zA-Z_$][a-zA-Z0-9_$]*$/)) {
      propName = `'${propName}'`;
    }

    return `
    /** ${prop.description || prop.name} */
    ${propName} ${typeWithValue}
    `;
  }

  initClassValue(isDefsType: boolean, usingDef: boolean, typeName: string) {
    const originName = this.dataSource.name;
    if (!usingDef) {
      return `new ${typeName}()`;
    }
    return `new ${this.getDefName(originName, typeName, isDefsType)}()`;
  }

  initEnumValue() {
    const str = this.enum[0];
    if (typeof str === 'string') {
      return `${str}`;
    }
    return `${str}`;
  }

  getInitialValue(typeName: string, isDefsType: boolean, usingDef = true) {
    if (isDefsType) {
      return this.initClassValue(isDefsType, usingDef, typeName);
    }
    if (this.enum && this.enum.length) {
      return this.initEnumValue();
    }
    return this.initNormalTypeValue(typeName);
  }

  /** 生成的api.d.ts文件中的对应每个接口的内容 */
  getInterfaceContentInDeclaration(inter: Interface) {
    const paramsCode = inter.getParamsCode();
    const bodyParamsCode = inter.getBodyParamsCode();
    const hasGetParams = !!inter.parameters.filter(param => param.in !== 'body').length;
    let requestParams = bodyParamsCode ? `bodyParams: ${bodyParamsCode}, params: Params` : `params: Params`;

    if (!hasGetParams) {
      requestParams = bodyParamsCode ? `bodyParams: ${bodyParamsCode}` : '';
    }

    return `
      export ${paramsCode}

      export type Response = ${inter.responseType}

      export const init: Response;
      export const url: string;
      export function fetch(${requestParams}): Promise<Response>;
    `;
  }

  /** 生成的接口请求部分 */
  // eslint-disable-next-line complexity
  getInterfaceContent(inter: Interface) {
    // type为body的参数
    const bodyParamsCode = inter.getBodyParamsCode();
    // 判断是否有params参数
    const hasGetParams = !!inter.parameters.filter(param => param.in !== 'body').length;
    let requestParams = bodyParamsCode ? `data = {}, params = {}` : `params = {}`;
    let requestStr = bodyParamsCode ? `data, params` : `params`;
    if (!hasGetParams) {
      requestParams = bodyParamsCode ? `data = {}` : 'params = {}';
      requestStr = bodyParamsCode ? `data` : 'params';
    }
    const requestObj = this.getRequest(bodyParamsCode, inter.method);

    const { typeName, isDefsType } = inter.response;
    const initValue = this.getInitialValue(typeName, isDefsType);

    let defsStr = '';
    if (inter.response.isDefsType) {
      defsStr = "import * as defs from '../../baseClass';";
    }

    return `
      /**
      * @description ${inter.description}
      */
      ${defsStr}
      import { initRequest } from '../../../../common';
      import Config from 'react-native-config';

      const backEndUrl = Config['${this.dataSource.name}'];

      // 初始值
      export const init = ${initValue};
      // 接口地址
      export const url = "${inter.path}";

      export async function fetch(${requestParams}) {
        const request = await initRequest();
        const result = await request.${requestObj.method}(backEndUrl + '${inter.path}', {
          headers: {
            'Content-Type': '${requestObj.contentType}',
          },
          ${requestStr},
        });
        return result;
      }
    `;
  }

  getDefName(originName: string, typeName: string, isDefsType: boolean) {
    let name = typeName;

    if (isDefsType) {
      name = originName ? `defs.${originName}.${typeName}` : `defs.${typeName}`;
    }

    return name;
  }

  initNormalTypeValue(typeName: string) {
    switch (typeName) {
      case 'Array':
        return '[]';

      case 'boolean':
        return 'false';

      case 'string':
        return "''";

      case 'number':
      default:
        return 'undefined';
    }
  }

  // eslint-disable-next-line complexity
  getRequest(bodyParamsCode: string, method: string) {
    // 为避免method匹配不上，全部转化为大写
    const upperMethod = method.toUpperCase();
    const fetchMethod = bodyParamsCode ? `${upperMethod}:JSON` : upperMethod;

    let methodTemp = '';
    let contentType = 'application/json';
    switch (fetchMethod) {
      case 'GET':
      default:
        methodTemp = 'get';
        break;
      case 'PUT':
        methodTemp = 'put';
        break;
      case 'DELETE':
        methodTemp = 'delete';
        break;
      case 'POST':
        methodTemp = 'post';
        contentType = 'application/x-www-form-urlencoded';
        break;
      case 'POST:JSON':
        methodTemp = 'post';
        break;
    }
    return {
      method: methodTemp,
      contentType,
    };
  }
}
