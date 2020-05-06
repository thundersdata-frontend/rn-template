/*
 * @文件描述: 公用ImagePicker封装组件
 * @公司: thundersdata
 * @作者: 阮旭松
 * @Date: 2020-01-15 15:56:46
 * @LastEditors: 黄姗姗
 * @LastEditTime: 2020-04-30 16:31:28
 */
import RNFetchBlob from 'rn-fetch-blob';
import React, { useState } from 'react';
import { Text, StyleSheet, ImageBackground, TouchableOpacity, ImageSourcePropType } from 'react-native';
import { Options, Response } from './type';
import ImagePicker from 'react-native-image-picker';
import { Size, Color } from '../../config';
import { toastFail, toastSuccess } from '../../common';
import { getToken } from '../../utils/auth';
import { isIOS } from '../../config/size';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { Toast, Portal, WingBlank } from '@ant-design/react-native';

const { px } = Size;

interface CustomImagePickerProps {
  /** 初始化背景图 */
  imgSource?: ImageSourcePropType;
  /** 其他图片自定义配置,详细参考react-native-image-picker的option配置 */
  imgConfig?: Options;
  /** 悬浮文字 */
  title?: string;
  /** 取消事件回调 */
  onCancel?: (response: Response) => void;
  /** 失败事件回调 */
  onFailed?: (response: Response) => void;
  /** 成功事件回调,返回文件id */
  onSuccess?: (fileId: number) => void;
}

const CustomImagePicker: React.FC<CustomImagePickerProps> = props => {
  const {
    imgSource = require('../../assets/pic_add_picture.png'),
    title = '',
    imgConfig,
    onCancel,
    onFailed,
    onSuccess
  } = props;

  /** 初始化自定义配置 */
  const initialImageOptions: Options = {
    title: '选择图片',
    storageOptions: {
      skipBackup: true,
      path: 'images'
    },
    mediaType: 'photo',
    chooseFromLibraryButtonTitle: '图片库',
    cancelButtonTitle: '取消',
    takePhotoButtonTitle: '拍照'
  };

  const imagePickerOptions = { ...initialImageOptions, ...imgConfig };
  const [currentImgSource, setCurrentImgSource] = useState<{ uri: string }>();

  /** 上传图片前进行相机权限检查 */
  const checkBeforeUpload = async () => {
    if (isIOS()) {
      const result = await request(PERMISSIONS.IOS.CAMERA);
      if (result !== RESULTS.GRANTED) {
        toastFail('请授予应用访问摄像头的权限');
      } else {
        handleUploadImage();
      }
    } else {
      const result = await request(PERMISSIONS.ANDROID.CAMERA);
      if (result !== RESULTS.GRANTED) {
        toastFail('请授予应用访问摄像头的权限');
      } else {
        handleUploadImage();
      }
    }
  };

  /** ImagePicker上传调用 */
  const handleUploadImage = () => {
    // eslint-disable-next-line complexity
    ImagePicker.showImagePicker(imagePickerOptions, async response => {
      if (response.didCancel) {
        // 用户取消上传 回调
        onCancel && onCancel(response);
      } else if (response.error) {
        // 上传失败 回调
        onFailed && onFailed(response);
      } else {
        const key = Toast.loading('上传中', 0, () => {}, true);
        try {
          const source = { uri: response.uri };
          const file = {
            fileName: response.fileName || 'image.jpg',
            fileType: response.type || 'image/jpeg',
            uri: response.uri
          };
          // 上传成功 回调
          const uploadResult = await uploadFile(file);
          if (uploadResult.success) {
            toastSuccess('上传成功');
            setCurrentImgSource(source);
            onSuccess && onSuccess(uploadResult.data.fileId);
          } else {
            throw new Error('');
          }
        } catch (error) {
          toastFail('上传失败');
        } finally {
          Portal.remove(key);
        }
      }
    });
  };

  /** 上传文件 */
  const uploadFile = async ({ fileName, fileType, uri }: { fileName: string; fileType: string; uri: string }) => {
    const token = await getToken();
    const resultData = await RNFetchBlob.fetch(
      'POST',
      '',
      {
        'Content-Type': 'multipart/form-data',
        Authorization: token
      },
      [
        {
          name: 'file',
          filename: fileName,
          type: fileType,
          data: RNFetchBlob.wrap(uri.replace('file://', ''))
        }
      ]
    );
    return resultData.json();
  };

  return (
    <TouchableOpacity onPress={checkBeforeUpload}>
      <WingBlank>
        <ImageBackground source={currentImgSource || imgSource} style={styles.backgroundImg} resizeMode="contain">
          {!currentImgSource && <Text style={styles.titleText}>{title}</Text>}
        </ImageBackground>
      </WingBlank>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backgroundImg: {
    width: px(64),
    height: px(64),
    zIndex: 0
  },
  addImg: {
    width: px(64),
    height: px(64),
    marginTop: px(33),
    marginLeft: px(110)
  },
  titleText: {
    fontSize: px(15),
    color: Color.grey,
    marginTop: px(19),
    textAlign: 'center'
  }
});

export default CustomImagePicker;
