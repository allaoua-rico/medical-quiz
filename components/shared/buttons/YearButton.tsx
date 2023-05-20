import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SimpleLineIcons } from "@expo/vector-icons";

export default function YearButton({ text, onPress }: YearButtonProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View className="px-4 py-2 flex flex-row justify-between items-center border-b border-[#053F5C]">
        <View className="bg-white shadow-2xl">
          <Text className="text-gray-700 text-lg font-extrabold">{text}</Text>
        </View>
        <SimpleLineIcons name="arrow-right" size={24} color="#053F5C" />
      </View>
    </TouchableOpacity>
  );
}

type YearButtonProps = {
  text: string;
  onPress: () => void;
};
