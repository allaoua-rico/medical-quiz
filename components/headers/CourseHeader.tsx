import { View, Text } from "react-native";
import React from "react";
import { HomeStackScreenProps } from "../../types";
import BackButton from "../shared/buttons/BackButton";
import { useFetchUserAnswers } from "../courses/functionsAndHooks";
import { questionVerifier } from "../../screens/Courses";
import { UserAnswer } from "../courses/types";

export default function CourseHeader({
  route: {
    params: { course },
  },
  navigation,
}: HomeStackScreenProps<"Courses">) {
  const { userAnswers } = useFetchUserAnswers(course);
  return (
    <View className="pt-20 pb-11 relative rounded-b-[20px] bg-primary pl-3">
      <View className="flex flex-row items-center">
        <BackButton navigation={navigation}  />
        <View style={{ flexShrink: 1 }}>
          <Text className="text-2xl text-white">{course.title}</Text>
        </View>
      </View>
      <View className="flex flex-row items-center mx-auto mt-6">
        <View>
          <Text className="text-xl text-white font-semibold">Correcte</Text>
          <Text className="text-white text-lg font-medium">
            {getScore2(userAnswers)}/{userAnswers.length}
          </Text>
        </View>
        <View className="bg-white h-16 w-[1px] mx-12"></View>
        <View>
          <Text className="text-xl text-white font-semibold">Faux</Text>
          <Text className="text-white text-lg font-medium">
            {userAnswers.length - getScore2(userAnswers)}/{userAnswers.length}
          </Text>
        </View>
      </View>
    </View>
  );
}

export const getScore2 = (questions: UserAnswer[]) => {
  let score = 0;
  questions.map((q) => {
    questionVerifier(q.quiz_answers, q.user_answers) && score++;
  });
  return score;
};
