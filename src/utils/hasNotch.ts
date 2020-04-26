/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2020-04-16 16:17:41
 * @LastEditors: 陈杰
 * @LastEditTime: 2020-04-17 14:38:50
 */
import { getBrand, getModel } from 'react-native-device-info';

type NotchDevice = {
  brand: string;
  model: string;

  [key: string]: string;
};

/**iPhone手机 */
const iphoneDevices: NotchDevice[] = [
  {
    brand: 'Apple',
    model: 'iPhone 11'
  },
  {
    brand: 'Apple',
    model: 'iPhone 11 Pro'
  },
  {
    brand: 'Apple',
    model: 'iPhone 11 Pro Max'
  },
  {
    brand: 'Apple',
    model: 'iPhone X'
  },
  {
    brand: 'Apple',
    model: 'iPhone XS'
  },
  {
    brand: 'Apple',
    model: 'iPhone XS Max'
  },
  {
    brand: 'Apple',
    model: 'iPhone XR'
  }
];

/**华为手机 */
const huaweiDevices: NotchDevice[] = [
  {
    brand: 'Huawei',
    model: 'MED-AL00' // 华为畅享 10e
  },
  {
    brand: 'Huawei',
    model: 'ELS-AN00' // HUAWEI P40 Pro
  },
  {
    brand: 'Huawei',
    model: 'CDY-AN90' // 荣耀30S
  },
  {
    brand: 'Huawei',
    model: 'AQM-AL10' // 荣耀 Play4T Pro
  },
  {
    brand: 'Huawei',
    model: 'EBG-AN00' // 荣耀30 Pro
  },
  {
    brand: 'Huawei',
    model: 'BMH-AN10' // 荣耀30
  },
  {
    brand: 'Huawei',
    model: 'ART-AL00x' // 华为畅享10
  },
  {
    brand: 'Huawei',
    model: 'AQM-AL00' // 华为畅享 10S
  },
  {
    brand: 'Huawei',
    model: 'P20'
  },
  {
    brand: 'Huawei',
    model: 'EML-AL00' // p20
  },
  {
    brand: 'Huawei',
    model: 'P20 Plus'
  },
  {
    brand: 'Huawei',
    model: 'P20 Lite'
  },
  {
    brand: 'Huawei',
    model: 'ANE-LX1'
  },
  {
    brand: 'Huawei',
    model: 'INE-LX1'
  },
  {
    brand: 'Huawei',
    model: 'POT-LX1'
  },
  {
    brand: 'Huawei',
    model: 'Honor 10'
  },
  {
    brand: 'Huawei',
    model: 'COL-AL00' // 荣耀10
  },
  {
    brand: 'Huawei',
    model: 'JSN-AL00a' // 荣耀8X
  },
  {
    brand: 'Huawei',
    model: 'LRA-AL00' // 荣耀20青春版
  },
  {
    brand: 'Huawei',
    model: 'OXF-AN00' // 荣耀V30
  },
  {
    brand: 'Huawei',
    model: 'OXF-AN10' // 荣耀V30 PRO
  },
  {
    brand: 'Huawei',
    model: 'HMA-AL00' // mate 20
  },
  {
    brand: 'Huawei',
    model: 'Mate 20 Lite'
  },
  {
    brand: 'Huawei',
    model: 'Mate 20 Pro'
  },
  {
    brand: 'Huawei',
    model: 'LYA-AL00' // Mate 20 Pro
  },
  {
    brand: 'Huawei',
    model: 'LIO-AN00' // Mate 30 Pro 5G
  },
  {
    brand: 'Huawei',
    model: 'LIO-AL00' // Mate 30 Pro
  },
  {
    brand: 'Huawei',
    model: 'TAS-AN00' // Mate 30 5G
  },
  {
    brand: 'Huawei',
    model: 'TAS-AL00' // Mate 30
  },
  {
    brand: 'Huawei',
    model: 'P30 Lite'
  },
  {
    brand: 'Huawei',
    model: 'P30 Pro'
  },
  {
    brand: 'Huawei',
    model: 'ELE-AL00' // P30
  },
  {
    brand: 'Huawei',
    model: 'ANA-AN00' // P40
  },
  {
    brand: 'Huawei',
    model: 'Nova 3'
  },
  {
    brand: 'Huawei',
    model: 'Nova 3i'
  },
  {
    brand: 'Huawei',
    model: 'GLK-AL00' // nova 5i
  },
  {
    brand: 'Huawei',
    model: 'SPN-AL00' // nova 5z
  },
  {
    brand: 'Huawei',
    model: 'SPN-AL00' // nova 5i Pro
  },
  {
    brand: 'Huawei',
    model: 'SEA-AL10' // nova 5 Pro
  },
  {
    brand: 'Huawei',
    model: 'JNY-AL10' // nova 6 SE
  },
  {
    brand: 'Huawei',
    model: 'PAR-AL00'
  }
];

