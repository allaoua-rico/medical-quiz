import { HomeStackScreenProps } from "../types";
import { TouchableOpacity, useWindowDimensions } from "react-native";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SceneMap, TabView } from "react-native-tab-view";
import { useState } from "react";
import CustomTabBar from "../components/shared/Tabview/CustomTabBar";
import Button2 from "../components/shared/buttons/Button2";
import { Button, ScrollView, Spinner } from "native-base";
import TopImage from "../assets/images/undraw_pic_profile_re_7g2h.svg";
import { Text } from "../components/Themed";
import {
  useFavoritQuestions,
  useGetProfile,
} from "../components/courses/functionsAndHooks";
import { MaterialCommunityIcons, SimpleLineIcons } from "@expo/vector-icons";
import { isArray } from "lodash";
import { useAuth } from "../auth/AuthProvider";
import dayjs from "dayjs";

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
  const isSubExpired =
    // isArray(data?.subscription) &&
    !isArray(data?.subscription) &&
    dayjs().isAfter(dayjs(data?.subscription?.sub_expiration));

  return isSubExpired ? (
    <ExpirationView data={data} />
  ) : (
    <SafeAreaView className="flex-1">
      <View className="flex-1 px-2">
        <View className="flex-row gap-x-4 p-1 justify-center items-center">
          <Button
            className="rounded-full"
            onPress={(e) => {
              navigation.navigate("UserModal");
            }}
            width={114}
            height={114}
          >
            <TopImage width={114} height={114} />
          </Button>
          <View style={{ flexShrink: 1 }}>
            <Text>Bonjour, {data?.username || data?.full_name}</Text>
            <Text>Qu'est-ce que tu vas apprendre aujourd'hui?</Text>
            <Text>éxp: {expDate(data).format("DD/MM/YYYY")}</Text>
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
  // if (isArray(data?.subscription) && !isArray(data?.subscription?.[0]?.plan))
  // userPlan = data?.subscription?.[0]?.plan?.plan_name || "";
  if (
    data?.subscription &&
    !isArray(data?.subscription) &&
    data?.subscription.plan &&
    !isArray(data?.subscription?.plan) &&
    data?.subscription.plan?.plan_name
  )
    userPlan = data?.subscription?.plan?.plan_name || "";
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
  const { favs, isLoading } = useFavoritQuestions();
  return (
    <View className="flex-1">
      {isLoading ? (
        <Spinner
          accessibilityLabel="Loading questions"
          color="black"
          size="lg"
          className="my-auto"
        />
      ) : (
        favs &&
        favs.map((fav, questionIndex) => {
          if (!isArray(fav.quiz_questions) && fav.quiz_questions) {
            const { Question, course } = fav.quiz_questions;
            return (
              <TouchableOpacity
                key={fav.id + questionIndex}
                className="py-2 flex flex-row justify-between items-center border-b border-[#053F5C]"
                onPress={() =>
                  navigation.navigate("CourseQCM", {
                    course: { title: course },
                    FavQuestion: Question,
                    // questionIndex = -1 to display fav question
                    questionIndex: -1,
                  })
                }
              >
                <View className="bg-white shadow-2xl" style={{ flexShrink: 1 }}>
                  <Text className="text-gray-700 text-lg font-extrabold">
                    {Question}
                  </Text>
                </View>
                <SimpleLineIcons name="arrow-right" size={24} color="#053F5C" />
              </TouchableOpacity>
            );
          }
        })
      )}
    </View>
  );
}

function ExpirationView({ data }: { data: any }) {
  // console.log(dayjs(data?.subscription?.sub_expiration).format("DD/MM/YYYY"));
  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      <Text>Cher client, votre abonnement est éxpiré </Text>
      <Text>Date d'éxpiration: {expDate(data).format("DD/MM/YYYY")}</Text>
    </SafeAreaView>
  );
}

function expDate(data: any) {
  return dayjs(data?.subscription?.sub_expiration);
}
