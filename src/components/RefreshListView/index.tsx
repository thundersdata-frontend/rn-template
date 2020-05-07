/*
 * @文件描述: 一个基于FlatList的列表下拉、上拉刷新控件
 * @公司: thundersdata
 * @作者: 陈杰
 * @LastEditors: 黄姗姗
 * @Date: 2019-09-25 19:25:00
 * @LastEditTime: 2020-05-07 16:49:40
 */
import React, { PureComponent } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  ListRenderItem,
  Image,
  ViewStyle,
  ScrollView,
  RefreshControl
} from 'react-native';
import { Size, Color } from '../../config';
import DataEmpty from '../DataEmpty';

export const RefreshState = {
  /**加载成功 */
  Idle: 0,
  /**开始下拉刷新 */
  HeaderRefreshing: 1,
  /**开始上拉翻页 */
  FooterRefreshing: 2,
  /**已加载全部数据 */
  NoMoreData: 3,
  /**加载失败 */
  Failure: 4,
  /**没有数据 */
  EmptyData: 5
};

interface Props<T> {
  refreshState: number;
  onHeaderRefresh: (state: number) => void;
  onFooterRefresh?: (state: number) => void;
  data: T[];
  keyExtractor: (item: T, index: number) => string;
  footerRefreshingText?: string;
  footerFailureText?: string;
  footerNoMoreDataText?: string;
  footerEmptyDataText?: string;
  renderItem: ListRenderItem<T>;
  style?: ViewStyle;
}

class RefreshListView<T> extends PureComponent<Props<T>> {
  public static defaultProps = {
    footerRefreshingText: '数据加载中…',
    footerFailureText: '点击重新加载',
    footerNoMoreDataText: '已加载全部数据',
    footerEmptyDataText: '暂无数据'
  };

  private onHeaderRefresh = () => {
    if (this.shouldStartHeaderRefreshing()) {
      this.props.onHeaderRefresh(RefreshState.HeaderRefreshing);
    }
  };

  private onEndReached = () => {
    if (this.shouldStartFooterRefreshing()) {
      this.props.onFooterRefresh && this.props.onFooterRefresh(RefreshState.FooterRefreshing);
    }
  };

  private shouldStartHeaderRefreshing = () => {
    if (
      this.props.refreshState === RefreshState.HeaderRefreshing ||
      this.props.refreshState === RefreshState.FooterRefreshing
    ) {
      return false;
    }

    return true;
  };

  private shouldStartFooterRefreshing = () => {
    const { refreshState, data = [] } = this.props;
    if (data.length === 0) {
      return false;
    }

    return refreshState === RefreshState.Idle;
  };

  _flatList!: FlatList<T> | null;

  scrollToTop = () => {
    this._flatList && this._flatList.scrollToOffset({ animated: true, offset: 0 });
  };

  public render() {
    const { renderItem, style, refreshState, keyExtractor, data = [], ...rest } = this.props;
    if (data.length === 0 && refreshState === RefreshState.Idle) {
      return (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshState === RefreshState.HeaderRefreshing}
              onRefresh={this.onHeaderRefresh}
            />
          }>
          <DataEmpty visible />
        </ScrollView>
      );
    }
    return (
      <FlatList
        ref={flatList => (this._flatList = flatList)}
        style={style}
        keyExtractor={keyExtractor}
        onEndReached={this.onEndReached}
        onRefresh={this.onHeaderRefresh}
        refreshing={refreshState === RefreshState.HeaderRefreshing}
        ListFooterComponent={this.renderFooter}
        onEndReachedThreshold={0.1}
        renderItem={renderItem}
        data={data}
        {...rest}
      />
    );
  }

  // eslint-disable-next-line complexity
  private renderFooter = () => {
    let footer: React.ComponentType | React.ReactElement | null = null;

    const {
      footerRefreshingText,
      footerFailureText,
      footerNoMoreDataText,
      footerEmptyDataText,
      refreshState,
      data = []
    } = this.props;

    switch (refreshState) {
      case RefreshState.Idle:
        footer = <View style={styles.footerContainer} />;
        break;
      case RefreshState.Failure: {
        footer = (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              if (data.length === 0) {
                this.props.onHeaderRefresh && this.props.onHeaderRefresh(RefreshState.HeaderRefreshing);
              } else {
                this.props.onFooterRefresh && this.props.onFooterRefresh(RefreshState.FooterRefreshing);
              }
            }}>
            <View style={styles.footerContainer}>
              <Text style={styles.footerText}>{footerFailureText}</Text>
            </View>
          </TouchableOpacity>
        );
        break;
      }
      case RefreshState.EmptyData: {
        footer = (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              this.props.onHeaderRefresh && this.props.onHeaderRefresh(RefreshState.HeaderRefreshing);
            }}>
            <View style={styles.emptyFooter}>
              <Image
                style={{
                  width: Size.px(140),
                  height: Size.px(140),
                  marginBottom: Size.px(10)
                }}
                source={require('../../assets/pic_empty.png')}
                resizeMode="contain"
              />
              <Text style={styles.footerText}>{footerEmptyDataText}</Text>
            </View>
          </TouchableOpacity>
        );
        break;
      }
      case RefreshState.FooterRefreshing: {
        footer = (
          <View style={styles.footerContainer}>
            <ActivityIndicator size="small" color="#888888" />
            <Text style={[styles.footerText, { marginLeft: 7 }]}>{footerRefreshingText}</Text>
          </View>
        );
        break;
      }
      case RefreshState.NoMoreData: {
        footer = (
          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>{footerNoMoreDataText}</Text>
          </View>
        );
        break;
      }
    }

    return footer;
  };
}

const styles = StyleSheet.create({
  footerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Size.px(10)
  },
  footerText: {
    fontSize: Size.px(12),
    color: Color.helpTextColor
  },
  emptyFooter: {
    flex: 1,
    height: Size.px(300),
    justifyContent: 'center',
    alignItems: 'center',
    padding: Size.px(10)
  }
});

export default RefreshListView;
