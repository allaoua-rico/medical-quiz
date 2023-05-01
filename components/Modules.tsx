import { HomeStackScreenProps } from "../types";
import { ScrollView, Text, View } from "react-native";
import { TouchableOpacity } from "react-native";
import { Shadow } from "react-native-shadow-2";
import { Course } from "../data";
import HomeWrapperImg from "./layout/HomeWrapperImg";
import {
  useFetchQuestions,
  useFetchUserTakes,
} from "./courses/functionsAndHooks";
import { Spinner } from "native-base";
import { useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";

export default function Modules({
  route,
  navigation,
}: HomeStackScreenProps<"Modules">) {
  const { module } = route?.params;
  return (
    <HomeWrapperImg>
      <ScrollView className="w-full mx-auto px-4">
        {module.courses?.map((course, i) => (
          <CourseButton
            key={`${module?.title}_${i}`}
            course={course}
            navigation={navigation}
            navToView="Courses"
          />
        ))}
      </ScrollView>
    </HomeWrapperImg>
  );
}

function CourseButton({
  course,
  navigation,
  navToView,
}: {
  course: Course;
  navigation: any;
  navToView: string;
}) {
  const { questions } = useFetchQuestions(course);
  const { takes, isLoading: loadingTake } = useFetchUserTakes(course);
  // useEffect(() => {
  //   console.log("takes",takes?.[0]);
  // }, [takes]);

  return (
    <View className="my-4">
      <Shadow stretch distance={5} offset={[0, 4]} startColor="#00000008">
        <View
          style={{ borderRadius: 10 }}
          className="rounded-lg overflow-hidden bg-white"
        >
          <TouchableOpacity
            onPress={() => navigation.navigate(navToView, { course })}
          >
            <View className="px-3 py-4 flex flex-row justify-between items-center max-w-max">
              <View className="flex flex-row items-center">
                <View className="bg-gray-100 rounded-full w-12 h-12" />
                <View className="shadow-2xl flex-wrap flex-1 ml-4 mr-[3px]">
                  <View className="flex flex-row">
                    <Text className="text-gray-700 text-lg font-extrabold flex-wrap flex-1">
                      {course.title}
                    </Text>
                  </View>
                  <Text className="text-gray-500 font-semibold text-base flex-wrap flex-1">
                    questions: {questions.length || ""}
                  </Text>
                </View>
                <View className="bg-orange-200 rounded-full w-12 h-12 flex justify-center items-center">
                  {loadingTake ? (
                    <Spinner
                      accessibilityLabel="Loading take"
                      color="white"
                      size="sm"
                      className="my-auto"
                    />
                  ) : (
                    <Text className="text-white font-semibold text-2xl">
                      {takes?.[0]?.score}
                    </Text>
                  )}
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </Shadow>
    </View>
  );
}
