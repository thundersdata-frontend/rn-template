'use strict';
const shell = require('shelljs');

function makePush({ environment, platform, description, mandatory, version }) {
  let androidCmd = `code-push release-react rnTemplate-android android -d ${environment} --description "${description}" -m "${mandatory}"`;
  let iosCmd = `code-push release-react rnTemplate-ios ios -d ${environment} --description "${description}" -m "${mandatory}"`;
  if (version) {
    androidCmd += ` -t "${version}"`;
    iosCmd += ` -t "${version}"`;
  }
  let finalCmd = '';
  if (platform === 'both') {
    finalCmd = `${androidCmd} && ${iosCmd}`;
  } else if (platform === 'android') {
    finalCmd = androidCmd;
  } else {
    finalCmd = iosCmd;
  }

  shell.exec(finalCmd);
}

module.exports = {
  makePush,
};
