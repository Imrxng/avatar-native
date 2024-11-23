import { DataContext } from "@/datacontext";
import * as React from "react";
import { useState, useEffect } from "react";
import { Button, Image, ImageBackground, StyleSheet, TouchableOpacity, Text, View } from "react-native";
import * as ImagePicker from 'expo-image-picker'; // Gebruik expo-image-picker

const standard = require("../assets/images/standaard.webp");
const fire = require("../assets/images/vuur.webp");
const earth = require("../assets/images/aarde.webp");
const air = require("../assets/images/lucht.webp");
const water = require("../assets/images/water.webp");

const Profile = () => {
  const { setTheme, theme } = React.useContext(DataContext);
  const [themeImage, setThemeImage] = useState(standard);
  const [profileImage, setProfileImage] = useState(require("../assets/images/favicon.png"));

  // Vraag om permissie voor toegang tot de galerij
  const requestPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we hebben toestemming nodig om toegang te krijgen tot je galerij!');
    }
  };

  useEffect(() => {
    requestPermission(); // Vraag bij het laden van de component om permissie

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

  const handleImagePicker = async () => {
     let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage({ uri: result.assets[0].uri }); 
    }
  };

  return (
    <ImageBackground source={themeImage} style={styles.container} resizeMode="cover">
      <Text style={styles.title}>Profile</Text>
      <View style={styles.profileContainer}>
        <Image source={profileImage} style={styles.profileImage} />
        <TouchableOpacity onPress={handleImagePicker} style={styles.changeImageButton}>
          <Text style={styles.changeImageText}>Change Photo</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.Text}>Themes:</Text>
      <View style={styles.themeContainer}>
        <View style={styles.iconsContainer}>
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
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 40,
    borderRadius: 50,
    paddingTop: 15,
    justifyContent: "center"
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 0,
    borderWidth: 4,
    borderColor: 'white',
  },
  title: {
    fontSize: 80,
    fontWeight: 100,
    marginBottom: 0,
    textAlign: "center",
    color: '#141115',
    fontFamily: 'avatarock',
  },
  themeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#141115",
    fontSize: 20,
    fontFamily: 'avatarock',
  },
  Text: {
    color: "#141115",
    fontSize: 60,
    fontFamily: 'avatarock',
  },
  iconsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  icon: {
    width: 60,
    height: 60,
    margin: 10,
    backgroundColor: "white",
    borderRadius: 40,
  },
  defaultButton: {
    marginTop: 20,
    padding: 10,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "white",
    borderRadius: '50%',
  },
  changeImageButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#141115",
    borderRadius: 10,
    color: 'white',
    fontFamily: 'avatarock'
  },
  changeImageText: {
    color: 'white',
    fontFamily: 'avatarock'
  },
});

export default Profile;
