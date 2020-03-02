import React, { FC } from "react";
import { Link } from "react-router-dom";
import { View } from "../native";

interface ListItemProps {
  to: string;
  type: "song" | "setlist";
  actionComponent?: React.ReactElement;
}

export const ListItem: FC<React.PropsWithChildren<ListItemProps>> = ({
  to,
  children,
  type,
  actionComponent
}) => {
  return (
    <Link to={to} style={{ display: "block" }}>
      <View style={{ width: "20%", display: "inline-block" }}>{type}</View>
      <View style={{ width: "60%", display: "inline-block" }}>{children}</View>

      <View style={{ width: "20%", display: "inline-block" }}>
        {actionComponent}
      </View>
    </Link>
  );
};
