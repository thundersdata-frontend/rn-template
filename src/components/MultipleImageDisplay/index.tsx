import { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import { useTheme } from '@shopify/restyle';
import { helpers, Flex, Image, Toast, SvgIcon } from '@td-design/react-native';
import ImagePicker, { File } from '@td-design/react-native-image-picker';

import { Box } from '../Box';
import { Text } from '../Text';
import { AppTheme } from 'theme';
import { PreviewImage } from '../PreviewImage';

const { px } = helpers;
export const MultipleImageDisplay: FC<{
  max?: number;
  pictures: (string | undefined)[];
  size?: number;
  onUpload?: (file: File) => Promise<string>;
  onDelete?: (index: number) => void;
  display?: boolean;
}> = ({ max = 5, pictures = [], size = px(100), onUpload, onDelete, display = false }) => {
  const theme = useTheme<AppTheme>();

  return (
    <Flex flexWrap="wrap" alignItems="center">
      {pictures.map((item, index) => {
        if (!item) return null;

        return (
          <Box position="relative" key={index}>
            <PreviewImage uri={item} width={size} height={size} style={{ marginRight: theme.spacing.x4 }} />
            {!display && (
              <TouchableOpacity
                onPress={() => onDelete?.(index)}
                style={{
                  position: 'absolute',
                  right: px(7),
                  top: -px(10),
                }}
              >
                <SvgIcon name="closecircleo" size={px(20)} color={theme.colors.gray600} />
              </TouchableOpacity>
            )}
          </Box>
        );
      })}
      {pictures.length < max && !display && (
        <ImagePicker
          showUploadImg={false}
          onGrantFail={() => Toast.fail({ content: '对不起，授权失败' })}
          upload={onUpload}
        >
          <Box
            justifyContent="center"
            alignItems="center"
            width={size}
            height={size}
            borderWidth={1}
            borderColor="border"
            borderStyle="dashed" // only works when borderRadius is configured.
            borderRadius="x1"
          >
            <Image source={require('./assets/img-add.webp')} style={{ width: px(44), height: px(44) }} />
            <Text variant="p3" color="gray300" marginTop="x1">
              上传图片(最多5张)
            </Text>
          </Box>
        </ImagePicker>
      )}
    </Flex>
  );
};
