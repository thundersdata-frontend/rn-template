import { useEffect, useRef } from 'react';

import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { ImageCropView, ImageCropViewRef } from '@sdcx/image-crop';
import { Pressable, Text } from '@td-design/react-native';

import { Container } from '@/components/Container';

export function ImageCrop() {
  const navigation = useNavigation<NavigationProp<AppParamList>>();
  const route = useRoute<RouteProp<AppParamList>>();
  const file = route.params?.file;

  const cropRef = useRef<ImageCropViewRef>(null);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={() => {
            if (cropRef.current) {
              cropRef.current.crop();
            }
          }}
        >
          <Text variant="p0" color="black">
            确定
          </Text>
        </Pressable>
      ),
    });
  }, []);

  if (!file || !file.uri) return null;

  /** 拿到裁切后的图片uri 进行上传 */
  const handleCropped = async (imageUri: string) => {
    await route.params?.callback?.({
      ...file,
      uri: imageUri,
    });
    navigation.goBack();
  };

  return (
    <Container>
      <ImageCropView
        style={{ flex: 1 }}
        fileUri={file.uri}
        onCropped={handleCropped}
        cropStyle="circular"
        ref={cropRef}
      />
    </Container>
  );
}
