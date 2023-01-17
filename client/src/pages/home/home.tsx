import React, { FC, useEffect } from "react";
import { ExpandedWordView } from "../../components/selected-word";
import { BaseWordListView } from "../../components/world-list";
import { useStore } from "../../state/store";
import { Store } from "../../types";


export const Home: FC = (): JSX.Element => {
  const user = useStore((state: Store) => state.user);
  const { getWordsPayload, selectedWord } = useStore((state: Store) => state.home);
  const attempLogout = useStore((state: Store) => state.attemptLogout);
  useEffect(() => void getWordsPayload(), []);

  return (
      <div>
          <h1>{`Welcome to the app, ${user!.username}`}</h1>
          <div className="submit-button logout" onClick={attempLogout}>LOGOUT</div>
          {selectedWord ? <ExpandedWordView /> : <BaseWordListView />}
      </div>
  );
};