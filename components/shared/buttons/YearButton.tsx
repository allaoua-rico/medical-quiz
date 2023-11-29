import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SimpleLineIcons } from "@expo/vector-icons";
import LockSvg from "../../../assets/images/material-symbols_lock-outline_gray.svg";

export default function YearButton({
  text,
  onPress,
  isLocked = false,
}: YearButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} disabled={isLocked} className="my-2">
      <View className="px-4 py-2 flex flex-row justify-between items-center border-b border-[#053F5C]">
        <View className="bg-white shadow-2xl">
          <Text
            className="text-gray-700 text-lg font-extrabold"
            style={{ color: `rgba(55, 65, 81,${isLocked ? 0.5 : 1})` }}
          >
            {text}
          </Text>
        </View>
        {isLocked ? (
          <LockSvg color={"black"} />
        ) : (
          <SimpleLineIcons name="arrow-right" size={24} color="#053F5C" />
        )}
      </View>
    </TouchableOpacity>
  );
}

type YearButtonProps = {
  text: string;
  onPress: () => void;
  isLocked?: boolean;
};
