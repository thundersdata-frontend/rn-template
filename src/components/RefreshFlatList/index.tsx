import { AppTheme } from '@/theme';
import { useTheme } from '@shopify/restyle';
import { Flex, Text } from '@td-design/react-native';
import React from 'react';
import { ActivityIndicator, FlatList, FlatListProps } from 'react-native';

import { CustomRefreshControl } from '../CustomRefreshControl';

export type RefreshFlatListProps<ItemT> = Omit<FlatListProps<ItemT>, 'onRefresh' | 'refreshing'> & {
  onRefresh?: () => Promise<void>;
  refreshing: boolean;
  loadingMore: boolean;
  allLoaded: boolean;
};

export function RefreshFlatList<ItemT>({
  onRefresh,
  contentContainerStyle,
  onEndReachedThreshold = 0.1,
  loadingMore,
  allLoaded,
  refreshing,
  ListEmptyComponent,
  ...props
}: RefreshFlatListProps<ItemT>) {
  const theme = useTheme<AppTheme>();

  const refreshControl = onRefresh ? <CustomRefreshControl onRefresh={onRefresh} refreshing={refreshing} /> : void 0;

  return (
    <FlatList
      {...props}
      onEndReachedThreshold={onEndReachedThreshold}
      refreshControl={refreshControl}
      refreshing={false}
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={props.data?.length === 0 ? [{ flex: 1 }, contentContainerStyle] : contentContainerStyle}
      ListFooterComponent={<Footer {...{ loadingMore, allLoaded }} />}
      ListEmptyComponent={refreshing ? null : ListEmptyComponent}
    />
  );
}

function Footer({ loadingMore, allLoaded }: { loadingMore: boolean; allLoaded: boolean }) {
  if (loadingMore) {
    return (
      <Flex paddingVertical={'x2'} alignItems={'center'} justifyContent={'center'}>
        <ActivityIndicator size={'small'} />
        <Text variant={'p1'} color="gray400">
          正在加载更多...
        </Text>
      </Flex>
    );
  }
  if (allLoaded) {
    return (
      <Flex paddingVertical={'x2'} alignItems={'center'} justifyContent={'center'}>
        <Text variant={'p1'} color="gray400">
          没有更多数据
        </Text>
      </Flex>
    );
  }
  return null;
}
