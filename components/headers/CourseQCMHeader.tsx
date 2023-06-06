import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { HomeStackScreenProps } from "../../types";
import ExitSVG from "../../assets/images/qcm_exit.svg";
import FavoritSVG from "../../assets/images/qcm_favorit.svg";
import QuestionMarkSVG from "../../assets/images/qcm_question_mark.svg";
import supabase from "../../utils/supabase";
import { getUserId, useFavoritStatus } from "../courses/functionsAndHooks";
import useAlert from "../shared/Alert/useAlert";
import { addQuestionToFav } from "../SimulateurFunctions";

interface CourseQCMHeaderProps extends HomeStackScreenProps<"CourseQCM"> {
  question_id: string;
}

export default function CourseQCMHeader({
  navigation,
  question_id,
}: CourseQCMHeaderProps) {
  const { setAlert } = useAlert();
  // console.log("aq",aq)
  const { favStatus, mutate } = useFavoritStatus(question_id);

  return (
    <View className="bg-white flex-row justify-between">
      <TouchableOpacity style={{ padding: 3 }} onPress={navigation.goBack}>
        <ExitSVG />
      </TouchableOpacity>
      <View className="flex-row space-x-3">
        <TouchableOpacity>
          <QuestionMarkSVG />
        </TouchableOpacity>
        <View>
          <TouchableOpacity
            className={"rounded-full " + (favStatus ? "bg-yellow-300" : "")}
            onPress={() => addQuestionToFav(question_id, mutate, setAlert)}
          >
            <FavoritSVG />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
