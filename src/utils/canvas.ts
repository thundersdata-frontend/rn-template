/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2020-03-18 21:58:23
 * @LastEditors: 陈杰
 * @LastEditTime: 2020-03-23 14:23:56
 */

import { CanvasRenderingContext2D } from 'react-native-canvas';

interface Point {
  x: number;
  y: number;
}

//计算向量叉乘
const crossMul = function (v1: Point, v2: Point) {
  return v1.x * v2.y - v1.y * v2.x;
};

//javascript判断两条线段是否相交
export const checkCross = function (p1: Point, p2: Point, p3: Point, p4: Point) {
  let v1 = { x: p1.x - p3.x, y: p1.y - p3.y };
  let v2 = { x: p2.x - p3.x, y: p2.y - p3.y };
  let v3 = { x: p4.x - p3.x, y: p4.y - p3.y };

  const v = crossMul(v1, v3) * crossMul(v2, v3);

  v1 = { x: p3.x - p1.x, y: p3.y - p1.y };
  v2 = { x: p4.x - p1.x, y: p4.y - p1.y };
  v3 = { x: p2.x - p1.x, y: p2.y - p1.y };

  return v <= 0 && crossMul(v1, v3) * crossMul(v2, v3) <= 0 ? true : false;
};

//判断点是否在多边形内
export const checkPP = function (point: Point, polygon: Point[]) {
  const p1 = point;
  const p2 = { x: -100, y: point.y };

  let count = 0;

  let p3, p4;
  //对每条边都和射线作对比
  for (let i = 0; i < polygon.length - 1; i++) {
    p3 = polygon[i];
    p4 = polygon[i + 1];
    if (checkCross(p1, p2, p3, p4) == true) {
      count++;
    }
  }
  p3 = polygon[polygon.length - 1];
  p4 = polygon[0];
  if (checkCross(p1, p2, p3, p4) == true) {
    count++;
  }
  return count % 2 == 0 ? false : true;
};

export const drawText = function (context: CanvasRenderingContext2D, text: string | number, point: Point) {
  context.globalAlpha = 1;
  context.font = '12';
  context.textAlign = 'left';
  context.fillStyle = '#ffffff';
  context.fillText(text + '', point.x, point.y);
};

export const drawShape = function (context: CanvasRenderingContext2D, points: number[][], fillStyle: string) {
  //创建路径
  context.beginPath();
  context.moveTo(points[0][0], points[0][1]);
  for (let i = 1; i < points.length; i++) {
    context.lineTo(points[i][0], points[i][1]);
  }
  context.closePath();
  context.fillStyle = fillStyle;
  context.fill();
  context.save();
};

export const genMassCenter = function (points: number[][]): Point {
  //计算质心
  let _allX = 0;
  let _allY = 0;
  Array.prototype.forEach.call(points, function (item) {
    _allX += item[0];
    _allY += item[1];
  });

  return {
    x: +(_allX / points.length).toFixed(2),
    y: +(_allY / points.length).toFixed(2)
  };
};
