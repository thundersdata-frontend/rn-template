import { PermissionsAndroid, Platform, Rationale } from 'react-native';
import {
  CameraOptions,
  ImagePickerResponse,
  launchImageLibrary,
  launchCamera as launchRNCamera,
} from 'react-native-image-picker';

import { useBoolean, useMemoizedFn } from '@td-design/rn-hooks';

export interface ImagePickerProps {
  /** 其他图片自定义配置,详细参考react-native-image-picker的option配置 */
  options?: CameraOptions;
  /** 选择图片后回调 */
  onFinish?: (file: File) => void;
  /** 打开相册授权的文本 */
  libraryRationale?: Rationale;
  /** 打开摄像头授权的文本 */
  cameraRationale?: Rationale;
}

export default function useImagePicker({
  options = {
    mediaType: 'photo',
    includeBase64: true,
    quality: 1,
    saveToPhotos: false,
    durationLimit: 15,
    videoQuality: 'high',
  },
  cameraRationale = {
    title: '获取摄像头权限',
    message: '若不允许，您将无法使用摄像头功能',
    buttonPositive: '同意',
    buttonNegative: '取消',
    buttonNeutral: '下次再说',
  },
  libraryRationale = {
    title: '获取读取文件权限',
    message: '若不允许，您将无法访问相册',
    buttonPositive: '同意',
    buttonNegative: '取消',
    buttonNeutral: '下次再说',
  },
  onFinish,
}: ImagePickerProps) {
  const [visible, { setFalse: onClose, setTrue: onShow }] = useBoolean(false);

  /** 打开相册 */
  const launchLibrary = async () => {
    if (Platform.OS === 'android') {
      const result = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        libraryRationale
      );
      if (result !== 'granted') return;
    }
    const response = await launchImageLibrary(options);
    handleResponse(response);
  };

  /** 打开摄像头 */
  const launchCamera = async () => {
    if (Platform.OS === 'android') {
      const result = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, cameraRationale);
      if (result !== 'granted') return;
    }
    const response = await launchRNCamera(options);
    handleResponse(response);
  };

  const handleResponse = (response: ImagePickerResponse) => {
    if (response.assets && response.assets.length > 0 && response.assets[0].uri) {
      const file: File = {
        fileName: response.assets[0].fileName!,
        fileType: response.assets[0].type!,
        uri: response.assets[0].uri!,
        fileSize: response.assets[0].fileSize!,
      };
      onFinish?.(file);
    }
  };

  return {
    launchLibrary: useMemoizedFn(launchLibrary),
    launchCamera: useMemoizedFn(launchCamera),
    visible,
    onClose,
    onShow,
  };
}
