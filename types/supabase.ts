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
      courses: {
        Row: {
          created_at: string | null
          id: number
          title: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          title: string
        }
        Update: {
          created_at?: string | null
          id?: number
          title?: string
        }
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          user_id: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          user_id?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          user_id?: string | null
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
          course: string | null
          course_id: number | null
          Question: string | null
          question_id: string
        }
        Insert: {
          course?: string | null
          course_id?: number | null
          Question?: string | null
          question_id: string
        }
        Update: {
          course?: string | null
          course_id?: number | null
          Question?: string | null
          question_id?: string
        }
      }
      takes: {
        Row: {
          course_id: number
          course_title: string | null
          created_at: string | null
          id: number
          score: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          course_id: number
          course_title?: string | null
          created_at?: string | null
          id?: number
          score?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          course_id?: number
          course_title?: string | null
          created_at?: string | null
          id?: number
          score?: number | null
          updated_at?: string | null
          user_id?: string
        }
      }
      user_answers: {
        Row: {
          answer_id: string
          created_at: string | null
          id: number
          question_id: string | null
          user_id: string | null
        }
        Insert: {
          answer_id: string
          created_at?: string | null
          id?: number
          question_id?: string | null
          user_id?: string | null
        }
        Update: {
          answer_id?: string
          created_at?: string | null
          id?: number
          question_id?: string | null
          user_id?: string | null
        }
      }
      user_favorites: {
        Row: {
          created_at: string | null
          id: number
          question_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          question_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          question_id?: string | null
          user_id?: string | null
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
