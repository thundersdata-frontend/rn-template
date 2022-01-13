import { CommonActions, createNavigationContainerRef, StackActions } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef<AppParamList>();

/**
 * 跳转到某个页面
 * @param name
 * @param params
 */
export function navigate<T extends keyof AppParamList>(name: T, params?: AppParamList[T]) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

/**
 * 压入某个页面
 * @param name
 * @param params
 */
export function push<T extends keyof AppParamList>(name: T, params?: AppParamList[T]) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.push(name, params));
  }
}

/**
 * 重定向到某个页面
 */
export function replace<T extends keyof AppParamList>(name: T, params?: AppParamList[T]) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.replace(name, params));
  }
}

/**
 * 返回上个页面
 */
export function goBack() {
  if (navigationRef.isReady()) {
    navigationRef.canGoBack() && navigationRef.goBack();
  }
}

/**
 * 返回路由栈里的之前的某个页面
 * @param step
 */
export function goto(step = -1) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(state => {
      const routes = [...state.routes].slice(0, step);
      return CommonActions.reset({
        ...state,
        routes,
        index: routes.length - 1,
      });
    });
  }
}
