import { Container } from 'components';
import { Box, Flex, helpers, Avatar, Toast } from '@td-design/react-native';
import { ImageBackground } from 'react-native';
import ImagePicker from '@td-design/react-native-image-picker';
import { useUserService } from '../useUserService';

const { px } = helpers;
const AVATAR_SIZE = px(66);

export function Mine() {
  const { changeAvatar } = useUserService();

  return (
    <Container>
      <Box>
        <ImageBackground source={require('../assets/bg.webp')} style={{ width: '100%', height: px(210) }}>
          <Flex style={{ height: px(202), paddingLeft: px(21), paddingTop: px(110) }}>
            <ImagePicker
              upload={changeAvatar}
              showUploadImg={false}
              onGrantFail={() => Toast.fail({ content: '上传头像失败' })}
            >
              <Avatar size={AVATAR_SIZE} />
            </ImagePicker>
          </Flex>
        </ImageBackground>
      </Box>
    </Container>
  );
}
