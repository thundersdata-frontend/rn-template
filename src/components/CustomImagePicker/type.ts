/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 阮旭松
 * @Date: 2020-01-15 16:14:58
 * @LastEditors: 黄姗姗
 * @LastEditTime: 2020-03-25 15:27:31
 */
export interface Response {
  customButton: string;
  didCancel: boolean;
  error: string;
  data: string;
  uri: string;
  origURL?: string;
  isVertical: boolean;
  width: number;
  height: number;
  fileSize: number;
  type?: string;
  fileName?: string;
  path?: string;
  latitude?: number;
  longitude?: number;
  timestamp?: string;
}

interface StorageOptions {
  skipBackup?: boolean;
  path?: string;
  cameraRoll?: boolean;
  waitUntilSaved?: boolean;
}

interface CustomButtonOptions {
  name?: string;
  title?: string;
}

export interface Options {
  title?: string;
  cancelButtonTitle?: string;
  takePhotoButtonTitle?: string;
  chooseFromLibraryButtonTitle?: string;
  customButtons?: Array<CustomButtonOptions>;
  cameraType?: 'front' | 'back';
  mediaType?: 'photo' | 'video' | 'mixed';
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  videoQuality?: 'low' | 'medium' | 'high';
  durationLimit?: number;
  rotation?: number;
  allowsEditing?: boolean;
  noData?: boolean;
  storageOptions?: StorageOptions;
}
