import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-root-toast';
import { IconOutline } from '@ant-design/icons-react-native';
import { StackHeaderProps, StackHeaderLeftButtonProps, StackNavigationOptions, Header } from '@react-navigation/stack';
import { extend, ExtendOptionsInit } from 'umi-request';
import { Size, Color } from './config';
import TitleBar from './components/TitleBar';

export const PAGE = 1;
export const PAGE_SIZE = 10;
export const TOTAL = 0;

export const initialFetchChartData = {
  xAxis: [],
  yAxis: [],
  series: []
};

export const initialPagination = {
  list: [],
  page: 0,
  pageSize: 10,
  total: 0
};

export const commonStackOptions: StackNavigationOptions = {
  header: (props: StackHeaderProps) => (
    <View style={{ backgroundColor: Color.white }}>
      <Header {...props} />
    </View>
  ),
  headerTitleStyle: {
    fontWeight: '500',
    color: Color.mainTextColor,
    fontSize: Size.px(18)
  },
  headerTransparent: true,
  headerTitleAlign: 'center',
  headerLeft: (props: StackHeaderLeftButtonProps) =>
    props.canGoBack && (
      <TouchableOpacity activeOpacity={0.8} onPress={props.onPress} style={{ marginLeft: 0, padding: 10 }}>
        <IconOutline name="left" size={24} color={Color.primary} />
      </TouchableOpacity>
    )
};

export const linearGradientStackOptions: StackNavigationOptions = {
  header: (props: StackHeaderProps) => <TitleBar {...props} />,
  headerTitleStyle: {
    fontWeight: '500',
    color: Color.white,
    fontSize: Size.px(18)
  },
  headerTransparent: true,
  headerTitleAlign: 'center',
  headerLeft: (props: StackHeaderLeftButtonProps) =>
    props.canGoBack && (
      <TouchableOpacity activeOpacity={0.8} onPress={props.onPress} style={{ marginLeft: 0, padding: 10 }}>
        <IconOutline name="left" size={24} color={Color.white} />
      </TouchableOpacity>
    )
};

export enum FETCH_ERROR {
  EXPIRED = '1',
  FAILED = '2',
  VPN_ERROR = '3'
}

/** 这边可对接口请求做一些统一的封装 */
export const commonRequestOptions: ExtendOptionsInit = {
  useCache: false,
  ttl: 60000
};
export const request = extend(commonRequestOptions);

const toastSettings = {
  duration: 1000,
  position: Toast.positions.CENTER,
  shadow: true,
  animation: true,
  hideOnPress: true,
  delay: 0,
  textColor: Color.white
};

export function toastSuccess(message: string) {
  Toast.show(message, {
    ...toastSettings,
    backgroundColor: Color.success
  });
}
export function toastWarning(message: string) {
  Toast.show(message, {
    ...toastSettings,
    backgroundColor: Color.warning
  });
}
export function toastFail(message: string) {
  Toast.show(message, {
    ...toastSettings,
    backgroundColor: Color.fail
  });
}
// 时间RadioGroup的data常量
export const FILTER_OPTION_DAY_MONTH_QUARTER_YEAR = Object.freeze([
  { label: '日', value: 'day' },
  { label: '月', value: 'month' },
  { label: '季', value: 'quarter' },
  { label: '年', value: 'year' }
]);

