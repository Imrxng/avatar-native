import * as React from "react";
import { DataContext, DataProvider } from "@/datacontext";
import { Tabs } from "expo-router";
import { StyleSheet, Animated, Text } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome from '@expo/vector-icons/FontAwesome';
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
        <Tabs
          screenOptions={{
            headerShown: false,
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              tabBarIcon: () => <FontAwesome name="home" size={24} color="#141115" />,
              tabBarLabel: ({ focused }) => focused ? <Text style={styles.tabBarIndicator}></Text> : null,
            }}
          />
          <Tabs.Screen
            name="characters"
            options={{
              tabBarIcon: () => <MaterialIcons name="people-alt" size={24} color="#141115" />,
              tabBarLabel: ({ focused }) => focused ? <Text style={styles.tabBarIndicator}></Text> : null,
            }}
          />
          <Tabs.Screen
            name="episodes"
            options={{
              tabBarIcon: () => <MaterialCommunityIcons name="filmstrip" size={24} color="#141115" />,
              tabBarLabel: ({ focused }) => focused ? <Text style={styles.tabBarIndicator}></Text> : null,
            }}
          />
          <Tabs.Screen
            name="favorites"
            options={{
              tabBarIcon: () => <MaterialIcons name="favorite" size={24} color="#141115" />,
              tabBarLabel: ({ focused }) => focused ? <Text style={styles.tabBarIndicator}></Text> : null,
            }}
          />
          <Tabs.Screen
            name="quiz"
            options={{
              tabBarIcon: () => <MaterialIcons name="quiz" size={24} color="#141115" />,
              tabBarLabel: ({ focused }) => focused ? <Text style={styles.tabBarIndicator}></Text> : null,
            }}
          />
          <Tabs.Screen
            name="map"
            options={{
              tabBarIcon: () => <MaterialIcons name="map" size={24} color="#141115" />,
              tabBarLabel: ({ focused }) => focused ? <Text style={styles.tabBarIndicator}></Text> : null,
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              tabBarIcon: () => <MaterialIcons name="settings" size={24} color="#141115" />,
              tabBarLabel: ({ focused }) => focused ? <Text style={styles.tabBarIndicator}></Text> : null,
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
  tabBarIndicator: {
    backgroundColor: '#141115',
    height: 2,
    width: 23,
  },
});

export default RootLayout;