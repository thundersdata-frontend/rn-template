declare module 'react-native-htmlview' {
  import { ViewStyle, StyleProp } from 'react-native';
  interface HtmlViewProps {
    value: string;
    stylesheet: any;
  }

  export default class HtmlView extends React.Component<HtmlViewProps> {}
}
