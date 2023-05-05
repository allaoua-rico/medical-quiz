import { HomeStackScreenProps } from "../types";
import { ScrollView, Text, View } from "react-native";
import { TouchableOpacity } from "react-native";
import { Shadow } from "react-native-shadow-2";
import { Course } from "../data";
import {
  useFetchQuestions,
  useFetchUserAnswers,
  // useFetchUserTakes,
  // useFetchUserTakes,
} from "../components/courses/functionsAndHooks";
import { Spinner } from "native-base";
import { getScore2 } from "../components/headers/CourseHeader";

let colorsIndex = 0;
export default function Modules({
  route: {
    params: { module },
  },
  navigation,
}: HomeStackScreenProps<"Modules">) {
  return (
    <ScrollView className="flex-1 px-4">
      {module.courses?.map((course, i) => {
        colorsIndex = ++colorsIndex < buttonColors.length ? colorsIndex : 0;
        return (
          <CourseButton
            key={`${module?.title}_${i}`}
            course={course}
            navigation={navigation}
            backgroundColor={buttonColors[colorsIndex]}
          />
        );
      })}
    </ScrollView>
  );
}

function CourseButton({
  course,
  navigation,
  backgroundColor,
}: {
  course: Course;
  navigation: any;
  backgroundColor: string;
}) {
  // make a simple "questions" fetcher with swr
  const { questions } = useFetchQuestions(course);
  // const { takes, isLoading: loadingTake } = useFetchUserTakes(course);
  const { userAnswers, isLoading: isLoadingUserAnswers } =
    useFetchUserAnswers(course);
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
            onPress={() => navigation.navigate("Courses", { course })}
          >
            <View
              className="px-3 py-4 flex flex-row justify-between items-center max-w-max"
              style={{ backgroundColor }}
            >
              <View className="shadow-2xl flex-wrap flex-1 ml-4 mr-[3px]">
                <View className="flex flex-row">
                  <Text className="text-white text-xl font-extrabold flex-wrap flex-1">
                    {course.title}
                  </Text>
                </View>
                <Text className="text-dark_text font-semibold text-base flex-wrap flex-1">
                  questions: {questions.length || ""}
                </Text>
              </View>
              <View className="bg-[#fff]/40	rounded-full w-14 h-14 flex justify-center items-center">
                {isLoadingUserAnswers ? (
                  <Spinner
                    accessibilityLabel="Loading take"
                    color="white"
                    size="sm"
                    className="my-auto"
                  />
                ) : (
                  <Text className="text-white font-semibold text-xl">
                    {/* {takes?.[0]?.score} */}
                    {getScore2(userAnswers)}/{userAnswers.length}
                  </Text>
                )}
                {/* <Text className="text-white font-semibold text-2xl">120</Text> */}
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </Shadow>
    </View>
  );
}

const buttonColors = ["#053F5C", "#429EBD", "#9FE7F5"];
