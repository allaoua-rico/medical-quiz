export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
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
        Relationships: []
      }
      devices: {
        Row: {
          device_id: string | null
          device_name: string | null
          id: number
          last_login: string | null
          user_id: string | null
        }
        Insert: {
          device_id?: string | null
          device_name?: string | null
          id?: number
          last_login?: string | null
          user_id?: string | null
        }
        Update: {
          device_id?: string | null
          device_name?: string | null
          id?: number
          last_login?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "devices_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      option: {
        Row: {
          id: number
          option_name: string | null
        }
        Insert: {
          id?: number
          option_name?: string | null
        }
        Update: {
          id?: number
          option_name?: string | null
        }
        Relationships: []
      }
      option_included: {
        Row: {
          created_at: string | null
          id: number
          option_id: number | null
          subsription_id: number | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          option_id?: number | null
          subsription_id?: number | null
        }
        Update: {
          created_at?: string | null
          id?: number
          option_id?: number | null
          subsription_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "option_included_option_id_fkey"
            columns: ["option_id"]
            referencedRelation: "option"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "option_included_subsription_id_fkey"
            columns: ["subsription_id"]
            referencedRelation: "subscription"
            referencedColumns: ["id"]
          }
        ]
      }
      plan: {
        Row: {
          created_at: string | null
          current_price: number | null
          id: number
          plan_name: string | null
        }
        Insert: {
          created_at?: string | null
          current_price?: number | null
          id?: number
          plan_name?: string | null
        }
        Update: {
          created_at?: string | null
          current_price?: number | null
          id?: number
          plan_name?: string | null
        }
        Relationships: []
      }
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
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
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
        Relationships: [
          {
            foreignKeyName: "quiz_answers_question_id_fkey"
            columns: ["question_id"]
            referencedRelation: "quiz_questions"
            referencedColumns: ["question_id"]
          },
          {
            foreignKeyName: "quiz_answers_question_id_fkey"
            columns: ["question_id"]
            referencedRelation: "random_questions"
            referencedColumns: ["question_id"]
          }
        ]
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
        Relationships: [
          {
            foreignKeyName: "quiz_questions_course_fkey"
            columns: ["course"]
            referencedRelation: "courses"
            referencedColumns: ["title"]
          },
          {
            foreignKeyName: "quiz_questions_course_id_fkey"
            columns: ["course_id"]
            referencedRelation: "courses"
            referencedColumns: ["id"]
          }
        ]
      }
      subscription: {
        Row: {
          created_at: string | null
          current_plan_id: number | null
          id: number
          user_id: string
        }
        Insert: {
          created_at?: string | null
          current_plan_id?: number | null
          id?: number
          user_id: string
        }
        Update: {
          created_at?: string | null
          current_plan_id?: number | null
          id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscription_current_plan_id_fkey"
            columns: ["current_plan_id"]
            referencedRelation: "plan"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscription_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
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
        Relationships: [
          {
            foreignKeyName: "takes_course_id_fkey"
            columns: ["course_id"]
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "takes_course_title_fkey"
            columns: ["course_title"]
            referencedRelation: "courses"
            referencedColumns: ["title"]
          },
          {
            foreignKeyName: "takes_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
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
        Relationships: [
          {
            foreignKeyName: "user_answers_answer_id_fkey"
            columns: ["answer_id"]
            referencedRelation: "quiz_answers"
            referencedColumns: ["answer_id"]
          },
          {
            foreignKeyName: "user_answers_question_id_fkey"
            columns: ["question_id"]
            referencedRelation: "quiz_questions"
            referencedColumns: ["question_id"]
          },
          {
            foreignKeyName: "user_answers_question_id_fkey"
            columns: ["question_id"]
            referencedRelation: "random_questions"
            referencedColumns: ["question_id"]
          },
          {
            foreignKeyName: "user_answers_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
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
        Relationships: [
          {
            foreignKeyName: "user_favorites_question_id_fkey"
            columns: ["question_id"]
            referencedRelation: "quiz_questions"
            referencedColumns: ["question_id"]
          },
          {
            foreignKeyName: "user_favorites_question_id_fkey"
            columns: ["question_id"]
            referencedRelation: "random_questions"
            referencedColumns: ["question_id"]
          },
          {
            foreignKeyName: "user_favorites_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      random_questions: {
        Row: {
          course: string | null
          course_id: number | null
          Question: string | null
          question_id: string | null
        }
        Insert: {
          course?: string | null
          course_id?: number | null
          Question?: string | null
          question_id?: string | null
        }
        Update: {
          course?: string | null
          course_id?: number | null
          Question?: string | null
          question_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quiz_questions_course_fkey"
            columns: ["course"]
            referencedRelation: "courses"
            referencedColumns: ["title"]
          },
          {
            foreignKeyName: "quiz_questions_course_id_fkey"
            columns: ["course_id"]
            referencedRelation: "courses"
            referencedColumns: ["id"]
          }
        ]
      }
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
