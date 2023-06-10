import _ from "lodash";
import { Answer, UserAnswer } from "./courses/types";
import { Simulateur_question, getUserId } from "./courses/functionsAndHooks";
import supabase from "../utils/supabase";
import { KeyedMutator } from "swr";

export const addOrRemoveAnswer = (
  question: UserAnswer | Simulateur_question,
  answer: Answer,
  questions: UserAnswer[] | Simulateur_question[],
  // setQuestions: React.Dispatch<
  //   React.SetStateAction<UserAnswer[] | Simulateur_question[]>
  // >
) => {
  const questionsCopy = [...questions];
  questionsCopy.map((q) => {
    //  find question in the questions clone array
    if (q.question_id == question.question_id)
      // add or remove the answer from the selected answers array
      q.user_answers = addOrRemoveAns([...q.user_answers], answer);
  });
  return questionsCopy;
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

export async function addQuestionToFav(
  question_id: string,
  mutate: KeyedMutator<{
    created_at: string | null;
    id: number;
    question_id: string | null;
    user_id: string | null;
  } | null>,
  setAlert: (text: string, type: string) => void
) {
  // console.log(question_id);
  try {
    const user_id = await getUserId();
    const { data, error } = await supabase
      .from("user_favorites")
      .select("*")
      .eq("user_id", user_id)
      .eq("question_id", question_id);

    {
      if (data)
        if (data.length > 0) {
          const { data, error } = await supabase
            .from("user_favorites")
            .delete()
            .match({
              user_id,
              question_id,
            });
          if (error) throw error;
        } else {
          const { data, error } = await supabase
            .from("user_favorites")
            .upsert(
              { user_id, question_id },
              { onConflict: "user_id, question_id", ignoreDuplicates: false }
            )
            .select();
          if (error) throw error;
        }
    }
    console.log("data", data);
    console.log("error", error);
    if (error) throw error;
    mutate();
    setAlert(
      data.length > 0 ? "Favoris supprimé!" : "Favoris ajouté!",
      "success"
    );
  } catch (error) {
    console.log("error", error);
    setAlert("Favoris non ajouté!", "error");
  }
}
