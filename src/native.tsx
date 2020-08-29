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

const Button: FC<any> = (props) => <button style={{
  width: "80px",
  height: "30px",
  backgroundColor: styles.accent,
  border: `1px solid ${styles.primary}`,
  boxShadow: "2px 2px 5px grey",
  borderRadius: "3px",
  color: styles.secondary,
  fontFamily: styles.fontFamily,
  fontWeight: "bolder",
}} {...props} />;

export { View, Text, Input, Button };
