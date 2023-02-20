import { Image, ScrollView, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { LightenDarkenColor } from "../../utils/functions";

export default function HomeWrapperImg({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ScrollView className="w-full">
      <LinearGradient
        colors={["#87c9f6", LightenDarkenColor("#87c9f6", 30)]}
        className="min-h-screen"
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={{ elevation: 5 }}
      >
        <Image
          source={require("../../images/header.png")}
          className="w-full bg-transparent h-80"
        />
        <View className="flex justify-center items-center">{children}</View>
      </LinearGradient>
    </ScrollView>
  );
}
