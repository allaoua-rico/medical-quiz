import { View, useWindowDimensions, Text } from "react-native";
import React from "react";
import { HomeStackParamList, HomeStackScreenProps } from "../types";
import { ScrollView } from "native-base";
import Button1 from "./shared/buttons/Button1";
import { TabView, SceneMap } from "react-native-tab-view";
import Chapitres from "./residanat/Chapitres";
import CustomTabBar from "./shared/Tabview/CustomTabBar";
import SimulateurVector from "../assets/images/simulateur_vector.svg";
import QuestionmarkSVG from "../assets/images/questionmark.svg";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Resultats from "./Resultats";
// import HomeWrapperImg from "./layout/HomeWrapperImg";

export default function Residanat(props: HomeStackScreenProps<"Residanat">) {
  const { navigation } = props;
  const renderScene = SceneMap({
    Chapitres: () => <Chapitres {...props} />,
    Simulateur: () => <Simulateur navigation={navigation} />,
    Resultats: () => <Resultats {...props} />,
  });
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "Chapitres", title: "Chapitres" },
    { key: "Simulateur", title: "Simulateur" },
    { key: "Resultats", title: "Resultats" },
  ]);
  return (
    <ScrollView className="min-w-full mx-auto px-3">
      <TabView
        navigationState={{ index, routes }}
        style={{ width: layout.width - 12, height: layout.height }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width, height: layout.height }}
        renderTabBar={(props) => <CustomTabBar {...props} scrollEnabled />}
      />
      <>
        {/* {[
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
          <ButtonType1
            key={title}
            navigation={navigation}
            title={title}
            description={description}
            Icon={Icon}
            bgColor={color}
            link={link}
          />
        ))} */}
      </>
    </ScrollView>
  );
}

const Simulateur = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<
    HomeStackParamList,
    "Residanat",
    undefined
  >;
}) => (
  <View className="items-center flex-1 px-4 ">
    <View className="w-full pb-16 relative justify-center flex-1">
      <Text className="max-w-xs text-3xl font-semibold text-[#616161] pt-20">
        TESTEZ-VOUS AVEC 120 DE CHAQUE CHAPITRE
      </Text>
      <SimulateurVector
        style={{ position: "absolute", left: 50, zIndex: -10 }}
      />
      <QuestionmarkSVG
        preserveAspectRatio="none"
        height={400}
        width={327}
        style={{ position: "absolute", right: 5, zIndex: -10 }}
      />
    </View>
    <View className="flex-1">
      <Button1
        title="Commencer"
        onPress={() => navigation.navigate("Simulateur", {})}
      />
    </View>
  </View>
);
