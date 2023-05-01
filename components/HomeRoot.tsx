import { HomeStackScreenProps } from "../types";
import { Image, useWindowDimensions } from "react-native";
import UndrawExterne from "../images/Group 11.svg";
import HomeButton from "./HomeButton";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SceneMap, TabView } from "react-native-tab-view";
import { useState } from "react";
import CustomTabBar from "./shared/Tabview/CustomTabBar";
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
            <CustomTabBar {...props} />
          )}
          
        />
      </View>
    </SafeAreaView>
  );
}

function Categories({ navigation }: { navigation: any }) {
  return (
    <View>
      {/* Left col */}
      <View className="w-1/2 pr-1 bg-transparent">
        {[
          {
            title: "Résidanat",
            description: "Plus de 1000 QCMs",
            Icon: <Image source={require("../images/doctor_svgrepo.png")} />,
            color: "#00D1FF",
            link: "Residanat",
          },
          {
            title: "Cours",
            description: "Lire pour mieux comprendre",
            Icon: <Image source={require("../images/book-1_svgrepo.png")} />,
            color: "#6100FF",
            link: "Cours",
          },
        ].map(({ title, description, Icon, color, link }) => (
          <HomeButton
            navigation={navigation}
            key={title}
            title={title}
            description={description}
            Icon={Icon}
            bgColor={color}
            link={link}
          />
        ))}
      </View>
      {/* Right col */}
      <View className="w-1/2 pl-1 flex justify-center">
        {[
          {
            title: "Externe",
            description: "Accés à l'année ",
            Icon: <UndrawExterne />,
            color: "#0E57C3",
            link: "Externe",
          },
        ].map(({ title, description, Icon, color, link }) => (
          <HomeButton
            navigation={navigation}
            key={title}
            title={title}
            description={description}
            Icon={Icon}
            bgColor={color}
            link={link}
          />
        ))}
      </View>
    </View>
  );
}

function Fav({ navigation }: { navigation: any }) {
  return <View></View>;
}
