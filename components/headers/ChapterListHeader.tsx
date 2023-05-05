import React from "react";
import { Text, View } from "react-native";
import { HomeStackScreenProps } from "../../types";
import BackButton from "../shared/buttons/BackButton";

const ChapterListHeader = ({
  route,
  navigation,
}: HomeStackScreenProps<"ChapterList">) => {
  return (
    <View
      className="pt-20 pb-16 relative rounded-b-[20px]
  flex flex-row items-center bg-primary pl-3"
    >
      <BackButton navigation={navigation} />
      <Text className="text-3xl text-white">{route?.params?.title}</Text>
    </View>
  );
};

export default ChapterListHeader;
