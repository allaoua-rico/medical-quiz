import { Course, getChapterModules } from "../../data";
import { Answer, Question, UserAnswer } from "./types";
import { useState, useEffect } from "react";
import supabase from "../../utils/supabase";
import _, { isArray } from "lodash";
import useSWR from "swr";
import { isEmptyArray } from "formik";
import * as SecureStore from "expo-secure-store";
import useSWRImmutable from "swr/immutable";
import useAlert from "../shared/Alert/useAlert";

export const isSelected = (
  aq: UserAnswer | Simulateur_question,
  answer: Answer
) => {
  return aq?.user_answers.find(
    (el: Answer) => answer.answer_id == el.answer_id
  );
};

export function answerVerifier(
  aq: UserAnswer | Simulateur_question,
  answer: Answer
) {
  return aq?.verify
    ? isSelected(aq, answer) && answer.Correct
      ? "right"
      : (isSelected(aq, answer) && !answer.Correct) ||
        (!isSelected(aq, answer) && answer.Correct)
      ? "wrong"
      : "neutral"
    : "neutral";
}

// export function answerVerifierSimulateur(aq: Simulateur_question, answer: Answer) {
//   return aq?.verify
//     ? isSelected(aq, answer) && answer.Correct
//       ? "right"
//       : (isSelected(aq, answer) && !answer.Correct) ||
//         (!isSelected(aq, answer) && answer.Correct)
//       ? "wrong"
//       : "neutral"
//     : "neutral";
// }

export async function getUserId(): Promise<string> {
  // const access_token = (await SecureStore.getItemAsync("accessToken")) || "";
  // const { data } = await supabase.auth.getUser(access_token);
  // if (!data.user) throw new Error("vous devez vous authentifier de nouveau!");
  const user_id = await SecureStore.getItemAsync("user_id");
  if (!user_id) throw new Error("user_id not found");
  return user_id;
}

export function useGetProfile() {
  const { setAlert } = useAlert();
  async function fetcher() {
    try {
      const user_id = await getUserId();
      let { data, error, status } = await supabase
        .from("profiles")
        .select(
          `full_name,username,
        subscription(
          plan(plan_name),id
          )`
        )
        .eq("id", user_id)
        .single();

      let subscription_id;
      if (
        isArray(data?.subscription) &&
        !isArray(data?.subscription?.[0]?.plan)
      )
        subscription_id = data?.subscription?.[0].id;
      let {
        data: options,
        error: optionsError,
        status: optionsStatus,
      } = await supabase
        .from("option_included")
        .select(`option(*)`)
        .eq("subsription_id", subscription_id);

      if ((error && status !== 406) || (optionsError && optionsStatus !== 406))
        throw error;
      if (data && options)
        return { ...data, options: options?.map(({ option }) => option) };
    } catch (error: any) {
      setAlert(error?.message || "Erreur serveur", "error");
    }
  }
  const { data, error, isLoading, mutate } = useSWRImmutable("1", fetcher);
  return { data, error, isLoading, mutate };
}

export const useFetchQuestions = (course: Course | null) => {
  const [questions, setQuestions] = useState<
    {
      Question: string | null;
      question_id: string;
    }[]
  >([]);
  const [loading, setLoading] = useState(false);
  // à faire, integrer swr
  useEffect(() => {
    async function getQuestions(course: Course) {
      setLoading(true);
      try {
        let { data: quiz_questions, error } = await supabase
          .from("quiz_questions")
          .select(
            // `Question,question_id,course_id,
            //  answers:quiz_answers (Answer,Correct,answer_id)`
            `Question,question_id`
          )
          .ilike("course", course.title);
        !error &&
          !!quiz_questions &&
          setQuestions(
            quiz_questions
            // quiz_questions.map((question) => ({
            //   ...question,
            //   selected_answers: [],
            //   verify: false,
            // }))
          );
      } catch (error) {
      } finally {
        setLoading(false);
      }
    }
    course && getQuestions(course);
  }, [course]);
  return { questions, setQuestions, loading };
};

