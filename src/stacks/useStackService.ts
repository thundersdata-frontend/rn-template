import { createShareModel } from '@/services/createShareModel';
import { useUpdate } from '@td-design/rn-hooks';

function useStackService() {
  const update = useUpdate();

  return {
    update,
  };
}

export default createShareModel(useStackService);
