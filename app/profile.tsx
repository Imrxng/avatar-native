import { DataContext } from "@/datacontext";
import * as React from "react";
import { useState, useEffect } from "react";
import { Button, Image, ImageBackground, StyleSheet, TouchableOpacity, Text } from "react-native";

const standard = require("../assets/images/standaard.webp");
const fire = require("../assets/images/vuur.webp");
const earth = require("../assets/images/aarde.webp");
const air = require("../assets/images/lucht.webp");
const water = require("../assets/images/water.webp");

const Profile = () => {
  const { setTheme, theme } = React.useContext(DataContext);
  const [themeImage, setThemeImage] = useState(standard);

  useEffect(() => {
    switch (theme) {
      case "water":
        setThemeImage(water);
        break;
      case "vuur":
        setThemeImage(fire);
        break;
      case "aarde":
        setThemeImage(earth);
        break;
      case "lucht":
        setThemeImage(air);
        break;
      default:
        setThemeImage(standard);
        break;
    }
  }, [theme]);

  return (
    <ImageBackground source={themeImage} style={styles.container} resizeMode="cover">
      <TouchableOpacity onPress={() => setTheme("water")}>
        <Image source={require("../assets/images/water-logo.webp")} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setTheme("vuur")}>
        <Image source={require("../assets/images/fire-logo.webp")} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setTheme("lucht")}>
        <Image source={require("../assets/images/air-logo.webp")} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setTheme("aarde")}>
        <Image source={require("../assets/images/earth-logo.webp")} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setTheme("standaard")} style={styles.defaultButton}>
        <Text style={styles.buttonText}>Default</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
  },
  icon: {
    width: 100,
    height: 100,
    margin: 10,
    backgroundColor: "white",
  },
  defaultButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "blue",
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default Profile;
