import { Text } from "react-native";
import React from "react";
import MainSvg from "../images/undraw_note_list_re_r4u9.svg";
import AdobeSvg from "../images/Adobe.svg";
import TopMainSvg from "../images/coursMainTopSvg.svg";
import { SafeAreaView } from "react-native-safe-area-context";
import { HomeStackScreenProps } from "../types";
import { Fontisto } from "@expo/vector-icons";
import { View } from "../components/Themed";

export default function CoursDownload(
  props: HomeStackScreenProps<"CoursDownload">
) {
  const {
    route: {
      params: { course },
    },
  } = props;

  return (
    <SafeAreaView className="items-center relative pt-12 ">
      <TopMainSvg
        preserveAspectRatio="xMinYMin slice"
        style={{ position: "absolute", top: -20 }}
        width="100%"
      />

      <MainSvg />
      <Text className="text-[#1275D2] font-bold text-3xl text-center mt-9 px-5">
        {course.title}
      </Text>
      <Text className="text-xl text-center mt-9">
        Télécharger le cours à partir du lien
      </Text>
      <View className="mt-6">
        <AdobeSvg />
      </View>
    </SafeAreaView>
  );
}
