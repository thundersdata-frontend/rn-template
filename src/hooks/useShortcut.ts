import { useMemoizedFn, useMount, useSafeState, useUnmount, useUpdateEffect } from '@td-design/rn-hooks';

import Shortcut from '@/components/Shortcut';
import { navigationRef } from '@/services/NavigationService';

export function useShortcut() {
  const [initialRouteName, setInitialRouteName] = useSafeState<keyof MainStackParamList>();
  const [ready, setReady] = useSafeState(false);

  useMount(() => {
    Shortcut.setShortcuts([
      { type: 'contact', title: '通讯录', icon: 'contact' },
      { type: 'mine', title: '我的', icon: 'mine' },
    ]);

    Shortcut.addListener(shortcutItem => {
      switch (shortcutItem.type) {
        case 'contact':
          navigationRef.navigate('ContactsDemo');
          break;

        case 'mine':
          navigationRef.navigate('Mine');
          break;

        default:
          break;
      }
    });
  });

  useUnmount(() => {
    Shortcut.removeListener();
  });

  useUpdateEffect(() => {
    if (!ready || !initialRouteName) return;

    navigationRef.navigate(initialRouteName);
  }, [ready, initialRouteName]);

  const init = async () => {
    const shortcut = await Shortcut.getInitialShortcut();
    if (shortcut) {
      switch (shortcut.type) {
        case 'mine':
          setInitialRouteName('Mine');
          break;

        case 'contact':
          setInitialRouteName('ContactsDemo');
          break;

        default:
          break;
      }
    }
  };

  return {
    initShortcut: useMemoizedFn(init),
    setReady,
  };
}
