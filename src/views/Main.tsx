import React from "react";
import { Page } from "./Page";
import { ActionButton } from "../components/ActionButton";

export const Main = () => (
  <Page
    title="Main"
    headerElement={
      <ActionButton onClick={() => {}} size="lg">
        S
      </ActionButton>
    }
  />
);
