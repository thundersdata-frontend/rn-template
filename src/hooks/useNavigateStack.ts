import {
  useNavigation,
  CommonActions,
  NavigationProp,
  StackActions,
  useNavigationState,
} from '@react-navigation/native';
import { useCallback } from 'react';

export function useNavigateStack() {
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();
  const target = useNavigationState(state => state.key);

  const dispatchRoute = useCallback(
    (page = '', index = 1) => {
      navigation.dispatch(state => {
        const routes = state.routes.slice(0, index);
        return CommonActions.reset({
          ...state,
          routes,
          index: routes.length - 1,
        });
      });
      page && navigation.navigate(page);
    },
    [navigation],
  );

  const replaceRoute = useCallback(
    (page = '', params = {}) => {
      navigation.dispatch({
        ...StackActions.replace(page, params),
        target,
      });
    },
    [navigation, target],
  );

  return {
    dispatchRoute,
    replaceRoute,
  };
}
