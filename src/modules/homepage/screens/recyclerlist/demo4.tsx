import { Text, NativeSyntheticEvent, NativeScrollEvent, StyleSheet } from 'react-native';
import { Container, RecyclerWaterfallList } from 'components';
import { Box, Center, PullToRefresh } from '@td-design/react-native';
import FastImage from 'react-native-fast-image';
import { useRefreshService } from 'hooks/useRefreshService';

interface DataType {
  imageUrl: string;
}

function fetchData({ page, pageSize }: { page: number; pageSize: number }): Promise<Page<DataType>> {
  const data = [
    'https://images.dog.ceo/breeds/husky/20180901_150234.jpg',
    'https://images.dog.ceo/breeds/husky/20180904_185604.jpg',
    'https://images.dog.ceo/breeds/husky/20180924_193829.jpg',
    'https://images.dog.ceo/breeds/husky/MsMilo_Husky1.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_10047.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_10116.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_10171.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_10175.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_10273.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_10360.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_10597.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_1066.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_10844.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_10849.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_10875.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_10898.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_10902.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_10955.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_10967.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_11114.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_11131.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_11138.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_11287.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_1130.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_11396.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_11409.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_11445.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_11580.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_11626.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_11635.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_11636.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_1164.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_11773.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_1178.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_11783.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_11841.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_120.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_12120.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_12380.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_12441.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_12478.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_12498.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_12656.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_12678.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_12748.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_1289.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_13127.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_13158.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_13187.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_13197.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_13282.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_1338.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_13423.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_13434.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_13704.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_13794.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_13821.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_13855.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_13942.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_14056.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_14061.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_14283.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_14289.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_1439.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_1446.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_14479.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_14523.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_14560.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_14594.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_14597.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_14650.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_1469.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_14766.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_14906.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_1497.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_15019.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_15063.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_1511.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_1532.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_1534.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_1552.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_1598.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_1614.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_1748.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_1794.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_184.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_2368.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_2446.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_248.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_2593.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_2604.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_2614.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_2672.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_2701.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_2728.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_2736.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_2820.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_2941.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_3039.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_3291.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_3302.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_3328.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_3406.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_353.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_3540.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_3589.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_3651.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_3808.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_388.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_4030.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_4060.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_4115.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_4133.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_4186.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_4294.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_4522.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_4677.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_4694.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_4906.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_5030.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_5143.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_5159.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_5172.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_519.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_5392.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_5495.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_56.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_5622.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_5624.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_5628.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_5716.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_58.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_5871.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_5973.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_6094.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_6105.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_6263.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_632.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_6351.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_6409.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_6411.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_6438.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_6473.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_6564.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_6746.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_6775.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_6780.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_6850.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_698.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_699.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_7044.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_7117.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_712.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_7210.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_7246.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_725.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_7329.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_7379.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_7413.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_7564.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_7594.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_7762.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_7879.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_7888.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_7936.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_7980.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_8005.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_815.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_8154.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_8162.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_8216.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_8327.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_8360.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_8397.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_8564.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_8600.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_8708.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_8748.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_8749.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_8860.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_8923.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_8966.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_9001.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_9086.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_9177.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_9194.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_931.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_9334.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_9396.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_9429.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_9461.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_9712.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_9833.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_9846.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_9855.jpg',
    'https://images.dog.ceo/breeds/husky/n02110185_9975.jpg',
    'https://images.dog.ceo/breeds/beagle/1271553739_Milo.jpg',
    'https://images.dog.ceo/breeds/beagle/1374053345_Milo.jpg',
    'https://images.dog.ceo/breeds/beagle/166407056_Milo.jpg',
    'https://images.dog.ceo/breeds/beagle/184369380_Milo.jpg',
    'https://images.dog.ceo/breeds/beagle/603525417_Milo.jpg',
    'https://images.dog.ceo/breeds/beagle/DSC05086.JPG',
    'https://images.dog.ceo/breeds/beagle/Joey.jpg',
    'https://images.dog.ceo/breeds/beagle/Phoebe.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_10108.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_10206.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_10296.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_10354.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_10362.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_10575.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_10585.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_10731.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_10798.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_10947.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_11130.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_11136.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_11147.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_11231.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_1128.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_11391.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_11458.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_11509.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_11698.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_11711.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_11828.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_11836.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_11930.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_12102.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_12124.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_12131.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_12154.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_12178.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_12213.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_12291.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_12303.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_12334.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_12397.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_12405.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_12440.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_12710.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_12713.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_12745.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_12756.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_12794.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_12816.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_12869.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_129.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_12920.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_12972.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_12973.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_13028.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_13050.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_13128.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_13214.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_13236.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_13428.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_13464.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_13477.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_13478.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_13484.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_13572.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_13627.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_13630.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_13682.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_13809.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_1384.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_13944.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_13981.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_14055.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_14079.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_14095.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_14220.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_14369.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_14394.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_14431.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_14548.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_14613.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_14663.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_14690.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_14702.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_14779.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_14863.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_14892.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_14911.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_14968.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_15036.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_1507.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_15082.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_15093.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_15111.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_15305.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_15315.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_15370.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_15690.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_15787.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_15877.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_16060.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_16065.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_161.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_16165.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_16207.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_16210.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_16339.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_16493.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_16502.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_16508.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_16519.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_16588.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_16635.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_16689.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_16695.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_16704.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_16721.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_16791.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_16881.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_16985.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_17167.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_17170.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_17258.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_17294.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_17314.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_17406.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_17473.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_17474.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_17479.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_17530.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_17534.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_17553.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_17671.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_17689.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_17766.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_17935.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_18403.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_18404.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_2000.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_2019.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_2106.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_2143.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_2360.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_2415.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_2499.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_2502.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_2566.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_2572.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_2652.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_2661.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_2840.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_3171.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_3752.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_3758.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_4052.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_4070.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_4237.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_427.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_4281.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_4473.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_4493.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_4527.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_4706.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_4823.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_4879.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_5090.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_5123.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_5147.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_5282.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_5427.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_5572.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_5716.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_5784.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_5826.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_6089.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_6109.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_6211.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_6358.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_639.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_6547.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_6611.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_6866.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_7247.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_7324.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_769.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_7784.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_7927.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_8443.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_8477.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_852.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_8572.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_8612.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_8713.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_876.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_8820.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_8871.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_9318.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_9520.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_959.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_9650.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_9652.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_9825.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_9849.jpg',
    'https://images.dog.ceo/breeds/beagle/n02088364_9895.jpg',
  ];

  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        page,
        pageSize,
        total: data.length,
        totalPage: Math.ceil(data.length / pageSize),
        list: data.slice((page - 1) * pageSize, page * pageSize).map(item => ({
          imageUrl: item,
          height: Math.random() > 0.5 ? 150 : 250,
          key: Math.round(Math.random() * 100000),
        })),
      });
    }, 200);
  });
}

