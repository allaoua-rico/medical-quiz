import { ScrollView } from "react-native";
import Button1 from "../shared/buttons/Button1";
import { YearModule, getChapterModules } from "../../data";
import modulesByChapters from "../../modulesByChapters.json";
import { HomeStackScreenProps } from "../../types";

export default function Chapitres(props: HomeStackScreenProps<"Residanat">) {
  const { navigation, route } = props;

  return (
    <ScrollView className="px-4 py-12" contentContainerStyle={{ rowGap: 23 }}>
      {modulesByChapters.map(({ title, modules }) => (
        <Button1
          key={title}
          title={title}
          onPress={() => {
            navigation.navigate("ModulesList", {
              title,
              modules,
              navArr: ["Courses"],
            });
          }}
        />
      ))}
      {/* {chapters.map(({ title }) => (
        <Button1
          key={title}
          title={title}
          onPress={() => {
            navigation.navigate("ModulesList", {
              title,
              modules: getChapterModules(title),
              navArr: ["Courses"],
            });
          }}
        />
      ))} */}
    </ScrollView>
  );
}

type Chapter = { title: string; modules: YearModule[] };
