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
        data={episodes} // Gebruik de volledige lijst van episodes
        numColumns={1} // 1 kolom per rij (kan worden aangepast op basis van je ontwerp)
        renderItem={({ item }) => (
          <View style={styles.episodeContainer}>
            <Text style={styles.episodeTitle}>{item.Title}</Text>
            <Text style={styles.episodeDetails}>Season {item.Season}, Episode {item.NumInSeason}</Text>
            <Text style={styles.episodeDetails}>Original Airdate: {item.OriginalAirDate}</Text>
          </View>
        )}
        keyExtractor={item => item.id.toString()}
        onEndReached={() => {
          // Laad nieuwe afleveringen wanneer het einde van de lijst wordt bereikt
          console.log('End of list reached. Load more episodes here if needed.');
        }}
        onEndReachedThreshold={0.5} // Laad meer wanneer 50% van de lijst zichtbaar is
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
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Licht doorzichtige achtergrond voor leesbaarheid
    padding: 16,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 2,
  },
  episodeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  episodeDetails: {
    fontSize: 14,
    color: '#666',
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 80,
    marginBottom: 60,
    textAlign: "center",
    color: 'white',
  },
});

export default Episodes;
