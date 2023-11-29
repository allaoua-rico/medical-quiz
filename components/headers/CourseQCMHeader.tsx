import { View, TouchableOpacity } from "react-native";
import React from "react";
import { HomeStackScreenProps } from "../../types";
import ExitSVG from "../../assets/images/qcm_exit.svg";
import FavoritSVG from "../../assets/images/qcm_favorit.svg";
import { useFavoritStatus } from "../courses/functionsAndHooks";
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
  const { favStatus, mutate } = useFavoritStatus(question_id);

  return (
    <View className="bg-white flex-row justify-between">
      <TouchableOpacity style={{ padding: 3 }} onPress={navigation.goBack}>
        <ExitSVG fill="black" style={{ opacity: 81 }} />
      </TouchableOpacity>
      <View className="flex-row space-x-3">
        {/* <TouchableOpacity>
          <QuestionMarkSVG />
        </TouchableOpacity> */}
        <View>
          <TouchableOpacity
            className={"rounded-full " + (favStatus ? "bg-yellow-300" : "")}
            onPress={() => addQuestionToFav(question_id, mutate, setAlert)}
          >
            <FavoritSVG fill="black" style={{ opacity: 81 }} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
