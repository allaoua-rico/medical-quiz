import { Image, ScrollView, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { LightenDarkenColor } from "../../utils/functions";
import { Button } from "native-base";
import { useAuth } from "../../auth/AuthProvider";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeWrapperImg({
  children,
}: {
  children: React.ReactNode;
}) {
  const { authContext } = useAuth();
  const { top } = useSafeAreaInsets();

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
        <Button
          onPress={() => authContext?.signOut()}
          colorScheme="pink"
          className="w-fit mx-auto absolute right-0 mr-4"
          style={{ top }}
        >
          Déconnexion
        </Button>
        <View className="flex justify-center items-center">{children}</View>
      </LinearGradient>
    </ScrollView>
  );
}
