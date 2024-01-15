import { FC } from 'react';

import { Toast } from '@td-design/react-native';
import ImagePicker from '@td-design/react-native-image-picker';

import { uploadFile } from '@/utils/upload';

import { ImgCard } from '../ImgCard';

interface CustomImagePickerProps {
  title: string;
  width: number;
  height: number;
  value?: string;
  needUploadOss?: boolean;
  showUploadImg?: boolean;
  onUpload?: () => void;
  onUploadFinish?: (uri?: string) => void;
}

export const MAX_FILE_SIZE_NUMBER = 4;
export const MAX_FILE_SIZE = 1024 * 1024 * MAX_FILE_SIZE_NUMBER;

/**
 * 专门为表单内上传图片封装的组件
 */
export const SingleImagePicker: FC<CustomImagePickerProps> = ({
  width,
  height,
  title,
  value,
  showUploadImg,
  needUploadOss,
  onUpload,
  onUploadFinish,
}) => {
  return (
    <ImagePicker
      showUploadImg={showUploadImg}
      width={width}
      height={height}
      value={value}
      onUpload={async file => {
        try {
          onUpload?.();
          if (needUploadOss) {
            return uploadFile(file);
          }
          return Promise.resolve(file?.uri);
        } catch (err) {
          console.error(err);
        }
      }}
      onGrantFail={() => Toast.middle({ content: '对不起，授权失败' })}
      onAfterUpload={onUploadFinish}
    >
      <ImgCard title={title} />
    </ImagePicker>
  );
};
