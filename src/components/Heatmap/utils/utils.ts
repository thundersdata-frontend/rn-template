/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2020-01-20 10:40:08
 * @LastEditors: 陈杰
 * @LastEditTime: 2020-04-08 14:53:51
 */
// eslint-disable-next-line complexity
export function formatHeatMapData(width: number, height: number, result?: { [key: string]: number }) {
  if (result) {
    const points = []; //  热力区点
    const max = 5;
    const divCount = 64; //  等分
    const len = divCount * divCount; //  等分区域个数
    //  每个等分x轴长度
    const xlen = Math.round(width / divCount);
    //  每个等分y轴长度
    const ylen = Math.round(height / divCount);
    //  热力区点坐标
    let x = 0;
    let y = 0;
    const arr = [];
    let arnum = 0;
    //  将json数据转化成数据
    for (let i = 0; i < len; i++) {
      const num_ = result['a' + i];
      if (!num_) {
        continue;
      }
      arr[arnum++] = Math.sqrt(num_);
    }
    //  求数组最大值
    const ma = Math.max.apply(null, arr);
    //  生成等分坐标
    for (let j = 0; j < len; j++) {
      //  tmp--;
      let m = 'a' + j;
      if (j % divCount === 0) {
        if (j === 0) {
          x = Math.round(xlen / 2);
          y = Math.round(ylen / 2);
        } else {
          y = y + ylen;
          x = Math.round(xlen / 2);
        }
      } else {
        x = x + xlen;
      }
      //  转换坐标位置
      const p = changePos(divCount, j);
      if (p) {
        m = 'a' + p;
      }
      //  热力区值
      const va = Math.sqrt(result[m]);
      if (!va) {
        continue;
      }
      //  热力区半径
      const rds = (va * 50) / ma;
      //  热力区坐标
      const point = {
        x: x,
        y: y,
        value: va,
        radius: rds
      };
      if (va && rds > 8) {
        //  &&  rds>8
        points.push(point);
      }
    }
    //  heatmap  data  format
    const data = {
      max,
      data: points
    };
    return data;
  }
  return {
    max: 5,
    data: []
  };
}

//  转换坐标位置
function changePos(count: number, n: number) {
  const num = Math.trunc(n / count) + 1;
  const pos = 2 * num * count - count - 1 - n;
  return pos;
}
