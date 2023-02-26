import { ScrollView } from "react-native";
import { HomeStackParamList, HomeStackScreenProps } from "../types";
import UndrawExterne from "../images/undraw_hello.svg";
import { SafeAreaView } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text } from "../components/Themed";
import ChapterList from "../components/ChapterList";
import Modules from "../components/Modules";
import FullLengthButton from "../components/FullLengthButton";
import HomeRoot from "../components/HomeRoot";
import ResidanatQCM from "../components/ResidanatQCM";
import HomeWrapperImg from "../components/layout/HomeWrapperImg";
import Courses from "../components/Courses";

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function Home() {
  return (
    <Stack.Navigator
      initialRouteName="HomeRoot"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="HomeRoot" component={HomeRoot} />
      <Stack.Group >
        <Stack.Screen
          name="Residanat"
          component={Residanat}
          options={{ title: "Residanat" }}
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
      <Stack.Group >
        <Stack.Screen
          name="ResidanatQCM"
          component={ResidanatQCM}
          options={{ title: "Chapitres" }}
        />
      </Stack.Group>
      <Stack.Screen
        name="ChapterList"
        component={ChapterList}
        options={{ title: "ChaptersList" }}
      />
      <Stack.Screen
        name="Modules"
        component={Modules}
        options={{ title: "Modules" }}
      />
      {/* <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen
          name="Courses"
          component={Courses}
          options={{ title: "Courses" }}
        />
      </Stack.Group> */}
    </Stack.Navigator>
  );
}

function Residanat({ navigation }: HomeStackScreenProps<"Residanat">) {
  return (
    <HomeWrapperImg>
      <ScrollView className="w-full mx-auto px-8">
        {[
          {
            title: "QCM",
            description: "",
            Icon: <UndrawExterne width={200} height={200} />,
            color: "#93BFCF",
            link: "ResidanatQCM",
          },
          {
            title: "Simulateur",
            description: "",
            Icon: <UndrawExterne width={200} height={200} />,
            color: "#6D9886",
            link: "ResidanatSimulateur",
          },
        ].map(({ title, description, Icon, color, link }) => (
          <FullLengthButton
            key={title}
            navigation={navigation}
            title={title}
            description={description}
            Icon={Icon}
            bgColor={color}
            link={link}
          />
        ))}
      </ScrollView>
    </HomeWrapperImg>
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
