import { Stack, Tabs } from "expo-router";
import * as React from "react";
import { StyleSheet, Animated } from "react-native";

const Layout = () => {

  return (
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen name="Index" />
      <Stack.Screen name="Character" />
      <Stack.Screen name="AddCharacterPage" />
    </Stack>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Layout;
