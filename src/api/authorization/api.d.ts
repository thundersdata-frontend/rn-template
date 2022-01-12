type ObjectMap<Key extends string | number | symbol = any, Value = any> = {
  [key in Key]: Value;
};

interface AjaxResponse<T> {
  code: number;
  data: T;
  message: string;
  success: boolean;
}

declare namespace defs {
  export namespace authorization {
    export class BindUserDTO {
      /** 客户端标识 */
      clientKey: string;

      /** 角色id列表 */
      roleIds: Array<number>;

      /** 用户id */
      userId: number;
    }

    export class BusinessQueryDTO {
      /** 拓展字段列表 */
      businessValueList?: Array<string>;

      /** 客户端标识 */
      clientKey: string;

      /** 分页参数 */
      page: number;

      /** 分页参数 */
      pageSize: number;

      /** 角色名称 */
      roleName?: string;
    }

    export class ClientConfig {
      /** clientKey */
      clientKey?: string;

      /** clientName */
      clientName?: string;

      /** createdAt */
      createdAt?: string;

      /** id */
      id?: number;

      /** isDeleted */
      isDeleted?: boolean;

      /** 描述 */
      note?: string;

      /** secret */
      secret?: string;

      /** updatedAt */
      updatedAt?: string;
    }

    export class DataModule {
      /** clientKey */
      clientKey?: string;

      /** createdAt */
      createdAt?: string;

      /** id */
      id?: number;

      /** isDeleted */
      isDeleted?: number;

      /** moduleName */
      moduleName?: string;

      /** type */
      type?: string;

      /** updatedAt */
      updatedAt?: string;
    }

    export class DataRole {
      /** clientKey */
      clientKey?: string;

      /** comment */
      comment?: string;

      /** createdAt */
      createdAt?: string;

      /** id */
      id?: number;

      /** isDeleted */
      isDeleted?: boolean;

      /** role */
      role?: string;

      /** updatedAt */
      updatedAt?: string;
    }

    export class DataRoleInputDTO {
      /** clientKey */
      clientKey?: string;

      /** comment */
      comment?: string;

      /** createdAt */
      createdAt?: string;

      /** id */
      id?: number;

      /** isDeleted */
      isDeleted?: boolean;

      /** role */
      role?: string;

      /** ruleIdList */
      ruleIdList?: Array<number>;

      /** updatedAt */
      updatedAt?: string;
    }

    export class DataRoleVO {
      /** clientKey */
      clientKey?: string;

      /** comment */
      comment?: string;

      /** createdAt */
      createdAt?: string;

      /** dataRuleDTOList */
      dataRuleDTOList?: Array<defs.authorization.DataRuleDTO>;

      /** id */
      id?: number;

      /** isDeleted */
      isDeleted?: boolean;

      /** role */
      role?: string;

      /** updatedAt */
      updatedAt?: string;
    }

    export class DataRule {
      /** createdAt */
      createdAt?: string;

      /** id */
      id?: number;

      /** isDeleted */
      isDeleted?: number;

      /** ruleKeyId */
      ruleKeyId?: number;

      /** ruleName */
      ruleName?: string;

      /** updatedAt */
      updatedAt?: string;
    }

    export class DataRuleDTO {
      /** businessValueList */
      businessValueList?: Array<string>;

      /** clientKey */
      clientKey?: string;

      /** createdAt */
      createdAt?: string;

      /** id */
      id?: number;

      /** isDeleted */
      isDeleted?: number;

      /** moduleId */
      moduleId?: number;

      /** moduleName */
      moduleName?: string;

      /** ruleKeyDescription */
      ruleKeyDescription?: string;

      /** ruleKeyId */
      ruleKeyId?: number;

      /** ruleName */
      ruleName?: string;

      /** updatedAt */
      updatedAt?: string;
    }

    export class DataRuleDefinition {
      /** clientKey */
      clientKey?: string;

      /** createdAt */
      createdAt?: string;

      /** id */
      id?: number;

      /** isDeleted */
      isDeleted?: boolean;

      /** moduleId */
      moduleId?: number;

      /** ruleKey */
      ruleKey?: string;

      /** ruleKeyDescription */
      ruleKeyDescription?: string;

      /** updatedAt */
      updatedAt?: string;
    }

    export class DataScopeDTO {
      /** ruleKeyList */
      ruleKeyList?: Array<string>;

      /** userId */
      userId?: number;
    }

