export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
      }
      quiz_answers: {
        Row: {
          Answer: string | null
          answer_id: string
          Correct: boolean | null
          question_id: string | null
        }
        Insert: {
          Answer?: string | null
          answer_id: string
          Correct?: boolean | null
          question_id?: string | null
        }
        Update: {
          Answer?: string | null
          answer_id?: string
          Correct?: boolean | null
          question_id?: string | null
        }
      }
      quiz_questions: {
        Row: {
          Module: string | null
          Question: string | null
          question_id: string
        }
        Insert: {
          Module?: string | null
          Question?: string | null
          question_id: string
        }
        Update: {
          Module?: string | null
          Question?: string | null
          question_id?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
