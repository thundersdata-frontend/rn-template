import { ComponentType, useRef } from 'react';
import { GestureResponderEvent } from 'react-native';

type PressEventHandler = null | ((event: GestureResponderEvent) => void);

interface EnhancedTouchableProps {
  onPressIn?: PressEventHandler;
  onPress?: PressEventHandler;
  onPressOut?: PressEventHandler;
  onLongPress?: PressEventHandler;
}

/**
 * 增强Touchable组件，通过onPressIn和onPressOut事件，实现点击和滑动的区分，防止误触。
 * 主要原理是：如果用户在按下后很快滑动超过一定距离或时间,则认为这是一个滑动gesture而不是点击,于是取消onPress事件的触发。
 * @param Component 只能是Touchable组件，包括：TouchableOpacity、TouchableHighlight、TouchableWithoutFeedback、TouchableNativeFeedback、Pressable
 * @returns
 */
export default function withPressEvents<P extends EnhancedTouchableProps>(Component: ComponentType<P>) {
  const EnhancedTouchable = ({ onPress, onPressIn, onPressOut, onLongPress, ...props }: P) => {
    // 使用useRef保存触摸开始的位置(pressInPointRef)和时间(pressInTimeRef)
    const pressInPointRef = useRef({ startX: 0, startY: 0 });
    const pressInTimeRef = useRef(0);

    // 记录触摸开始的位置和时间
    const handlePressIn = (e: GestureResponderEvent) => {
      pressInPointRef.current.startX = e.nativeEvent.pageX;
      pressInPointRef.current.startY = e.nativeEvent.pageY;
      pressInTimeRef.current = new Date().getTime();
      onPressIn?.(e);
    };

    // 判断滑动距离(超过10px)或滑动时间(小于100ms)是否超过阈值，如果超过则阻止onPress事件的触发
    const handlePressOut = (e: GestureResponderEvent) => {
      const [startX, startY] = [e.nativeEvent.pageX, e.nativeEvent.pageY];
      const endTime = new Date().getTime();

      const shouldReject =
        (Math.abs(pressInPointRef.current.startX - startX) > 10 ||
          Math.abs(pressInPointRef.current.startY - startY) > 10) &&
        endTime - pressInTimeRef.current < 100;

      if (shouldReject) {
        e.preventDefault();
        e.stopPropagation();
      }
      onPressOut?.(e);
    };

    // 先判断是否已经调用了e.preventDefault(),如果是则不再执行onPress回调
    const handlePress = (e: GestureResponderEvent) => {
      if (e.isDefaultPrevented()) return;
      onPress?.(e);
    };

    const handleLongPress = (e: GestureResponderEvent) => {
      if (e.isDefaultPrevented()) return;
      onLongPress?.(e);
    };

    return (
      <Component
        {...(props as P)}
        onPressIn={handlePressIn}
        onPress={handlePress}
        onLongPress={handleLongPress}
        onPressOut={handlePressOut}
      />
    );
  };
  return EnhancedTouchable;
}
