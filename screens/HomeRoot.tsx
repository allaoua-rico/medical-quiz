import { HomeStackScreenProps } from "../types";
import { useWindowDimensions } from "react-native";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SceneMap, TabView } from "react-native-tab-view";
import { useState } from "react";
import CustomTabBar from "../components/shared/Tabview/CustomTabBar";
import Button2 from "../components/shared/buttons/Button2";
import { ScrollView } from "native-base";
import TopImage from "../assets/images/undraw_pic_profile_re_7g2h.svg";
import { Text } from "../components/Themed";
// import { useAuth } from "../auth/AuthProvider";

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
  });
  // const { state, authContext } = useAuth();

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 px-2">
        <View className="flex-row gap-x-2 items-center">
          {/* <Button
            onPress={(e) => {
              authContext?.signOut();
            }}
          > */}
          <TopImage width={114} height={114} />
          {/* </Button> */}
          <View style={{ flexShrink: 1 }}>
            <Text>Bonjour, nom d'utilisateur</Text>
            <Text>Qu'est-ce que tu vas apprendre aujourd'hui?</Text>
          </View>
        </View>
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
          link: "Externat",
          color: "#1068BB",
        },
        {
          title: "COURS",
          link: "MainCours",
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
