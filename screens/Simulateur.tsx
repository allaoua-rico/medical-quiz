import { View, Text, Pressable } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { HomeStackScreenProps } from "../types";
import {
  Simulateur_question,
  answerVerifier,
  isSelected,
  useFetchChapterRandomQuestions,
} from "../components/courses/functionsAndHooks";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, Spinner } from "native-base";
import CustomCheckbox, {
  answerColor,
} from "../components/courses/CustomCheckbox";
import SimulateurHeader from "../components/headers/SimulateurHeader";
import { isEmptyArray } from "formik";
import { addOrRemoveAnswer } from "../components/SimulateurFunctions";
import SimulateurFooter from "../components/simulateur/SimulateurFooter";
import SimulateurTimer from "../components/simulateur/SimulateurTimer";
import modulesByChapters from "../modulesByChapters.json";
// import { addOrRemoveAnswer } from "../components/SimulateurFunctions";

export default function Simulateur(props: HomeStackScreenProps<"Simulateur">) {
  const { simulateurQuestions, isLoading, error } =
    useFetchAllChaptersQuestion();
  const [questions, setQuestions] = useState<Simulateur_Chapter_Question[]>([]);
  useEffect(() => {
    isEmptyArray(questions) &&
      !isEmptyArray(simulateurQuestions) &&
      setQuestions(simulateurQuestions);
  }, [simulateurQuestions]);
  const [activeQuestion, setActiveQuestion] = useState<number>(0);
  const [activeChapter, setActiveChapter] = useState<number>(0);
  const aChap: Simulateur_Chapter_Question = questions[activeChapter];
  const aq: Simulateur_question = aChap?.chapter_questions?.[activeQuestion];
  const simulateurFooterRef = useRef<CountdownHandle>(null);
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
        <View
          className="w-full mx-auto px-5 "
          //   contentContainerStyle={{ flexGrow: 1 }}
        >
          {aq && (
            <>
              {/* HEADER */}
              {aq?.question_id && (
                <SimulateurHeader {...props} question_id={aq.question_id} />
              )}
              <SimulateurTimer
                endTest={() => simulateurFooterRef?.current?.saveResults()}
              />
              {/* QUESTION  */}
              <Text className="pb-3 pt-4 text-2xl text-white font-medium border-b border-b-white">
                Question{" "}
                {`${activeQuestion + 1}/${aChap?.chapter_questions?.length}`}
              </Text>
              <Text className="text-xl font-semibold text-[#4FE7AF] text-center mt-4 mb-3">
                {aChap.chapter_title.toUpperCase()}
              </Text>
              <Text className="pb-5 text-xl font-medium text-white">
                {aq?.Question}
              </Text>
              <ScrollView
                className="space-y-3 -mx-5 px-5"
                contentContainerStyle={{ flexGrow: 1 }}
              >
                {aq?.quiz_answers.map((answer) => (
                  <Pressable
                    disabled={aq.verify}
                    style={{ elevation: 3 }}
                    className={
                      "rounded-[30px] p-5 w-full flex-row items-center border-[3px] bg-primary " +
                      (answerVerifier(aq, answer) == "right"
                        ? `border-[${answerColor.right}]`
                        : answerVerifier(aq, answer) == "wrong"
                        ? `border-[${answerColor.wrong}]`
                        : "border-[#0C81E4]")
                    }
                    key={answer.answer_id}
                    onPress={() => {
                      const newChapterQuestion = addOrRemoveAnswer(
                        aq,
                        answer,
                        aChap.chapter_questions
                      );
                      setQuestions((prevQuestions) =>
                        prevQuestions.map((prevQuestionChapter) => {
                          return prevQuestionChapter.chapter_title ==
                            aChap.chapter_title
                            ? {
                                chapter_questions: newChapterQuestion,
                                chapter_title: aChap.chapter_title,
                              }
                            : prevQuestionChapter;
                        })
                      );
                    }}
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
                {/* <Pressable
                  disabled={aq.verify}
                  style={{ elevation: 3 }}
                  className={
                    "rounded-[30px] p-5 w-full flex-row items-center border-[3px] bg-primary "
                  }
                >
                  <Text className="text-sm text-white font-medium flex-wrap flex-1">
                    ""
                  </Text>
                </Pressable> */}
              </ScrollView>

              {/* FOOTER */}
              <SimulateurFooter
                ref={simulateurFooterRef}
                activeQuestion={activeQuestion}
                setActiveQuestion={setActiveQuestion}
                setActiveChapter={setActiveChapter}
                questionsPerChapter={questionsPerChapter}
                chapterQuestions={aChap?.chapter_questions}
                simulateurQuestions={questions}
                activeChapter={activeChapter}
                setQuestions={setQuestions}
              />
            </>
          )}
        </View>
      )}
    </SafeAreaView>
  );
}

function useFetchAllChaptersQuestion() {
  const chapters_titles = modulesByChapters.map(({ title }) => title);
  const {
    simulateurQuestions: Questions0,
    isLoading: IsLoading0,
    error: Error0,
  } = useFetchChapterRandomQuestions(chapters_titles[0], questionsPerChapter);
  const {
    simulateurQuestions: Questions1,
    isLoading: IsLoading1,
    error: Error1,
  } = useFetchChapterRandomQuestions(chapters_titles[1], questionsPerChapter);
  const {
    simulateurQuestions: Questions2,
    isLoading: IsLoading2,
    error: Error2,
  } = useFetchChapterRandomQuestions(chapters_titles[2], questionsPerChapter);

  const isLoading = IsLoading0 || IsLoading1 || IsLoading2;
  const error = Error0 || Error1 || Error2;
  const simulateurQuestions: Simulateur_Chapter_Question[] = [
    { chapter_title: chapters_titles[0], chapter_questions: Questions0 },
    { chapter_title: chapters_titles[1], chapter_questions: Questions1 },
    {
      chapter_title: chapters_titles[2],
      chapter_questions: Questions2,
    },
  ];
  return {
    simulateurQuestions:
      !isEmptyArray(Questions0) &&
      !isEmptyArray(Questions1) &&
      !isEmptyArray(Questions2)
        ? simulateurQuestions
        : [],
    isLoading,
    error,
  };
}

export type Simulateur_Chapter_Question = {
  chapter_title: string;
  chapter_questions: Simulateur_question[];
};
type CountdownHandle = React.ElementRef<typeof SimulateurFooter>;

const questionsPerChapter = 120;
