import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "native-base";
import { yearsModules } from "../data";
import { HomeStackScreenProps } from "../types";
import YearButton from "./shared/buttons/YearButton";
import { useGetProfile } from "./courses/functionsAndHooks";
import { isArray } from "lodash";

export default function Externat({
  navigation,
}: HomeStackScreenProps<"Externat">) {
  const { data, error, isLoading, mutate } = useGetProfile();
  const nnOptions = data?.options
    ? data?.options?.map((option) =>
        !isArray(option) && option ? option : null
      )
    : [];
  return (
    <SafeAreaView className="min-h-full bg-white">
      <ScrollView className="w-full mx-auto px-8">
        {yearsModules
          .map((year) => ({
            ...year,
            isOptionIncluded: nnOptions.find(
              (option) => option?.option_name == year?.title
            ),
          }))
          .map(({ title, modules, isOptionIncluded }, i) => (
            <YearButton
              key={`${title}_${i}`}
              text={title}
              onPress={() =>
                navigation.navigate("ModulesList", {
                  title,
                  modules,
                  navArr: ["Courses"],
                })
              }
              isLocked={!isOptionIncluded}
            />
          ))}
      </ScrollView>
    </SafeAreaView>
  );
}
