import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { HomeStackScreenProps } from "../../types";
import ExitSVG from "../../assets/images/qcm_exit.svg";
import FavoritSVG from "../../assets/images/qcm_favorit.svg";
import QuestionMarkSVG from "../../assets/images/qcm_question_mark.svg";
import supabase from "../../utils/supabase";
import { getUserId, useFavoritStatus } from "../courses/functionsAndHooks";
import useAlert from "../shared/Alert/useAlert";

interface SimulateurHeaderProps extends HomeStackScreenProps<"Simulateur"> {
  question_id: string;
}

export default function SimulateurHeader({
  navigation,
  question_id,
}: SimulateurHeaderProps) {
  const { setAlert } = useAlert();
  // console.log("aq",aq)
  const { favStatus, mutate } = useFavoritStatus(question_id);
  async function addQuestionToFav(question_id: string) {
    // console.log(question_id);
    try {
      const user_id = await getUserId();
      const { data } = await supabase
        .from("user_favorites")
        .upsert(
          { user_id, question_id },
          { onConflict: "user_id, question_id", ignoreDuplicates: false }
        )
        .select();
      console.log("data", data);
      mutate();
      setAlert("Favoris ajouté!", "success");
    } catch (error) {
      console.log("error", error);
      setAlert("Favoris non ajouté!", "error");
    }
  }
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
            onPress={() => addQuestionToFav(question_id)}
          >
            <FavoritSVG />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
