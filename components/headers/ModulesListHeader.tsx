import React from "react";
import { Text, View } from "react-native";
import { HomeStackScreenProps } from "../../types";
import BackButton from "../shared/buttons/BackButton";

const ModulesListHeader = ({
  route,
  navigation,
}: HomeStackScreenProps<"ModulesList">) => {
  return (
    <View className="pt-12 pb-8 pl-3 relative rounded-b-[20px] flex flex-row items-center bg-primary">
      <BackButton navigation={navigation} />
      <Text className="text-3xl text-white">{route?.params?.title}</Text>
    </View>
  );
};

export default ModulesListHeader;
