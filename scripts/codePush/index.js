'use strict';
// TODO：某个Staging发布为Product
// 请选择您要部署环境
// 1. Production
// 2. Staging
//
// 请选择您要部署的平台
// 1. android和ios
// 2. android
// 3. ios
//
// 请输入本次修改的描述
// 回车换行， cmd + s 保存并发布
//
const { makePush } = require('./makePush');
const inquirer = require('inquirer');

const ENV_PARAMS = {
  message: '请选择您要部署环境',
  type: 'list',
  name: 'environment',
  items: {
    1: 'Production',
    2: 'Staging'
  },
  choices: ['Staging', 'Production']
};

const PLATFORM_PARAMS = {
  message: '请选择您要部署的平台',
  type: 'list',
  name: 'platform',
  choices: ['both', 'android', 'ios'],
  default: 'both'
};

const VERSION_PARAMS = {
  name: 'version',
  type: 'input',
  message: '请输入要更新的目标版本号'
};

const DES_PARAMS = {
  name: 'description',
  type: 'editor',
  message: '请输入本次修改的描述'
};

const MANDATORY_PARAMS = {
  message: '本次更新是否为强制更新',
  type: 'list',
  name: 'mandatory',
  choices: ['true', 'false'],
  default: 'false',
};

const QUESTIONS = [ENV_PARAMS, PLATFORM_PARAMS, DES_PARAMS, VERSION_PARAMS, MANDATORY_PARAMS];

function main (){
  inquirer.prompt(QUESTIONS).then(option => {
    const { description, environment, platform, version, mandatory } = option;
    if (!description) {
      console.error('你没有输入改动描述');
      process.exit(1);
    }
    makePush({
      environment,
      platform,
      version,
      description,
      mandatory,
    });
  });
}

main();
