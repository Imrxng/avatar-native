import * as React from "react";
import { DataContext, DataProvider } from "@/datacontext";
import { Tabs } from "expo-router";
import { StyleSheet, ImageBackground } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Feather from "@expo/vector-icons/Feather";
import Octicons from "@expo/vector-icons/Octicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useFonts } from 'expo-font';
import { useContext, useEffect, useState } from "react";

const standard = require("../assets/images/standaard.webp");
const fire = require("../assets/images/vuur.webp");
const earth = require("../assets/images/aarde.webp");
const air = require("../assets/images/lucht.webp");
const water = require("../assets/images/water.webp");

const RootLayout = () => {
  const { theme } = useContext(DataContext);
  const [themeImage, setThemeImage] = useState(standard);
  useFonts({
    'avatarock': require('../assets/fonts/avatarock.ttf'),
  });
  
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
    <DataProvider>
      <Tabs screenOptions={{ headerShown: false }}>
          <Tabs.Screen
            name="index"
            options={{
              tabBarIcon: () => <AntDesign name="home" size={24} color="#141115" />,
              tabBarLabel: () => null,
            }}
          />
        <Tabs.Screen
          name="characters"
          options={{
            tabBarIcon: () => <Octicons name="people" size={24} color="#141115" />,
            tabBarLabel: () => null,
          }}
        />
        <Tabs.Screen
          name="episodes"
          options={{
            tabBarIcon: () => <MaterialCommunityIcons name="filmstrip" size={24} color="#141115" />,
            tabBarLabel: () => null,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarIcon: () => <Feather name="settings" size={24} color="#141115" />,
            tabBarLabel: () => null,
          }}
        />
      </Tabs>
    </DataProvider>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    padding: 16,
  },
});

export default RootLayout;
