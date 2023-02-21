import { useUpdate } from '@td-design/rn-hooks';

import { createShareModel } from '@/services/createShareModel';

function useUpdateService() {
  const update = useUpdate();

  return {
    update,
  };
}

export default createShareModel(useUpdateService);
