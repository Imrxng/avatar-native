import { DataContext } from '@/datacontext';
import React, { useContext, useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList, ImageBackground } from "react-native";
const standard = require("../assets/images/standaard.webp");
const fire = require("../assets/images/vuur.webp");
const earth = require("../assets/images/aarde.webp");
const air = require("../assets/images/lucht.webp");
const water = require("../assets/images/water.webp");

const Quiz = () => {
  const { questions, theme } = useContext(DataContext);
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
    </ImageBackground>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 53,
    fontWeight: 100,
    marginTop: 80,
    marginBottom: 60,
    textAlign: "center",
    color: '#141115',
    fontFamily: 'avatarock'
  },
});


export default Quiz