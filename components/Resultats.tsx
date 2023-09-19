import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { HomeStackScreenProps } from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Spinner } from "native-base";
import { Simulateur_Chapter_Question } from "../screens/Simulateur";

type Simulateur_Results = Simulateur_Chapter_Question & { score: number };

export default function Resultats(props: HomeStackScreenProps<"Residanat">) {
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState<Simulateur_Results[]>([]);
  useEffect(() => {
    async function getData() {
      try {
        const jsonValue = await AsyncStorage.getItem("simulateurResults");
        setResults(jsonValue != null ? JSON.parse(jsonValue) : []);
      } catch (e) {}
      setLoading(false);
    }
    getData();
  }, []);
  //   console.log(results);
  return (
    <View className="">
      {loading ? (
        <Spinner
          accessibilityLabel="Loading results"
          color="white"
          size="lg"
          className="my-auto"
        />
      ) : (
        <View className="mt-8">
          <View className="border border-[#616161] mx-8"></View>
          <View className="mx-4">
            {results.map((chapter, i) => (
              <View
                key={chapter.chapter_title}
                className="flex-row items-center py-3"
              >
                <View className="pl-8 pr-4 flex-shrink">
                  <Text className="font-semibold text-2xl text-primary text-center">
                    {chapter.chapter_title}
                  </Text>
                  <Text className="text-dark_text text-xl text-center">
                    Tu as {chapter.score}/{chapter.chapter_questions.length}{" "}
                    réponses correctes
                  </Text>
                  {i != results.length - 1 && (
                    <View className="border border-[#616161] mt-5"></View>
                  )}
                </View>
                <View className="bg-[#327BE9]/[0.6] p-16 rounded-full justify-center items-center">
                  <View className="absolute">
                    <Text className="font-bold text-2xl text-primary text-center ">
                      {Math.round(
                        (chapter.score * 100) / chapter.chapter_questions.length
                      )}
                      %
                    </Text>
                    <Text className="text-lg text-white text-center ">
                      {
                        notes.find(
                          ({ note, range }) =>
                            range.min <= chapter.score &&
                            chapter.score <= range.max
                        )?.note
                      }
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
          <View className="border border-[#616161] mx-8"></View>
        </View>
      )}
    </View>
  );
}

const notes = [
  { note: "Excéllent", range: { min: 90, max: 100 } },
  { note: "Très bien", range: { min: 70, max: 89 } },
  { note: "Moyen", range: { min: 50, max: 69 } },
  { note: "Insuffisant", range: { min: 0, max: 50 } },
];
