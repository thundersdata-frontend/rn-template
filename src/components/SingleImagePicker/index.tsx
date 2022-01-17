import { FC } from 'react';
import ImagePicker from '@td-design/react-native-image-picker';
import { Toast } from '@td-design/react-native';
import ImageResizer from 'react-native-image-resizer';

import { ImgCard } from '../ImgCard';
import { uploadFile } from 'utils/upload';

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
      upload={async file => {
        try {
          if (file.fileType.includes('image/') && file?.fileSize && file?.fileSize > MAX_FILE_SIZE) {
            const { name, uri } = await ImageResizer.createResizedImage(file.uri, 1024 * 2, 1024 * 2, 'JPEG', 100);
            onUpload?.();
            if (needUploadOss) {
              return uploadFile({ fileName: name, uri, fileType: 'image/jpg' });
            }
            return Promise.resolve(uri);
          }

          onUpload?.();
          if (needUploadOss) {
            return uploadFile(file);
          }
          return Promise.resolve(file?.uri);
        } catch (err) {
          console.log(err);
        }
      }}
      onGrantFail={() => Toast.middle({ content: '对不起，授权失败' })}
      uploadFinish={onUploadFinish}
    >
      <ImgCard title={title} />
    </ImagePicker>
  );
};
