import React, { FC } from "react";
import { Page } from "./Page";
import {SetlistList} from "../components/SetlistList";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from "react-redux";
import { setSearch } from "../state/actions";
import { StoreState } from "../state/types";
import { AddToListButton } from "../components/AddToListButton";

export const Main: FC = () => {

  const dispatch = useDispatch();
  const setlists = useSelector((state: StoreState) => state.setlists);
  return (
    <Page
      editable={false}
      title="Setlist"
      onHeaderClick={() => dispatch(setSearch("all"))}
      headerElement={
        <Icon icon={faSearch} size="2x" style={{
          margin: "auto 0",
          padding: "15px",
          maxHeight: "100%",
          cursor: "pointer"
        }}
        onClick={() => dispatch(setSearch("all"))}
        />
      }
    >
  <SetlistList setlists={setlists}/>
  <AddToListButton onClick={() => dispatch(setSearch('setlists'))}/>
    </Page>
  );
};
