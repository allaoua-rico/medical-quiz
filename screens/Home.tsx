import { HomeStackParamList } from "../types";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ModulesList from "./ModulesList";
import Modules from "./Modules";
import HomeRoot from "./HomeRoot";
import ResidanatHeader from "../components/headers/ResidanatHeader";
import Residanat from "../components/Residanat";
import ModulesListHeader from "../components/headers/ModulesListHeader";
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
import UserModal from "./UserModal";

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function Home() {
  return (
    <Stack.Navigator
      initialRouteName="HomeRoot"
      screenOptions={{
        contentStyle: {
          backgroundColor: "#ffffff",
        },
      }}
    >
      <Stack.Group>
        <Stack.Screen
          name="HomeRoot"
          component={HomeRoot}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UserModal"
          component={UserModal}
          options={{
            headerShown: false,
            presentation: "transparentModal",
            animation: "slide_from_bottom",
            contentStyle: {
              backgroundColor: "transparent",
            },
          }}
        />
      </Stack.Group>
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
      <Stack.Screen
        name="ModulesList"
        component={ModulesList}
        options={(props) => ({
          header: () => <ModulesListHeader {...props} />,
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
