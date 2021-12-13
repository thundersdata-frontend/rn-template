import { FC } from 'react';
import ImagePicker from '@td-design/react-native-image-picker';
import { Toast } from '@td-design/react-native';

import { ImgCard } from '../ImgCard';
import { uploadFile } from 'utils/upload';

interface CustomImagePickerProps {
  title: string;
  width: number;
  height: number;
  value?: string;
  showUploadImg?: boolean;
  onUpload?: () => void;
  onUploadFinish?: (uri?: string) => void;
}

export const MAX_FILE_SIZE_NUMBER = 7;
export const MAX_FILE_SIZE = 1024 * 1024 * MAX_FILE_SIZE_NUMBER;
export const SingleImagePicker: FC<CustomImagePickerProps> = ({
  width,
  height,
  title,
  value,
  showUploadImg,
  onUpload,
  onUploadFinish,
}) => {
  return (
    <ImagePicker
      showUploadImg={showUploadImg}
      width={width}
      height={height}
      value={value}
      beforeUpload={file => {
        if (file.fileType.includes('image/') && file?.fileSize && file?.fileSize > MAX_FILE_SIZE) {
          Toast.fail({ content: `上传图片不能大于${MAX_FILE_SIZE_NUMBER}M` });
          return false;
        }
        return true;
      }}
      upload={file => {
        onUpload?.();
        return uploadFile(file);
      }}
      onGrantFail={() => Toast.fail({ content: '对不起，授权失败' })}
      uploadFinish={onUploadFinish}
    >
      <ImgCard title={title} />
    </ImagePicker>
  );
};
