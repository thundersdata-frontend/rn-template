import { Linking, PermissionsAndroid, Platform } from 'react-native';
import RNFetchBlob from 'react-native-blob-util';
import Config from 'react-native-config';

import { Modal, Toast } from '@td-design/react-native';

import { useCustomRequest } from './useCustomRequest';

interface CheckUpdateDTO {
  /** 安卓下载地址 */
  androidDownloadAddress?: string;
  /** 是否强制更新 */
  forceUpdate?: boolean;
  /** app store地址 */
  iosDownloadAddress?: string;
  /** 升级版本号 */
  version?: string;
}

interface VersionTemplateDTO {
  /** 消息标题 */
  announcementTitle: string;
  /** 内容 */
  announcementContent: string;
}

/**
 * mock接口，具体项目中需要替换成真实接口
 */
const checkVersion: () => Promise<CheckUpdateDTO> = () =>
  new Promise(resolve => {
    resolve({
      androidDownloadAddress: '',
      forceUpdate: true,
      iosDownloadAddress: '',
      version: '1.0.0',
    });
  });

const fetchVersionContent: () => Promise<VersionTemplateDTO> = () =>
  new Promise(resolve =>
    resolve({
      announcementTitle: '版本更新',
      announcementContent: '1. 优化了部分功能\n2. 修复了部分bug',
    })
  );

export default function useAppForceUpdate() {
  const { run: checkUpdate, data: versionInfo } = useCustomRequest(checkVersion, {
    manual: true,
    onSuccess(data) {
      const version = data.version || '0.0.0';
      if (compareVersion(version) < 0) {
        getVersionContent();
      } else {
        Modal.alert({
          title: '检查更新',
          content: '当前已是最新版本',
        });
      }
    },
  });

  const { run: getVersionContent } = useCustomRequest(fetchVersionContent, {
    manual: true,
    onSuccess(data) {
      const { version = '', androidDownloadAddress = '', iosDownloadAddress = '', forceUpdate } = versionInfo!;
      if (forceUpdate) {
        Modal.alert({
          title: data.announcementTitle,
          content: data.announcementContent,
          confirmText: '马上升级',
          onPress: () => appForceUpdate(androidDownloadAddress, iosDownloadAddress, version),
        });
      } else {
        Modal.confirm({
          title: data.announcementTitle,
          content: data.announcementContent,
          okText: '马上升级',
          cancelText: '暂不升级',
          onOk: () => appForceUpdate(androidDownloadAddress, iosDownloadAddress, version),
        });
      }
    },
  });

  return { checkUpdate };
}

/**
 * 通过接口判断后台是否有大版本更新，如果有的话，强制App进行更新
 * @param androidDownloadUrl Android下载地址
 * @param appStoreUrl AppStore下载地址
 * @param version 待下载的App的版本，通常这个版本号是通过接口从后台返回的版本号
 */
async function appForceUpdate(androidDownloadUrl: string, appStoreUrl: string, version: string) {
  if (Platform.OS === 'android') {
    const result = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
    if (result !== PermissionsAndroid.RESULTS.GRANTED) {
      Toast.middle({ content: '请开启存储权限' });
      return;
    }

    Toast.process('正在下载更新包，请稍候...');

    const appName = `${Config.APP_DISPLAY_NAME}-${version}.apk`;
    const downloadDest = RNFetchBlob.fs.dirs.DownloadDir + `/${appName}`;
    const android = RNFetchBlob.android;

    try {
      const result = await RNFetchBlob.config({
        addAndroidDownloads: {
          useDownloadManager: true,
          title: appName,
          description: '下载更新包',
          mime: 'application/vnd.android.package-archive',
          mediaScannable: true,
          notification: true,
          path: downloadDest,
        },
      }).fetch('GET', androidDownloadUrl);

      if (result) {
        android.actionViewIntent(result.path(), 'application/vnd.android.package-archive');
      }
    } catch (error) {
      Toast.middle({ content: '下载失败' });
    } finally {
      Toast.hide();
    }
  } else if (Platform.OS === 'ios') {
    try {
      const supported = await Linking.canOpenURL(appStoreUrl);
      if (!supported) {
        Toast.middle({ content: 'App Store无法找到该应用' });
        return;
      }
      Linking.openURL(appStoreUrl);
    } catch (error) {
      Toast.middle({ content: '跳转App Store失败' });
    }
  }
}

/**
 * 比较当前版本号和目标版本号的大小
 * @param targetVersion 目标版本号
 * @returns 1：当前版本号大于目标版本号；-1：当前版本号小于目标版本号；0：当前版本号等于目标版本号
 */
export const compareVersion = (targetVersion: string): number => {
  const currentVersion = Config.VERSION_NAME as string;

  const GTR = 1; // 大于
  const LSS = -1; // 小于
  const EQU = 0; // 等于

  const currentVersionArray = currentVersion.split('.').map(parseInt);
  const targetVersionArray = targetVersion.split('.').map(parseInt);
  const arrLen = Math.max(currentVersionArray.length, targetVersionArray.length);

  // 检查空字符串，任何非空字符串都大于空字符串
  if (currentVersion.length == 0 && targetVersion.length == 0) {
    return EQU;
  } else if (currentVersion.length == 0) {
    return LSS;
  } else if (targetVersion.length == 0) {
    return GTR;
  }

  let result = EQU;
  // 循环比较版本号
  for (let i = 0; i < arrLen; i++) {
    result = compareNumber(currentVersionArray[i], targetVersionArray[i]);
    if (result == EQU) {
      continue;
    } else {
      break;
    }
  }
  return result;

  function compareNumber(n1 = 0, n2 = 0) {
    if (n1 > n2) {
      return GTR;
    } else if (n1 < n2) {
      return LSS;
    } else {
      return EQU;
    }
  }
};
