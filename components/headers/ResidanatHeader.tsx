import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { HomeStackParamList } from "../../types";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BackButton from "../shared/buttons/BackButton";

type Props = {
  route: RouteProp<HomeStackParamList, keyof HomeStackParamList>;
  navigation: any;
};

const ResidanatHeader = (props: Props) => {
  const { navigation, route } = props;
  const { top } = useSafeAreaInsets();
  return (
    <View
      className="h-60 relative
    flex flex-row items-center bg-[#0C4E8C9C] pl-3"
    >
      <BackButton navigation={navigation} />
      <Text className="text-3xl text-white">{route.name}</Text>
      <Image
      
        alt="residanatHeaderImg"
        source={require("../../assets/images/residanatHeader.png")}
        className="bg-transparent absolute opacity-60 right-0"
        resizeMode="contain"
        style={{ top }}
      />
    </View>
  );
};

export default ResidanatHeader;
