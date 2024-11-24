
import React, { useEffect, useState } from "react";
import { Character, Episodes, Info, Question } from "./types";
import * as Notifications from 'expo-notifications';
import AsyncStorage from "@react-native-async-storage/async-storage";

interface IDataContext {
    characters: Character[];
    info: Info[];
    episodes: Episodes[];
    questions: Question[];
    theme: string;
    setTheme: React.Dispatch<React.SetStateAction<string>>;
    setCharacters: React.Dispatch<React.SetStateAction<Character[]>>;
    favorites: number[];
    toggleFavorite: (id: number) => void;
}

export const DataContext = React.createContext<IDataContext>({ characters: [], info: [], episodes: [], questions: [], theme: 'standaard', setTheme: () => { }, favorites: [], toggleFavorite: () => {}, setCharacters: () => {} });

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [info, setInfo] = useState<Info[]>([]);
    const [episodes, setEpisodes] = useState<Episodes[]>([]);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [theme, setTheme] = useState<string>("standaard");
    const [favorites, setFavorites] = useState<number[]>([]);


    useEffect(() => {
        const fetchQuestions = async () => {
            const headers = { "Authorization" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InMxNDgyODZAYXAuYmUiLCJpYXQiOjE3MzI0Njc4OTR9.-438L0SbjLp_bNLLPG65ryDAS-cBEn_t2KT2n8fpkVA"}
            const responseCharacters = await fetch("https://sampleapis.assimilate.be/avatar/characters", {headers});
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
        const askForNotificationPermissions = async () => {
            const { status } = await Notifications.requestPermissionsAsync();
            if (status !== 'granted') {
                alert('Permissie voor meldingen niet verleend!');
            }
            Notifications.setNotificationHandler({
                handleNotification: async () => ({
                    shouldShowAlert: true,
                    shouldPlaySound: true,
                    shouldSetBadge: true,
                }),
            });
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: "Nieuwe aflevering beschikbaar 📺",
                    body: "Bekijk nu je favoriete aflevering!",
                    data: { screen: 'Episodes' },
                },
                trigger: {
                    seconds: 1,
                    channelId: 'episodes',
                },
            });
        };
        const loadFavorites = async () => {
            const storedFavorites = await AsyncStorage.getItem('favorites');
            if (storedFavorites) {
              setFavorites(JSON.parse(storedFavorites));
            }
          };
        setTimeout(() => {
            askForNotificationPermissions();
        }, 5000);
        fetchQuestions();
        loadFavorites();
    }, []);

    const toggleFavorite = async (id: number) => {
        const updatedFavorites = favorites.includes(id)
          ? favorites.filter(favId => favId !== id)
          : [...favorites, id];
    
        setFavorites(updatedFavorites);
        await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      };
    
    return (
        <DataContext.Provider value={{ characters: characters, info: info, episodes: episodes, questions: questions, theme: theme, setTheme: setTheme, favorites: favorites, toggleFavorite: toggleFavorite, setCharacters: setCharacters }}>
            {children}
        </DataContext.Provider>
    );
}
