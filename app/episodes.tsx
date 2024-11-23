import { DataContext } from '@/datacontext';
import React, { useContext, useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList, ImageBackground } from "react-native";

const standard = require("../assets/images/standaard.webp");
const fire = require("../assets/images/vuur.webp");
const earth = require("../assets/images/aarde.webp");
const air = require("../assets/images/lucht.webp");
const water = require("../assets/images/water.webp");

const Episodes = () => {
  const { episodes, theme } = useContext(DataContext);
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
      <Text style={styles.title}>Avatar episodes</Text>
      <FlatList
        data={episodes}
        numColumns={1} 
        renderItem={({ item }) => (
          <View style={styles.episodeContainer}>
            <Text style={styles.episodeTitle}>{item.Title}</Text>
            <Text style={styles.episodeDetails}>Season {item.Season}, Episode {item.NumInSeason}</Text>
            <Text style={styles.episodeDetails}>Original Airdate: {item.OriginalAirDate}</Text>
          </View>
        )}
        keyExtractor={item => item.id.toString()}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  episodeContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
    padding: 16,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 2,
  },
  episodeTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'avatarock',
  },
  episodeDetails: {
    fontSize: 22,
    color: '#666',
    fontFamily: 'avatarock',
  },
  title: {
    fontSize: 80,
    fontWeight: 100,
    marginTop: 80,
    marginBottom: 40,
    textAlign: "center",
    color: '#141115',
    fontFamily: 'avatarock',
  },
});

export default Episodes;