export const useFetchUserAnswers = (course: Course | null) => {
  async function fetcher(...args: string[]) {
    const user_id = await getUserId();
    // console.log(user_id);
    const [course_title] = args;
    let { data, error } = await supabase
      .from("quiz_questions")
      .select(
        `Question,question_id,
        user_answers(quiz_answers(*)),
        quiz_answers (Answer,Correct,answer_id)
        `
      )
      .ilike("course", course_title)
      .eq("user_answers.user_id", user_id);
    if (error) throw error;
    return data;
  }
  const { data, error, isLoading, mutate } = useSWR(
    course && course.title,
    fetcher
  );
  const userAnswers: UserAnswer[] =
    data?.map(({ user_answers, quiz_answers, ...rest }) => {
      const newUser_answers = isArray(user_answers)
        ? user_answers.map(({ quiz_answers }) => quiz_answers)
        : [];
      const newUser_answers2 = newUser_answers.reduce((acc: Answer[], curr) => {
        if (Array.isArray(curr)) {
          // If the current element is an array, extract the desired properties from each element and add them to the accumulator array
          return acc.concat(
            curr.map(({ Answer, answer_id, Correct }) => ({
              Answer,
              answer_id,
              Correct,
            }))
          );
        } else if (curr !== null) {
          // If the current element is an object, extract the desired properties and add them to the accumulator array
          const { Answer, answer_id, Correct } = curr;
          return acc.concat({ Answer, answer_id, Correct });
        } else {
          // If the current element is null, return the accumulator array unchanged
          return acc;
        }
      }, []);
      const newQuiz_answers: Answer[] = isArray(quiz_answers)
        ? quiz_answers
        : [];
      return {
        ...rest,
        quiz_answers: newQuiz_answers,
        user_answers: newUser_answers2,
        // les question déja épondu par le user sont déja validés
        verify: !isEmptyArray(user_answers),
      };
    }) ?? [];
  return {
    userAnswers,
    isLoading,
    error,
    mutate,
  };
};

export const useFavoritStatus = (question_id: string) => {
  async function fetcher(question_id: string) {
    // console.log("question_id", question_id);
    const user_id = await getUserId();
    // console.log(user_id);
    let { data, error } = await supabase
      .from("user_favorites")
      .select(`*`)
      .eq("question_id", question_id)
      .eq("user_id", user_id)
      .maybeSingle();

    // console.log("data", data);
    if (error) console.log("error", error);
    return data;
  }
  const { data, error, isLoading, mutate } = useSWR(question_id, fetcher);

  return {
    favStatus: data,
    isLoading,
    error,
    mutate,
  };
};

export const useFetchChapterRandomQuestions = (chapter_title: string) => {
  const chapterCourses = getChapterModules(chapter_title)
    .map(({ courses }) => courses)
    .flat()
    .map(({ title }) => title);
  async function fetcher(coursesArray: string[]) {
    let { data, error } = await supabase
      .from("random_questions")
      .select(
        `Question,question_id,
         quiz_answers(Answer,Correct,answer_id)`
      )
      .in("course", coursesArray)
      .limit(120);
    // console.log("error", error);
    // console.log(
    //   "data",
    //   data?.map(({ Question }) => Question)
    // );
    if (error) throw error;
    return data;
  }
  const { data, error, isLoading, mutate } = useSWRImmutable(
    chapterCourses,
    fetcher
  );
  const simulateurQuestions: Simulateur_question[] = isArray(data)
    ? data?.map(({ quiz_answers, ...rest }) => {
        const newQuiz_answers: Answer[] = isArray(quiz_answers)
          ? quiz_answers
          : [];
        return {
          ...rest,
          quiz_answers: newQuiz_answers,
          user_answers: [],
        };
      }) ?? []
    : [];
  return {
    simulateurQuestions,
    isLoading,
    error,
    mutate,
  };
};

export type Simulateur_question = {
  Question: any;
  question_id: any;
  quiz_answers: Answer[];
  user_answers: Answer[];
  verify?: boolean;
  score?: number;
};

// export const useFetchUserTakes = (course: Course) => {
//   const fetcher = async (...args: any[]) => {
//     const [course_title] = args;
//     let { data, error } = await supabase
//       .from("takes")
//       .select(`*`)
//       .ilike("course_title", course_title);
//     if (error) throw error;
//     return data;
//   };
//   const { data, error, isLoading, mutate } = useSWR(course.title, fetcher);
//   return { takes: data, isLoading, error, mutate };
// };

export function hexToRgba(hex: string, alpha: number): string {
  // Remove the # symbol if present
  hex = hex.replace("#", "");

  // Check if the hex code is valid
  const validHexRegExp = /^[0-9A-Fa-f]{6}$/;
  if (!validHexRegExp.test(hex)) return "#0C4E8C";

  // Parse the hexadecimal values for red, green, and blue
  const red = parseInt(hex.substring(0, 2), 16);
  const green = parseInt(hex.substring(2, 4), 16);
  const blue = parseInt(hex.substring(4, 6), 16);

  // Create the RGBA string
  const rgba = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
  return rgba;
}
