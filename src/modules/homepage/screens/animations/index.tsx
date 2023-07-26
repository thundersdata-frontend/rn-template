import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Button, WingBlank } from '@td-design/react-native';

import { Container } from '@/components/Container';

export function AnimationDemo() {
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();
  return (
    <Container>
      <WingBlank>
        {/* <Button
          width={'100%'}
          type="primary"
          title="Layout Animation示例"
          onPress={() => navigation.navigate('LayoutAnimationDemo')}
        /> */}
        <Button
          width={'100%'}
          type="primary"
          title="SharedElementTransition示例"
          onPress={() => navigation.navigate('SharedElementTransitionDemo')}
        />
      </WingBlank>
    </Container>
  );
}
