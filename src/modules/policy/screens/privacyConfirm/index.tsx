import { Box, Button, helpers, List, useTheme, Input } from '@td-design/react-native';

import { Container } from '@/components/Container';
import { AppTheme } from '@/theme';
import { KeyboardInsetsView } from '@sdcx/keyboard-insets';
import { Empty } from '@/components/Empty';

const { TextArea } = Input;

export const PrivacyConfirm = () => {
  const theme = useTheme<AppTheme>();

  return (
    <Container>
      <KeyboardInsetsView style={{ flex: 1 }} extraHeight={8}>
        <List.ListHeader
          text={'报损仓库'}
          headerStyle={{ backgroundColor: theme.colors.background }}
        />
        <Box flex={1} justifyContent="center" alignItems="center">
          <Empty text="请添加报损商品" />
        </Box>
        <Box backgroundColor={'white'} paddingHorizontal={'x3'}>
          <TextArea label="备注" height={helpers.px(100)} placeholder="请输入" />
        </Box>
      </KeyboardInsetsView>
      <Button title="提交报损记录" onPress={() => { }} />
    </Container>
  );
};
