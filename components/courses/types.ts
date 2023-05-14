import { Database } from "../../types/supabase";

export type Answer = {
  Answer: string | null;
  Correct: boolean | null;
  answer_id: string;
};

export type Questions = [
  Database["public"]["Tables"]["quiz_questions"]["Row"]?
];

export type Question = {
  Question: string | null;
  question_id: string;
  selected_answers: Answer[];
  verify: boolean;
};

export type UserAnswer = {
  Question: string | null;
  question_id: string;
  quiz_answers: Answer[];
  user_answers: Answer[];
  verify?: boolean;
};
