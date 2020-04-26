import React, { Component } from 'react';
import { View, Platform } from 'react-native';
import { WebView as RNWebView } from 'react-native-webview';
import renderHeatmap from './utils/renderHeatmap';
import { Size } from '../../config';

export interface HeatmapData {
  max: number;
  data: { x: number; y: number; value: number }[];
}
export interface HeatmapProps {
  data: HeatmapData;
  backgroundColor?: string;
  width?: number;
  height?: number;
  disabledSelect?: boolean;
  renderLoading?: () => JSX.Element;
}

interface State {
  isFirstLoad: boolean;
  setData: (props: HeatmapProps) => void;
}

export default class Heatmap extends Component<HeatmapProps, State> {
  public chartRef = React.createRef<RNWebView>();

  constructor(props: HeatmapProps) {
    super(props);
    this.state = {
      isFirstLoad: true,
      setData: this.setData
    };
  }

  static getDerivedStateFromProps(props: HeatmapProps, state: State) {
    if (state.isFirstLoad) {
      return {
        isFirstLoad: false
      };
    } else {
      state.setData(props);
      return null;
    }
  }

  static defaultProps = {
    backgroundColor: '#00000000'
  };

  render() {
    return (
      <View style={{ flexDirection: 'row', width: this.props.width }}>
        <View style={{ flex: 1, height: this.props.height || Size.px(504) }}>
          <RNWebView
            ref={this.chartRef}
            originWhitelist={['*']}
            allowUniversalAccessFromFileURLs={true}
            geolocationEnabled={true}
            mixedContentMode={'always'}
            renderLoading={
              this.props.renderLoading || (() => <View style={{ backgroundColor: this.props.backgroundColor }} />)
            } // 设置空View，修复ioswebview闪白
            style={{ backgroundColor: this.props.backgroundColor }} // 设置背景色透明，修复android闪白
            scrollEnabled={false}
            javaScriptEnabled={true}
            startInLoadingState={false}
            source={
              Platform.OS === 'ios' ? require('./tmp/heatmap.html') : { uri: 'file:///android_asset/heatmap.html' }
            }
            onLoadEnd={() => this.state.setData(this.props)}
          />
        </View>
      </View>
    );
  }

  setData = (props: HeatmapProps) => {
    this.chartRef.current!.injectJavaScript(renderHeatmap(props));
  };
}
