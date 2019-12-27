import React, { useEffect } from 'react';
import { StyleSheet, ScrollView, View, Text, StatusBar, TouchableOpacity, Image, RefreshControl } from 'react-native';
import { SafeAreaView, withNavigation, NavigationScreenProp, NavigationLeafRoute } from 'react-navigation';
import Swiper from 'react-native-swiper';
import { TodoStore } from '../../interfaces/todo';
import { Colors, Size } from '../../config';
import { NAV_LIST } from './constant';
import Iconfont from '../../components/Iconfont';
import { useRefresh } from '../../hooks/useRefresh';
import stores from '../../stores';
import { checkNet } from '../../utils/check';
import { createForm } from 'rc-form';
import CustomInput from '../../components/CustomInput';
import FormItem from '../../components/FormItem';
import { Form } from '../../../form';

const { px } = Size;
interface HomeProps {
  navigation: NavigationScreenProp<NavigationLeafRoute>;
  form: Form;
}
interface NavItemProps {
  title: string;
  icon: string;
  color: string;
  router: string;
}

const Home = (props: HomeProps) => {
  const { form } = props;
  // const { getFieldDecorator, getFieldError } = form;
  const todoStore = stores.useStore('todoStore') as TodoStore;
  const { dataSource, refreshList } = todoStore;
  const [refreshing, refresh] = useRefresh();
  // 联网检查
  checkNet();

  useEffect(() => {
    const fetchList = async () => {
      await Promise.all([refreshList()]);
      refresh(false);
    };
    fetchList();
  }, [refreshList, refresh]);

  /**
   * 下拉刷新
   */
  const handleRefresh = async () => {
    refresh(true);
    await Promise.all([refreshList()]);
    refresh(false);
  };

  return (
    <SafeAreaView style={{ flex: 1 }} forceInset={{ top: 'never', bottom: 'never' }}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
        contentInsetAdjustmentBehavior="automatic"
      >
        <View style={styles.body}>
          <Swiper height={200} horizontal={true} paginationStyle={{ bottom: 10 }} showsButtons={false}>
            <Image source={require('../../images/banner_001.jpg')} style={styles.img} />
            <Image source={require('../../images/banner_002.jpg')} style={styles.img} />
            <Image source={require('../../images/banner_003.jpg')} style={styles.img} />
          </Swiper>
          {/** Nav导航列表 */}
          <View style={styles.navWrapper}>
            {NAV_LIST.map(({ title, icon, color, router }: NavItemProps) => (
              <TouchableOpacity key={title} style={styles.navItem} onPress={() => props.navigation.navigate(router)}>
                <View style={styles.textWrap}>
                  <Iconfont name={icon} size={px(36)} color={color} />
                </View>
                <View style={styles.textWrap}>
                  <Text style={styles.navText}>{title}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.container}>
            <Text>{dataSource.length}</Text>
            <FormItem
              form={form}
              name="phone"
              rules={[
                { required: true, message: '请输入手机号!' },
                {
                  pattern: /^1\d{10}$/,
                  message: '请输入正确的手机号!',
                },
              ]}
            >
              <CustomInput placeholder="请输入手机号" autoCompleteType="off" keyboardType="phone-pad" icon="shield" />
            </FormItem>
            <FormItem
              form={form}
              name="phone2"
              rules={[
                { required: true, message: '请输入手机号!' },
                {
                  pattern: /^1\d{10}$/,
                  message: '请输入正确的手机号!',
                },
              ]}
            >
              <CustomInput placeholder="请输入手机号" autoCompleteType="off" keyboardType="phone-pad" icon="shield" />
            </FormItem>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    paddingHorizontal: px(20),
    height: px(500),
  },
  img: {
    width: '100%',
    height: 200,
  },
  navWrapper: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: px(20),
  },
  navItem: {
    display: 'flex',
    width: '25%',
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: px(20),
  },
  navText: {
    color: Colors.dark,
    fontSize: 14,
    marginTop: px(8),
  },
  textWrap: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignContent: 'center',
  },
  body: {
    backgroundColor: Colors.white,
  },
});

export default createForm()(withNavigation(Home));
