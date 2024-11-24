import { DataContext } from '@/datacontext';
import { useLocalSearchParams } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, FlatList, TouchableOpacity } from 'react-native';

const standard = require("../../assets/images/standaard.webp");
const fire = require("../../assets/images/vuur.webp");
const earth = require("../../assets/images/aarde.webp");
const air = require("../../assets/images/lucht.webp");
const water = require("../../assets/images/water.webp");

const CharacterPage = () => {
  const [themeImage, setThemeImage] = useState(standard);
  const { characters, theme, favorites, toggleFavorite } = useContext(DataContext);
  const { character } = useLocalSearchParams();
  const characterData = characters.find(c => c.id === parseInt(character as string));
  const isFavorite = favorites.includes(characterData?.id || 0);

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



  if (characterData) {
    const bioData = [
      { key: "Nationality", value: characterData.bio.nationality },
      { key: "Ethnicity", value: characterData.bio.ethnicity },
      { key: "Ages", value: Array.isArray(characterData.bio.ages) ? characterData.bio.ages.join(", ") : characterData.bio.ages || "N/A" },
      { key: "Born", value: characterData.bio.born },
      { key: "Died", value: Array.isArray(characterData.bio.died) ? characterData.bio.died.join(", ") : characterData.bio.died || "N/A" },
      { key: "Gender", value: characterData.physicalDescription.gender },
      { key: "Eye Color", value: characterData.physicalDescription.eyeColor },
      { key: "Hair Color", value: characterData.physicalDescription.hairColor },
      { key: "Skin Color", value: characterData.physicalDescription.skinColor }
    ];

    return (
      <ImageBackground
        source={themeImage}
        style={styles.container}
        resizeMode="cover"
      >
        <View style={[styles.container]}>
          <Image source={{ uri: characterData.image }} style={styles.characterImage} />
          <Text style={styles.characterName}>{characterData.name}</Text>

          <TouchableOpacity onPress={() => toggleFavorite(characterData.id)} style={styles.favoriteButton}>
            <Text style={styles.favoriteIcon}>{isFavorite ? '❤️ Favorited' : '🤍 Favorite'}</Text>
          </TouchableOpacity>

          <View style={styles.infoBox}>
            <Text style={styles.sectionTitle}>Character Information:</Text>
            <FlatList
              data={bioData}
              renderItem={({ item }) => (
                <View style={styles.listItem}>
                  <Text style={styles.listKey}>{item.key}:</Text>
                  <Text style={styles.listValue}>{item.value}</Text>
                </View>
              )}
              keyExtractor={(item) => item.key}
            />
          </View>
        </View>
      </ImageBackground>
    );
  }

  return (
    <View style={styles.container}>
      <Text>No character found</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 10,
  },
  characterImage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },
  characterName: {
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'avatarock',
  },
  favoriteButton: {
    alignSelf: 'center',
    marginVertical: 10,
  },
  favoriteIcon: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF0000',
    textAlign: 'center',
  },
  infoBox: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    height: 300,
    marginBottom: 20,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'avatarock',
    fontSize: 24,
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 5,
    alignItems: 'flex-start',
  },
  listKey: {
    fontWeight: 'bold',
    marginRight: 10,
    fontFamily: 'avatarock',
    fontSize: 22,
    width: 130,
  },
  listValue: {
    flexShrink: 1,
    fontFamily: 'avatarock',
    fontSize: 20,
    width: 200,
  },
});

export default CharacterPage;
