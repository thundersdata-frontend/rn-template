import React, { FC } from 'react';
import { Button, Text, View } from 'react-native';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';

const errorHandler = (error: Error) => {
  // 异常处理，比如用sentry上报
  console.log(error);
};

const ErrorFallback = ({ resetErrorBoundary }: FallbackProps) => (
  <View>
    <Text>对不起，出错了</Text>
    <Button title="重试" onPress={resetErrorBoundary} />
  </View>
);

const ErrorHandler: FC = props => (
  <ErrorBoundary FallbackComponent={ErrorFallback} onError={errorHandler}>
    {props.children}
  </ErrorBoundary>
);
export default ErrorHandler;
