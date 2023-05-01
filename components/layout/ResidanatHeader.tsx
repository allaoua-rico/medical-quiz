import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { RouteProp } from "@react-navigation/native";
import { HomeStackParamList } from "../../types";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  route: RouteProp<HomeStackParamList, keyof HomeStackParamList>;
  navigation: any;
};

const ResidanatHeader = (props: Props) => {
  const { navigation, route } = props;
  const { top } = useSafeAreaInsets();
  return (
    <View className="h-60 relative
    flex flex-row items-center bg-[#0C4E8C9C] 
    pl-3
    ">
      <TouchableOpacity style={{ padding: 10 }} onPress={navigation.goBack}>
        <SimpleLineIcons name="arrow-left" size={24} color="white" />
      </TouchableOpacity>
      <Text className="text-3xl text-white">{route.name}</Text>
      <Image
        source={require("../../assets/images/residanatHeader.png")}
        className="bg-transparent absolute opacity-60 right-0"
        resizeMode="contain"
        style={{ top }}
      />
    </View>
  );
};

export default ResidanatHeader;
