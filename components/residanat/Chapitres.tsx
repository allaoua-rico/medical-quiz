import { ScrollView } from "react-native";
import Button1 from "../shared/buttons/Button1";
import { yearsModules } from "../../data";
import { HomeStackScreenProps } from "../../types";

export default function Chapitres(props: HomeStackScreenProps<"Residanat">) {
  const { navigation, route } = props;
  return (
    <ScrollView className="px-4 py-12" contentContainerStyle={{ rowGap: 23 }}>
      {chapters.map(({ title }) => (
        <Button1
          key={title}
          title={title}
          onPress={() =>
            navigation.navigate("ChapterList", {
              title,
              modules: getChapterModules(title),
            })
          }
        />
      ))}
    </ScrollView>
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
    .filter((y1) => yearsModules.find((y2) => y2.title == y1))
    //
    .map((y1) => yearsModules.find((y2) => y2.title == y1)!);
  const allModulesInChapter = allYearsInChapter?.map((y) => y?.modules).flat();

  return allModulesInChapter;
}
