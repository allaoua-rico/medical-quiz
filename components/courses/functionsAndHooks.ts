import { Course } from "../../data";
import { Answer, Question } from "./types";
import { useState, useEffect } from "react";
import supabase from "../../utils/supabase";
import _ from "lodash";

export const isSelected = (aq: Question, answer: Answer) => {
  return aq?.selected_answers.find(
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
  useEffect(() => {
    async function getQuestions() {
      setLoading(true);
      try {
        let { data: quiz_questions, error } = await supabase
          .from("quiz_questions")
          .select(
            `Question,question_id,
          answers:quiz_answers (Answer,Correct,answer_id) `
          )
          .ilike("Module", course.title);
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
