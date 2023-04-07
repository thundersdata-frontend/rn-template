import { StyleSheet, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { StaticScreenProps, useNavigation } from '@react-navigation/native';
import { Pressable, Text } from '@td-design/react-native';

import { Container } from '@/components/Container';

import { gallery, Tag } from './data';

export function SharedElementDetail({ route }: StaticScreenProps<{ tag: Tag }>) {
  const navigation = useNavigation();
  const { tag } = route.params;

  return (
    <Container>
      <Animated.Image sharedTransitionTag={tag} source={gallery[tag].image} style={styles.detailsImage} />
      <View style={styles.wrapper}>
        <Animated.Text entering={FadeIn.delay(150).duration(1000)} style={{ ...styles.header, fontSize: 28 }}>
          {gallery[tag].title}
        </Animated.Text>
        <Animated.Text entering={FadeIn.delay(300).duration(1000)} style={styles.text}>
          {gallery[tag].description}
        </Animated.Text>
        <Animated.View entering={FadeIn.delay(500).duration(1000)} style={styles.callToActionWrapper}>
          <Pressable style={styles.callToAction} onPress={() => navigation.goBack()}>
            <Text style={styles.callToActionText}>see for yourself</Text>
          </Pressable>
        </Animated.View>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    marginTop: 8,
  },
  wrapper: {
    flex: 1,
    marginHorizontal: 25,
  },
  header: {
    fontSize: 40,
    fontWeight: 'bold',
    marginTop: 25,
    marginBottom: 12,
  },
  detailsImage: {
    width: '100%',
    height: 400,
  },
  callToActionWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  callToAction: {
    backgroundColor: '#add8e6',
    padding: 16,
    width: 250,
    borderRadius: 5,
  },
  callToActionText: {
    color: '#015571',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
