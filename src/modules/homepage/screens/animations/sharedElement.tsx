import { ScrollView, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';

import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Flex, Pressable, Tag, Text, WingBlank } from '@td-design/react-native';

import { Container } from '@/components/Container';

import { chips, gallery } from './gallery';

export function SharedElementTransitionDemo() {
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();

  return (
    <Container>
      <ScrollView>
        <WingBlank>
          <Pressable onPress={() => navigation.navigate('GalleryDetail', { tag: 'countryside' })}>
            <Animated.Image
              sharedTransitionTag="countryside"
              source={gallery.countryside.image}
              style={styles.imageOne}
            />
          </Pressable>
          <Flex>
            <Flex.Item>
              <Pressable onPress={() => navigation.navigate('GalleryDetail', { tag: 'florence' })}>
                <Animated.Image
                  sharedTransitionTag="florence"
                  source={gallery.florence.image}
                  style={styles.imageTwo}
                />
              </Pressable>
            </Flex.Item>
            <Flex.Item>
              <Pressable onPress={() => navigation.navigate('GalleryDetail', { tag: 'dawn' })}>
                <Animated.Image sharedTransitionTag="dawn" source={gallery.dawn.image} style={styles.imageThree} />
              </Pressable>
            </Flex.Item>
          </Flex>
          <Text style={styles.header}>Tuscany</Text>
          <Flex>
            {chips.map(chip => (
              <Tag key={chip} size="large" text={chip} />
            ))}
          </Flex>
          <Text style={styles.text}>
            Tuscany is known for its landscapes, history, artistic legacy, and its influence on high culture. It is
            regarded as the birthplace of the Italian Renaissance and of the foundations of the Italian language.
          </Text>
        </WingBlank>
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
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
  imageOne: {
    width: '100%',
    height: 160,
    marginTop: 20,
    borderRadius: 15,
  },
  imageTwo: {
    width: '100%',
    height: 250,
    borderRadius: 15,
  },
  imageThree: {
    width: '100%',
    height: 250,
    borderRadius: 15,
  },
});
