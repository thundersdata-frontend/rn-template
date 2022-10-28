import { helpers, Image } from '@td-design/react-native';
import { ScrollView } from 'react-native';

const { px } = helpers;
export function ImgList({
  data = [],
  width = px(90),
  height = px(86),
}: {
  data: (string | undefined)[];
  width?: number;
  height?: number;
}) {
  if (data.length === 0) return null;
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ padding: px(16), paddingRight: 0 }}
    >
      {data.map(imgUri => (
        <Image
          key={imgUri}
          source={{ uri: imgUri }}
          preview
          style={{ width, height, borderRadius: px(6), marginRight: px(16) }}
        />
      ))}
    </ScrollView>
  );
}
