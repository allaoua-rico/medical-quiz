import { HomeStackScreenProps } from "../types";
import { ScrollView } from "react-native";
import ModuleButton from "../components/ModuleButton";
// import HomeWrapperImg from "./layout/HomeWrapperImg";

export default function ChapterList({
  route,
  navigation,
}: HomeStackScreenProps<"ChapterList">) {
  const { modules, navArr } = route.params;
  return (
    <ScrollView className="flex-1 px-4" contentContainerStyle={{ rowGap: 18 }}>
      {modules?.map((module, i) => (
        <ModuleButton
          key={`${module?.title}_${i}`}
          module={module}
          onPress={() => navigation.navigate("Modules", { module, navArr })}
        />
      ))}
    </ScrollView>
  );
}
