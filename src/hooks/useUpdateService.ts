import { createShareModel } from '@/services/createShareModel';
import { useUpdate } from '@td-design/rn-hooks';

function useUpdateService() {
  const update = useUpdate();

  return {
    update,
  };
}

export default createShareModel(useUpdateService);
