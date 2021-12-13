import { FC, useRef, isValidElement, ReactElement } from 'react';
import { SpringScrollView, SpringScrollViewPropType } from 'react-native-spring-scrollview';

export interface PullRefreshScrollViewProps
  extends Omit<
    SpringScrollViewPropType,
    | 'decelerationRate'
    | 'showsVerticalScrollIndicator'
    | 'showsHorizontalScrollIndicator'
    | 'dragToHideKeyboard'
    | 'onRefresh'
    | 'onLoading'
  > {
  onRefresh: () => Promise<void>;
  onLoadMore: () => Promise<void>;
  renderEmpty: () => ReactElement;
}

export const PullRefreshScrollView: FC<PullRefreshScrollViewProps> = ({
  refreshHeader,
  loadingFooter,
  onRefresh,
  onLoadMore,
  renderEmpty,
  children,
  ...props
}) => {
  const scrollRef = useRef<SpringScrollView>(null);

  const handleRefresh = async () => {
    await onRefresh?.();
    scrollRef.current?.endRefresh();
  };

  const handleLoadMore = async () => {
    await onLoadMore?.();
    scrollRef.current?.endLoading(true);
  };

  return (
    <SpringScrollView
      ref={scrollRef}
      {...props}
      decelerationRate={16}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      dragToHideKeyboard={true}
      refreshHeader={refreshHeader}
      loadingFooter={loadingFooter}
      onRefresh={handleRefresh}
      onLoading={handleLoadMore}
    >
      {isValidElement(children) ? children : renderEmpty()}
    </SpringScrollView>
  );
};
