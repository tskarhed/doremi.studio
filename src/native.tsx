import React, { FC } from "react";

// Wrappers for native elements

const View: FC<any> = ({ children, ...props }) => (
  <div {...props}>{children}</div>
);

const Text: FC<any> = ({ children, ...props }) => (
  <span {...props}>{children}</span>
);

const Input: FC<any> = props => <input {...props} />;

export { View, Text, Input };
