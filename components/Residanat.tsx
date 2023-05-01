import { View, useWindowDimensions, Text } from "react-native";
import React from "react";
import { HomeStackScreenProps } from "../types";
import HomeWrapperImg from "./layout/HomeWrapperImg";
import { ScrollView } from "native-base";
import ButtonType1 from "./shared/buttons/Button1";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import Chapitres from "./residanat/Chapitres";
import CustomTabBar from "./shared/Tabview/CustomTabBar";
// import UndrawExterne from "../images/undraw_hello.svg";

export default function Residanat({
  navigation,
}: HomeStackScreenProps<"Residanat">) {
  const renderScene = SceneMap({
    Chapitres: () => <Chapitres navigation={navigation} />,
    Simulateur: () => <SecondRoute navigation={navigation} />,
    Resultats: SecondRoute,
  });
  const layout = useWindowDimensions();
  // console.log(layout)
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "Chapitres", title: "Chapitres" },
    { key: "Simulateur", title: "Simulateur" },
    { key: "Resultats", title: "Resultats" },
  ]);
  return (
    <HomeWrapperImg>
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
    </HomeWrapperImg>
  );
}

const SecondRoute = (navigation: any) => (
  <View style={{ flex: 1 }}>
    <Text>ddd</Text>
    <ButtonType1
      title="Chirurgie"
      onPress={() => navigation.navigate("link")}
    />
  </View>
);
