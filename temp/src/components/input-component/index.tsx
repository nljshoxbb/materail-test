import * as React from 'react';
import { createElement } from 'react';
import { forwardRef, ForwardRefRenderFunction } from 'react';
import styles from './index.scss';

export interface InputComponentProps {
  title: string;
  content: string;
}

const InputComponent = (props: InputComponentProps, ref: any) => {
  const { title, content, ...others } = props;

  return (
    <div ref={ref} className="InputComponent" {...others}>
      <h1 className={styles.title}>{title}</h1>
      {content || 'Hello InputComponent'}
    </div>
  );
};

const RefInputComponent = forwardRef(
  InputComponent as ForwardRefRenderFunction<any, InputComponentProps>,
);
RefInputComponent.displayName = 'InputComponent';

export default RefInputComponent;
