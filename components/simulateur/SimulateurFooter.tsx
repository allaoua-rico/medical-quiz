import { View, Text } from "react-native";
import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  ForwardRefRenderFunction,
  useEffect,
} from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, TouchableOpacity } from "react-native";
import supabase from "../../utils/supabase";
import { Course } from "../../data";
import useAlert from "../shared/Alert/useAlert";
import { questionVerifier } from "../../screens/Courses";
import SubmitModal from "../courses/SubmitModal";
import { Question, UserAnswer } from "../courses/types";
import { Simulateur_question, getUserId } from "../courses/functionsAndHooks";
import { Simulateur_Chapter_Question } from "../../screens/Simulateur";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TimeExpiredModal from "../TimeExpiredModal";

const SimulateurFooter: ForwardRefRenderFunction<
  SimulateurFooterHandle,
  SimulateurFooterProps
> = (props: SimulateurFooterProps, ref) => {
  const {
    activeQuestion,
    setActiveQuestion,
    chapterQuestions,
    setActiveChapter,
    questionsPerChapter,
    simulateurQuestions,
    activeChapter,
    setQuestions,
  } = props;
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [timeExpiredModalVisible, setTimeExpiredModalVisible] = useState(false);
  const { setAlert } = useAlert();
  const saveResults = async () => {
    setLoading(true);
    try {
      setAllVerifyToTrue(setQuestions);
      const simulateurQuestionsToStore = JSON.stringify(
        simulateurQuestions.map((chapter) => ({
          score: getScore(chapter.chapter_questions),
          ...chapter,
        }))
      );
      await AsyncStorage.setItem(
        "simulateurResults",
        simulateurQuestionsToStore
      );
      setAlert("Resultat enregistré!", "success");
      setActiveQuestion(0);
      setActiveChapter(0);
    } catch (error) {
      // console.log(error);
      setAlert("Resultat non enregistré!", "error");
    } finally {
      setLoading(false);
      setModalVisible(false);
      setTimeExpiredModalVisible(() => false);
    }
  };
  useImperativeHandle(ref, () => ({
    async saveResults() {
      setTimeExpiredModalVisible(true);
    },
  }));
  useEffect(() => {
    timeExpiredModalVisible && saveResults();
  }, [timeExpiredModalVisible]);
  return (
    <View className="mt-auto px-2 py-3 flex flex-row">
      <TouchableOpacity
        disabled={activeQuestion == 0 && activeChapter == 0}
        onPress={() => {
          if (activeChapter != 0) {
            setActiveChapter((prev) => prev - 1);
            setActiveQuestion(() => questionsPerChapter - 1);
          } else setActiveQuestion((prev) => prev - 1);
        }}
        className={
          "p-4 mr-2 rounded-[30px] " +
          (activeQuestion == 0 && activeChapter == 0
            ? "bg-gray-400"
            : "bg-[#1068BB]")
        }
        style={{ elevation: 3 }}
      >
        <Text className="font-semibold text-white text-base">PRÉCÉDENTE</Text>
      </TouchableOpacity>
      <View className="flex-1 flex flex-row justify-end">
        {activeChapter == simulateurQuestions.length - 1 &&
        activeQuestion == chapterQuestions.length - 1 ? (
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            className="p-4 px-5 rounded-[30px] bg-white"
            style={{ elevation: 3 }}
          >
            <Text className="font-semibold text-primary text-base">
              TERMINER
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              if (activeQuestion == chapterQuestions.length - 1) {
                setActiveChapter((prev) => prev + 1);
                setActiveQuestion(0);
              } else setActiveQuestion((prev) => prev + 1);
            }}
            className="p-4 px-5 rounded-[30px] bg-[#1068BB]"
            style={{ elevation: 3 }}
          >
            <Text className="font-semibold text-white text-base">SUIVANTE</Text>
          </TouchableOpacity>
        )}
      </View>
      <SubmitModal
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        endTest={saveResults}
        loading={loading}
      />
      <TimeExpiredModal modalVisible={timeExpiredModalVisible} />
    </View>
  );
};

export default forwardRef(SimulateurFooter);

const setAllVerifyToTrue = (
  setQuestions: React.Dispatch<
    React.SetStateAction<Simulateur_Chapter_Question[]>
  >
) => {
  setQuestions((prevQuestions) =>
    prevQuestions.map((q) => ({
      ...q,
      chapter_questions: q.chapter_questions.map((question) => ({
        ...question,
        verify: true,
      })),
    }))
  );
};

const getScore = (questions: Simulateur_question[]) => {
  let score = 0;
  questions.map((q) => {
    questionVerifier(q.quiz_answers, q.user_answers) && score++;
  });
  return score;
};

export type SimulateurFooterProps = {
  activeQuestion: number;
  setActiveQuestion: React.Dispatch<React.SetStateAction<number>>;
  questionsPerChapter: number;
  chapterQuestions: UserAnswer[];
  setActiveChapter: React.Dispatch<React.SetStateAction<number>>;
  simulateurQuestions: Simulateur_Chapter_Question[];
  activeChapter: number;
  setQuestions: React.Dispatch<
    React.SetStateAction<Simulateur_Chapter_Question[]>
  >;
};

export type SimulateurFooterHandle = { saveResults(): void };