    export class OrgTreeDTO {
      /** 子部门 */
      children?: Array<defs.authorization.OrgTreeDTO>;

      /** id */
      id?: number;

      /** 是否可选 */
      option?: number;

      /**  顺序 */
      orderValue?: number;

      /** 组织机构名称 */
      orgName?: string;

      /**  父id */
      parentId?: number;

      /** 人员列表 */
      personListDTOList?: Array<defs.authorization.PersonListDTO>;
    }

    export class PagingEntity<T0 = any> {
      /** list */
      list: Array<T0>;

      /** page */
      page: number;

      /** pageSize */
      pageSize: number;

      /** total */
      total: number;
    }

    export class PersonListDTO {
      /** 头像图片id */
      avatarId?: number;

      /** 头像Url */
      avatarUrl?: string;

      /** 常用联系人关联id */
      contactId?: number;

      /** 性别，枚举值 female、male */
      gender?: string;

      /** 主键id */
      id?: number;

      /** 是否是主要任职 */
      isPrimary?: boolean;

      /** 姓名 */
      name?: string;

      /** 顺序 */
      orderValue?: number;

      /** 组织id */
      orgId?: number;

      /** 组织机构名称 */
      orgName?: string;

      /** 职务 */
      position?: string;

      /** status */
      status?: number;

      /** statusName */
      statusName?: string;

      /** 手机号 */
      telephone?: string;

      /** 用户id */
      userId?: number;
    }

    export class ResourceDetails {
      /** api url */
      apiUrl: string;

      /** 客户端标志 */
      clientKey: string;

      /** 备注 */
      comment: string;

      /** 创建时间 */
      createdAt?: string;

      /** 描述 */
      description: string;

      /** 图标 */
      icon?: string;

      /** id */
      id?: number;

      /** isDeleted */
      isDeleted?: number;

      /** 是否默认可见 */
      isVisible?: number;

      /** 资源顺位 */
      orderValue?: number;

      /** 父级菜单id */
      parentId?: number;

      /** 父级菜单名称 */
      parentName: string;

      /** 资源码 */
      permissionCode?: string;

      /** 资源拓展字段 */
      resourceBusinessValue?: string;

      /** 资源标志 */
      resourceKey: string;

      /** 类型 */
      type?: number;

      /** 更新时间 */
      updatedAt?: string;
    }

    export class ResourceObjects {
      /** api url */
      apiUrl: string;

      /** 客户端标志 */
      clientKey: string;

      /** 备注 */
      comment: string;

      /** 创建时间 */
      createdAt?: string;

      /** 描述 */
      description: string;

      /** 图标 */
      icon?: string;

      /** id */
      id?: number;

      /** isDeleted */
      isDeleted?: number;

      /** 是否默认可见 */
      isVisible?: number;

      /** 资源顺位 */
      orderValue?: number;

      /** 父级菜单id */
      parentId?: number;

      /** 资源码 */
      permissionCode?: string;

      /** 资源拓展字段 */
      resourceBusinessValue?: string;

      /** 资源标志 */
      resourceKey: string;

      /** 类型 */
      type?: number;

      /** 更新时间 */
      updatedAt?: string;
    }

    export class ResourcePageObject {
      /** 拓展字段值 */
      businessValue?: string;

      /** 客户端标志 */
      clientKey: string;

      /** 备注 */
      comment?: string;

      /** 创建时间 */
      createdAt?: string;

      /** id */
      id?: number;

      /** isDeleted */
      isDeleted?: boolean;

      /** 操作范围（0：可删可编辑 1：不可删可编辑 2：可删不可编辑 3：不可删不可编辑） */
      operationRange?: number;

      /** ResourceObjects列表 */
      resourceVOList?: Array<defs.authorization.ResourceObjects>;

      /** 角色名称 */
      role: string;

      /** 角色状态 */
      status?: number;

      /** 更新时间 */
      updatedAt?: string;

      /** 用户id列表 */
      userIdList?: Array<number>;
    }

    export class ResourceRole {
      /** 拓展字段值 */
      businessValue?: string;

      /** 客户端标志 */
      clientKey: string;

      /** 备注 */
      comment?: string;

      /** 创建时间 */
      createdAt?: string;

      /** id */
      id?: number;

      /** isDeleted */
      isDeleted?: boolean;

      /** 操作范围（0：可删可编辑 1：不可删可编辑 2：可删不可编辑 3：不可删不可编辑） */
      operationRange?: number;

      /** 角色名称 */
      role: string;

