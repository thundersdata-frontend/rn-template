import { FC } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import { Box, helpers, Text } from '@td-design/react-native';

import UploadSvg from './assets/card-img-default.webp';

const { px } = helpers;
export const ImgCard: FC<{
  title?: string;
  width?: number;
  height?: number;
  style?: StyleProp<ViewStyle>;
}> = ({ title, width = px(100), height = px(100), style }) => {
  return (
    <Box
      borderWidth={1}
      borderColor="border"
      borderStyle="dashed" // only works when borderRadius is configured.
      borderRadius="x1"
      width={width}
      height={height}
      backgroundColor="gray50"
      justifyContent="center"
      alignItems="center"
      style={style}
    >
      <UploadSvg />
      {!!title && (
        <Text variant="p2" color="gray500" marginTop="x1">
          {title}
        </Text>
      )}
    </Box>
  );
};
