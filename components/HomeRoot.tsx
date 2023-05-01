import { HomeStackScreenProps } from "../types";
import { Image, useWindowDimensions } from "react-native";
import UndrawExterne from "../images/Group 11.svg";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SceneMap, TabView } from "react-native-tab-view";
import { useState } from "react";
import CustomTabBar from "./shared/Tabview/CustomTabBar";
import Button2 from "./shared/buttons/Button2";
import { ScrollView } from "native-base";
// import HomeWrapperImg from "./layout/HomeWrapperImg";

export default function HomeRoot({
  navigation,
}: HomeStackScreenProps<"HomeRoot">) {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "Categories", title: "categories" },
    { key: "Fav", title: "favoris" },
  ]);
  const layout = useWindowDimensions();
  const renderScene = SceneMap({
    Categories: () => <Categories navigation={navigation} />,
    Fav: () => <Fav navigation={navigation} />,
    // Fav: () => <Fav navigation={navigation} />,
  });
  return (
    <SafeAreaView>
      <View className="flex flex-row px-2">
        <TabView
          navigationState={{ index, routes }}
          style={{ width: layout.width - 8, height: layout.height }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width, height: layout.height }}
          renderTabBar={(props) => (
            <CustomTabBar {...props} tabsNum={routes.length} />
          )}
        />
      </View>
    </SafeAreaView>
  );
}

function Categories({ navigation }: { navigation: any }) {
  return (
    <ScrollView className="px-4 py-12" contentContainerStyle={{ rowGap: 24 }}>
      {[
        {
          title: "RESIDANAT",
          link: "Residanat",
          color: "#0C4E8C",
        },
        {
          title: "EXTERNAT",
          link: "Externe",
          color: "#1068BB",
        },
        {
          title: "COURS",
          link: "Cours",
          color: "#1275D2",
        },
      ].map(({ title, color, link }) => (
        <Button2
          key={title}
          title={title}
          color={color}
          onPress={() => navigation.navigate(link)}
        />
      ))}
    </ScrollView>
  );
}

function Fav({ navigation }: { navigation: any }) {
  return <View></View>;
}
