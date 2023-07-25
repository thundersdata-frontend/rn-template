import { ImageBackground, ScrollView } from 'react-native';

import { NavigationProp, useNavigation } from '@react-navigation/native';
import { PullToRefresh } from '@sdcx/pull-to-refresh';
import { Avatar, Box, Button, Flex, helpers, Text, WhiteSpace, WingBlank } from '@td-design/react-native';
import { useAtomValue } from 'jotai';

import { userInfoAtom } from '@/atoms';
import { Container } from '@/components/Container';
import CustomPullRefreshHeader from '@/components/CustomPullRefreshHeader';

import { useUserService } from '../useUserService';

const { px } = helpers;
const AVATAR_SIZE = px(66);

export function Mine() {
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();
  const { refreshing, refreshUserInfo } = useUserService();
  const userInfo = useAtomValue(userInfoAtom);

  return (
    <Container>
      <PullToRefresh
        header={<CustomPullRefreshHeader refreshing={refreshing} onRefresh={refreshUserInfo} hasHeader={false} />}
      >
        <ScrollView nestedScrollEnabled>
          <ImageBackground source={require('../assets/bg.webp')} style={{ width: '100%', height: px(210) }}>
            <Flex style={{ height: px(202), paddingLeft: px(21), paddingTop: px(110) }}>
              <Avatar
                size={AVATAR_SIZE}
                title={userInfo.userName?.charAt(0).toUpperCase()}
                url={userInfo.profilePicture}
              />
              <Box marginLeft="x2">
                <Text variant="p0">{userInfo.userName}</Text>
              </Box>
            </Flex>
          </ImageBackground>
          <WingBlank>
            <Button title="图表示例" onPress={() => navigation.navigate('EchartsDemo')} />
            <WhiteSpace />
            <Button title="系统设置" onPress={() => navigation.navigate('Settings')} />
          </WingBlank>
        </ScrollView>
      </PullToRefresh>
    </Container>
  );
}
