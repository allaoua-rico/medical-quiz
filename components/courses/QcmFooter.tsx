import { View, Text } from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, TouchableOpacity } from "react-native";
import { Answer, Question } from "./types";
import { Button, Modal } from "native-base";
import supabase from "../../utils/supabase";
import { Course } from "../../data";

type Props = {
  activeQuestion: number;
  setActiveQuestion: React.Dispatch<React.SetStateAction<number>>;
  aq: any;
  questions: any[];
  setQuestions: React.Dispatch<React.SetStateAction<any[]>>;
  course: Course;
};

const QcmFooter = ({
  activeQuestion,
  setActiveQuestion,
  aq,
  questions,
  setQuestions,
  course,
}: Props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const setToVerify = (question: Question) => {
    const questionsCopy = [...questions];
    questionsCopy.map((q) => {
      if (q.question_id == question.question_id) q.verify = true;
    });
    setQuestions(questionsCopy);
  };
  console.log(questions.map((q) => q.answers));

  const sendResult = async () => {
    // console.log(
    //   questions.map(({ selected_answers }) => ({
    //     selected_answers,
    //   }))
    // );
    // try {
    //   let { data: quiz_questions, error } = await supabase
    //     .from("quiz_questions")
    //     .upsert(
    //       questions.map(({ question_id, selected_answers }) => ({
    //         question_id,
    //         selected_answers: selected_answers,
    //       }))
    //     );
    //   // .ilike("Module", course.title);
    //   console.log(quiz_questions);
    //   console.log("error", error);
    // } catch (error) {
    //   console.log(error);
    // }
  };
  const verifyResults = () => {
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
      console.log(correct);
      correct && score++;
    });
    console.log(score);
  };
  return (
    <View className="mt-auto px-2 py-4 flex flex-row">
      <Pressable
        disabled={aq?.verify}
        onPress={() => setToVerify(aq)}
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
        verifyResults={verifyResults}
      />
    </View>
  );
};

const SubmitModal = ({
  setModalVisible,
  modalVisible,
  verifyResults,
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
            <Button className="px-5" onPress={verifyResults}>
              Oui
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

type SubmitModalProps = {
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  modalVisible: boolean;
  verifyResults: () => void;
};

export default QcmFooter;
