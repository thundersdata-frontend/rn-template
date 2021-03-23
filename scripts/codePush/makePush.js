'use strict';
const shell = require('shelljs');

function makePush({ environment, platform, description, mandatory, version }) {
  let androidCmd = `appcenter codepush release-react -a thundersdata/rn-template-android -d ${environment} --description "${description}" -m "${mandatory}"`;
  let iosCmd = `appcenter codepush release-react -a thundersdata/rn-template-ios -d ${environment} --description "${description}" -m "${mandatory}"`;
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
