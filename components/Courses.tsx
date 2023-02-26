import { RootStackScreenProps } from "../types";
import { ScrollView, Pressable, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
// import HomeWrapperImg from "./layout/HomeWrapperImg";
import "react-native-url-polyfill/auto";
import supabase from "../utils/supabase";
import { Database } from "../types/supabase";
import { Course } from "../data";
import { Spinner, Text, View } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { Checkbox } from "react-native-paper";
import * as _ from "lodash";
import { MaterialIcons } from "@expo/vector-icons";

type Answer = { Answer: string; Correct: boolean; answer_id: string };
type Questions = [Database["public"]["Tables"]["quiz_questions"]["Row"]?];
type Question = {
  Question: string | null;
  question_id: string;
  selected_answers: Answer[];
  verify: boolean;
};

export default function Courses({
  route,
  navigation,
}: RootStackScreenProps<"Courses">) {
  const { questions, setQuestions, loading } = useFetchQuestions(
    route?.params?.course
  );
  const [activeQuestion, setActiveQuestion] = useState(0);
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
  const setToVerify = (question: Question) => {
    const questionsCopy = [...questions];
    questionsCopy.map((q) => {
      if (q.question_id == question.question_id) q.verify = true;
    });
    setQuestions(questionsCopy);
  };
  console.log(aq);
  return (
    <SafeAreaView className="flex-grow">
      {loading ? (
        <Spinner
          accessibilityLabel="Loading questions"
          color="white"
          size="lg"
        />
      ) : (
        <ScrollView
          className="w-full mx-auto px-8 pb-0 bg-gray-100"
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <Text className="pt-16 text-sm text-gray-500 font-medium text-center">
            {`${activeQuestion + 1} sur ${questions.length}`}
          </Text>
          <Text className="pt-2 pb-10 text-lg font-medium">{aq?.Question}</Text>
          <View className="space-y-4">
            {aq?.answers.map((answer: Answer) => (
              <Pressable
                className={
                  "rounded-md p-4 w-full flex flex-row border border-gray-200 " +
                  (aq.verify
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
                <Text className="text-sm font-medium">{answer.Answer}</Text>
              </Pressable>
            ))}
          </View>
          <View className="mt-auto p-4 flex flex-row">
            <TouchableOpacity
              disabled={activeQuestion == 0}
              onPress={() => setActiveQuestion((prev) => prev - 1)}
              className="p-2 mr-2 bg-white rounded-lg border border-gray-100"
            >
              <MaterialIcons
                name="keyboard-arrow-left"
                size={24}
                color="black"
              />
            </TouchableOpacity>
            <Pressable
              disabled={aq.verify}
              onPress={() => setToVerify(aq)}
              className="p-2 bg-white rounded-lg border border-gray-100"
            >
              <Text className="font-semibold">Verifier</Text>
            </Pressable>
            <View className="flex-1 flex flex-row justify-end">
              <TouchableOpacity
                onPress={() => setActiveQuestion((prev) => prev + 1)}
                className="p-2 px-5 bg-blue-300 rounded-lg border border-gray-100"
              >
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={24}
                  color="white"
                />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const isSelected = (aq: Question, answer: Answer) => {
  return aq?.selected_answers.find(
    (el: Answer) => answer.answer_id == el.answer_id
  );
};
const addOrRemoveAns = (array: any[], item: Answer) => {
  const exists = array.find((item1) => _.isEqual(item1, item));

  if (exists) {
    return array.filter((c) => {
      return c !== item;
    });
  } else {
    const result = array;
    result.push(item);
    return result;
  }
};
const useFetchQuestions = (course: Course) => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function getQuestions() {
      setLoading(true);
      try {
        let { data: quiz_questions, error } = await supabase.from(
          "quiz_questions"
        ).select(`Question,question_id,
        answers:quiz_answers (Answer,Correct,answer_id) `);
        !error &&
          !!quiz_questions &&
          setQuestions(
            quiz_questions.map((question) => ({
              ...question,
              selected_answers: [],
              verify: false,
            }))
          );
      } catch (error) {
      } finally {
        setLoading(false);
      }
    }
    getQuestions();
  }, [course]);
  return { questions, setQuestions, loading };
};