// 地图用到的省信息列表
export const provinceList = Object.freeze([
  {
    id: 1,
    province_id: '110000000000',
    province_name: '北京市',
    simpleName: '北京',
    longitude: 116.413384,
    latitude: 39.910925
  },
  {
    id: 2,
    province_id: '120000000000',
    province_name: '天津市',
    simpleName: '天津',
    longitude: 117.210813,
    latitude: 39.14393
  },
  {
    id: 3,
    province_id: '130000000000',
    province_name: '河北省',
    simpleName: '河北',
    longitude: 114.536596,
    latitude: 38.043202
  },
  {
    id: 4,
    province_id: '140000000000',
    province_name: '山西省',
    simpleName: '山西',
    longitude: 112.569376,
    latitude: 37.879829
  },
  {
    id: 5,
    province_id: '150000000000',
    province_name: '内蒙古自治区',
    simpleName: '内蒙古',
    longitude: 111.772606,
    latitude: 40.823156
  },
  {
    id: 6,
    province_id: '210000000000',
    province_name: '辽宁省',
    simpleName: '辽宁',
    longitude: 123.435598,
    latitude: 41.841465
  },
  {
    id: 7,
    province_id: '220000000000',
    province_name: '吉林省',
    simpleName: '吉林',
    longitude: 125.33258,
    latitude: 43.901714
  },
  {
    id: 8,
    province_id: '230000000000',
    province_name: '黑龙江省',
    simpleName: '黑龙江',
    longitude: 126.669653,
    latitude: 45.74793
  },
  {
    id: 9,
    province_id: '310000000000',
    province_name: '上海市',
    simpleName: '上海',
    longitude: 121.480539,
    latitude: 31.235929
  },
  {
    id: 10,
    province_id: '320000000000',
    province_name: '江苏省',
    simpleName: '江苏',
    longitude: 118.769552,
    latitude: 32.066777
  },
  {
    id: 11,
    province_id: '330000000000',
    province_name: '浙江省',
    simpleName: '浙江',
    longitude: 120.159533,
    latitude: 30.271548
  },
  {
    id: 12,
    province_id: '340000000000',
    province_name: '安徽省',
    simpleName: '安徽',
    longitude: 117.33054,
    latitude: 31.734294
  },
  {
    id: 13,
    province_id: '350000000000',
    province_name: '福建省',
    simpleName: '福建',
    longitude: 119.302447,
    latitude: 26.106339
  },
  {
    id: 14,
    province_id: '360000000000',
    province_name: '江西省',
    simpleName: '江西',
    longitude: 115.915423,
    latitude: 28.681691
  },
  {
    id: 15,
    province_id: '370000000000',
    province_name: '山东省',
    simpleName: '山东',
    longitude: 117.027442,
    latitude: 36.674857
  },
  {
    id: 16,
    province_id: '410000000000',
    province_name: '河南省',
    simpleName: '河南',
    longitude: 113.759384,
    latitude: 34.771713
  },
  {
    id: 17,
    province_id: '420000000000',
    province_name: '湖北省',
    simpleName: '湖北',
    longitude: 114.348441,
    latitude: 30.5516
  },
  {
    id: 18,
    province_id: '430000000000',
    province_name: '湖南省',
    simpleName: '湖南',
    longitude: 112.989603,
    latitude: 28.11827
  },
  {
    id: 19,
    province_id: '440000000000',
    province_name: '广东省',
    simpleName: '广东',
    longitude: 113.272429,
    latitude: 23.137949
  },
  {
    id: 20,
    province_id: '450000000000',
    province_name: '广西壮族自治区',
    simpleName: '广西',
    longitude: 108.334521,
    latitude: 22.821269
  },
  {
    id: 21,
    province_id: '460000000000',
    province_name: '海南省',
    simpleName: '海南',
    longitude: 110.355537,
    latitude: 20.025802
  },
  {
    id: 22,
    province_id: '500000000000',
    province_name: '重庆市',
    simpleName: '重庆',
    longitude: 106.558434,
    latitude: 29.568996
  },
  {
    id: 23,
    province_id: '510000000000',
    province_name: '四川省',
    simpleName: '四川',
    longitude: 104.073467,
    latitude: 30.577543
  },
  {
    id: 24,
    province_id: '520000000000',
    province_name: '贵州省',
    simpleName: '贵州',
    longitude: 106.714476,
    latitude: 26.60403
  },
  {
    id: 25,
    province_id: '530000000000',
    province_name: '云南省',
    simpleName: '云南',
    longitude: 102.716416,
    latitude: 25.051562
  },
  {
    id: 26,
    province_id: '540000000000',
    province_name: '西藏自治区',
    simpleName: '西藏',
    longitude: 91.124342,
    latitude: 29.652894
  },
  {
    id: 27,
    province_id: '610000000000',
    province_name: '陕西省',
    simpleName: '陕西',
    longitude: 108.960393,
    latitude: 34.275808
  },
  {
    id: 28,
    province_id: '620000000000',
    province_name: '甘肃省',
    simpleName: '甘肃',
    longitude: 103.832478,
    latitude: 36.065465
  },
  {
    id: 29,
    province_id: '630000000000',
    province_name: '青海省',
    simpleName: '青海',
    longitude: 101.786462,
    latitude: 36.627159
  },
  {
    id: 30,
    province_id: '640000000000',
    province_name: '宁夏回族自治区',
    simpleName: '宁夏',
    longitude: 106.265605,
    latitude: 38.476878
  },
  {
    id: 31,
    province_id: '650000000000',
    province_name: '新疆维吾尔自治区',
    simpleName: '',
    longitude: 87.633473,
    latitude: 43.799238
  },
  {
    id: 32,
    province_id: '710000000000',
    province_name: '台湾省',
    simpleName: '台湾',
    longitude: 120.751179,
    latitude: 25.007963
  },
  {
    id: 33,
    province_id: '810000000000',
    province_name: '香港特别行政区',
    simpleName: '香港',
    longitude: 114.179894,
    latitude: 22.30449
  },
  {
    id: 34,
    province_id: '820000000000',
    province_name: '澳门特别行政区',
    simpleName: '澳门',
    longitude: 113.54684,
    latitude: 22.209762
  }
]);

export const THUMB_URL = 'https://os.alipayobjects.com/rmsportal/mOoPurdIfmcuqtr.png';
