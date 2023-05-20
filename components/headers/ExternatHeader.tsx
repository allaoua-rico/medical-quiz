import { View, Text } from "react-native";
import React from "react";
import BackButton from "../shared/buttons/BackButton";
import { HomeStackScreenProps } from "../../types";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import DoctorSvg from "../../assets/images/undraw_doctors_p6aq.svg";

export default function ExternatHeader({
  route,
  navigation,
}: HomeStackScreenProps<"Externat">) {
  const { top } = useSafeAreaInsets();
  return (
    <View
      className="overflow-hidden pt-20 pb-16 relative rounded-b-[20px] 
    flex flex-row items-center bg-primary pl-3 pr-5"
    >
      <BackButton navigation={navigation} />
      <Text className="text-3xl text-white">EXTERNAT</Text>
      <View
        className="absolute -z-10"
        style={{ top, left: -20, overflow: "hidden" }}
      >
        <DoctorSvg height={200} />
      </View>
    </View>
  );
}
