import { Text, View } from "./Themed";
import yearsModules, { YearModule } from "../data";
import { TouchableOpacity } from "react-native";
import { Shadow } from "react-native-shadow-2";

export default function ModuleButton({
  key,
  module,
  navigation,
  navToView,
}: {
  key: string;
  module: YearModule;
  navigation: any;
  navToView: string;
}) {
  return (
    <View className="my-4" key={key}>
      <Shadow stretch distance={5} offset={[0, 4]} startColor="#00000008">
        <View
          style={{ borderRadius: 10 }}
          className="rounded-lg overflow-hidden"
        >
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(navToView, { module })
            }
          >
            <View className="p-4 flex flex-row justify-between">
              <View className="flex flex-row items-center">
                <View className="bg-gray-100 w-12 h-12 mr-4 rounded-full" />
                <View className="bg-white shadow-2xl ">
                  <Text className="text-gray-700 text-lg font-extrabold">
                    {module.title}
                  </Text>
                  <Text className="text-gray-500 font-semibold text-base">
                    cours: {module.courses.length}
                  </Text>
                </View>
              </View>
              <View className="bg-orange-200 rounded-full w-12 h-12 flex justify-center items-center">
                <Text className="text-white font-semibold text-2xl">
                  {module.courses.length}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </Shadow>
    </View>
  );
}
