import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { Box, Modal, Text } from '@td-design/react-native';

const TestModal = ({ content, position }: { content: string; position?: 'center' | 'bottom' | 'fullscreen' }) => {
  const modal = useModal();

  return (
    <Modal position={position} visible={modal.visible} onClose={() => modal.remove()}>
      <Box height={120} backgroundColor="func100">
        <Text variant="h1">{content}</Text>
      </Box>
    </Modal>
  );
};

export default NiceModal.create(TestModal);