      /** 角色状态 */
      status?: number;

      /** 更新时间 */
      updatedAt?: string;
    }

    export class ResourceTreeObject {
      /** api url */
      apiUrl?: string;

      /** 子节点 */
      children?: Array<defs.authorization.ResourceTreeObject>;

      /** 备注 */
      comment?: string;

      /** 描述 */
      description: string;

      /** 图标 */
      icon?: string;

      /** id */
      id?: number;

      /** 是否默认可见 */
      isVisible?: number;

      /** 资源顺位 */
      orderValue?: number;

      /** 父级id */
      parentId?: number;

      /** 页面子元素 */
      privilegeList?: Array<defs.authorization.ResourceTreeObject>;

      /** 拓展字段 */
      resourceBusinessValue?: string;

      /** 资源标志 */
      resourceKey: string;

      /** 类型 */
      type?: number;
    }

    export class RoleDTO {
      /** 拓展字段值 */
      businessValue?: string;

      /** 客户端标志 */
      clientKey: string;

      /** 备注 */
      comment?: string;

      /** 创建时间 */
      createdAt?: string;

      /** id */
      id?: number;

      /** isDeleted */
      isDeleted?: boolean;

      /** 操作范围（0：可删可编辑 1：不可删可编辑 2：可删不可编辑 3：不可删不可编辑） */
      operationRange?: number;

      /** 资源id列表 */
      resourceIds: Array<number>;

      /** 角色名称 */
      role: string;

      /** 角色状态 */
      status?: number;

      /** 更新时间 */
      updatedAt?: string;

      /** 用户id列表 */
      userIds?: Array<number>;
    }

    export class UserQueryDTO {
      /** 客户端标识 */
      clientKey: string;

      /** 用户id列表 */
      userIds?: Array<number>;
    }

    export class UserReduceRoleDTO {
      /** 角色id列表 */
      roleIds: Array<number>;

      /** 用户id */
      userId: number;
    }
  }
}

declare namespace API {
  export namespace authorization {
    /**
     * 新的资源管理接口
     */
    export namespace authResource {
      /**
       * 添加资源
       * /auth/resource/save
       */
      export namespace save {
        export class Params {}

        export type Response = number;

        export const init: Response;
        export const url: string;
        export function fetch(bodyParams: defs.authorization.ResourceObjects): Promise<Response>;
      }

      /**
       * 批量添加资源
       * /auth/resource/saveList
       */
      export namespace saveList {
        export class Params {}

        export type Response = any;

        export const init: Response;
        export const url: string;
        export function fetch(bodyParams: Array<defs.authorization.ResourceObjects>): Promise<Response>;
      }
    }

    /**
     * 新的ResourceRole管理接口
     */
    export namespace authResourceRole {
      /**
       * 校验用户是否已经绑定该角色
       * /auth/role/resource/hasRole
       */
      export namespace hasRole {
        export class Params {
          /** 客户端标志 */
          clientKey: string;
          /** 角色id */
          roleId: string;
          /** 用户id */
          userId: string;
        }

        export type Response = boolean;

        export const init: Response;
        export const url: string;
        export function fetch(params: Params): Promise<Response>;
      }
    }

    /**
     * 客户端管理
     */
    export namespace client {
      /**
       * delete
       * /client/delete
       */
      export namespace remove {
        export class Params {
          /** id */
          id?: number;
        }

        export type Response = any;

        export const init: Response;
        export const url: string;
        export function fetch(params: Params): Promise<Response>;
      }

      /**
       * log
       * /client/log
       */
      export namespace log {
        export class Params {}

        export type Response = string;

        export const init: Response;
        export const url: string;
        export function fetch(): Promise<Response>;
      }

      /**
       * login
       * /client/login
       */
      export namespace login {
        export class Params {
          /** clientKey */
          clientKey?: string;
          /** secret */
          secret?: string;
        }

        export type Response = defs.authorization.ClientConfig;

        export const init: Response;
        export const url: string;
        export function fetch(params: Params): Promise<Response>;
      }

      /**
       * save
       * /client/save
       */
      export namespace save {
        export class Params {
          /** clientKey */
          clientKey?: string;
          /** clientName */
          clientName?: string;
          /** note */
          note?: string;
          /** secret */
          secret?: string;
        }

        export type Response = ObjectMap<any, string>;

        export const init: Response;
        export const url: string;
        export function fetch(params: Params): Promise<Response>;
      }
    }

