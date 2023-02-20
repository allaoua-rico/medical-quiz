import { ScrollView } from "react-native";
import { HomeStackScreenProps } from "../types";
import ChapterButton from "./ChapterButton";
import HomeWrapperImg from "./layout/HomeWrapperImg";

export default function ResidanatQCM({
  navigation,
}: HomeStackScreenProps<"ResidanatQCM">) {
  return (
    <HomeWrapperImg>
      <ScrollView className="w-full mx-auto px-8">
        {chapters.map(({ title,  source }) => (
          <ChapterButton
            key={title}
            navigation={navigation}
            title={title}
            source={source}
          />
        ))}
      </ScrollView>
    </HomeWrapperImg>
  );
}

const chapters = [
  {
    title: "Biologie",
    source: require("../images/biologie.png"),
  },
  {
    title: "Medical",
    source: require("../images/medical.png"),
  },
  {
    title: "Chirurgie",
    source: require("../images/chirurgie.png"),
  },
];
