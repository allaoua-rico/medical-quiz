import { SafeAreaView } from "react-native-safe-area-context";
import { HomeStackScreenProps } from "../types";
import { ScrollView } from "react-native";
import yearsModules from "../data";
import { useEffect } from "react";
import ModuleButton from "./ModuleButton";

export default function ChapterList({
  route,
  navigation,
}: HomeStackScreenProps<"ChapterList">) {
  const { title } = route?.params;
  const modules = getChapterModules(title);
  useEffect(() => {
    navigation.setOptions({ title });
  }, [title]);
  return (
    <SafeAreaView className="min-h-full bg-gray-50">
      <ScrollView className="w-full min-h-full mx-auto px-8">
        {modules?.map((module, i) => (
          <ModuleButton
            key={`${module?.title}_${i}`}
            module={module}
            navigation={navigation}
            navToView="Modules"
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const chapters: { title: string; years: string[] }[] = [
  {
    title: "Biologie",
    years: ["annee1", "annee2", "annee3"],
  },
  {
    title: "Medical",
    years: ["annee4", "annee5", "annee6"],
  },
  {
    title: "Chirurgie",
    years: ["annee4", "annee5", "annee6"],
  },
];

function getChapterModules(title: string) {
  const yearsInTheChapter = chapters.find(
    (chap) => chap?.title === title
  )!.years;
  const allYearsInChapter = yearsInTheChapter
    // remove the filter line after adding all years
    .filter((y1) => yearsModules.find((y2) => y2.year == y1))
    //
    .map((y1) => yearsModules.find((y2) => y2.year == y1)!);
  const allModulesInChapter = allYearsInChapter?.map((y) => y?.modules).flat();

  return allModulesInChapter;
}
