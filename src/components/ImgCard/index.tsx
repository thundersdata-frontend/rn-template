import { FC } from 'react';

import { Box, helpers, Text } from '@td-design/react-native';
import { Image } from 'expo-image';

const { px } = helpers;
export const ImgCard: FC<{ title: string; uri?: string }> = ({ title, uri }) => {
  return (
    <Box
      borderWidth={1}
      borderColor="border"
      borderStyle="dashed" // only works when borderRadius is configured.
      borderRadius="x1"
      width={px(164)}
      height={px(102)}
      backgroundColor="gray50"
      justifyContent="center"
      alignItems="center"
    >
      {uri ? (
        <Image source={{ uri }} style={{ width: px(144), height: px(70) }} />
      ) : (
        <Image source={require('./assets/card-img-default.webp')} style={{ width: px(144), height: px(70) }} />
      )}
      <Text variant="p2" color="gray500" marginTop="x1">
        {title}
      </Text>
    </Box>
  );
};
