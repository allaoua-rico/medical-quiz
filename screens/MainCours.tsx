import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "native-base";
import { yearsModules } from "../data";
import YearButton from "../components/shared/buttons/YearButton";
import { HomeStackScreenProps } from "../types";

export default function MainCours({
  navigation,
}: HomeStackScreenProps<"MainCours">) {
  const navArr = ["CoursDownload"];
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
                navArr,
              })
            }
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
