import { DataContext } from "@/datacontext";
import React, { useContext, useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList, ImageBackground } from "react-native";
const standard = require("../assets/images/standaard.webp");
const fire = require("../assets/images/vuur.webp");
const earth = require("../assets/images/aarde.webp");
const air = require("../assets/images/lucht.webp");
const water = require("../assets/images/water.webp");

const Index = () => {
  const { info, theme } = useContext(DataContext);

  return (
    <ImageBackground
      source={theme}
      style={styles.container}
      resizeMode="cover"
    >
      <Text style={styles.title}>Avatar The Last Airbender</Text>
      <FlatList
        data={info}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.synopsis}>{item.synopsis}</Text>
            <Text style={styles.info}>
              <Text style={styles.bold}>Years Aired: </Text>
              {item.yearsAired}
            </Text>
            <Text style={styles.info}>
              <Text style={styles.bold}>Genres: </Text>
              {item.genres.join(", ")}
            </Text>
            <Text style={styles.info}>
              <Text style={styles.bold}>Creators: </Text>
              {item.creators.map((creator, index) => (
                <Text key={index}>
                  <Text>{creator.name}</Text>
                  {index < item.creators.length - 1 ? ", " : ""}
                </Text>
              ))}
            </Text>
          </View>
        )}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    fontFamily: 'avatarock',
    fontSize: 40
  },
  title: {
    fontSize: 80, 
    marginTop: 80,
    marginBottom: 40,
    textAlign: "center",
    color: '#141115',
    fontFamily: 'avatarock'
  },
  card: {
    backgroundColor: "white",
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  synopsis: {
    fontSize: 20,  
    marginBottom: 8,
    fontFamily: 'avatarock'
  },
  info: {
    fontSize: 16,  
    marginBottom: 4,
    fontFamily: 'avatarock'
  },
  bold: {
    fontWeight: "bold",
    fontSize: 20
  },
});


export default Index;
