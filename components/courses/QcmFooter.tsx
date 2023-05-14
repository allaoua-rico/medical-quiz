import { View, Text } from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, TouchableOpacity } from "react-native";
import { Question, UserAnswer } from "./types";
import supabase from "../../utils/supabase";
import { Course } from "../../data";
import useAlert from "../shared/Alert/useAlert";
import { questionVerifier } from "../../screens/Courses";
import { getUserId, useFetchUserAnswers } from "./functionsAndHooks";
import SubmitModal from "./SubmitModal";

const QcmFooter = (props: Props) => {
  const {
    activeQuestion,
    setActiveQuestion,
    aq,
    questions,
    setQuestions,
    course,
    // updateQuestions,
  } = props;
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const { mutate: mutateUserAnswers } = useFetchUserAnswers(course);
  const { setAlert } = useAlert();
  const sendResult = async () => {
    setLoading(true);
    try {
      setAllToVerify(questions, setQuestions);
      const user_id = await getUserId();
      console.log("user_id", user_id);
      if (user_id) {
        const user_answers = questions.map(({ question_id, user_answers }) =>
          user_answers.map(({ answer_id }) => ({
            question_id,
            answer_id,
            user_id,
          }))
        );
        await supabase
          .from("user_answers")
          .upsert(user_answers.flat(), { onConflict: "answer_id" });
        mutateUserAnswers();
        setAlert("Resultat enregistré!", "success");
        setActiveQuestion(0);
      }
      // if (user) {
      //   let { data: takeData, error: takeError } = await supabase
      //     .from("takes")
      //     .upsert(
      //       {
      //         score: getScore(questions),
      //         course_id: questions[0].course_id,
      //         course_title: course.title,
      //         user_id: user?.id,
      //       },
      //       { onConflict: "course_id" }
      //     )
      //     .select();
      //   if (error || takeError) throw error || takeError;
      //   if (data && takeData) {
      //     setModalVisible(false);
      //     setAlert("Resultat enregistré!", "success");
      //   }
      //   // mutateTakes();
      //   setLoading(true);
      //   setActiveQuestion(0);
      // }
    } catch (error) {
      setAlert("Resultat non enregistré!", "error");
    } finally {
      setLoading(false);
      setModalVisible(false);
    }
  };
  const endTest = () => {
    sendResult();
  };
  return (
    <View className="mt-auto px-2 py-4 flex flex-row">
      <Pressable
        disabled={aq?.verify}
        onPress={() => setToVerify(aq, questions, setQuestions)}
        className="p-4 bg-primary rounded-[30px]"
        style={{ elevation: 3 }}
      >
        <Text className="font-semibold text-white text-base">Valider</Text>
      </Pressable>
      <View className="flex-1 flex flex-row justify-end">
        {/* Prev button */}
        {activeQuestion != 0 && (
          <TouchableOpacity
            disabled={activeQuestion == 0}
            onPress={() => setActiveQuestion((prev) => prev - 1)}
            className="p-4 mr-2 rounded-[30px] bg-primary"
            style={{ elevation: 3 }}
          >
            <MaterialIcons name="keyboard-arrow-left" size={24} color="white" />
          </TouchableOpacity>
        )}
        {activeQuestion == questions.length - 1 ? (
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            className="p-4 px-5 rounded-[30px] bg-white"
            style={{ elevation: 3 }}
          >
            <Text className="font-semibold text-primary text-base">
              Terminer
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            disabled={activeQuestion == questions.length - 1}
            onPress={() => setActiveQuestion((prev) => prev + 1)}
            className="p-4 px-5 rounded-[30px] bg-white"
            style={{ elevation: 3 }}
          >
            <Text className="font-semibold text-primary text-base">
              Suivante
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <SubmitModal
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        endTest={endTest}
        loading={loading}
      />
    </View>
  );
};

export default QcmFooter;

const setToVerify = (
  question: Question,
  questions: any[],
  setQuestions: React.Dispatch<React.SetStateAction<any[]>>
) => {
  const questionsCopy = [...questions];
  questionsCopy.map((q) => {
    if (q.question_id == question.question_id) q.verify = true;
  });
  setQuestions(questionsCopy);
};

const setAllToVerify = (
  questions: any[],
  setQuestions: React.Dispatch<React.SetStateAction<any[]>>
) => {
  const questionsCopy = [...questions];
  questionsCopy.map((q) => {
    q.verify = true;
  });
  setQuestions(questionsCopy);
};

const getScore = (questions: any[]) => {
  let score = 0;
  questions.map((q) => {
    questionVerifier(q.quiz_answers, q.user_answers) && score++;
  });
  return score;
};

type Props = {
  activeQuestion: number;
  setActiveQuestion: React.Dispatch<React.SetStateAction<number>>;
  aq: any;
  questions: UserAnswer[];
  setQuestions: React.Dispatch<React.SetStateAction<any[]>>;
  course: Course;
  // updateQuestions: any;
};
