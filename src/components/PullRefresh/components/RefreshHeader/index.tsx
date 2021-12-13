import { Box, Flex, Text, Indicator, helpers } from '@td-design/react-native';
import { useSafeState } from '@td-design/rn-hooks';
import { forwardRef, useImperativeHandle } from 'react';
import { Animated } from 'react-native';

export interface RefreshHeaderProps {
  offset?: Animated.Value;
  maxHeight?: number;
}
export type HeaderStatus = 'waiting' | 'pulling' | 'pullingEnough' | 'pullingCancel' | 'refreshing' | 'rebound';

const { px } = helpers;
const { UIActivityIndicator } = Indicator;

const Header = forwardRef<
  {
    changeToState: (status: HeaderStatus) => void;
    onStateChange: (oldStatus: HeaderStatus, newStatus: HeaderStatus) => void;
  },
  RefreshHeaderProps
>(({ offset = new Animated.Value(0), maxHeight = px(80) }, ref) => {
  const [status, setStatus] = useSafeState<HeaderStatus>('waiting');

  const changeToState = (newStatus: HeaderStatus) => {
    status !== newStatus && onStateChange(status, newStatus);
  };

  const onStateChange = (_: HeaderStatus, newStatus: HeaderStatus) => {
    setStatus(newStatus);
  };

  useImperativeHandle(ref, () => ({
    changeToState,
    onStateChange,
  }));

  const renderIcon = () => {
    if (status === 'refreshing' || status === 'rebound') {
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
                inputRange: [-maxHeight - 1 - 10, -maxHeight - 10, -50, -49],
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
      case 'pulling':
      case 'waiting':
        return '下拉可以刷新';

      case 'pullingEnough':
        return '松开立即刷新';

      case 'refreshing':
        return '正在刷新...';

      case 'pullingCancel':
        return '放弃刷新';

      case 'rebound':
        return '刷新完成';
    }
  };

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
export const RefreshHeader = Object.assign(Header, { style, height });
