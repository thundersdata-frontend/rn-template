import RNFetchBlob from 'react-native-blob-util';
import Config from 'react-native-config';

import { storageService } from '@/services/StorageService';

/** 上传文件 */
export async function uploadFile({ fileName, fileType, uri }: any) {
  const token = storageService.token;
  const resultData = await RNFetchBlob.fetch(
    'POST',
    `${Config.oss}/upload/public/head?access_token=${token.accessToken!}`,
    {
      'Content-Type': 'multipart/form-data',
      Authorization: token.accessToken!,
    },
    [
      {
        name: 'file',
        filename: fileName,
        type: fileType,
        data: RNFetchBlob.wrap(uri.replace('file://', '')),
      },
    ]
  );
  const result = resultData.json();
  if (!result.success) throw new Error('上传失败');
  return result.data;
}
