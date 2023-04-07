import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';

import { useNavigation } from '@react-navigation/native';
import { Pressable, Text } from '@td-design/react-native';

import { Container } from '@/components/Container';

import { gallery, Tag } from './data';

const chips = ['Italy', 'Tourism', 'Nature'];
const { width } = Dimensions.get('screen');

export function SharedElementDemo() {
  const navigation = useNavigation();

  const goToDetails = (tag: Tag) => {
    navigation.navigate('SharedElementDetail', { tag });
  };

  return (
    <Container>
      <ScrollView style={styles.homeContainer}>
        <Pressable onPress={() => goToDetails('countryside')}>
          <Animated.Image
            sharedTransitionTag={'countryside'}
            source={gallery.countryside.image}
            style={{
              width: '100%',
              height: 160,
              marginTop: 20,
              borderRadius: 15,
            }}
          />
        </Pressable>
        <View style={styles.row}>
          <Pressable onPress={() => goToDetails('florence')}>
            <Animated.Image
              sharedTransitionTag={'florence'}
              source={gallery.florence.image}
              style={{
                width: width / 2 - 35,
                height: 250,
                marginTop: 20,
                borderRadius: 15,
              }}
            />
          </Pressable>
          <Pressable onPress={() => goToDetails('dawn')}>
            <Animated.Image
              sharedTransitionTag={'dawn'}
              source={gallery.dawn.image}
              style={{
                width: width / 2 - 35,
                height: 250,
                marginTop: 20,
                marginLeft: 20,
                borderRadius: 15,
              }}
            />
          </Pressable>
        </View>
        <Text style={{ ...styles.header, fontSize: 40 }}>Tuscany</Text>
        <View style={styles.row}>
          {chips.map(chip => (
            <Text key={chip} style={styles.chip}>
              {chip}
            </Text>
          ))}
        </View>
        <Text style={styles.text}>
          Tuscany is known for its landscapes, history, artistic legacy, and its influence on high culture. It is
          regarded as the birthplace of the Italian Renaissance and of the foundations of the Italian language.
        </Text>
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    marginHorizontal: 25,
  },
  detailContainer: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    marginHorizontal: 25,
  },
  row: {
    flexDirection: 'row',
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
  chip: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    width: 90,
    borderRadius: 5,
    textAlign: 'center',
    marginRight: 8,
  },
});
