import { ScrollView } from "react-native";
import { HomeStackScreenProps } from "../../types";
import HomeWrapperImg from "../layout/HomeWrapperImg";
import Button1 from "../shared/buttons/Button1";

export default function Chapitres({ navigation }: { navigation: any }) {
  return (
    <ScrollView className="px-4 py-12" contentContainerStyle={{ rowGap: 23 }}>
      {chapters.map(({ title }) => (
        <Button1
          key={title}
          title={title}
          onPress={() => navigation.navigate("ChapterList", { title })}
        />
      ))}
    </ScrollView>
  );
}

const chapters = [
  {
    title: "Biologie",
  },
  {
    title: "Medical",
  },
  {
    title: "Chirurgie",
  },
];
