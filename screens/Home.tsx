import { HomeStackParamList } from "../types";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChapterList from "./ChapterList";
import Modules from "./Modules";
import HomeRoot from "../components/HomeRoot";
import ResidanatHeader from "../components/headers/ResidanatHeader";
import Residanat from "../components/Residanat";
import ChapterListHeader from "../components/headers/ChapterListHeader";
import ModuleHeader from "../components/headers/ModuleHeader";
import CourseQCM from "../components/courses/CourseQCM";
import Courses from "./Courses";
import CourseHeader from "../components/headers/CourseHeader";
import ExternatHeader from "../components/headers/ExternatHeader";
import Externat from "../components/Externat";
import CoursHeader from "../components/headers/CoursHeader";
import MainCours from "./MainCours";
import CoursDownload from "./CoursDownload";
import Simulateur from "./Simulateur";
// import HomeWrapperImg from "../components/layout/HomeWrapperImg";
// import Résidanat from "../assets/images/residanatHeader.png"

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function Home() {
  return (
    <Stack.Navigator
      initialRouteName="HomeRoot"
      screenOptions={{
        contentStyle: {
          backgroundColor: "#ffffff",
          // paddingTop: 20,
          // paddingBottom: 20,
        },
      }}
    >
      <Stack.Screen
        name="HomeRoot"
        component={HomeRoot}
        options={{ headerShown: false }}
      />
      <Stack.Group>
        <Stack.Screen
          name="Residanat"
          component={Residanat}
          options={(props) => ({
            header: () => <ResidanatHeader {...props} />,
          })}
        />
        <Stack.Screen
          name="Externat"
          component={Externat}
          options={(props) => ({
            header: () => <ExternatHeader {...props} />,
          })}
        />
        <Stack.Screen
          name="MainCours"
          component={MainCours}
          options={(props) => ({
            header: () => <CoursHeader {...props} />,
          })}
        />
      </Stack.Group>
      <Stack.Screen
        name="CoursDownload"
        component={CoursDownload}
        options={(props) => ({
          headerShown: false,
        })}
      />
      {/* ResidanatSimulator */}
      {/* <Stack.Group>
        <Stack.Screen
          name="ResidanatSimulator"
          component={ResidanatSimulator}
          options={{ title: "Chapitres" }}
        />
      </Stack.Group> */}
      <Stack.Screen
        name="ChapterList"
        component={ChapterList}
        options={(props) => ({
          header: () => <ChapterListHeader {...props} />,
        })}
      />
      <Stack.Screen
        name="Modules"
        component={Modules}
        options={(props) => ({
          header: () => <ModuleHeader {...props} />,
        })}
      />
      <Stack.Screen
        name="Courses"
        component={Courses}
        options={(props) => ({
          header: () => <CourseHeader {...props} />,
        })}
      />
      <Stack.Screen
        name="CourseQCM"
        component={CourseQCM}
        options={(props) => ({
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="Simulateur"
        component={Simulateur}
        options={(props) => ({
          headerShown: false,
        })}
      />
    </Stack.Navigator>
  );
}
