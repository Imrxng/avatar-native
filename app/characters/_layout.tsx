import { Stack, Tabs } from "expo-router";
import * as React from "react";

const Layout = () => {
  return (
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen name="Index" />
      <Stack.Screen name="Character" />
      <Stack.Screen name="AddCharacterPage" />
    </Stack>
  );
}

export default Layout;
