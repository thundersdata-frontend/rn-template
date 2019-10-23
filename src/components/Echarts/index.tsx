import React, { Component } from 'react';
import { View, Platform } from 'react-native';
import { WebView as RNWebView } from 'react-native-webview';
import renderChart from './utils/renderChart';
import echartsLib from './lib/echarts';

export interface EchartsProps {
  option: echarts.EChartOption;
  backgroundColor?: string;
  width?: number;
  height?: number;
  disabledSelect?: boolean;
  renderLoading?: () => JSX.Element;
}

interface State {
  isFirstLoad: boolean;
  setOption: (props: EchartsProps) => void;
}

class Echarts extends Component<EchartsProps> {
  public chartRef = React.createRef<RNWebView>();

  constructor(props: EchartsProps) {
    super(props);
    this.state = {
      isFirstLoad: true,
      setOption: this.setOption,
    };
  }

  static getDerivedStateFromProps(props: EchartsProps, state: State) {
    if (state.isFirstLoad) {
      return {
        isFirstLoad: false,
      };
    } else {
      state.setOption(props);
      return null;
    }
  }

  static defaultProps = {
    backgroundColor: '#00000000',
  };

  render() {
    return (
      <View style={{ flexDirection: 'row', width: this.props.width }}>
        <View style={{ flex: 1, height: this.props.height || 400 }}>
          <RNWebView
            ref={this.chartRef}
            originWhitelist={['*']}
            useWebKit={true} // ios使用最新webkit内核渲染
            allowUniversalAccessFromFileURLs={true}
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
      </View>
    );
  }

  setOption = (props: EchartsProps) => {
    this.chartRef.current!.injectJavaScript(renderChart(props, false));
  };
}

export { Echarts, echartsLib as echarts };
