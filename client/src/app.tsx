import React, { FC, useEffect } from "react";
import { Button, ButtonProps} from "./components/button";
import { LoginPage } from "./pages/login-page";
import { useStore } from "./state/store";
import { BaseWordPairDTO, ExtendedWordPairDTO, GrammaticalNumber, Store, UserWithoutPassword } from "./types";

const BaseWordListView: FC = () => {
    const { getWord, wordList } = useStore((state: Store) => state.app);

    return (
        <table>
            <thead>
                <tr>
                    <td>English</td>
                    <td>Spanish</td>
                    <td>Difficulty</td>
                </tr>
            </thead>
            <tbody>
            {wordList && wordList.map((word: BaseWordPairDTO) => (
                <tr key={word.word_pair_id} className="word-pair-list-item" onClick={(_e) => getWord(word.parent_word_id)}>
                    <td>{word.english}</td>
                    <td>{word.spanish}</td>
                    <td>{word.difficulty}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

const ExpandedWordView: FC = () => {
    const wordPairs = useStore((state: Store) => state.app.selectedWord!.wordPairs);

    const getWordPairsByPerson = (wordPairs: ExtendedWordPairDTO[], callback: (wp: ExtendedWordPairDTO) => boolean) => {
        const wordPairsByPerson = wordPairs.filter(callback);
        return {
            singular: wordPairsByPerson.find(wp => wp.number === GrammaticalNumber.SINGULAR),
            plural: wordPairsByPerson.find(wp => wp.number === GrammaticalNumber.PLURAL),
        };
    };
    
    const infinitive = wordPairs.find(wp => wp.infinitive === true)?.english;

    const firstPerson = getWordPairsByPerson(wordPairs, wp => wp.person === 1);

    const secondPerson = getWordPairsByPerson(wordPairs, wp => wp.person === 2);

    const thirdPerson = getWordPairsByPerson(wordPairs, wp => wp.person === 3);

    return (
        <div>
            <div>Infinitive: {infinitive}</div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Singular</th>
                            <th>Plural</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>1st Person</th>
                            <td>{firstPerson.singular?.english}</td>
                            <td>{firstPerson.plural?.english}</td>
                        </tr>
                        <tr>
                            <th>2nd Person</th>
                            <td>{secondPerson.singular?.english}</td>
                            <td>{secondPerson.plural?.english}</td>
                        </tr>
                        <tr>
                            <th>3rd Person</th>
                            <td>{thirdPerson.singular?.english}</td>
                            <td>{thirdPerson.plural?.english}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const Dashboard: FC = (): JSX.Element => {
    const user = useStore((state: Store) => state.user);
    const { getBaseWordPairs, selectedWord } = useStore((state: Store) => state.app);
    
    useEffect(() => void getBaseWordPairs(), []);

    const logoutButtonProps: ButtonProps = {
        classes: "submit-button logout",
        text: "LOGOUT",
        onClick: useStore((state: Store) => state.attemptLogout)
    };

    return (
        <div>
            {`Welcome to the app, ${user!.username}`}
            <Button {...logoutButtonProps}/>
            {selectedWord ? <ExpandedWordView /> : <BaseWordListView />}
        </div>
    );
};

export const App: FC = (): JSX.Element => {
    

    const user: UserWithoutPassword | null = useStore((state: Store) => state.user);
    // const getBaseWordPairs = useStore((state: Store) => state.app.getBaseWordPairs);
    
    return !user ? <LoginPage /> : <Dashboard />;

    // const getData = async () => await getBaseWordPairs();

    // useEffect(() => void getData(), []);

};