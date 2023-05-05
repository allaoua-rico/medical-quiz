import React from "react";
import { Text, View } from "react-native";
import { HomeStackScreenProps } from "../../types";
import BackButton from "../shared/buttons/BackButton";

const ModuleHeader = ({
  route,
  navigation,
}: HomeStackScreenProps<"Modules">) => {
  return (
    <View className="pt-20 relative flex px-3 bg-white">
      <View className="flex-row items-center border-b border-b-underlineColor pb-5">
        <BackButton navigation={navigation} color="#616161" />
        <Text className="text-3xl font-medium text-dark_text">
          {route?.params.module?.title}
        </Text>
      </View>
    </View>
  );
};

export default ModuleHeader;