export function RecyclerListDemo4() {
  const { refreshing, loadingMore, allLoaded, onRefresh, onLoadMore, data } = useRefreshService<DataType>(fetchData, {
    defaultParams: [{ page: 1, pageSize: 30 }],
  });

  const renderItem = ({ item }: { item: DataType }) => {
    return (
      <Box flex={1} overflow={'hidden'} margin="x1">
        <FastImage source={{ uri: item.imageUrl }} style={StyleSheet.absoluteFill} resizeMode="cover" />
      </Box>
    );
  };

  const renderFooter = () => {
    if (loadingMore)
      return (
        <Center height={80}>
          <Text>正在加载更多数据</Text>
        </Center>
      );
    if (allLoaded)
      return (
        <Center height={80}>
          <Text>没有更多数据</Text>
        </Center>
      );
    return null;
  };

  const renderChildren = ({
    onScroll,
    onMomentumScrollEnd,
    scrollEnabled,
  }: {
    onScroll: () => void;
    onMomentumScrollEnd: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
    scrollEnabled: boolean;
  }) => {
    return (
      <RecyclerWaterfallList
        data={data}
        keyExtractor={item => item.imageUrl}
        renderItem={renderItem}
        renderFooter={renderFooter}
        onScroll={onScroll}
        scrollViewProps={{
          bounces: false,
          scrollEnabled,
          scrollEventThrottle: 16,
          onMomentumScrollEnd,
        }}
        onEndReached={onLoadMore}
        onEndReachedThreshold={20}
      />
    );
  };

  return (
    <Container>
      <PullToRefresh onRefresh={onRefresh} refreshing={refreshing} renderChildren={renderChildren} />
    </Container>
  );
}
