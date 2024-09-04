import { Box, Button, Text } from '@td-design/react-native';
import { ImperativeModalChildrenProps } from '@td-design/react-native/lib/typescript/modal/type';

const TestModal = (props: ImperativeModalChildrenProps<{ content: string }>) => {
  return (
    <Box height={120} backgroundColor="func100">
      <Text variant="h1">{props.content}</Text>
      <Button title="关闭弹窗" onPress={() => props.closeModal?.()} />
    </Box>
  );
};

export default TestModal;
