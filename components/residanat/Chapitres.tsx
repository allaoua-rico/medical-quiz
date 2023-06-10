import { ScrollView } from "react-native";
import Button1 from "../shared/buttons/Button1";
import { chapters, getChapterModules, yearsModules } from "../../data";
import { HomeStackScreenProps } from "../../types";

export default function Chapitres(props: HomeStackScreenProps<"Residanat">) {
  const { navigation, route } = props;

  return (
    <ScrollView className="px-4 py-12" contentContainerStyle={{ rowGap: 23 }}>
      {chapters.map(({ title }) => (
        <Button1
          key={title}
          title={title}
          onPress={() => {
            // console.log(title, getChapterModules(title));
            navigation.navigate("ModulesList", {
              title,
              modules: getChapterModules(title),
              navArr: ["Courses"],
            });
          }}
        />
      ))}
    </ScrollView>
  );
}