    /**
     * 数据管理
     */
    export namespace data {
      /**
       * 获取用户数据权限
       * /data/getDataScope
       */
      export namespace getDataScope {
        export class Params {}

        export type Response = ObjectMap<any, Array<string>>;

        export const init: Response;
        export const url: string;
        export function fetch(bodyParams: defs.authorization.DataScopeDTO): Promise<Response>;
      }

      /**
       * 获取mock数据
       * /data/mock
       */
      export namespace getMockData {
        export class Params {}

        export type Response = Array<defs.authorization.OrgTreeDTO>;

        export const init: Response;
        export const url: string;
        export function fetch(): Promise<Response>;
      }

      /**
       * 删除模块
       * /data/module/delete
       */
      export namespace deleteDataModule {
        export class Params {
          /** id */
          id?: number;
        }

        export type Response = any;

        export const init: Response;
        export const url: string;
        export function fetch(params: Params): Promise<Response>;
      }

      /**
       * 获取模块列表
       * /data/module/list
       */
      export namespace listModule {
        export class Params {
          /** clientKey */
          clientKey?: string;
        }

        export type Response = Array<defs.authorization.DataModule>;

        export const init: Response;
        export const url: string;
        export function fetch(params: Params): Promise<Response>;
      }

      /**
       * 保存数据模块
       * /data/module/save
       */
      export namespace saveModule {
        export class Params {}

        export type Response = number;

        export const init: Response;
        export const url: string;
        export function fetch(bodyParams: defs.authorization.DataModule): Promise<Response>;
      }

      /**
       * 删除规则定义
       * /data/rule/def/delete
       */
      export namespace remove {
        export class Params {
          /** id */
          id?: number;
        }

        export type Response = any;

        export const init: Response;
        export const url: string;
        export function fetch(params: Params): Promise<Response>;
      }

      /**
       * 获取已经定义的规则列表
       * /data/rule/def/list
       */
      export namespace list {
        export class Params {
          /** clientKey */
          clientKey?: string;
        }

        export type Response = Array<defs.authorization.DataRuleDefinition>;

        export const init: Response;
        export const url: string;
        export function fetch(params: Params): Promise<Response>;
      }

      /**
       * 保存规则定义
       * /data/rule/def/save
       */
      export namespace save {
        export class Params {}

        export type Response = number;

        export const init: Response;
        export const url: string;
        export function fetch(bodyParams: defs.authorization.DataRuleDefinition): Promise<Response>;
      }

      /**
       * 删除数据规则
       * /data/rule/delete
       */
      export namespace deleteRule {
        export class Params {
          /** ruleId */
          ruleId?: number;
        }

        export type Response = any;

        export const init: Response;
        export const url: string;
        export function fetch(params: Params): Promise<Response>;
      }

      /**
       * 获取数据规则详情
       * /data/rule/detail
       */
      export namespace detail {
        export class Params {
          /** ruleId */
          ruleId?: number;
        }

        export type Response = defs.authorization.DataRuleDTO;

        export const init: Response;
        export const url: string;
        export function fetch(params: Params): Promise<Response>;
      }

      /**
       * 获取数据规则列表
       * /data/rule/list
       */
      export namespace listRule {
        export class Params {
          /** clientKey */
          clientKey?: string;
        }

        export type Response = Array<defs.authorization.DataRule>;

        export const init: Response;
        export const url: string;
        export function fetch(params: Params): Promise<Response>;
      }

      /**
       * 保存数据规则
       * /data/rule/save
       */
      export namespace saveRule {
        export class Params {}

        export type Response = number;

        export const init: Response;
        export const url: string;
        export function fetch(bodyParams: defs.authorization.DataRuleDTO): Promise<Response>;
      }
    }

    /**
     * 数据角色管理
     */
    export namespace dataRole {
      /**
       * 数据角色绑定用户
       * /role/data/add/user
       */
      export namespace addForUser {
        export class Params {
          /** roleId */
          roleId?: number;
          /** userId */
          userId?: number;
        }

        export type Response = any;

        export const init: Response;
        export const url: string;
        export function fetch(params: Params): Promise<Response>;
      }

      /**
       * 用户批量绑定角色
       * /role/data/bindUser
       */
      export namespace bindUser {
        export class Params {}

        export type Response = any;

        export const init: Response;
        export const url: string;
        export function fetch(bodyParams: defs.authorization.BindUserDTO): Promise<Response>;
      }

      /**
       * 删除数据角色
       * /role/data/delete
       */
      export namespace remove {
        export class Params {
          /** roleId */
          roleId?: number;
        }

