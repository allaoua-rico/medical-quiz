import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { HomeStackScreenProps } from "../types";
import { useFetchUserAnswers } from "../components/courses/functionsAndHooks";
import { ScrollView, Spinner } from "native-base";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Answer } from "../components/courses/types";

export default function Courses({
  route: {
    params: { course },
  },
  navigation,
}: HomeStackScreenProps<"Courses">) {
  const { userAnswers, isLoading } = useFetchUserAnswers(course);
  console.log("userAnswers",userAnswers)
  return (
    <ScrollView className="flex-1 px-4" contentContainerStyle={{ flexGrow: 1 }}>
      <Text className="text-dark_text font-medium text-xl pb-3">
        Liste de questions
      </Text>
      <View className="flex-1">
        {isLoading ? (
          <Spinner
            accessibilityLabel="Loading questions"
            color="black"
            size="lg"
            className="my-auto"
          />
        ) : (
          userAnswers.map(
            (
              { question_id, Question, quiz_answers, user_answers },
              questionIndex
            ) => (
              <TouchableOpacity
                key={question_id+questionIndex}
                className="py-2 flex flex-row justify-between items-center border-b border-[#053F5C]"
                onPress={() =>
                  navigation.navigate("CourseQCM", { course, questionIndex })
                }
              >
                <View className="bg-white shadow-2xl" style={{ flexShrink: 1 }}>
                  <Text className="text-gray-700 text-lg font-extrabold">
                    {Question}
                  </Text>
                  <Text
                    className={
                      "font-semibold text-base " +
                      (questionVerifier(quiz_answers, user_answers)
                        ? "text-[#00FF00]"
                        : "text-[#FF0000]")
                    }
                  >
                    {questionVerifier(quiz_answers, user_answers)
                      ? "Réponses correctes"
                      : "Réponses incorrectes"}
                  </Text>
                </View>
                <SimpleLineIcons name="arrow-right" size={24} color="#053F5C" />
              </TouchableOpacity>
            )
          )
        )}
      </View>
    </ScrollView>
  );
}

export function questionVerifier(
  quiz_answers: Answer[],
  user_answers: Answer[]
) {
  let correct = true;
  quiz_answers.find((answer) => {
    // Verify if the correct answers are selected
    const isSelected = user_answers.find(
      (selected_a) => selected_a.answer_id == answer.answer_id
    );
    if (!answer.Correct && isSelected) correct = false;
    if (answer.Correct && !isSelected) correct = false;
  });
  return correct;
}
