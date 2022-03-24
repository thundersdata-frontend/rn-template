import { useCallback } from 'react';
import { Modal, Box, Text, Portal } from '@td-design/react-native';
import { BackHandler, TouchableOpacity } from 'react-native';
import { Container } from 'components';
import { storageService, StorageToken } from 'services/StorageService';
import { NavigationProp, useFocusEffect, useNavigation } from '@react-navigation/native';

const { updateStorage } = storageService;
export default () => {
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();

  useFocusEffect(
    useCallback(() => {
      const key = Modal.confirm({
        title: '用户服务协议和隐私政策',
        content: (
          <Box marginHorizontal={'x2'}>
            <Text>
              请你务必审慎阅读、充分理解“用户服务协议”和“隐私政策”各条款，包括但不限于：为了向你提供即时通讯、内容分享等服务，我们需要收集你的设备信息、操作日志等个人信息。你可以在“设置”中查看、变更、删除个人信息并管理你的授权。
            </Text>
            <Text>
              <Text>你可阅读</Text>
              <TouchableOpacity
                onPress={() => {
                  Portal.remove(key);
                  navigation.navigate('UserAgreement');
                }}
              >
                <Text color="primary200">《用户服务协议》</Text>
              </TouchableOpacity>
              <Text>和</Text>
              <TouchableOpacity
                onPress={() => {
                  Portal.remove(key);
                  navigation.navigate('Privacy');
                }}
              >
                <Text color="primary200">《隐私政策》</Text>
              </TouchableOpacity>
              <Text>了解详细信息。如你同意，请点击“同意”开始接受我们的服务。</Text>
            </Text>
          </Box>
        ),
        okText: '同意',
        cancelText: '暂不使用',
        onOk: () => {
          updateStorage(StorageToken.Confirmed, true);
          navigation.navigate('SignIn');
        },
        onCancel: () => {
          BackHandler.exitApp();
        },
      });
    }, [navigation]),
  );

  return <Container />;
};
