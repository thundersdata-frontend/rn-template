/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2019-10-09 21:11:04
 * @LastEditors: 黄姗姗
 * @LastEditTime: 2020-05-08 17:59:22
 */
type Merge<M, N> = Omit<M, Extract<keyof M, keyof N>> & N;

declare module 'react-native-render-html' {
  interface RenderHtmlProps {
    html: string;
    imagesMaxWidth: number;
  }

  export default class RenderHtml extends React.Component<RenderHtmlProps> {}
}

declare module '@bang88/china-city-data';

declare module 'react-native-switch' {
  export interface SwitchProps {
    value?: boolean;
    onValueChange?: (value: boolean) => void;
    backgroundActive?: string;
    backgroundInactive?: string;
    circleActiveColor?: string;
    circleInActiveColor?: string;
    circleBorderWidth?: number;
    circleInactiveBorderColor?: string;
    circleActiveBorderColor?: string;
    disabled?: boolean;
  }

  export class Switch extends React.Component<SwitchProps> {}
}

declare module 'react-native-safe-area-view';
