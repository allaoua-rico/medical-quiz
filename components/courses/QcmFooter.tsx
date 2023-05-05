import { View, Text } from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, TouchableOpacity } from "react-native";
import { Answer, Question } from "./types";
import { Button, Modal } from "native-base";
import supabase from "../../utils/supabase";
import { Course } from "../../data";
import useAlert from "../shared/Alert/useAlert";
import * as SecureStore from "expo-secure-store";
// import { useFetchUserTakes } from "./functionsAndHooks";
import { questionVerifier } from "../../screens/Courses";

type Props = {
  activeQuestion: number;
  setActiveQuestion: React.Dispatch<React.SetStateAction<number>>;
  aq: any;
  questions: any[];
  setQuestions: React.Dispatch<React.SetStateAction<any[]>>;
  course: Course;
};

const QcmFooter = (props: Props) => {
  const {
    activeQuestion,
    setActiveQuestion,
    aq,
    questions,
    setQuestions,
    course,
  } = props;
  const [submitted, setSubmitted] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  // const { mutate: mutateTakes } = useFetchUserTakes(course);
  const { setAlert } = useAlert();
  const sendResult = async () => {
    try {
      setAllToVerify(questions, setQuestions);
      const user_answers = questions.map(
        ({
          question_id,
          selected_answers,
        }: {
          question_id: any;
          selected_answers: Answer[];
        }) =>
          selected_answers.map(({ answer_id }) => ({
            question_id,
            answer_id,
          }))
      );
      let { data, error } = await supabase
        .from("user_answers")
        .upsert(user_answers.flat(), { onConflict: "answer_id" })
        .select();
      const access_token =
        (await SecureStore.getItemAsync("accessToken")) || "";
      const {
        data: { user },
      } = await supabase.auth.getUser(access_token);
      if (user) {
        let { data: takeData, error: takeError } = await supabase
          .from("takes")
          .upsert(
            {
              score: getScore(questions),
              course_id: questions[0].course_id,
              course_title: course.title,
              user_id: user?.id,
            },
            { onConflict: "course_id" }
          )
          .select();
        if (error || takeError) throw error || takeError;
        if (data && takeData) {
          setModalVisible(false);
          setAlert("Resultat enregistré!", "success");
        }
        // mutateTakes();
        setSubmitted(true);
        setActiveQuestion(0);
      }
    } catch (error) {
      setModalVisible(false);
      setAlert("Resultat non enregistré!", "error");
    }
  };
  const endTest = () => {
    sendResult();
  };
  return (
    <View className="mt-auto px-2 py-4 flex flex-row">
      {!submitted && (
        <Pressable
          disabled={aq?.verify}
          onPress={() => setToVerify(aq, questions, setQuestions)}
          className="p-4 bg-primary rounded-[30px]"
          style={{ elevation: 3 }}
        >
          <Text className="font-semibold text-white text-base">Valider</Text>
        </Pressable>
      )}
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
          submitted ? (
            <View className="p-2 px-5 rounded-[30px] " style={{ elevation: 3 }}>
              <Text className="font-semibold">Fin</Text>
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              className="p-4 px-5 rounded-[30px] bg-white"
              style={{ elevation: 3 }}
            >
              <Text className="font-semibold text-primary text-base">Terminer</Text>
            </TouchableOpacity>
          )
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
            {/* <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color={activeQuestion == questions.length - 1 ? "" : "#0C4E8C"}
            /> */}
          </TouchableOpacity>
        )}
      </View>
      <SubmitModal
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        endTest={endTest}
      />
    </View>
  );
};

const SubmitModal = ({
  setModalVisible,
  modalVisible,
  endTest,
}: SubmitModalProps) => {
  return (
    <Modal
      isOpen={modalVisible}
      onClose={() => setModalVisible(false)}
      size="sm"
    >
      <Modal.Content maxH="212">
        <Modal.Body className="py-7">
          <Text className="text-lg">
            Voulez-vous terminer le QCM et enregister votre résultat ?
          </Text>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button
              variant="ghost"
              colorScheme="blueGray"
              onPress={() => setModalVisible(false)}
            >
              Cancel
            </Button>
            <Button className="px-5" onPress={endTest}>
              Oui
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
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

type SubmitModalProps = {
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  modalVisible: boolean;
  endTest: () => void;
};
