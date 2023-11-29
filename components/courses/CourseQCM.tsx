import { HomeStackParamList, HomeStackScreenProps } from "../../types";
import { ScrollView, Pressable } from "react-native";
import { useEffect, useState } from "react";
import { Spinner, Text, View } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import * as _ from "lodash";
import "react-native-url-polyfill/auto";
import QcmFooter from "./QcmFooter";
import {
  answerVerifier,
  isSelected,
  useFetchUserAnswers,
} from "./functionsAndHooks";
import { UserAnswer } from "./types";
import { isEmptyArray } from "formik";
import CourseQCMHeader from "../headers/CourseQCMHeader";
import CustomCheckbox, { answerColor } from "./CustomCheckbox";
import { addOrRemoveAnswer } from "../SimulateurFunctions";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export default function CourseQCM(props: HomeStackScreenProps<"CourseQCM">) {
  const { route } = props;
  const {
    params: { course, questionIndex, FavQuestion },
  } = route;
  const { userAnswers, isLoading } = useFetchUserAnswers(course);
  const [questions, setQuestions] = useState<UserAnswer[]>([]);
  useEffect(() => {
    isEmptyArray(questions) &&
      !isEmptyArray(userAnswers) &&
      setQuestions(userAnswers);
  }, [userAnswers]);
  // console.log(userAnswers);
  const [activeQuestion, setActiveQuestion] = useState<number>(questionIndex);
  const aq = questions[activeQuestion];

  // à faire : set the validated user answers to verified so that the check value is true
  if (questionIndex >= 0 && FavQuestion)
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
            {/*  QUESTION  */}
            <Text className="pb-3 pt-9 text-2xl text-dark_text font-medium border-b border-b-dark_text">
              Question {`${activeQuestion + 1}/${questions.length}`}
            </Text>
            <Text className="py-8 text-lg font-medium">{aq?.Question}</Text>
            <View className="space-y-3">
              {aq?.quiz_answers.map((answer) => {
                // console.log(answerVerifier(aq, answer));
                return (
                  <Pressable
                    style={{ elevation: 3 }}
                    disabled={aq.verify}
                    className={
                      "rounded-[30px] p-5 w-full flex-row items-center border-[3px] bg-white " +
                      (answerVerifier(aq, answer) == "right"
                        ? `border-green-500`
                        : answerVerifier(aq, answer) == "wrong"
                        ? `border-red-500`
                        : "border-primary")
                    }
                    key={answer.answer_id}
                    onPress={() =>
                      setQuestions(addOrRemoveAnswer(aq, answer, questions))
                    }
                  >
                    <Text className="text-sm font-medium flex-wrap flex-1">
                      {answer.Answer}
                    </Text>
                    <CustomCheckbox
                      checked={!!isSelected(aq, answer)}
                      status={answerVerifier(aq, answer)}
                      theme="light"
                    />
                  </Pressable>
                );
              })}
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
  else if (FavQuestion)
    return (
      <FavCourseQCM
        questions={questions}
        FavQuestion={FavQuestion}
        navigationProps={props}
      />
    );
  else return <Text>Erreur</Text>;
}

function FavCourseQCM({
  questions,
  FavQuestion,
  navigationProps,
}: FavCourseQCMProps) {
  const aq = questions.find((question) => question.Question == FavQuestion);
  if (aq)
    return (
      <SafeAreaView className="flex-grow relative">
        <ScrollView
          className="w-full mx-auto px-5 "
          contentContainerStyle={{ flexGrow: 1 }}
        >
          {/* HEADER */}
          {aq?.question_id && (
            <CourseQCMHeader
              {...navigationProps}
              question_id={aq.question_id}
            />
          )}
          {/*  QUESTION  */}
          <Text className="py-8 text-lg font-medium">{aq?.Question}</Text>
          <View className="space-y-3">
            {aq?.quiz_answers.map((answer) => (
              <View
                style={{ elevation: 3 }}
                className={
                  "rounded-[30px] p-5 w-full flex-row items-center border-[3px] bg-white " +
                  (answer.Correct
                    ? `border-green-500`
                    : !answer.Correct
                    ? `border-red-500`
                    : "border-primary")
                }
                key={answer.answer_id}
              >
                <Text className="text-sm font-medium flex-wrap flex-1">
                  {answer.Answer}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  else return <Text>Erreur</Text>;
}

type FavCourseQCMProps = {
  questions: UserAnswer[];
  FavQuestion: string;
  navigationProps: HomeStackScreenProps<"CourseQCM">;
};
