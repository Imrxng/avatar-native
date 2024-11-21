import * as React from "react";
import { DataProvider } from "@/datacontext";
import { Tabs } from "expo-router";
import { StyleSheet, ImageBackground } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Feather from "@expo/vector-icons/Feather";
import Octicons from "@expo/vector-icons/Octicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const RootLayout = () => {
  return (
    <DataProvider>
      <Tabs screenOptions={{ headerShown: false }}>
          <Tabs.Screen
            name="index"
            options={{
              tabBarIcon: () => <AntDesign name="home" size={24} color="black" />,
              tabBarLabel: () => null,
            }}
          />
          <Tabs.Screen
            name="characters"
            options={{
              tabBarIcon: () => <Octicons name="people" size={24} color="black" />,
              tabBarLabel: () => null,
            }}
          />
          <Tabs.Screen
            name="episodes"
            options={{
              tabBarIcon: () => <MaterialCommunityIcons name="filmstrip" size={24} color="black" />,
              tabBarLabel: () => null,
            }}
          />
          <Tabs.Screen
            name="quiz"
            options={{
              tabBarIcon: () => <MaterialIcons name="quiz" size={24} color="black" />,
              tabBarLabel: () => null,
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              tabBarIcon: () => <Feather name="settings" size={24} color="black" />,
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
});

export default RootLayout;
