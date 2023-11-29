import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { YearModule, Course } from "./data";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
  // CourseQCM: { course: Course };
  Login: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  Home: undefined;
  Fav: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;

//////////    Home   /////////

export type HomeStackScreenProps<Screen extends keyof HomeStackParamList> =
  NativeStackScreenProps<HomeStackParamList, Screen>;

export type HomeStackParamList = {
  HomeRoot: NavigatorScreenParams<RootTabParamList> | undefined;
  UserModal: undefined;
  Externat: {
    // title: string;
  };
  Residanat: {
    title: string;
  };
  MainCours: {
    // title: string;
  };
  ResidanatQCM: undefined;
  ModulesList: {
    title: string;
    modules: YearModule[];
    navArr: string[];
  };
  Modules: {
    module: YearModule;
    navArr: string[];
  };
  Courses: { course: Course };
  CourseQCM: {
    course: Course;
    questionIndex: number;
    FavQuestion?: string | null;
  };
  Simulateur: {};
  Resultats: {};
  CoursDownload: { course: Course };
};

// export type ModulesListParamList = {
//   title: string;
// };
