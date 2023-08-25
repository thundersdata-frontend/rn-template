import { FC } from 'react';

import { BackgroundColorProps, LayoutProps } from '@shopify/restyle';
import { Box, Button, Flex, helpers, Empty as TDEmpty, Text, Theme } from '@td-design/react-native';
import { ButtonProps } from '@td-design/react-native/lib/typescript/button';
import { Image, ImageSource } from 'expo-image';

const { px } = helpers;

type EmptyProps = BackgroundColorProps<Theme> &
  LayoutProps<Theme> & {
    /** 图片地址 */
    source?: ImageSource | string | number | ImageSource[] | string[] | null;
    /** 图片宽度 */
    imgWidth?: number;
    /** 图片高度 */
    imgHeight?: number;
    /** 提示主文本 */
    text?: string;
    /** 提示副文本 */
    subText?: string;
    /** 是否显示跳转按钮 */
    showButton?: boolean;
    /** 按钮属性 */
    buttonProps?: ButtonProps;
  };

export const Empty: FC<EmptyProps> = ({
  source,
  height,
  imgWidth = px(190),
  imgHeight = px(190),
  text = '暂无数据',
  subText,
  showButton,
  buttonProps,
  ...restProps
}) => {
  /** 渲染提示文本 */
  const renderText = () => {
    return (
      <Flex flexDirection="column" alignItems="center" marginBottom={'x4'}>
        <Text color="gray500" variant="h2">
          {text}
        </Text>
        {subText && (
          <Text color="gray300" variant="p1" marginTop="x2">
            {subText}
          </Text>
        )}
        {showButton && buttonProps && <Button type="primary" width={px(326)} {...buttonProps} />}
      </Flex>
    );
  };
  return (
    <Box width="100%" height={height} alignItems={'center'} justifyContent={'center'}>
      <TDEmpty
        width="100%"
        emptyText={renderText()}
        customImg={
          source ? <Image source={source} style={{ width: imgWidth, height: imgHeight }} resizeMode="contain" /> : null
        }
        {...restProps}
      />
    </Box>
  );
};
