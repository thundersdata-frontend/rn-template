/* eslint-disable complexity */
/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2019-10-10 18:39:33
 * @LastEditors: 阮旭松
 * @LastEditTime: 2019-10-18 19:05:39
 */
import { toString } from './utils';
import { EchartsProps } from '../index';

export default function renderChart(props: EchartsProps, isFirst: boolean) {
  const height = `${props.height || 400}px`;
  const width = props.width ? `${props.width}px` : 'auto';
  const option = props.option || {};
  const series = option.series || [];
  // 禁用默认高亮
  const disabledSelect = props.disabledSelect || false;
  const pieSelected = series.findIndex(item => item.type === 'pie') !== -1 && !disabledSelect;

  if (isFirst) {
    return `
      document.getElementById('main').style.height = "${height}";
      document.getElementById('main').style.width = "${width}";
      myChart = echarts.init(document.getElementById('main'));
      myChart.setOption(${toString(option)});
      if(${pieSelected}) {
        myChart.dispatchAction({
          type: 'highlight',
          dataIndex: 0,
        });
      };
      myChart.on('click', function (params) {
        if(params.dataIndex !== 0 && params.seriesType === 'pie'){
          myChart.dispatchAction({
            type: 'downplay',
            dataIndex: 0,
          });
        }
      });
      true;
    `;
  } else {
    return `
      document.getElementById('main').style.height = "${height}";
      document.getElementById('main').style.width = "${width}";
      myChart.clear();
      myChart.resize();
      myChart.setOption(${toString(option)});
      if(${pieSelected}) {
        myChart.dispatchAction({
          type: 'highlight',
          dataIndex: 0,
        });
      };
      true;
    `;
  }
}
