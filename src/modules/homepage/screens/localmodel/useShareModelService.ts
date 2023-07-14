import { Form, type Store, type ValidateErrorEntity } from '@td-design/react-native';
import { useMemoizedFn } from '@td-design/rn-hooks';

import { createShareModel } from '@/services/createShareModel';

const { useForm } = Form;

function useLocalModelService() {
  const [form] = useForm();

  const validatePassword = async () => {
    try {
      await form.validateFields(['password']);
    } catch (error) {
      console.error(error);
    }
  };

  const onFinish = (values: Store) => {
    console.log(values);
  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity<Store>) => {
    console.error(errorInfo);
  };

  return {
    form,

    validatePassword: useMemoizedFn(validatePassword),
    onFinish: useMemoizedFn(onFinish),
    onFinishFailed: useMemoizedFn(onFinishFailed),
  };
}

export default createShareModel(useLocalModelService);
