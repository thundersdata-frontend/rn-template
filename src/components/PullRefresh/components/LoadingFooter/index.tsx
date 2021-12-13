import { Flex, Box, Text, helpers, Indicator } from '@td-design/react-native';
import { useSafeState } from '@td-design/rn-hooks';
import { forwardRef, useEffect, useImperativeHandle } from 'react';
import { Animated } from 'react-native';

export interface LoadingFooterProps {
  offset?: Animated.Value;
  maxHeight?: number;
  allLoaded?: boolean;
  bottomOffset?: number;
}

export type FooterStatus =
  | 'waiting'
  | 'dragging'
  | 'draggingEnough'
  | 'draggingCancel'
  | 'loading'
  | 'rebound'
  | 'allLoaded';

const { UIActivityIndicator } = Indicator;
const { px } = helpers;
const Footer = forwardRef<
  {
    changeToState: (status: FooterStatus) => void;
    onStateChange: (oldStatus: FooterStatus, newStatus: FooterStatus) => void;
  },
  LoadingFooterProps
>(({ allLoaded = false, offset = new Animated.Value(0), maxHeight = px(80), bottomOffset = 0 }, ref) => {
  const [status, setStatus] = useSafeState<FooterStatus>(allLoaded ? 'allLoaded' : 'waiting');

  useEffect(() => {
    allLoaded && setStatus('allLoaded');
  }, [allLoaded, setStatus]);

  const changeToState = (newStatus: FooterStatus) => {
    !allLoaded && status !== newStatus && onStateChange(status, newStatus);
  };

  const onStateChange = (_: FooterStatus, newStatus: FooterStatus) => {
    setStatus(newStatus);
  };

  useImperativeHandle(ref, () => ({
    changeToState,
    onStateChange,
  }));

  const renderIcon = () => {
    if (status === 'loading' || status === 'rebound') {
      return <UIActivityIndicator color={'gray'} size={px(16)} />;
    }

    return (
      <Animated.Image
        source={require('../../assets/arrow.png')}
        style={{
          width: px(24),
          height: px(24),
          resizeMode: 'contain',
          transform: [
            {
              rotate: offset.interpolate({
                inputRange: [
                  bottomOffset - 1 + 45,
                  bottomOffset + 45,
                  bottomOffset + maxHeight,
                  bottomOffset + maxHeight + 1,
                ],
                outputRange: ['180deg', '180deg', '0deg', '0deg'],
              }),
            },
          ],
        }}
      />
    );
  };

  const getTitle = () => {
    switch (status) {
      case 'dragging':
      case 'waiting':
      default:
        return '上拉加载更多';

      case 'draggingEnough':
        return '松开加载更多';

      case 'loading':
        return '正在加载数据...';

      case 'draggingCancel':
        return '放弃加载更多';

      case 'rebound':
        return '加载完成';

      case 'allLoaded':
        return '已经到底啦';
    }
  };

  if (status === 'allLoaded')
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <Text>{getTitle()}</Text>
      </Box>
    );

  return (
    <Flex flex={1} justifyContent="center" alignItems="center">
      {renderIcon()}
      <Box marginLeft="x1">
        <Text>{getTitle()}</Text>
      </Box>
    </Flex>
  );
});

const style = 'stickyContent';
const height = px(80);
export const LoadingFooter = Object.assign(Footer, { style, height });
