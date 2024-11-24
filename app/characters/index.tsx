import { DataContext } from '@/datacontext';
import { Link } from 'expo-router';
import React, { useContext, useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList, ImageBackground, Image, TouchableOpacity } from "react-native";
import { Character } from '@/types';

const standard = require("../../assets/images/standaard.webp");
const fire = require("../../assets/images/vuur.webp");
const earth = require("../../assets/images/aarde.webp");
const air = require("../../assets/images/lucht.webp");
const water = require("../../assets/images/water.webp");

const CharactersList = () => {
  const { characters, theme, favorites, toggleFavorite } = useContext(DataContext);
  const [themeImage, setThemeImage] = useState(standard);

  useEffect(() => {
    if (theme === "water") {
      setThemeImage(water);
    } else if (theme === "vuur") {
      setThemeImage(fire);
    } else if (theme === "aarde") {
      setThemeImage(earth);
    } else if (theme === "lucht") {
      setThemeImage(air);
    } else {
      setThemeImage(standard);
    }
  }, [theme]);

  return (
    <ImageBackground
      source={themeImage}
      style={styles.container}
      resizeMode="cover"
    >
      <Text style={styles.title}>Avatar characters</Text>
      <FlatList
        data={characters}
        numColumns={2}
        renderItem={({ item }: { item: Character }) => (
          <View style={styles.characterContainer}>
            <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
              <Text style={styles.favoriteIcon}>
                {favorites.includes(item.id) ? '❤️' : '🤍'}
              </Text>
            </TouchableOpacity>
            <Link
              href={{
                pathname: "/characters/[character]",
                params: { character: item.id }
              }}
            >
              <View style={styles.characterDetails}>
                <Image source={{ uri: item.image }} style={styles.characterImage} />
                <Text style={styles.characterName}>{item.name}</Text>
              </View>
            </Link>
          </View>
        )}
        keyExtractor={(item: Character) => item.id.toString()}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'flex-start', 
    alignItems: 'center',
  },
  characterContainer: {
    backgroundColor: 'white',
    padding: 15,
    marginRight: 10,
    borderRadius: 10,
    borderWidth: 2,
    width: '48%',
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center', 
    flexDirection: 'column', 
    marginBottom: 20,
  },
  characterDetails: {
    alignItems: 'center',  
    justifyContent: 'center',
    padding: 10,
  },
  characterImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  characterName: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'avatarock'
  },
  title: {
    fontSize: 80,
    fontWeight: 100,
    marginTop: 80,
    marginBottom: 60,
    textAlign: "center",
    color: '#141115',
    fontFamily: 'avatarock'
  },
  favoriteIcon: {
    fontSize: 30,
    marginBottom: 5,
    textAlign: 'center',
  },
});

export default CharactersList;
