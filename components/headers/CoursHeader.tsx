import { View, Text } from "react-native";
import React from "react";
import { HomeStackScreenProps } from "../../types";
import BackButton from "../shared/buttons/BackButton";

export default function CoursHeader({
  route,
  navigation,
}: HomeStackScreenProps<"MainCours">) {
  return (
    <View className="pt-12 pb-8 relative rounded-b-[20px] flex flex-row items-center bg-primary pl-3">
      <BackButton navigation={navigation} />
      <Text className="text-3xl text-white">Cours</Text>
    </View>
  );
}
