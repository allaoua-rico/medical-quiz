import { HomeStackScreenProps } from "../types";
import { useWindowDimensions } from "react-native";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SceneMap, TabView } from "react-native-tab-view";
import { useEffect, useState } from "react";
import CustomTabBar from "../components/shared/Tabview/CustomTabBar";
import Button2 from "../components/shared/buttons/Button2";
import { Button, ScrollView, Spinner } from "native-base";
import TopImage from "../assets/images/undraw_pic_profile_re_7g2h.svg";
import { Text } from "../components/Themed";
import { useGetProfile } from "../components/courses/functionsAndHooks";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { isArray } from "lodash";
import { useAuth } from "../auth/AuthProvider";

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
  const { authContext } = useAuth();
  const { data } = useGetProfile();
  // console.log(data)
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 px-2">
        <View className="flex-row gap-x-2 items-center">
          <Button
            onPress={(e) => {
              authContext?.signOut();
            }}
          >
            <TopImage width={114} height={114} />
          </Button>
          <View style={{ flexShrink: 1 }}>
            <Text>Bonjour, {data?.username || data?.full_name}</Text>
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
  const { data, error, isLoading, mutate } = useGetProfile();
  let userPlan: string = "";
  if (isArray(data?.subscription) && !isArray(data?.subscription?.[0]?.plan))
    userPlan = data?.subscription?.[0]?.plan?.plan_name || "";
  const [routes] = useState([
    { key: "Categories", title: "categories" },
    { key: "Fav", title: "favoris" },
  ]);
  if (isLoading)
    return (
      <View className="px-4 py-12 justify-center items-center flex-1">
        <Spinner
          accessibilityLabel="Loading results"
          color="black"
          size="lg"
          className="my-auto"
        />
      </View>
    );
  if (error)
    return (
      <View
        className="px-4 py-12 justify-center items-center flex-1"
        style={{ rowGap: 16 }}
      >
        <Text className="font-bold">Erreur Réseau</Text>
        <MaterialCommunityIcons
          name="network-off-outline"
          size={60}
          color="#1068BB"
        />
        <Button2 title="Réessayer" color="#1068BB" onPress={() => mutate()} />
      </View>
    );
  return (
    <ScrollView
      contentContainerStyle={{
        rowGap: 24,
        paddingVertical: 20,
        paddingHorizontal: 16,
      }}
    >
      {[
        {
          title: "RESIDANAT",
          link: "Residanat",
          color: "#0C4E8C",
          isLocked: userPlan == "residanat" ? false : true,
        },
        {
          title: "EXTERNAT",
          link: "Externat",
          color: "#1068BB",
          isLocked: false,
        },
        {
          title: "COURS",
          link: "MainCours",
          color: "#1275D2",
          isLocked: false,
        },
      ].map(({ title, color, link, isLocked }) => (
        <Button2
          key={title}
          title={title}
          color={color}
          onPress={() => navigation.navigate(link)}
          isLocked={isLocked}
        />
      ))}
    </ScrollView>
  );
}

function Fav({ navigation }: { navigation: any }) {
  return <View></View>;
}
