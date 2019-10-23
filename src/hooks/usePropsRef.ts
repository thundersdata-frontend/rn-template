import { useRef, useLayoutEffect } from 'react';
import { ChildrenProps } from '../interfaces/common';

export default function usePropsRef(props: ChildrenProps) {
  const propsRef = useRef(props);

  useLayoutEffect(() => {
    propsRef.current = props;
  });

  return propsRef;
}
