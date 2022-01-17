import { Container } from 'components';
import { Flex, helpers, Avatar, Toast, Button, PullToRefresh } from '@td-design/react-native';
import { ImageBackground, ScrollView } from 'react-native';
import ImagePicker from '@td-design/react-native-image-picker';
import { useUserService } from '../useUserService';
import { NavigationProp, useNavigation } from '@react-navigation/native';

const { px } = helpers;
const AVATAR_SIZE = px(66);

export function Mine() {
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();
  const { changeAvatar, refreshing, refreshUserInfo } = useUserService();

  return (
    <Container>
      <PullToRefresh onRefresh={refreshUserInfo} refreshing={refreshing}>
        <ScrollView>
          <ImageBackground source={require('../assets/bg.webp')} style={{ width: '100%', height: px(210) }}>
            <Flex style={{ height: px(202), paddingLeft: px(21), paddingTop: px(110) }}>
              <ImagePicker
                upload={changeAvatar}
                showUploadImg={false}
                onGrantFail={() => Toast.middle({ content: '上传头像失败' })}
              >
                <Avatar size={AVATAR_SIZE} />
              </ImagePicker>
            </Flex>
          </ImageBackground>
          <Button title="图表示例" onPress={() => navigation.navigate('Echarts')} />
          <Button title="系统设置" onPress={() => navigation.navigate('Settings')} />
        </ScrollView>
      </PullToRefresh>
    </Container>
  );
}
