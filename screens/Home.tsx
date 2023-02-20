import { ScrollView } from "react-native";
import { HomeStackParamList, HomeStackScreenProps } from "../types";
import { Image } from "react-native";
import UndrawExterne from "../images/undraw_hello.svg";
import { SafeAreaView } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, View } from "../components/Themed";
import ChapterButton from "../components/ChapterButton";
import ChapterList from "../components/ChapterList";
import Modules from "../components/Modules";
import FullLengthButton from "../components/FullLengthButton";
import HomeRoot from "../components/HomeRoot";

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function Home() {
  return (
    <Stack.Navigator
      initialRouteName="HomeRoot"
      // screenOptions={{
      //   header: (props) =>
      //     true ? (
      //       <Image
      //         source={require("../images/header.png")}
      //         className="w-full bg-transparent h-80 "
      //       />
      //     ) : undefined,
      //   // contentStyle: { backgroundColor: "#87c9f6" },
      // }}
    >
      <Stack.Screen
        name="HomeRoot"
        component={HomeRoot}
        options={{ headerShown: false }}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
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
      <Stack.Group screenOptions={{ presentation: "modal" }}>
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
    </Stack.Navigator>
  );
}

function Residanat({ navigation }: HomeStackScreenProps<"Residanat">) {
  return (
    <SafeAreaView className="min-h-full  bg-white">
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
    </SafeAreaView>
  );
}

function ResidanatQCM({ navigation }: HomeStackScreenProps<"ResidanatQCM">) {
  return (
    <SafeAreaView className="min-h-full bg-white">
      <ScrollView className="w-full mx-auto px-8">
        {[
          {
            title: "Biologie",
            description: "",
            Icon: <UndrawExterne width={200} height={200} />,
            color: "#93BFCF",
            link: "Biologie",
          },
          {
            title: "Medical",
            description: "",
            Icon: <UndrawExterne width={200} height={200} />,
            color: "#6D9886",
            link: "Medical",
          },
          {
            title: "Chirurgie",
            description: "",
            Icon: <UndrawExterne width={200} height={200} />,
            color: "#6D9886",
            link: "Chirurgie",
          },
        ].map(({ title, description, Icon, color, link }) => (
          <ChapterButton
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
    </SafeAreaView>
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
