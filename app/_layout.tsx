import * as React from "react";
import { DataContext, DataProvider } from "@/datacontext";
import { Tabs } from "expo-router";
import { StyleSheet, Animated } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Feather from "@expo/vector-icons/Feather";
import Octicons from "@expo/vector-icons/Octicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useFonts } from 'expo-font';
import { useEffect, useState } from "react";

const RootLayout = () => {
  const [fadeAnim] = useState(new Animated.Value(0));

  useFonts({
    'avatarock': require('../assets/fonts/avatarock.ttf'),
  });

  useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }
    ).start();
  }, [fadeAnim]);

  return (
    <DataProvider>
      <Animated.View style={{ ...styles.container, opacity: fadeAnim }}>
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
            name="favorites"
            options={{
              tabBarIcon: () => <MaterialIcons name="favorite-border" size={24} color="#141115" />,
              tabBarLabel: () => null,
            }}
          />
          <Tabs.Screen
            name="quiz"
            options={{
              tabBarIcon: () => <MaterialIcons name="quiz" size={24} color="#141115" />,
              tabBarLabel: () => null,
            }}
          />
          <Tabs.Screen
            name="map"
            options={{
              tabBarIcon: () => <MaterialIcons name="map" size={24} color="#141115" />,
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
      </Animated.View>
    </DataProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default RootLayout;