import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "native-base";
import { HomeStackScreenProps } from "../types";
import YearButton from "./shared/buttons/YearButton";
import { useGetProfile } from "./courses/functionsAndHooks";
import { isArray } from "lodash";
import modulesByYears from "../modulesByYears.json";
import { createYearModule } from "../screens/MainCours";

export default function Externat({
  navigation,
}: HomeStackScreenProps<"Externat">) {
  const { data } = useGetProfile();
  const nnOptions = data?.options
    ? data?.options?.map((option) =>
        !isArray(option) && option ? option : null
      )
    : [];
  const isResidanat =
    data?.subscription &&
    !isArray(data?.subscription) &&
    data?.subscription.plan &&
    !isArray(data?.subscription?.plan) &&
    data?.subscription?.plan?.plan_name == "residanat";

  return (
    <SafeAreaView className="min-h-full bg-white">
      <ScrollView
        className="w-full mx-auto px-8"
        contentContainerStyle={{ rowGap: 12 }}
      >
        {modulesByYears
          .map((year) => ({
            ...year,
            isOptionIncluded:
              isResidanat ||
              nnOptions.find((option) => option?.option_name == year?.title),
          }))
          .map(({ title, modules, isOptionIncluded }, i) => (
            <YearButton
              key={`${title}_${i}`}
              text={title}
              onPress={() =>
                navigation.navigate("ModulesList", {
                  title,
                  modules: createYearModule(modules),
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
