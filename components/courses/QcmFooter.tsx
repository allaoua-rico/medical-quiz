import { View, Text } from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, TouchableOpacity } from "react-native";
import { Answer, Question } from "./types";
import { Button, Modal } from "native-base";
import supabase from "../../utils/supabase";
import { Course } from "../../data";
import useAlert from "../shared/Alert/useAlert";

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
  const [modalVisible, setModalVisible] = useState(false);
  const { setAlert } = useAlert();

  const sendResult = async () => {
    try {
      const user_answers = questions.map(
        ({
          question_id,
          selected_answers,
        }: {
          question_id: any;
          selected_answers: Answer[];
        }) => {
          return selected_answers.map(({ answer_id }) => ({
            question_id,
            answer_id,
          }));
        }
      );
      let { data, error } = await supabase
        .from("user_answers")
        .upsert(user_answers.flat(), { onConflict: "answer_id" })
        .select();
      if (error) throw error;
      if (data) {
        setModalVisible(false);
        setAlert("Resultat enregistré!", "success");
      }
    } catch (error) {
      setAlert("Resultat non enregistré!", "error");
    }
  };

  const endTest = () => {
    getScore(questions);
    sendResult();
  };
  return (
    <View className="mt-auto px-2 py-4 flex flex-row">
      <Pressable
        disabled={aq?.verify}
        onPress={() => setToVerify(aq, questions, setQuestions)}
        className="p-2 bg-white rounded-lg border border-gray-100"
      >
        <Text className="font-semibold">Verifier</Text>
      </Pressable>
      <View className="flex-1 flex flex-row justify-end">
        <TouchableOpacity
          disabled={activeQuestion == 0}
          onPress={() => setActiveQuestion((prev) => prev - 1)}
          className={
            "p-2 mr-2 rounded-lg border border-gray-100 " +
            (activeQuestion == 0 ? "bg-gray-300 border-white" : "bg-white")
          }
        >
          <MaterialIcons name="keyboard-arrow-left" size={24} color="black" />
        </TouchableOpacity>
        {activeQuestion == questions.length - 1 ? (
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            className="p-2 px-5 rounded-lg border bg-blue-300 border-gray-100"
          >
            <Text className="font-semibold">Terminer</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            disabled={activeQuestion == questions.length - 1}
            onPress={() => setActiveQuestion((prev) => prev + 1)}
            className="p-2 px-5 rounded-lg border bg-blue-300 border-gray-100"
          >
            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color={activeQuestion == questions.length - 1 ? "" : "white"}
            />
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

type SubmitModalProps = {
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  modalVisible: boolean;
  endTest: () => void;
};

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

const getScore = (questions: any[]) => {
  let score = 0;
  questions.map((q) => {
    let correct = true;
    q.answers.find((answer: Answer) => {
      // verify if the correct answers are selected
      const isSelected = q.selected_answers.find(
        (selected_a: Answer) => selected_a.answer_id == answer.answer_id
      );
      if (!answer.Correct && isSelected) correct = false;
      if (answer.Correct && !isSelected) correct = false;
    });
    correct && score++;
  });
  return score;
};
