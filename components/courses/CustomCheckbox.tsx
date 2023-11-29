import { View } from "react-native";
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
          ? `bg-green-500 border-green-500`
          : status == "wrong"
          ? `bg-red-500 border-red-500`
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
  right: "#00ff00",
  wrong: "#ff0000",
};
