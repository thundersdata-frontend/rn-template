import { useRef } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  PullToRefreshHeader,
  PullToRefreshHeaderProps,
  PullToRefreshOffsetChangedEvent,
  PullToRefreshState,
  PullToRefreshStateChangedEvent,
  PullToRefreshStateIdle,
  PullToRefreshStateRefreshing,
} from '@sdcx/pull-to-refresh';
import { useMemoizedFn, useSafeState } from '@td-design/rn-hooks';
import Lottie from 'lottie-react-native';

export default function CustomPullRefreshHeader({
  refreshing,
  onRefresh,
  hasHeader = true,
}: PullToRefreshHeaderProps & {
  hasHeader?: boolean;
}) {
  const [progress, setProgress] = useSafeState(0);
  const lottieRef = useRef<Lottie>(null);
  const stateRef = useRef<PullToRefreshState>(PullToRefreshStateIdle);

  const insets = useSafeAreaInsets();

  const handleOffsetChanged = useMemoizedFn((event: PullToRefreshOffsetChangedEvent) => {
    const { offset } = event.nativeEvent;
    if (stateRef.current !== PullToRefreshStateRefreshing) {
      setProgress(Math.min(1, offset / 50));
    }
  });

  const handleStateChanged = useMemoizedFn((event: PullToRefreshStateChangedEvent) => {
    const { state } = event.nativeEvent;
    stateRef.current = state;

    if (state === PullToRefreshStateIdle) {
      lottieRef.current?.reset();
      setProgress(0);
    } else if (state === PullToRefreshStateRefreshing) {
      lottieRef.current?.play(progress);
    }
  });

  return (
    <PullToRefreshHeader
      refreshing={refreshing}
      onRefresh={onRefresh}
      onOffsetChanged={handleOffsetChanged}
      onStateChanged={handleStateChanged}
      style={{ alignItems: 'center', paddingTop: hasHeader ? 0 : insets.top }}
    >
      <Lottie
        ref={lottieRef}
        style={{ height: 50 }}
        source={require('./square-loading.json')}
        autoPlay={false}
        speed={1}
        loop
        progress={progress}
      />
    </PullToRefreshHeader>
  );
}
