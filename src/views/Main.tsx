import React from "react";
import { Page } from "./Page";
import { Text } from "../native";
import { setlists } from "../mockData";
import { ListItem } from "../components/List";
import { ActionButton } from "../components/ActionButton";
import { useHistory } from "react-router-dom";

export const Main = () => {
  const history = useHistory();
  return (
    <Page
      editable={false}
      title="Setlist"
      headerElement={
        <Text
          style={{
            margin: "auto"
          }}
        >
          Search
        </Text>
      }
    >
      {setlists.map(setlist => {
        return (
          <ListItem
            key={setlist.id}
            type="setlist"
            to={`/setlist/${setlist.id}`}
            actionComponent={
              <ActionButton
                onClick={() => {
                  history.push(
                    `/setlist/${setlist.id}/play/${setlist.songs[0].id}`
                  );
                }}
                size="md"
                inverted
              >
                Play
              </ActionButton>
            }
          >
            {setlist.title}
          </ListItem>
        );
      })}
    </Page>
  );
};
