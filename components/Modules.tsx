import { HomeStackScreenProps } from "../types";
import { ScrollView, Text, View } from "react-native";
import { TouchableOpacity } from "react-native";
import { useEffect } from "react";
import { Shadow } from "react-native-shadow-2";
import { Course } from "../data";
import HomeWrapperImg from "./layout/HomeWrapperImg";

export default function Modules({
  route,
  navigation,
}: HomeStackScreenProps<"Modules">) {
  const { module } = route?.params;
  useEffect(() => {
    navigation.setOptions({ title: module.title });
  }, [module]);
  return (
    <HomeWrapperImg>
      <ScrollView className="w-full mx-auto px-8">
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
            <View className="p-4 flex flex-row justify-between max-w-max">
              <View className="flex flex-row items-center">
                <View className="bg-gray-100 w-12 h-12 mr-4 rounded-full" />
                <View className="bg-white shadow-2xl flex">
                  <Text className="text-gray-700 text-lg font-extrabold max-w-[200px]">
                    {course.title}
                  </Text>
                  <Text className="text-gray-500 font-semibold text-base">
                    questions:
                  </Text>
                </View>
              </View>
              <View className="bg-orange-200 rounded-full w-12 h-12 flex justify-center items-center" />
            </View>
          </TouchableOpacity>
        </View>
      </Shadow>
    </View>
  );
}
