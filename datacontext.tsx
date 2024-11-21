
import React, { useEffect, useState } from "react";
import { Character, Episodes, Info, Question } from "./types";

interface IDataContext {
    characters: Character[];
    info: Info[];
    episodes: Episodes[];
    questions: Question[];
    theme: string;
    setTheme: React.Dispatch<React.SetStateAction<string>>;
}

export const DataContext = React.createContext<IDataContext>({characters: [], info: [], episodes: [], questions: [], theme: 'standaard', setTheme: () => {}});

export const DataProvider = ({children}: {children: React.ReactNode}) => {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [info, setInfo] = useState<Info[]>([]);
    const [episodes, setEpisodes] = useState<Episodes[]>([]);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [theme, setTheme] = useState<string>("standaard");

    useEffect(() => {
        const fetchQuestions = async () => {
            const responseCharacters = await fetch("https://sampleapis.assimilate.be/avatar/characters");
            const responseInfo = await fetch("https://sampleapis.assimilate.be/avatar/info");
            const responseEpisodes = await fetch("https://sampleapis.assimilate.be/avatar/episodes");
            const responseQuestions = await fetch("https://sampleapis.assimilate.be/avatar/questions");

            const dataCharacters: Character[] = await responseCharacters.json();
            const dataInfo: Info[] = await responseInfo.json();
            const dataEpisodes: Episodes[] = await responseEpisodes.json();
            const dataQuestions: Question[] = await responseQuestions.json();
            
            setCharacters(dataCharacters);
            setInfo(dataInfo);
            setEpisodes(dataEpisodes);
            setQuestions(dataQuestions);
        };

        fetchQuestions();
    }, []);
    return (
        <DataContext.Provider value={{characters: characters, info: info, episodes: episodes, questions: questions, theme: theme, setTheme: setTheme}}>
            {children}
        </DataContext.Provider>
    );
}
