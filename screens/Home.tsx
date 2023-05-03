import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import { HomeStackParamList, HomeStackScreenProps } from "../types";
import { SafeAreaView } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text } from "../components/Themed";
import ChapterList from "../components/ChapterList";
import Modules from "../components/Modules";
import HomeRoot from "../components/HomeRoot";
import ResidanatHeader from "../components/layout/ResidanatHeader";
import Residanat from "../components/Residanat";
import DefaultHeader from "../components/layout/DefaultHeader";
// import HomeWrapperImg from "../components/layout/HomeWrapperImg";
// import Résidanat from "../assets/images/residanatHeader.png"

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function Home() {
  return (
    <Stack.Navigator
      initialRouteName="HomeRoot"
      screenOptions={{
        contentStyle: { backgroundColor: "#ffffff", paddingTop: 20,paddingBottom:10 },
      }}
    >
      <Stack.Screen
        name="HomeRoot"
        component={HomeRoot}
        options={{ headerShown: false }}
      />
      <Stack.Group>
        <Stack.Screen
          options={(props) => ({
            header: () => <ResidanatHeader {...props} />,
          })}
          name="Residanat"
          component={Residanat}
        />
        <Stack.Screen
          name="Externe"
          component={Externe}
          options={{ title: "Externe" }}
        />
        <Stack.Screen
          name="Cours"
          component={Cours}
          options={{ title: "Cours" }}
        />
      </Stack.Group>

      {/* ResidanatQCM */}
      {/* <Stack.Group>
        <Stack.Screen
          name="ResidanatQCM"
          component={ResidanatQCM}
          options={{ title: "Chapitres" }}
        />
      </Stack.Group> */}
      <Stack.Screen
        name="ChapterList"
        component={ChapterList}
        options={(props) => ({
          header: () => <DefaultHeader {...props} />,
        })}
      />
      <Stack.Screen
        name="Modules"
        component={Modules}
        options={{ title: "Modules" }}
      />
      {/* 
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen
          name="Courses"
          component={Courses}
          options={{ title: "Courses" }}
        />
      </Stack.Group> 
      */}
    </Stack.Navigator>
  );
}

function Externe() {
  return (
    <SafeAreaView className="min-h-full  bg-white">
      <ScrollView className="w-full mx-auto px-8">
        <Text>Externe</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function Cours() {
  return (
    <SafeAreaView className="min-h-full  bg-white">
      <ScrollView className="w-full mx-auto px-8">
        <Text>Cours</Text>
      </ScrollView>
    </SafeAreaView>
  );
}
