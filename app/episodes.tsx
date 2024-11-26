import { DataContext } from '@/datacontext';
import React, { useContext, useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList, ImageBackground } from "react-native";

const Episodes = () => {
  const { episodes, theme } = useContext(DataContext);

  return (
    <ImageBackground
      source={theme}
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