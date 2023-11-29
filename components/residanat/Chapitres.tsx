import { ScrollView } from "react-native";
import Button1 from "../shared/buttons/Button1";
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
    </ScrollView>
  );
}
