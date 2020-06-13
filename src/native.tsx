import React, { FC } from 'react';
import styles from './theme.module.scss';

// Wrappers for native elements

const View: FC<any> = ({ children, ...props }) => (
  <div {...props}>{children}</div>
);

const Text: FC<any> = ({ children, ...props }) => (
  <span {...props}>{children}</span>
);

const Input: FC<any> = (props) => <input className={styles.Input} {...props} />;

const Button: FC<any> = (props) => <button {...props} />;

export { View, Text, Input, Button };
