import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "native-base";
import { yearsModules } from "../data";
import { HomeStackScreenProps } from "../types";
import YearButton from "./shared/buttons/YearButton";

export default function Externat({
  navigation,
}: HomeStackScreenProps<"Externat">) {
  return (
    <SafeAreaView className="min-h-full bg-white">
      <ScrollView className="w-full mx-auto px-8">
        {yearsModules.map(({ title, modules }, i) => (
          <YearButton
            key={`${title}_${i}`}
            text={title}
            onPress={() =>
              navigation.navigate("ChapterList", {
                title,
                modules,
                navArr: ["Courses"],
              })
            }
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
