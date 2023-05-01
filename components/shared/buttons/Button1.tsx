import { Text, TouchableOpacity } from "react-native";

export default function Button1({
  title,
  onPress,
}: {
  title: string;
  onPress: any;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-[#0C4E8C] rounded-[40px]
      py-10 px-8"
    >
      <Text className="text-white text-4xl line font-medium text-center">
        {title}
      </Text>
    </TouchableOpacity>
  );
}
