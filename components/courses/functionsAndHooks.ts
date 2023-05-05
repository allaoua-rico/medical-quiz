import { Course } from "../../data";
import { Answer, Question, UserAnswer } from "./types";
import { useState, useEffect } from "react";
import supabase from "../../utils/supabase";
import _, { isArray } from "lodash";
import useSWR from "swr";
import { isEmptyArray } from "formik";

export const isSelected = (aq: UserAnswer, answer: Answer) => {
  return aq?.user_answers.find(
    (el: Answer) => answer.answer_id == el.answer_id
  );
};

export const addOrRemoveAns = (array: any[], item: Answer) => {
  const exists = array.find((item1) => _.isEqual(item1, item));

  if (exists) {
    return array.filter((c) => {
      return c !== item;
    });
  } else {
    const result = array;
    result.push(item);
    return result;
  }
};

export const useFetchQuestions = (course: Course) => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  // à faire, integrer swr
  useEffect(() => {
    async function getQuestions() {
      setLoading(true);
      try {
        let { data: quiz_questions, error } = await supabase
          .from("quiz_questions")
          .select(
            `Question,question_id,course_id,
             answers:quiz_answers (Answer,Correct,answer_id)`
          )
          .ilike("course", course.title);
        !error &&
          !!quiz_questions &&
          setQuestions(
            quiz_questions.map((question) => ({
              ...question,
              selected_answers: [],
              verify: false,
            }))
          );
      } catch (error) {
      } finally {
        setLoading(false);
      }
    }
    getQuestions();
  }, [course]);
  return { questions, setQuestions, loading };
};

export const useFetchUserAnswers = (course: Course) => {
  async function fetcher(...args: string[]) {
    const [course_title] = args;
    let { data, error } = await supabase
      .from("quiz_questions")
      .select(
        `Question,question_id,
        user_answers(quiz_answers(*)),
        quiz_answers (Answer,Correct,answer_id)`
      )
      .ilike("course", course_title);
    if (error) throw error;
    return data;
  }
  const { data, error, isLoading, mutate } = useSWR(course.title, fetcher);
  // console.log("useFetchUserAnswersdata", data);
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
