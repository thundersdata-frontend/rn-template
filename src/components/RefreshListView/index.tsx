import { FlatList, StyleSheet, View, TouchableOpacity, FlatListProps } from 'react-native';
import { useTheme } from '@shopify/restyle';
import { Indicator, PullRefresh, helpers, Box, Flex } from '@td-design/react-native';
import { Text } from 'components';
import { RefreshStateEnum } from 'enums';
import { AppTheme } from 'theme';

const { UIActivityIndicator } = Indicator;
const { px } = helpers;
interface RefreshListViewProps<T> extends FlatListProps<T> {
  refreshState: number;
  onHeaderRefresh: () => void;
  onFooterRefresh?: () => void;
  keyExtractor: (item: T, index: number) => string;
  EmptyComponent?: React.ReactElement | null;
}

/**
 * 封装的FlatList，支持下拉刷新、上拉加载更多
 */
export function RefreshListView<T>(props: RefreshListViewProps<T>) {
  const theme = useTheme<AppTheme>();
  const { refreshState, data = [], onHeaderRefresh, onFooterRefresh, EmptyComponent, ...restProps } = props;
  const styles = StyleSheet.create({
    footerContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.spacing.x3,
    },
  });

  /** 从头开始 */
  const handleHeaderRefresh = () => {
    if (shouldStartHeaderRefreshing()) {
      onHeaderRefresh?.();
    }
  };

  /** 加载更多 */
  const handleEndReached = () => {
    if (shouldStartFooterRefreshing()) {
      onFooterRefresh?.();
    }
  };

  /** 是否允许开始下拉刷新 */
  const shouldStartHeaderRefreshing = () => {
    if (refreshState === RefreshStateEnum.HeaderRefreshing || refreshState === RefreshStateEnum.FooterRefreshing) {
      return false;
    }

    return true;
  };

  /** 是否允许开始上拉加载 */
  const shouldStartFooterRefreshing = () => {
    if (!data || data.length === 0) {
      return false;
    }

    return refreshState === RefreshStateEnum.Idle;
  };

  /**
   * 生成页面底部组件，用来展示上拉加载更多时的提示文字或操作
   */
  const renderFooter = () => {
    let footer: React.ComponentType | React.ReactElement | null = null;

    switch (refreshState) {
      case RefreshStateEnum.Idle:
        footer = <View style={styles.footerContainer} />;
        break;
      case RefreshStateEnum.Failure: {
        footer = (
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              if (!data || data.length === 0) {
                props.onHeaderRefresh?.();
              } else {
                props.onFooterRefresh?.();
              }
            }}
          >
            <View style={styles.footerContainer}>
              <Text variant="p2" color="gray300">
                点击重新加载
              </Text>
            </View>
          </TouchableOpacity>
        );
        break;
      }
      case RefreshStateEnum.EmptyData: {
        footer = (
          <TouchableOpacity activeOpacity={0.5} onPress={props.onHeaderRefresh}>
            <View style={styles.footerContainer}>
              <Text variant="p2" color="gray300">
                暂无数据
              </Text>
            </View>
          </TouchableOpacity>
        );
        break;
      }
      case RefreshStateEnum.FooterRefreshing: {
        footer = (
          <View style={styles.footerContainer}>
            <UIActivityIndicator size={px(20)} color={theme.colors.gray300} />
            <Text variant="p2" color="gray300" marginLeft="x1">
              数据加载中...
            </Text>
          </View>
        );
        break;
      }
      case RefreshStateEnum.NoMoreData: {
        footer = (
          <View style={styles.footerContainer}>
            <Text variant="p2" color="gray300">
              已加载全部数据
            </Text>
          </View>
        );
        break;
      }
    }

    return footer;
  };

  /** 渲染内容部分 */
  const renderContent = () =>
    (!data || data.length === 0) && refreshState !== RefreshStateEnum.HeaderRefreshing ? (
      <Flex justifyContent="center" alignContent="center" height="100%">
        {EmptyComponent ?? <Box />}
      </Flex>
    ) : (
      <FlatList
        data={data}
        onEndReachedThreshold={0.1}
        onEndReached={handleEndReached}
        showsVerticalScrollIndicator={false}
        {...restProps}
        ListFooterComponent={renderFooter}
      />
    );

  return (
    <PullRefresh refreshing={refreshState === RefreshStateEnum.HeaderRefreshing} onRefresh={handleHeaderRefresh}>
      {renderContent()}
    </PullRefresh>
  );
}