        export type Response = any;

        export const init: Response;
        export const url: string;
        export function fetch(params: Params): Promise<Response>;
      }

      /**
       * 获取数据角色详情
       * /role/data/detail
       */
      export namespace detail {
        export class Params {
          /** id */
          id?: number;
        }

        export type Response = defs.authorization.DataRoleVO;

        export const init: Response;
        export const url: string;
        export function fetch(params: Params): Promise<Response>;
      }

      /**
       * 获取已创建的数据角色列表
       * /role/data/list
       */
      export namespace list {
        export class Params {
          /** clientKey */
          clientKey?: string;
        }

        export type Response = Array<defs.authorization.DataRole>;

        export const init: Response;
        export const url: string;
        export function fetch(params: Params): Promise<Response>;
      }

      /**
       * 数据角色解绑用户
       * /role/data/remove/user
       */
      export namespace deleteUser {
        export class Params {
          /** roleId */
          roleId?: number;
          /** userId */
          userId?: number;
        }

        export type Response = any;

        export const init: Response;
        export const url: string;
        export function fetch(params: Params): Promise<Response>;
      }

      /**
       * 保存数据角色
       * /role/data/save
       */
      export namespace save {
        export class Params {}

        export type Response = number;

        export const init: Response;
        export const url: string;
        export function fetch(bodyParams: defs.authorization.DataRoleInputDTO): Promise<Response>;
      }
    }

    /**
     * 部署权限控制中心接口
     */
    export namespace deploymentAuthz {
      /**
       * 获取角色访问businessValue列表
       * /deployment/authz/getBusinessValueListByRole
       */
      export namespace getBusinessValueListByRole {
        export class Params {
          /** roleId */
          roleId?: number;
        }

        export type Response = Array<string>;

        export const init: Response;
        export const url: string;
        export function fetch(params: Params): Promise<Response>;
      }

      /**
       * 获取此数据权限的用户列表
       * /deployment/authz/getDataAccessUserList
       */
      export namespace getDataAccessUserList {
        export class Params {
          /** businessValue */
          businessValue?: string;
          /** ruleKeyId */
          ruleKeyId?: number;
        }

        export type Response = Array<number>;

        export const init: Response;
        export const url: string;
        export function fetch(params: Params): Promise<Response>;
      }

      /**
       * 获取能访问businessValue的RoleId
       * /deployment/authz/getRoleIdToBusinessValue
       */
      export namespace getRoleIdToBusinessValue {
        export class Params {
          /** businessValue */
          businessValue?: string;
          /** ruleKeyId */
          ruleKeyId?: number;
        }

        export type Response = number;

        export const init: Response;
        export const url: string;
        export function fetch(params: Params): Promise<Response>;
      }

      /**
       * 获取拥有此角色的所有用户id
       * /deployment/authz/getUserIdsByRoleId
       */
      export namespace getUserIdsByRoleId {
        export class Params {
          /** roleId */
          roleId?: number;
        }

        export type Response = Array<number>;

        export const init: Response;
        export const url: string;
        export function fetch(params: Params): Promise<Response>;
      }

      /**
       * 获取用户所有的数据角色Id
       * /deployment/authz/getUserRoleIdList
       */
      export namespace getUserRoleIdList {
        export class Params {
          /** userId */
          userId?: number;
        }

        export type Response = Array<number>;

        export const init: Response;
        export const url: string;
        export function fetch(params: Params): Promise<Response>;
      }
    }

    /**
     * 资源管理
     */
    export namespace resource {
      /**
       * 删除资源
       * /resource/delete
       */
      export namespace deleteResource {
        export class Params {
          /** id */
          id: string;
        }

        export type Response = any;

        export const init: Response;
        export const url: string;
        export function fetch(params: Params): Promise<Response>;
      }

      /**
       * 查询ResourceDetails
       * /resource/detail
       */
      export namespace detail {
        export class Params {
          /** 资源id */
          id: number;
        }

        export type Response = defs.authorization.ResourceDetails;

        export const init: Response;
        export const url: string;
        export function fetch(params: Params): Promise<Response>;
      }

      /**
       * 校验用户是否拥有权限
       * /resource/getPermissionByUrl
       */
      export namespace getPermissionByUrl {
        export class Params {
          /** apiUrl */
          apiUrl: string;
          /** 拓展业务字段 */
          businessValue: string;
          /** 客户端标志 */
          clientKey: string;
          /** 用户id */
          userId: string;
        }

