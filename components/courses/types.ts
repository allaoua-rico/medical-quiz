import { Database } from "../../types/supabase";

export type Answer = { Answer: string; Correct: boolean; answer_id: string };
export type Questions = [Database["public"]["Tables"]["quiz_questions"]["Row"]?];
export type Question = {
  Question: string | null;
  question_id: string;
  selected_answers: Answer[];
  verify: boolean;
};
