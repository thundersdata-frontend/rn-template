import { FC } from 'react';
import { helpers, Image } from '@td-design/react-native';
import { Box, Text } from 'components';
import { PreviewImage } from 'components/PreviewImage';

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
        <PreviewImage uri={uri} width={px(144)} height={px(70)} />
      ) : (
        <Image source={require('./assets/card-img-default.webp')} style={{ width: px(144), height: px(70) }} />
      )}
      <Text variant="p2" color="gray500" marginTop="x1">
        {title}
      </Text>
    </Box>
  );
};
