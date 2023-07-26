import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Button, WingBlank } from '@td-design/react-native';

import { Container } from '@/components/Container';

import { gallery, Tag } from './gallery';

export function GalleryDetail() {
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();
  const { params } = useRoute<RouteProp<MainStackParamList, 'GalleryDetail'>>();
  const tag = params.tag as Tag;

  useEffect(() => {
    navigation.setOptions({
      headerTitle: gallery[tag].title,
    });
  }, [tag]);

  return (
    <Container>
      <WingBlank>
        <Animated.Image sharedTransitionTag={tag} source={gallery[tag].image} style={styles.image} />
        <Animated.Text entering={FadeIn.delay(100).duration(1000)} style={styles.header}>
          {gallery[tag].title}
        </Animated.Text>
        <Animated.Text entering={FadeIn.delay(300).duration(1000)} style={styles.text}>
          {gallery[tag].description}
        </Animated.Text>
        <Animated.View entering={FadeIn.delay(500).duration(1000)}>
          <Button type="primary" width="100%" title="Go Back" onPress={navigation.goBack} />
        </Animated.View>
      </WingBlank>
    </Container>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 400,
  },
  header: {
    fontSize: 40,
    fontWeight: 'bold',
    marginTop: 25,
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    marginTop: 8,
  },
});
