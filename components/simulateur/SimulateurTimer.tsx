import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import useTimer from "easytimer-react-hook";
import { LinearGradient } from "expo-linear-gradient";

type Duree = { seconds: number; minutes: number };

export default function SimulateurTimer({ endTest }: { endTest: () => any }) {
  const duree: Duree = {
    seconds: 0,
    minutes: 10,
  };
  const [timer] = useTimer({
    countdown: true,
    startValues: duree,
    updateWhenTargetAchieved: false,
  });
  const [isTargetAchieved, setIsTargetAchieved] = useState(false);
  const dureeInSec: number = duree.seconds + duree.minutes * 60;
  const dureeRestante: Duree = timer.getTimeValues();
  const dureeRestanteInSec: number = isTargetAchieved
    ? 0
    : dureeRestante.seconds + dureeRestante.minutes * 60;
  timer.start();
  useEffect(() => {
    timer.addEventListener("targetAchieved", () => {
      setIsTargetAchieved(true);
    });
  }, []);
  useEffect(() => {
    isTargetAchieved && endTest();
  }, [isTargetAchieved]);

  return isTargetAchieved ? (
    <View></View>
  ) : (
    <View className="border-[3px] border-white rounded-[30px] mt-3 flex-row items-center">
      <LinearGradient
        colors={["#4FE7AF", "#0C81E4"]}
        className="border-r-[3px] -mr-[3px] border-white rounded-[30px] p-4 py-5 w-full"
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={{
          width: `${Math.round((dureeRestanteInSec / dureeInSec) * 100)}%`,
        }}
      ></LinearGradient>
      <View className="absolute w-full">
        {isTargetAchieved ? (
          <Text className="font-medium text-base text-center text-white">
            Temps écoulé!!
          </Text>
        ) : (
          <Text className="font-medium text-base text-center text-white">
            {timer.getTimeValues().toString(["minutes", "seconds"])}
          </Text>
        )}
      </View>
    </View>
  );
}
