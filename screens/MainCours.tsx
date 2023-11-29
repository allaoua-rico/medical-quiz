import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "native-base";
import YearButton from "../components/shared/buttons/YearButton";
import { HomeStackScreenProps } from "../types";
import { YearModule } from "../data";
import { useEffect, useState } from "react";
import supabase from "../utils/supabase";
import * as FileSystem from "expo-file-system";

export default function MainCours({
  navigation,
}: HomeStackScreenProps<"MainCours">) {
  const navArr = ["CoursDownload"];

  const [coursesByYears, setcoursesByYears] = useState<any>(null);
  useEffect(() => {
    async function getCoursePdf() {
      const fileInfo = await FileSystem.getInfoAsync("cours");
      if (fileInfo.exists) {
        console.log("exists");
        const file = await FileSystem.readAsStringAsync("cours");
        setcoursesByYears(file);
      } else {
        {
          const { data, error } = await supabase.storage
            .from("data")
            .download("cours");
          if (error) throw { ...error, msg: "Error downloading the file" };
          if (data) {
            const fr = new FileReader();
            fr.onload = async (e) => {
              if (typeof fr?.result == "string") {
                const fileAsString = fr.result.replace("octet-stream", "pdf");
                setcoursesByYears(fileAsString);
                await FileSystem.writeAsStringAsync("cours", fileAsString, {});
              }
            };
            fr.readAsDataURL(data);
            console.log("File saved successfully!");
          }
        }
      }
    }
    getCoursePdf();
  }, []);

  return (
    <SafeAreaView className="min-h-full bg-white">
      <ScrollView className="w-full mx-auto px-8">
        {coursesByYears.map(
          (
            { title, modules }: { title: string; modules: YearModule },
            i: any
          ) => {
            const modulesV = createYearModule(modules);
            return (
              <YearButton
                key={`${title}_${i}`}
                text={title}
                onPress={() =>
                  navigation.navigate("ModulesList", {
                    title,
                    modules: modulesV,
                    navArr,
                  })
                }
              />
            );
          }
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

export function createYearModule(jsonData: any): YearModule[] {
  return jsonData;
}
