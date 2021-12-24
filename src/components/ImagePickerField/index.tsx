import { FC } from 'react';
import { Field } from 'rc-field-form';
import { Rule } from 'rc-field-form/es/interface';
import { SingleImagePicker } from '../SingleImagePicker';
import { MultipleImagePicker } from '../MultipleImagePicker';

interface ImagePickerFieldProps {
  title: string;
  width: number;
  height: number;
  name: string;
  rules?: Rule[];
  max?: number;
  multiple?: boolean;
  needUploadOss?: boolean;
  onUpload?: () => void;
  onUploadFinish?: (uri?: string | string[]) => void;
}

/**
 * 专门为表单内上传图片封装的组件
 */
export const ImagePickerField: FC<ImagePickerFieldProps> = ({
  name,
  rules,
  width,
  height,
  title,
  onUpload,
  onUploadFinish,
  max,
  multiple = false,
  needUploadOss = true,
}) => {
  const imagePickerProps = { max, width, height, title, needUploadOss, onUpload, onUploadFinish };
  return (
    <Field name={name} rules={rules} trigger="onUploadFinish" validateTrigger="onUploadFinish">
      {multiple ? <MultipleImagePicker {...imagePickerProps} /> : <SingleImagePicker {...imagePickerProps} />}
    </Field>
  );
};