        export type Response = any;

        export const init: Response;
        export const url: string;
        export function fetch(params: Params): Promise<Response>;
      }

      /**
       * 列表
       * /resource/list
       */
      export namespace listResource {
        export class Params {
          /** 客户端标志 */
          clientKey: string;
          /** 角色id */
          roleId?: string;
        }

        export type Response = Array<defs.authorization.ResourceObjects>;

        export const init: Response;
        export const url: string;
        export function fetch(params: Params): Promise<Response>;
      }

      /**
       * 查询资源列表
       * /resource/listPagination
       */
      export namespace listPagination {
        export class Params {
          /** 客户端标识 */
          clientKey: string;
          /** 分页参数 */
          page: number;
          /** 分页参数 */
          pageSize: number;
          /** 资源标识 */
          resourceKey?: string;
          /** 类型 */
          type?: number;
        }

        export type Response = defs.authorization.PagingEntity<defs.authorization.ResourceObjects>;

        export const init: Response;
        export const url: string;
        export function fetch(params: Params): Promise<Response>;
      }

      /**
       * 全部资源列表（树形）
       * /resource/listTree
       */
      export namespace listTree {
        export class Params {
          /** 拓展业务字段 */
          businessValue?: string;
          /** 客户端标识 */
          clientKey: string;
        }

        export type Response = Array<defs.authorization.ResourceTreeObject>;

        export const init: Response;
        export const url: string;
        export function fetch(params: Params): Promise<Response>;
      }

      /**
       * 获取角色对应的菜单树
       * /resource/role/getMenuTree
       */
      export namespace getMenuTreeByRole {
        export class Params {
          /** 客户端标志 */
          clientKey: string;
          /** 角色id */
          roleId: string;
        }

        export type Response = Array<defs.authorization.ResourceTreeObject>;

        export const init: Response;
        export const url: string;
        export function fetch(params: Params): Promise<Response>;
      }

      /**
       * 保存资源-这个接口仍然可以使用，但建议使用新的资源管理接口中/auth/resource/save
       * /resource/save
       */
      export namespace newResource {
        export class Params {
          /** api url */
          apiUrl: string;
          /** 客户端标志 */
          clientKey: string;
          /** 备注 */
          comment: string;
          /** 创建时间 */
          createdAt?: string;
          /** 描述 */
          description: string;
          /** 图标 */
          icon?: string;
          /** id */
          id?: number;
          /** isDeleted */
          isDeleted?: number;
          /** 是否默认可见 */
          isVisible?: number;
          /** 资源顺位 */
          orderValue?: number;
          /** 父级菜单id */
          parentId?: number;
          /** 资源码 */
          permissionCode?: string;
          /** 资源拓展字段 */
          resourceBusinessValue?: string;
          /** 资源标志 */
          resourceKey: string;
          /** 类型 */
          type?: number;
          /** 更新时间 */
          updatedAt?: string;
        }

        export type Response = number;

        export const init: Response;
        export const url: string;
        export function fetch(params: Params): Promise<Response>;
      }

      /**
       * 保存资源（批量）-这个接口仍然可以使用，但建议使用新的资源管理接口中/auth/resource/saveList
       * /resource/saveList
       */
      export namespace postSaveList {
        export class Params {
          /** permissionResourceList */
          permissionResourceList?: Array<defs.authorization.ResourceObjects>;
        }

        export type Response = any;

        export const init: Response;
        export const url: string;
        export function fetch(params: Params): Promise<Response>;
      }

      /**
       * 用户资源列表
       * /resource/user/list
       */
      export namespace listUserResource {
        export class Params {
          /** 客户端标志 */
          clientKey: string;
          /** 用户id */
          userId: string;
        }

        export type Response = Array<string>;

        export const init: Response;
        export const url: string;
        export function fetch(params: Params): Promise<Response>;
      }

      /**
       * 用户资源列表（树形）
       * /resource/user/list/data
       */
      export namespace listUserResourceData {
        export class Params {
          /** 客户端标志 */
          clientKey: string;
          /** 角色id */
          roleId?: string;
          /** 用户id */
          userId?: string;
        }

        export type Response = Array<defs.authorization.ResourceTreeObject>;

        export const init: Response;
        export const url: string;
        export function fetch(params: Params): Promise<Response>;
      }

