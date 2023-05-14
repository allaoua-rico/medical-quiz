import { View, Text } from "react-native";
import React from "react";
import WrongSVG from "../../assets/images/wrong.svg";
import RightSVG from "../../assets/images/right.svg";

export default function CustomCheckbox({
  checked,
  status,
}: {
  checked: Boolean;
  status: "right" | "wrong" | "neutral";
}) {
  return checked ? (
    <View
      className={
        "border-[3px] rounded-full w-[30px] h-[30px] justify-center items-center border-primary " +
        (status == "right"
          ? `bg-[${answerColor.right}] border-[${answerColor.right}]`
          : status == "wrong"
          ? `bg-[${answerColor.wrong}] border-[${answerColor.wrong}]`
          : "bg-primary")
      }
    >
      {status == "right" || status == "neutral" ? <RightSVG /> : <WrongSVG />}
    </View>
  ) : (
    <View className="border-[3px] rounded-full w-[30px] h-[30px] border-primary"></View>
  );
}

export const answerColor = {
  right: "#00FF00",
  wrong: "#FF0000",
};
