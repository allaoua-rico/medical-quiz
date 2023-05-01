import { Image, ScrollView, View } from "react-native";
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
    <ScrollView className="w-full min-h-screen bg-white">
      {/* <Image
        source={require("../../images/header.png")}
        className="w-full bg-transparent h-80"
      /> */}
      {/* <Button
        onPress={() => authContext?.signOut()}
        colorScheme="pink"
        className="w-fit mx-auto absolute right-0 mr-4"
        style={{ top }}
      >
        Déconnexion
      </Button> */}
      <View className="flex justify-center items-center">{children}</View>
    </ScrollView>
  );
}
