import { FC } from 'react';

import { Box, Flex, helpers, SvgIcon, useTheme } from '@td-design/react-native';
import { Image } from 'expo-image';

import { AppTheme } from '@/theme';

import { EnhancedTouchableOpacity } from '../EnhancedTouchable';
import { SingleImagePicker } from '../SingleImagePicker';

const { px } = helpers;
export const MultipleImagePicker: FC<{
  title: string;
  max?: number;
  value?: string[];
  width?: number;
  height?: number;
  needUploadOss?: boolean;
  onUpload?: () => void;
  onUploadFinish?: (uri?: string[]) => void;
}> = ({ title, max = 5, value = [], width = px(100), height = px(100), needUploadOss, onUpload, onUploadFinish }) => {
  const theme = useTheme<AppTheme>();

  const handleUploadFinish = (uri?: string) => {
    if (!uri) return;
    onUploadFinish?.([...value, uri].filter(Boolean));
  };

  const handleDelete = (index: number) => {
    const imgUris = [...value];
    imgUris.splice(index, 1);
    onUploadFinish?.(imgUris);
  };

  return (
    <Flex width="100%" justifyContent={'space-between'} alignItems="center" flexWrap={'wrap'}>
      {value.map((item, index) => {
        if (!item) return null;

        return (
          <Box position="relative" key={item} marginBottom={'x3'}>
            <Image source={{ uri: item }} style={{ width, height }} />
            <EnhancedTouchableOpacity
              onPress={() => handleDelete(index)}
              style={{
                position: 'absolute',
                right: -px(8),
                top: -px(8),
              }}
            >
              <SvgIcon name="closecircleo" size={px(20)} color={theme.colors.gray500} />
            </EnhancedTouchableOpacity>
          </Box>
        );
      })}
      <Box marginBottom={'x3'}>
        {value.length < max && (
          <SingleImagePicker
            {...{
              width,
              height,
              title,
              needUploadOss,
              onUpload,
              onUploadFinish: handleUploadFinish,
              showUploadImg: false,
            }}
          />
        )}
      </Box>
    </Flex>
  );
};
