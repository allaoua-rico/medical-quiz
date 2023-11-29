import { View, TouchableOpacity } from "react-native";
import React from "react";
import { HomeStackScreenProps } from "../../types";
import ExitSVG from "../../assets/images/qcm_exit.svg";
import FavoritSVG from "../../assets/images/qcm_favorit.svg";
import { useFavoritStatus } from "../courses/functionsAndHooks";
import useAlert from "../shared/Alert/useAlert";
import { addQuestionToFav } from "../SimulateurFunctions";

interface SimulateurHeaderProps extends HomeStackScreenProps<"Simulateur"> {
  question_id: string;
}

export default function SimulateurHeader({
  navigation,
  question_id,
}: SimulateurHeaderProps) {
  const { setAlert } = useAlert();
  const { favStatus, mutate } = useFavoritStatus(question_id);
  // console.log(question_id, favStatus);
  return (
    <View className="flex-row justify-between">
      <TouchableOpacity style={{ padding: 3 }} onPress={navigation.goBack}>
        <ExitSVG fill="white" style={{ opacity: 81 }} />
      </TouchableOpacity>
      <View className="flex-row space-x-3">
        {/* <TouchableOpacity>
          <QuestionMarkSVG fill="white" style={{ opacity: 81 }} />
        </TouchableOpacity> */}
        <View>
          <TouchableOpacity
            className={"rounded-full " + (favStatus ? "bg-yellow-300" : "")}
            onPress={() => addQuestionToFav(question_id, mutate, setAlert)}
          >
            <FavoritSVG fill="white" style={{ opacity: 81 }} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
