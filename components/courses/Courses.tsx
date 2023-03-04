import { RootStackScreenProps } from "../../types";
import { ScrollView, Pressable, TouchableOpacity } from "react-native";
import { useState } from "react";
import { Spinner, Text, View } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { Checkbox } from "react-native-paper";
import * as _ from "lodash";
import "react-native-url-polyfill/auto";
import QcmFooter from "./QcmFooter";
import {
  addOrRemoveAns,
  isSelected,
  useFetchQuestions,
} from "./functionsAndHooks";
import { Answer, Question } from "./types";

export default function Courses({
  route,
  navigation,
}: RootStackScreenProps<"Courses">) {
  const { questions, setQuestions, loading } = useFetchQuestions(
    route?.params?.course
  );
  const [activeQuestion, setActiveQuestion] = useState<number>(21);
  // const [selectedAnswer, setSelectedAnswer] = useState("");
  // const [result, setResult] = useState({
  //   score: 0,
  //   correctAnswers: 0,
  //   wrongAnswers: 0,
  // });
  const aq = questions[activeQuestion];
  const addOrRemoveAnswer = (question: Question, answer: Answer) => {
    const questionsCopy = [...questions];
    questionsCopy.map((q) => {
      //  find question in the questions clone array
      if (q.question_id == question.question_id)
        // add or remove the answer from the selected answers array
        q.selected_answers = addOrRemoveAns([...q.selected_answers], answer);
    });
    setQuestions(questionsCopy);
  };

  return (
    <SafeAreaView className="flex-grow relative">
      {loading ? (
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
          <Text className="pt-2 text-sm text-gray-500 font-medium text-center">
            {`${activeQuestion + 1} sur ${questions.length}`}
          </Text>
          <Text className="pt-2 pb-4 text-lg font-medium">{aq?.Question}</Text>
          <View className="space-y-3">
            {aq?.answers.map((answer: Answer) => (
              <Pressable
                className={
                  "rounded-md px-1 py-2 w-full flex flex-row items-center border border-gray-200 " +
                  (aq?.verify
                    ? isSelected(aq, answer) && answer.Correct
                      ? "bg-blue-50 "
                      : isSelected(aq, answer) && !answer.Correct
                      ? "bg-red-50 "
                      : !isSelected(aq, answer) && answer.Correct
                      ? "bg-red-50 "
                      : "bg-gray-50"
                    : isSelected(aq, answer)
                    ? "bg-gray-50 "
                    : "")
                }
                key={answer.Answer}
                onPress={() => !aq.verify && addOrRemoveAnswer(aq, answer)}
              >
                <Checkbox
                  status={isSelected(aq, answer) ? "checked" : "unchecked"}
                  color="blue"
                />
                <Text className="text-sm font-medium flex-wrap flex-1">
                  {answer.Answer}
                </Text>
              </Pressable>
            ))}
          </View>
          <QcmFooter
            activeQuestion={activeQuestion}
            setActiveQuestion={setActiveQuestion}
            aq={aq}
            questions={questions}
            setQuestions={setQuestions}
            course={route?.params?.course}
          />
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