      /**
       * 获取apiUrl列表
       * /resource/user/listApiUrl
       */
      export namespace listApiUrl {
        export class Params {
          /** 客户端标志 */
          clientKey: string;
          /** 用户id */
          userId: string;
        }

        export type Response = Array<string>;

        export const init: Response;
        export const url: string;
        export function fetch(params: Params): Promise<Response>;
      }
    }

    /**
     * ResourceRole管理
     */
    export namespace resourceRole {
      /**
       * 清除用户所有角色
       * /role/resource/clearUserRole
       */
      export namespace clearUserRole {
        export class Params {
          /** 客户端标志 */
          clientKey: string;
          /** 用户id */
          userId: string;
        }

        export type Response = any;

        export const init: Response;
        export const url: string;
        export function fetch(params: Params): Promise<Response>;
      }

      /**
       * 拷贝角色资源新建角色
       * /role/resource/copyRole
       */
      export namespace copyRole {
        export class Params {
          /** businessValue */
          businessValue?: string;
          /** 客户端标志 */
          clientKey: string;
          /** 角色名称 */
          role: string;
          /** 源角色id */
          sourceRoleId: string;
          /** 用户id */
          userId: string;
        }

        export type Response = number;

        export const init: Response;
        export const url: string;
        export function fetch(params: Params): Promise<Response>;
      }

      /**
       * 删除ResourceRole
       * /role/resource/delete
       */
      export namespace resourceDelete {
        export class Params {
          /** 客户端标志 */
          clientKey: string;
          /** 角色id */
          id: number;
        }

        export type Response = any;

        export const init: Response;
        export const url: string;
        export function fetch(params: Params): Promise<Response>;
      }

      /**
       * 删除没有用户使用的角色
       * /role/resource/deleteUnusedRole
       */
      export namespace deleteUnusedRole {
        export class Params {
          /** 客户端标志 */
          clientKey: string;
          /** 角色id */
          id: number;
        }

        export type Response = any;

        export const init: Response;
        export const url: string;
        export function fetch(params: Params): Promise<Response>;
      }

      /**
       * 获取ResourceRole详情
       * /role/resource/detail
       */
      export namespace resourceRoleDetail {
        export class Params {
          /** 客户端标志 */
          clientKey: string;
          /** 角色id */
          roleId: number;
        }

        export type Response = defs.authorization.ResourcePageObject;

        export const init: Response;
        export const url: string;
        export function fetch(params: Params): Promise<Response>;
      }

      /**
       * 获取ResourceRole详情包含对应用户
       * /role/resource/detail/user
       */
      export namespace resourceRoleDetailUser {
        export class Params {
          /** 客户端标志 */
          clientKey: string;
          /** 角色id */
          roleId: number;
        }

        export type Response = defs.authorization.ResourcePageObject;

        export const init: Response;
        export const url: string;
        export function fetch(params: Params): Promise<Response>;
      }

      /**
       * 获取ResourceRole列表
       * /role/resource/list
       */
      export namespace resourceRoleList {
        export class Params {
          /** 客户端标志 */
          clientKey: string;
        }

        export type Response = Array<defs.authorization.ResourceRole>;

        export const init: Response;
        export const url: string;
        export function fetch(params: Params): Promise<Response>;
      }

      /**
       * 根据业务拓展字段查询角色(不带分页)
       * /role/resource/listByBusinessValueList
       */
      export namespace listByBusinessValueList {
        export class Params {}

        export type Response = Array<defs.authorization.ResourceRole>;

        export const init: Response;
        export const url: string;
        export function fetch(bodyParams: defs.authorization.BusinessQueryDTO): Promise<Response>;
      }

      /**
       * 根据业务拓展字段查询角色(带分页)
       * /role/resource/listByBusinessValueListPagination
       */
      export namespace listByBusinessValueListPagination {
        export class Params {}

        export type Response = defs.authorization.PagingEntity<defs.authorization.ResourceRole>;

        export const init: Response;
        export const url: string;
        export function fetch(bodyParams: defs.authorization.BusinessQueryDTO): Promise<Response>;
      }

      /**
       * 获取ResourceRole列表（含分页）
       * /role/resource/listByBusinessValues
       */
      export namespace listByBusinessValues {
        export class Params {
          /** 拓展字段 */
          businessValue?: string;
          /** 拓展字段列表 */
          businessValueList?: string;
          /** 客户端标志 */
          clientKey: string;
          /** 分页参数 */
          page: number;
          /** 分页参数 */
          pageSize: number;
          /** 角色名称 */
          roleName?: string;
          /** status */
          status?: number;
        }

