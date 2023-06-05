import _ from "lodash";
import { Answer, UserAnswer } from "./courses/types";
import { Simulateur_question } from "./courses/functionsAndHooks";

export const addOrRemoveAnswer = (
  question: UserAnswer | Simulateur_question,
  answer: Answer,
  questions: UserAnswer[] | Simulateur_question[],
  setQuestions: React.Dispatch<
    React.SetStateAction<UserAnswer[] | Simulateur_question[]>
  >
) => {
  const questionsCopy = [...questions];
  questionsCopy.map((q) => {
    //  find question in the questions clone array
    if (q.question_id == question.question_id)
      // add or remove the answer from the selected answers array
      q.user_answers = addOrRemoveAns([...q.user_answers], answer);
  });
  setQuestions(questionsCopy);
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
