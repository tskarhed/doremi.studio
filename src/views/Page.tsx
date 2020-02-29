import { View } from "../native";
import React, { FC } from "react";

export const Page: FC = props => {
  return <View>{props.children}</View>;
};
