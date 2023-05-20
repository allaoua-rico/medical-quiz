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
  answerVerifier,
  isSelected,
  useFetchUserAnswers,
} from "./functionsAndHooks";
import { Answer, UserAnswer } from "./types";
import { isEmptyArray } from "formik";
import CourseQCMHeader from "../headers/CourseQCMHeader";
import CustomCheckbox, { answerColor } from "./CustomCheckbox";

export default function CourseQCM(props: HomeStackScreenProps<"CourseQCM">) {
  const { route } = props;
  const {
    params: { course, questionIndex },
  } = route;
  const { userAnswers, isLoading } = useFetchUserAnswers(course);
  const [questions, setQuestions] = useState<UserAnswer[]>([]);
  useEffect(() => {
    isEmptyArray(questions) && setQuestions(userAnswers);
  }, [userAnswers]);
  const [activeQuestion, setActiveQuestion] = useState<number>(questionIndex);
  const aq = questions[activeQuestion];
  // console.log("CourseQCMaq", course);
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
  // console.log(
  //   "userAnswers",
  //   userAnswers.map(({ user_answers }) => ({ user_answers }))
  // );
  // à faire : set the validated user answers to verified so that the check value is true
  // console.log(aq);
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
          className="w-full mx-auto px-5 "
          contentContainerStyle={{ flexGrow: 1 }}
        >
          {/* HEADER */}
          {aq?.question_id && (
            <CourseQCMHeader {...props} question_id={aq.question_id} />
          )}
          {/* QUESTION  */}
          <Text className="pb-3 pt-9 text-2xl text-dark_text font-medium border-b border-b-dark_text">
            Question {`${activeQuestion + 1}/${questions.length}`}
          </Text>
          <Text className="py-8 text-lg font-medium">{aq?.Question}</Text>
          <View className="space-y-3">
            {aq?.quiz_answers.map((answer) => (
              <Pressable
                style={{ elevation: 3 }}
                className={
                  "rounded-[30px] p-5 w-full flex-row items-center border-[3px] bg-white " +
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

          {/* FOOTER */}
          <QcmFooter
            activeQuestion={activeQuestion}
            setActiveQuestion={setActiveQuestion}
            aq={aq}
            questions={questions}
            setQuestions={setQuestions}
            course={course}
            // updateQuestions={()=>{setQuestions(userAnswers)}}
          />
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
