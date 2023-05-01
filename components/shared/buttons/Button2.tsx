import { Text, TouchableOpacity } from "react-native";

export default function Button2({
  title,
  onPress,
  color,
}: {
  title: string;
  color: string;
  onPress: any;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-[#0C4E8C] rounded-[10px]
      py-10 px-8"
      style={{ backgroundColor: color }}
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
    </TouchableOpacity>
  );
}
