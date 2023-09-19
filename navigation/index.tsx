import { AntDesign } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName } from "react-native";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import Home from "../screens/Home";
import Fav from "../screens/Fav";
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import { PERSISTENCE_KEY, usePersistedNavigationState } from "./hooks";
import Login from "../screens/Login";
import { Spinner } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../auth/AuthProvider";
import supabase from "../utils/supabase";

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
  // console.log(state?.refreshToken)
  return (
    <NavigationContainer
      initialState={initialState}
      onStateChange={(state) => {
        AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state));
      }}
      linking={LinkingConfiguration}
      // theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
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

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */

// function RootNavigator() {
//   const { state } = useAuth();
//   React.useEffect(() => {
//     // console.log("state.refreshToken ", state?.refreshToken);
//     // console.log("isLoading", state.isLoading);
//   }, [state]);

//   return (
//     <Stack.Navigator>
//       {!state?.refreshToken ? (
//         <Stack.Screen
//           name="Login"
//           component={Login}
//           options={{ headerShown: false }}
//         />
//       ) : (
//         <Stack.Screen
//           name="Root"
//           component={Home}
//           options={{ headerShown: false }}
//         />
//       )}
//     </Stack.Navigator>
//   );
// }

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
// const BottomTab = createBottomTabNavigator<RootTabParamList>();

// function BottomTabNavigator() {
//   const colorScheme = useColorScheme();
//   return (
//     <BottomTab.Navigator
//       initialRouteName="Home"
//       screenOptions={{
//         tabBarActiveTintColor: Colors[colorScheme].tint,
//         headerShown: false,
//       }}
//     >
//       <BottomTab.Screen
//         name="Home"
//         component={Home}
//         options={({ navigation }: RootTabScreenProps<"Home">) => ({
//           tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
//           // headerRight: () => (
//           //   <Pressable
//           //     onPress={() => navigation.navigate("Modal")}
//           //     style={({ pressed }) => ({
//           //       opacity: pressed ? 0.5 : 1,
//           //     })}
//           //   >
//           //     <FontAwesome
//           //       name="info-circle"
//           //       size={25}
//           //       color={Colors[colorScheme].text}
//           //       style={{ marginRight: 15 }}
//           //     />
//           //   </Pressable>
//           // ),
//           tabBarShowLabel: false,
//         })}
//       />
//       <BottomTab.Screen
//         name="Fav"
//         component={Fav}
//         options={{
//           tabBarShowLabel: false,
//           tabBarIcon: ({ color }) => <TabBarIcon name="star" color={color} />,
//         }}
//       />
//     </BottomTab.Navigator>
//   );
// }

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
// function TabBarIcon(props: {
//   name: React.ComponentProps<typeof AntDesign>["name"];
//   color: string;
// }) {
//   return <AntDesign size={30} style={{ marginBottom: -3 }} {...props} />;
// }
