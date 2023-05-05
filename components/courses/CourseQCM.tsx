import { HomeStackScreenProps } from "../../types";
import { ScrollView, Pressable } from "react-native";
import { useEffect, useState } from "react";
import { Spinner, Text, View } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import * as _ from "lodash";
import "react-native-url-polyfill/auto";
import QcmFooter from "./QcmFooter";
import {
  addOrRemoveAns,
  isSelected,
  useFetchUserAnswers,
} from "./functionsAndHooks";
import { Answer, UserAnswer } from "./types";
import { isEmptyArray } from "formik";
import WrongSVG from "../../assets/images/wrong.svg";
import RightSVG from "../../assets/images/right.svg";

export default function CourseQCM({
  route: {
    params: { course, questionIndex },
  },
}: HomeStackScreenProps<"CourseQCM">) {
  // const { questions, setQuestions, loading } = useFetchQuestions(course);
  const { userAnswers, isLoading } = useFetchUserAnswers(course);
  const [questions, setQuestions] = useState<UserAnswer[]>([]);
  useEffect(() => {
    // console.log("CourseQCM_useEffect");
    isEmptyArray(questions) && setQuestions(userAnswers);
  }, [userAnswers]);
  const [activeQuestion, setActiveQuestion] = useState<number>(questionIndex);
  const aq = questions[activeQuestion];
  const addOrRemoveAnswer = (question: UserAnswer, answer: Answer) => {
    const questionsCopy = [...questions];
    questionsCopy.map((q) => {
      //  find question in the questions clone array
      if (q.question_id == question.question_id)
        // add or remove the answer from the selected answers array
        q.user_answers = addOrRemoveAns([...q.user_answers], answer);
    });
    setQuestions(questionsCopy);
  };
  return (
    <SafeAreaView className="flex-grow relative">
      {isLoading ? (
        <Spinner
          accessibilityLabel="Loading questions"
          color="black"
          size="lg"
          className="my-auto"
        />
      ) : (
        <ScrollView
          className="w-full mx-auto px-5 pb-0 bg-gray-100"
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <Text className="pt-8 pb-3 text-2xl text-dark_text font-medium border-b border-b-dark_text">
            Question {`${activeQuestion + 1}/${questions.length}`}
          </Text>
          <Text className="py-8 text-lg font-medium">{aq?.Question}</Text>
          <View className="space-y-3">
            {aq?.quiz_answers.map((answer) => (
              <Pressable
                className={
                  "rounded-[30px] p-5 w-full flex-row items-center border-[3px] " +
                  (answerVerifier(aq, answer) == "right"
                    ? `border-[${answerColor.right}]`
                    : answerVerifier(aq, answer) == "wrong"
                    ? `border-[${answerColor.wrong}]`
                    : "border-primary")
                }
                key={answer.answer_id}
                onPress={() => !aq.verify && addOrRemoveAnswer(aq, answer)}
              >
                <Text className="text-sm font-medium flex-wrap flex-1">
                  {answer.Answer}
                </Text>
                <CustomCheckbox
                  checked={!!isSelected(aq, answer)}
                  status={answerVerifier(aq, answer)}
                />
              </Pressable>
            ))}
          </View>
          <QcmFooter
            activeQuestion={activeQuestion}
            setActiveQuestion={setActiveQuestion}
            aq={aq}
            questions={questions}
            setQuestions={setQuestions}
            course={course}
          />
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

function CustomCheckbox({
  checked,
  status,
}: {
  checked: Boolean;
  status: "right" | "wrong" | "neutral";
}) {
  return checked ? (
    <View
      className={
        "border-[3px] rounded-full w-[30px] h-[30px] justify-center items-center border-primary " +
        (status == "right"
          ? `bg-[${answerColor.right}] border-[${answerColor.right}]`
          : status == "wrong"
          ? `bg-[${answerColor.wrong}] border-[${answerColor.wrong}]`
          : "bg-primary")
      }
    >
      {status == ("right" || "neutral") ? <RightSVG /> : <WrongSVG />}
    </View>
  ) : (
    <View className="border-[3px] rounded-full w-[30px] h-[30px] border-primary"></View>
  );
}

function answerVerifier(aq: UserAnswer, answer: Answer) {
  return aq?.verify
    ? isSelected(aq, answer) && answer.Correct
      ? "right"
      : (isSelected(aq, answer) && !answer.Correct) ||
        (!isSelected(aq, answer) && answer.Correct)
      ? "wrong"
      : "neutral"
    : "neutral";
}

const answerColor = {
  right: "#00FF00",
  wrong: "#FF0000",
};
