import { useMemoizedFn } from '@td-design/rn-hooks';
import { createLocalModel } from 'modules/createLocalModel';
import { useForm } from 'rc-field-form';
import { Store, ValidateErrorEntity } from 'rc-field-form/es/interface';

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

export default createLocalModel(useLocalModelService);
