import { Text, TouchableOpacity } from "react-native";
import LockSvg from "../../../assets/images/material-symbols_lock-outline.svg";
import { hexToRgba } from "../../courses/functionsAndHooks";

export default function Button2({
  title,
  onPress,
  color,
  isLocked,
}: {
  title: string;
  color: string;
  onPress: any;
  isLocked?: boolean;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-[#0C4E8C] rounded-[10px]
      py-10 px-8 flex-row justify-center items-center"
      style={{
        backgroundColor: hexToRgba(color, isLocked ? 0.5 : 1),
        columnGap: 8,
      }}
      disabled={isLocked}
    >
      <Text
        className="text-white text-3xl text-center"
        style={{
          fontFamily: "Anton-Regular",
          fontWeight: "400",
          fontSize: 32,
          lineHeight: 48,
        }}
      >
        {title}
      </Text>
      {isLocked && <LockSvg />}
    </TouchableOpacity>
  );
}

