import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import Home from "../screens/Home";
import { RootStackParamList } from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import { PERSISTENCE_KEY, usePersistedNavigationState } from "./hooks";
import Login from "../screens/Login";
import { Spinner } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../auth/AuthProvider";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigation() {
  const { isReady, initialState } = usePersistedNavigationState();
  const { state } = useAuth();
  if (!isReady) {
    return (
      <SafeAreaView className="flex-grow justify-center">
        <Spinner
          accessibilityLabel="checking for token"
          color="black"
          size="lg"
        />
      </SafeAreaView>
    );
  }
  return (
    <NavigationContainer
      initialState={initialState}
      onStateChange={(state) => {
        AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state));
      }}
      linking={LinkingConfiguration}
    >
      <Stack.Navigator>
        {!state?.refreshToken ? (
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="Root"
            component={Home}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
