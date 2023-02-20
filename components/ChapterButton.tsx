import { Text, View } from "../components/Themed";
import { LinearGradient } from "expo-linear-gradient";
import { LightenDarkenColor } from "../utils/functions";
import { TouchableOpacity } from "react-native";

export default function ChapterButton({
  title,
  description,
  Icon,
  link,
  bgColor,
  navigation,
}: {
  title: string;
  description: string;
  Icon: any;
  link: string;
  bgColor: string;
  navigation: any;
}) {
  return (
    <View className="my-4">
      <TouchableOpacity
        onPress={() => navigation.navigate("ChapterList", { title })}
      >
        <LinearGradient
          colors={[
            bgColor,
            LightenDarkenColor(bgColor, 30),
            LightenDarkenColor(bgColor, 70),
          ]}
          className="w-full h-48 p-5 rounded-3xl flex justify-end"
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={{ elevation: 5 }}
        >
          <View className="bg-transparent absolute right-0 top-0">{Icon}</View>
          <View className="bg-transparent">
            <Text className="text-gray-700 text-xs">{description}</Text>
            <Text className="text-gray-700 text-lg font-medium">{title}</Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}
