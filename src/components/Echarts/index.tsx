import React, { Component } from 'react';
import { View, Platform } from 'react-native';
import { WebView as RNWebView } from 'react-native-webview';
import renderChart from './utils/renderChart';
import echartsLib from './lib/echarts';

export interface EChartsProps {
  option: echarts.EChartOption;
  backgroundColor?: string;
  width?: number;
  height?: number;
  disabledSelect?: boolean;
  renderLoading?: () => JSX.Element;
}

interface State {
  isFirstLoad: boolean;
  setOption: (props: EChartsProps) => void;
}

class ECharts extends Component<EChartsProps> {
  public chartRef = React.createRef<RNWebView>();

  constructor(props: EChartsProps) {
    super(props);
    this.state = {
      isFirstLoad: true,
      setOption: this.setOption
    };
  }

  static getDerivedStateFromProps(props: EChartsProps, state: State) {
    if (state.isFirstLoad) {
      return {
        isFirstLoad: false
      };
    } else {
      state.setOption(props);
      return null;
    }
  }

  static defaultProps = {
    backgroundColor: '#00000000'
  };

  render() {
    return (
      <View style={{ width: this.props.width, height: this.props.height || 400 }}>
        <RNWebView
          ref={this.chartRef}
          originWhitelist={['*']}
          allowUniversalAccessFromFileURLs={true}
          androidHardwareAccelerationDisabled={true} // false会导致安卓手机在9以及以上版本崩溃
          geolocationEnabled={true}
          mixedContentMode={'always'}
          renderLoading={
            this.props.renderLoading || (() => <View style={{ backgroundColor: this.props.backgroundColor }} />)
          } // 设置空View，修复ioswebview闪白
          style={{ backgroundColor: this.props.backgroundColor }} // 设置背景色透明，修复android闪白
          scrollEnabled={false}
          javaScriptEnabled={true}
          injectedJavaScript={renderChart(this.props, true)}
          startInLoadingState={false}
          source={Platform.OS === 'ios' ? require('./tmp/tpl.html') : { uri: 'file:///android_asset/tpl.html' }}
        />
      </View>
    );
  }

  setOption = (props: EChartsProps) => {
    this.chartRef.current!.injectJavaScript(renderChart(props, false));
  };
}

export { ECharts, echartsLib as echarts };
