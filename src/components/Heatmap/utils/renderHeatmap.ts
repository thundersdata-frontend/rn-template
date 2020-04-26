/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2020-01-20 13:49:34
 * @LastEditors  : 陈杰
 * @LastEditTime : 2020-01-20 15:26:47
 */
import { HeatmapProps } from '../index';

export default function renderHeatmap(props: HeatmapProps) {
  return `
    var container = document.querySelector('.heatmap');
    if (h337 && container) {
      if (!heatmapInstance) {
        heatmapInstance = h337.create({
          container
        });
      }
      heatmapInstance.setData(${JSON.stringify(props.data)});
    }
    true;
  `;
}
