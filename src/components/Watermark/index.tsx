import { PropsWithChildren } from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';

import { Box, Flex, helpers, Text } from '@td-design/react-native';
import { useAtomValue } from 'jotai';

import { userInfoAtom } from '@/atoms';

const { deviceWidth, deviceHeight } = helpers;
export function Watermark(
  props: PropsWithChildren<{
    itemWidth?: number;
    itemHeight?: number;
    rotateZ?: number;
    itemTextStyle?: StyleProp<TextStyle>;
    style?: StyleProp<ViewStyle>;
  }>
) {
  const { rotateZ = -45, itemTextStyle, style, children } = props;

  const userInfo = useAtomValue(userInfoAtom);

  const renderWatermark = () => {
    if (!userInfo) return null;

    const content = [userInfo.userName];

    const items = [];
    for (let index = 0; index < 30; index++) {
      const item = (
        <Box
          key={index}
          justifyContent={'center'}
          alignItems={'center'}
          width={deviceWidth / 5}
          height={deviceHeight / 6}
          style={{
            backgroundColor: 'rgba(0,0,0,0)',
            transform: [{ rotateZ: rotateZ + 'deg' }],
          }}
        >
          {content.map((text, i) => (
            <Text
              key={i}
              style={[
                {
                  color: 'rgba(0,0,0,0.1)',
                  fontSize: 14,
                },
                itemTextStyle,
              ]}
            >
              {text}
            </Text>
          ))}
        </Box>
      );
      items.push(item);
    }
    return (
      <Flex
        pointerEvents="none"
        position={'absolute'}
        top={0}
        bottom={0}
        left={0}
        right={0}
        justifyContent={'center'}
        alignItems={'center'}
        flexWrap={'wrap'}
        alignContent={'center'}
      >
        {items}
      </Flex>
    );
  };

  return (
    <Box flex={1} overflow={'hidden'} style={style}>
      {renderWatermark()}
      {children}
    </Box>
  );
}
