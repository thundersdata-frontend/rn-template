import { Box, Input, List } from '@td-design/react-native';
import { Container, KeyboardShift, KeyboardAwareScrollView } from 'components';

const { InputItem } = Input;
export function Homepage() {
  return (
    <Container hasHeader={false}>
      <KeyboardShift style={{ flex: 1 }}>
        <KeyboardAwareScrollView>
          <Box style={{ marginTop: 500 }} />
          <Input />
          <InputItem label="姓名" />
          <List
            header="基础信息"
            items={[
              {
                title: '毛色',
                extra: <InputItem placeholder="请输入毛色" border={false} style={{ textAlign: 'right' }} />,
              },
            ]}
          />
        </KeyboardAwareScrollView>
      </KeyboardShift>
    </Container>
  );
}