        export type Response = defs.authorization.PagingEntity<defs.authorization.ResourceRole>;

        export const init: Response;
        export const url: string;
        export function fetch(params: Params): Promise<Response>;
      }

      /**
       * 获取用户已绑定的ResourceRole
       * /role/resource/listByUserId
       */
      export namespace listByUserId {
        export class Params {
          /** 客户端标志 */
          clientKey: string;
          /** 用户id */
          userId: string;
        }

        export type Response = Array<defs.authorization.ResourceRole>;

        export const init: Response;
        export const url: string;
        export function fetch(params: Params): Promise<Response>;
      }

      /**
       * 根据用户id列表查询其所有角色
       * /role/resource/listByUserIds
       */
      export namespace listByUserIds {
        export class Params {}

        export type Response = Array<defs.authorization.ResourceRole>;

        export const init: Response;
        export const url: string;
        export function fetch(bodyParams: defs.authorization.UserQueryDTO): Promise<Response>;
      }

      /**
       * 获取ResourceRole列表（含分页）
       * /role/resource/listPagination
       */
      export namespace listPagination {
        export class Params {
          /** 拓展字段 */
          businessValue?: string;
          /** 客户端标志 */
          clientKey: string;
          /** 分页参数 */
          page: number;
          /** 分页参数 */
          pageSize: number;
          /** 角色名称 */
          roleName?: string;
          /** status */
          status?: number;
        }

        export type Response = defs.authorization.PagingEntity<defs.authorization.ResourceRole>;

        export const init: Response;
        export const url: string;
        export function fetch(params: Params): Promise<Response>;
      }

      /**
       * 保存ResourceRole
       * /role/resource/save
       */
      export namespace resourceSave {
        export class Params {}

        export type Response = number;

        export const init: Response;
        export const url: string;
        export function fetch(bodyParams: defs.authorization.RoleDTO): Promise<Response>;
      }

      /**
       * 保存ResourceRole并绑定用户角色
       * /role/resource/save/addUser
       */
      export namespace resourceSaveAddUser {
        export class Params {}

        export type Response = number;

        export const init: Response;
        export const url: string;
        export function fetch(bodyParams: defs.authorization.RoleDTO): Promise<Response>;
      }

      /**
       * 用户绑定角色
       * /role/resource/user/add
       */
      export namespace addUserRes {
        export class Params {
          /** 客户端标志 */
          clientKey: string;
          /** 角色id */
          roleId: string;
          /** 用户id */
          userId: string;
        }

        export type Response = any;

        export const init: Response;
        export const url: string;
        export function fetch(params: Params): Promise<Response>;
      }

      /**
       * 用户绑定ResourceRole（批量）
       * /role/resource/user/addList
       */
      export namespace postUserAddList {
        export class Params {}

        export type Response = any;

        export const init: Response;
        export const url: string;
        export function fetch(bodyParams: defs.authorization.BindUserDTO): Promise<Response>;
      }

      /**
       * 用户角色解绑
       * /role/resource/user/remove
       */
      export namespace reduce {
        export class Params {}

        export type Response = any;

        export const init: Response;
        export const url: string;
        export function fetch(bodyParams: defs.authorization.UserReduceRoleDTO): Promise<Response>;
      }

      /**
       * 校验角色是否已经存在
       * /role/resource/validateRoleName
       */
      export namespace validateRoleName {
        export class Params {
          /** 客户端标志 */
          clientKey: string;
          /** 角色名称 */
          roleName?: string;
        }

        export type Response = Array<number>;

        export const init: Response;
        export const url: string;
        export function fetch(params: Params): Promise<Response>;
      }

      /**
       * 校验用户是否已经绑定该角色
       * /role/resource/validateRoleUser
       */
      export namespace validateRoleUser {
        export class Params {
          /** 客户端标志 */
          clientKey: string;
          /** 角色id */
          roleId: string;
          /** 用户id */
          userId: string;
        }

        export type Response = any;

        export const init: Response;
        export const url: string;
        export function fetch(params: Params): Promise<Response>;
      }
    }

    /**
     * 角色管理
     */
    export namespace role {
      /**
       * 更新ResourceRole基本信息
       * /role/update
       */
      export namespace update {
        export class Params {}

        export type Response = any;

        export const init: Response;
        export const url: string;
        export function fetch(bodyParams: defs.authorization.ResourceRole): Promise<Response>;
      }
    }
  }
}
