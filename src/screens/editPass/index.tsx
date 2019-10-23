/*
 * @文件描述: 修改密码
 * @公司: thundersdata
 * @作者: 廖军
 * @Date: 2019-09-26 13:12:00
 * @LastEditors: 陈杰
 * @LastEditTime: 2019-10-16 14:39:46
 */
import React, { useReducer } from 'react';
import { StyleSheet, ScrollView, View, Text, StatusBar } from 'react-native';
import { Colors, Size } from '../../config';
import defaultOptions from '../../config/defaultOptions';
import Input from '../../components/Input';
import { Button, WingBlank, Modal } from '@ant-design/react-native';
import { SafeAreaView, NavigationScreenProp, NavigationRoute } from 'react-navigation';
import { ActionProps } from '../../interfaces/common';
import { toastFail, FETCH_OPTIONS, AUTH_PARAMS } from '../../stores/common';
import { getToken } from '../../utils/auth';
import request from '../../utils/request';
import { MAX_LENGTH_PASSWORD, MIN_LENGTH_PASSWORD } from '../../utils/validation';
import { useNetInfo } from '@react-native-community/netinfo';

const initialState = { oldPassword: '', newPassword: '', confirmPassword: '' };

type State = typeof initialState;
function reducer(state: State, action: ActionProps): State {
  switch (action.type) {
    case 'old':
      return {
        ...state,
        oldPassword: action.value,
      };
    case 'new':
      return {
        ...state,
        newPassword: action.value,
      };
    case 'confirm':
      return {
        ...state,
        confirmPassword: action.value,
      };
    default:
      return initialState;
  }
}

interface EditPassProps {
  navigation: NavigationScreenProp<NavigationRoute>;
}

const inputValidate = (state: State) => {
  if (!state.oldPassword) {
    toastFail('请输入旧密码');
    return false;
  } else if (!state.newPassword) {
    toastFail('请输入新密码');
    return false;
  } else if (state.newPassword.length < MIN_LENGTH_PASSWORD) {
    toastFail('密码至少要6位');
    return false;
  } else if (state.oldPassword === state.newPassword) {
    toastFail('新密码不能和旧密码相同');
    return false;
  } else if (!state.confirmPassword) {
    toastFail('请再次输入');
    return false;
  } else if (state.newPassword !== state.confirmPassword) {
    toastFail('新密码前后不一致');
    return false;
  } else {
    return true;
  }
};

const EditPass = (props: EditPassProps) => {
  const netInfo = useNetInfo();
  const [state, dispatch] = useReducer(reducer, initialState);

  /**
   * 修改密码
   */
  const modifyPass = async () => {
    if (!netInfo.isConnected) {
      toastFail('设备未联网，请检查');
      return;
    }
    if (inputValidate(state)) {
      try {
        const result = await request.authForm(FETCH_OPTIONS.mine.modify.url, {
          access_token: await getToken(),
          appVersion: AUTH_PARAMS.appVersion,
          newPassword: state.newPassword,
          oldPassword: state.oldPassword,
        });
        if (result.success) {
          Modal.alert('修改成功', '请重新登录系统', [
            {
              text: '确定',
              onPress: () => {
                props.navigation.navigate('SignIn');
              },
            },
          ]);
        } else {
          toastFail('修改密码失败');
        }
      } catch (error) {
        toastFail('修改密码失败');
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }} forceInset={{ top: 'never', bottom: 'never' }}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
        <WingBlank size="md">
          <View style={styles.cardWrap}>
            <View style={styles.item}>
              <View style={styles.label}>
                <Text style={{ fontSize: Size.px(16) }}>旧密码</Text>
              </View>
              <Input
                style={styles.input}
                secureTextEntry
                value={state.oldPassword}
                onChangeText={value => dispatch({ type: 'old', value: value.trim() })}
                placeholder="请输入旧密码"
                maxLength={MAX_LENGTH_PASSWORD}
              />
            </View>
            <View style={styles.item}>
              <View style={styles.label}>
                <Text style={{ fontSize: Size.px(16) }}>新密码</Text>
              </View>
              <Input
                style={styles.input}
                value={state.newPassword}
                secureTextEntry
                onChangeText={value => dispatch({ type: 'new', value: value.trim() })}
                placeholder="请输入旧密码"
                maxLength={MAX_LENGTH_PASSWORD}
              />
            </View>
            <View style={styles.item}>
              <View style={styles.label}>
                <Text style={{ fontSize: Size.px(16) }}>确认密码</Text>
              </View>
              <Input
                style={styles.input}
                value={state.confirmPassword}
                secureTextEntry
                onChangeText={value => dispatch({ type: 'confirm', value: value.trim() })}
                placeholder="请再次输入新密码"
                maxLength={MAX_LENGTH_PASSWORD}
              />
            </View>
          </View>
        </WingBlank>
      </ScrollView>
      <View style={styles.fixedBottom}>
        <View style={styles.BtnWrap}>
          <Button style={styles.resolveBtn} type="primary" onPress={() => modifyPass()}>
            <Text>确 认</Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  cardWrap: {
    marginTop: Size.px(14),
    borderBottomWidth: 1,
    borderColor: '#E6EAEE',
    borderRadius: 4,
    backgroundColor: Colors.white,
  },
  flexBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fixedBottom: {
    justifyContent: 'flex-end',
  },
  BtnWrap: {
    display: 'flex',
    height: Size.px(68),
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resolveBtn: {
    width: '90%',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: Size.px(56),
    paddingLeft: Size.px(12),
    paddingBottom: Size.px(5),
    borderBottomWidth: Size.ONE_PIXEL,
    borderBottomColor: Colors.borderColor,
  },
  label: {
    flex: 2,
    justifyContent: 'center',
    height: Size.px(40),
  },
  input: {
    flex: 7,
    fontSize: Size.px(16),
  },
});

EditPass.navigationOptions = {
  ...defaultOptions,
  headerTitle: '修改密码',
};

export default EditPass;
