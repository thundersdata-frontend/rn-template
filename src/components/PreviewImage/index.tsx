import { FC } from 'react';
import { StyleProp, TouchableOpacity, TouchableWithoutFeedback, ViewStyle } from 'react-native';
import { helpers, Image, Modal } from '@td-design/react-native';
import { useSafeState } from '@td-design/rn-hooks';

interface PreviewImageProps {
  width: number;
  height: number;
  uri: string;
  style?: StyleProp<ViewStyle>;
}

const { deviceWidth, deviceHeight } = helpers;
export const PreviewImage: FC<PreviewImageProps> = ({ width, height, uri, style }) => {
  const [visible, setVisible] = useSafeState(false);

  return (
    <>
      <TouchableOpacity activeOpacity={0.5} onPress={() => setVisible(true)} style={style}>
        <Image
          showProgress={false}
          source={{ uri }}
          style={{
            width,
            height,
          }}
        />
      </TouchableOpacity>
      <Modal visible={visible} onClose={() => setVisible(false)} position="fullscreen">
        <TouchableWithoutFeedback onPress={() => setVisible(false)}>
          <Image
            showProgress={false}
            source={{ uri }}
            style={{
              width: deviceWidth,
              height: deviceHeight,
            }}
            resizeMode="contain"
          />
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};
