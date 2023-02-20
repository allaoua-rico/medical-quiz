import { Text, TouchableOpacity, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { ImageBackground } from "react-native";

export default function ChapterButton({
  title,
  navigation,
  source,
}: {
  title: string;
  navigation: any;
  source: any;
}) {
  return (
    <View className="w-full my-4">
      <ImageBackground className="w-full h-20" source={source} resizeMode="stretch" >
        <TouchableOpacity
          onPress={() => navigation.navigate("ChapterList", { title })}
        >
          <View className="flex flex-row justify-end p-5">
            <Text className="text-white mx-auto text-2xl font-semibold">
              {title}
            </Text>
            <Entypo name="arrow-with-circle-right" size={40} color="white" />
          </View>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}
