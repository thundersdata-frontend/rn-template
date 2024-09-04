import { Box, Text } from '@td-design/react-native';

const TestModal = ({ content }: { content: string; position?: 'center' | 'bottom' | 'fullscreen' }) => {
  return (
    <Box height={120} backgroundColor="func100">
      <Text variant="h1">{content}</Text>
    </Box>
  );
};

export default TestModal;
