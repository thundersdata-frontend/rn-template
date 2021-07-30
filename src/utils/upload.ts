import RNFetchBlob from 'rn-fetch-blob';
import Config from 'react-native-config';
import { File } from '@td-design/react-native-image-picker';
import { getToken } from './auth';

/** 上传文件 */
export async function uploadFile({ fileName, fileType, uri }: File) {
  const token = await getToken();
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
    ],
  );
  const result = resultData.json();
  console.log(result);
  if (!result.success) throw new Error('上传失败');
  return result.data;
}
