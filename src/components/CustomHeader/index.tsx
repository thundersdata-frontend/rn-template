import React, { FC, ReactNode } from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack';
import Icon from 'react-native-vector-icons/AntDesign';

const CustomHeader: FC<{
  title?: ReactNode;
  transparent?: boolean;
  headerLeft?: ReactNode;
  headerRight?: ReactNode;
  navigation?: NativeStackNavigationProp<any>;
}> = ({ transparent = true, title, headerLeft, headerRight, navigation }) => {
  return (
    <View
      style={{
        backgroundColor: transparent ? 'transparent' : '#fff',
        minHeight: 60,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 5,
      }}>
      <View style={{ flex: 1 }}>
        {headerLeft ?? (
          <TouchableOpacity onPress={() => navigation?.canGoBack && navigation.goBack()}>
            <Icon name="left" color="#fff" size={24} />
          </TouchableOpacity>
        )}
      </View>
      <View style={{ flex: 2 }}>{title}</View>
      <View style={{ flex: 1 }}>{headerRight}</View>
    </View>
  );
};

export default CustomHeader;