/**Oppo手机 */
const oppoDevices: NotchDevice[] = [
  {
    brand: 'Oppo',
    model: 'R15'
  },
  {
    brand: 'Oppo',
    model: 'R15 Pro'
  },
  {
    brand: 'Oppo',
    model: 'F7'
  }
];

/**Vivo手机 */
const vivoDevices: NotchDevice[] = [
  {
    brand: 'Vivo',
    model: 'V9'
  },
  {
    brand: 'Vivo',
    model: 'X21'
  },
  {
    brand: 'Vivo',
    model: 'X21 UD'
  }
];

/**one plus手机 */
const oneplusDevices: NotchDevice[] = [
  {
    brand: 'OnePlus',
    model: '6'
  },
  {
    brand: 'OnePlus',
    model: 'A6003'
  },
  {
    brand: 'ONEPLUS',
    model: 'A6000'
  },
  {
    brand: 'OnePlus',
    model: 'OnePlus A6003'
  },
  {
    brand: 'OnePlus',
    model: 'ONEPLUS A6010'
  },
  {
    brand: 'OnePlus',
    model: 'ONEPLUS A6013'
  },
  {
    brand: 'OnePlus',
    model: 'ONEPLUS A6000'
  }
];

/**三星手机 */
const samsungDevices: NotchDevice[] = [];

/**小米手机 */
const xiaomiDevices: NotchDevice[] = [
  {
    brand: 'xiaomi',
    model: 'MI 8'
  },
  {
    brand: 'xiaomi',
    model: 'MI 8 Explorer Edition'
  },
  {
    brand: 'xiaomi',
    model: 'MI 8 SE'
  },
  {
    brand: 'xiaomi',
    model: 'MI 8 UD'
  },
  {
    brand: 'xiaomi',
    model: 'MI 8 Lite'
  },
  {
    brand: 'xiaomi',
    model: 'Mi 9'
  },
  {
    brand: 'xiaomi',
    model: 'POCO F1'
  },
  {
    brand: 'xiaomi',
    model: 'POCOPHONE F1'
  },
  {
    brand: 'xiaomi',
    model: 'Redmi 6 Pro'
  },
  {
    brand: 'xiaomi',
    model: 'Redmi Note 7'
  },
  {
    brand: 'xiaomi',
    model: 'Redmi Note 8'
  },
  {
    brand: 'xiaomi',
    model: 'Mi A2 Lite'
  }
];

/**魅族手机 */
const meizuDevices: NotchDevice[] = [];

/**其他手机 */
const otherDevices: NotchDevice[] = [
  {
    brand: 'Oukitel',
    model: 'U18'
  },
  {
    brand: 'Sharp',
    model: 'Aquos S3'
  },
  {
    brand: 'Asus',
    model: 'ZenFone 5'
  },
  {
    brand: 'Asus',
    model: 'ZenFone 5z'
  },
  {
    brand: 'google',
    model: 'Pixel 3 XL'
  },

  {
    brand: 'Leagoo',
    model: 'S9'
  },
  {
    brand: 'LG',
    model: 'G7'
  },
  {
    brand: 'LG',
    model: 'G7 ThinQ'
  },
  {
    brand: 'LG',
    model: 'G7+ ThinQ'
  },
  {
    brand: 'LG',
    model: 'LM-Q910' //G7 One
  },
  {
    brand: 'LG',
    model: 'LM-G710' //G7 ThinQ
  },
  {
    brand: 'LG',
    model: 'LM-V405' //V40 ThinQ
  },
  {
    brand: 'Motorola',
    model: 'Moto g7 Play'
  },
  {
    brand: 'Motorola',
    model: 'Moto g7 Power'
  },
  {
    brand: 'Motorola',
    model: 'One'
  },
  {
    brand: 'Motorola',
    model: 'Motorola One Vision'
  },
  {
    brand: 'Nokia',
    model: '5.1 Plus'
  },
  {
    brand: 'Nokia',
    model: 'Nokia 6.1 Plus'
  },
  {
    brand: 'Nokia',
    model: '7.1'
  },
  {
    brand: 'Nokia',
    model: '8.1'
  }
];

const devicesWithNotch: NotchDevice[] = [
  ...iphoneDevices,
  ...huaweiDevices,
  ...oppoDevices,
  ...vivoDevices,
  ...oneplusDevices,
  ...samsungDevices,
  ...xiaomiDevices,
  ...meizuDevices,
  ...otherDevices
];

/**
 * 判断是否有刘海
 */
export default function hasNotch() {
  const brand = getBrand();
  const model = getModel();

  const hasNotch =
    devicesWithNotch.findIndex(
      item => item.brand.toLowerCase() === brand.toLowerCase() && item.model.toLowerCase() === model.toLowerCase()
    ) !== -1;

  return hasNotch;
}
