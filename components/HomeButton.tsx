import { Text } from "./Themed";
import { LinearGradient } from "expo-linear-gradient";
import { LightenDarkenColor } from "../utils/functions";
import { TouchableOpacity } from "react-native";
import { View } from "react-native";

export default function HomeButton({
  title,
  description,
  Icon,
  link,
  bgColor,
  navigation,
  key,
}: {
  title: string;
  description: string;
  Icon: any;
  link: string;
  bgColor: string;
  navigation: any;
  key: any;
}) {
  return (
    <View className="my-8" >
      <TouchableOpacity onPress={() => navigation.navigate(link)}>
        <LinearGradient
          colors={[bgColor, LightenDarkenColor(bgColor, 30)]}
          className="w-full h-48 p-5 rounded-3xl flex justify-start"
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={{ elevation: 5 }}
        >
          <Text className="text-white text-3xl font-medium">{title}</Text>
          <Text className="text-white text-lg font-semibold mt-4">
            {description}
          </Text>
          <View className="bg-transparent absolute right-1 -bottom-7">
            {Icon}
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}
