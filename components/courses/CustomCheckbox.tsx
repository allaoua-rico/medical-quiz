import { View, Text } from "react-native";
import React from "react";
import WrongSVG from "../../assets/images/wrong.svg";
import RightSVG from "../../assets/images/right.svg";

export default function CustomCheckbox({
  checked,
  status,
  theme,
}: {
  checked: Boolean;
  status: "right" | "wrong" | "neutral";
  theme: "dark" | "light";
}) {
  return checked ? (
    <View
      className={
        "border-[3px] rounded-full w-[30px] h-[30px] justify-center items-center border-primary " +
        (status == "right"
          ? `bg-[${answerColor.right}] border-[${answerColor.right}]`
          : status == "wrong"
          ? `bg-[${answerColor.wrong}] border-[${answerColor.wrong}]`
          : theme == "light"
          ? "bg-primary"
          : "bg-[#0C81E4] border-[#0C81E4]")
      }
    >
      {status == "right" || status == "neutral" ? <RightSVG /> : <WrongSVG />}
    </View>
  ) : (
    <View
      className={
        "border-[3px] rounded-full w-[30px] h-[30px] " +
        (theme == "light" ? "border-primary" : "border-[#0C81E4]")
      }
    ></View>
  );
}

export const answerColor = {
  right: "#00FF00",
  wrong: "#FF0000",
};
