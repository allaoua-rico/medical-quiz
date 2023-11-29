import { HomeStackScreenProps } from "../types";
import { ScrollView } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { YearModule } from "../data";
import { Text, TouchableOpacity, View } from "react-native";

export default function ModulesList({
  route,
  navigation,
}: HomeStackScreenProps<"ModulesList">) {
  const { modules, navArr } = route.params;
  return (
    <ScrollView className="flex-1 px-4">
      {modules?.map((module, i) => (
        <ModuleButton
          key={`${module?.title}_${i}`}
          module={module}
          onPress={() => navigation.navigate("Modules", { module, navArr })}
        />
      ))}
    </ScrollView>
  );
}

function ModuleButton({
  module,
  onPress,
}: {
  module: YearModule;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity onPress={onPress} className="my-2">
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
