import { SimpleLineIcons } from "@expo/vector-icons";
import { YearModule } from "../data";
import { Text, TouchableOpacity, View } from "react-native";

export default function ModuleButton({
  module,
  onPress,
}: {
  module: YearModule;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View className="px-4 py-2 flex flex-row justify-between items-center border-b border-[#053F5C]">
        <View className="bg-white shadow-2xl">
          <Text className="text-gray-700 text-lg font-extrabold">
            {module.title}
          </Text>
          <Text className="text-gray-500 font-semibold text-base">
            cours: {module.courses.length}
          </Text>
        </View>
        <SimpleLineIcons name="arrow-right" size={24} color="#053F5C" />
      </View>
    </TouchableOpacity>
  );
}

{
  /* <View className="bg-orange-200 rounded-full w-12 h-12 flex justify-center items-center">
  <Text className="text-white font-semibold text-2xl">
    {module.courses.length}
  </Text>
</View> */
}
