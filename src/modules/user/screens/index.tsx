import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Avatar, Button, Flex, helpers, Toast } from '@td-design/react-native';
import ImagePicker from '@td-design/react-native-image-picker';
import { Container, CustomRefreshControl } from 'components';
import { ImageBackground, ScrollView } from 'react-native';

import { useUserService } from '../useUserService';

const { px } = helpers;
const AVATAR_SIZE = px(66);

export function Mine() {
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();
  const { changeAvatar, refreshUserInfo } = useUserService();

  return (
    <Container>
      <ScrollView refreshControl={<CustomRefreshControl onRefresh={refreshUserInfo} />}>
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
    </Container>
  );
}
