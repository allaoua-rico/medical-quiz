import { View, Text, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { HomeStackScreenProps } from "../types";
import {
  Simulateur_question,
  isSelected,
  useFetchChapterRandomQuestions,
} from "../components/courses/functionsAndHooks";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, Spinner } from "native-base";
import { UserAnswer } from "../components/courses/types";
import CustomCheckbox, {
  answerColor,
} from "../components/courses/CustomCheckbox";
import SimulateurHeader from "../components/headers/SimulateurHeader";
import { isEmptyArray } from "formik";
import { addOrRemoveAnswer } from "../components/SimulateurFunctions";
import SimulateurFooter from "../components/simulateur/SimulateurFooter";
import SimulateurTimer from "../components/simulateur/SimulateurTimer";
// import { addOrRemoveAnswer } from "../components/SimulateurFunctions";

export default function Simulateur(props: HomeStackScreenProps<"Simulateur">) {
  const { route } = props;
  const { simulateurQuestions, isLoading, error } =
    useFetchChapterRandomQuestions("Biologie");
  const [questions, setQuestions] = useState<Simulateur_question[]>([]);
  useEffect(() => {
    isEmptyArray(questions) &&
      !isEmptyArray(simulateurQuestions) &&
      setQuestions(simulateurQuestions);
  }, [simulateurQuestions]);
  const [activeQuestion, setActiveQuestion] = useState<number>(0);
  const aq = questions[activeQuestion];
  //   console.log(aq.user_answers);
  return (
    <SafeAreaView className="flex-grow relative bg-primary">
      {isLoading ? (
        <Spinner
          accessibilityLabel="Loading questions"
          color="white"
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
            <SimulateurHeader {...props} question_id={aq.question_id} />
          )}
          <SimulateurTimer />
          {/* QUESTION  */}
          <Text className="pb-3 pt-9 text-2xl text-white font-medium border-b border-b-dark_text">
            Question {`${activeQuestion + 1}/${questions.length}`}
          </Text>
          <Text className="py-8 text-lg font-medium text-white">
            {aq?.Question}
          </Text>
          <View className="space-y-3">
            {aq?.quiz_answers.map((answer) => (
              <Pressable
                style={{ elevation: 3 }}
                className={
                  "rounded-[30px] p-5 w-full flex-row items-center border-[3px] bg-primary border-[#0C81E4]"
                  //    + (isSelected(aq, answer) ? "border-primary" : "")
                }
                // className={
                //   "rounded-[30px] p-5 w-full flex-row items-center border-[3px] bg-white"
                // }
                key={answer.answer_id}
                onPress={() =>
                  addOrRemoveAnswer(aq, answer, questions, setQuestions)
                }
              >
                <Text className="text-sm text-white font-medium flex-wrap flex-1">
                  {answer.Answer}
                </Text>
                <CustomCheckbox
                  checked={!!isSelected(aq, answer)}
                  status={"neutral"}
                  theme="dark"
                />
              </Pressable>
            ))}
          </View>

          {/* FOOTER */}
          <SimulateurFooter
            activeQuestion={activeQuestion}
            setActiveQuestion={setActiveQuestion}
            aq={aq}
            questions={questions}
            setQuestions={setQuestions}
            // course={course}
            // updateQuestions={()=>{setQuestions(userAnswers)}}
          />
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
