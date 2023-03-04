import { useEffect, useMemo, useReducer } from "react";
import * as SecureStore from "expo-secure-store";
import supabase from "../utils/supabase";
import { FormValues } from "../screens/Login";

type UserToken = string | null | undefined;

type AuthState = {
  isLoading: boolean;
  isSignout: boolean;
  userToken: UserToken;
  error: ErrorKind | undefined;
};

enum ErrorKind {
  CREDENTIALS = "CREDENTIALS",
  TOKEN = "TOKEN",
  NULL = "NULL",
}

enum ActionKind {
  RESTORE_TOKEN = "RESTORE_TOKEN",
  SIGN_IN = "SIGN_IN",
  SIGN_OUT = "SIGN_OUT",
  SET_LOADING_TRUE = "SET_LOADING_TRUE",
  SET_LOADING_FALSE = "SET_LOADING_FALSE",
  SET_ERROR = "SET_ERROR",
}

interface Action {
  type: ActionKind;
  token?: UserToken;
  error?: ErrorKind;
}

const initialAuthState = {
  isLoading: true,
  isSignout: false,
  userToken: undefined,
  error: undefined,
};

export default function useAuth() {
  const [state, dispatch] = useReducer(
    (prevState: AuthState, action: Action): AuthState => {
      switch (action.type) {
        case ActionKind.RESTORE_TOKEN:
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case ActionKind.SIGN_IN:
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
            isLoading: false,
          };
        case ActionKind.SIGN_OUT:
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
        case ActionKind.SET_LOADING_TRUE:
          return {
            ...prevState,
            isLoading: true,
          };
        case ActionKind.SET_LOADING_FALSE:
          return {
            ...prevState,
            isLoading: false,
          };
        case ActionKind.SET_ERROR:
          return {
            ...prevState,
            error: action.error,
          };
        default:
          return initialAuthState;
      }
    },
    initialAuthState
  );

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await SecureStore.getItemAsync("userToken");
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: ActionKind.RESTORE_TOKEN, token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = useMemo(
    () => ({
      signIn: async ({ email, password }: FormValues) => {
        try {
          dispatch({
            type: ActionKind.SET_LOADING_TRUE,
          });
          dispatch({
            type: ActionKind.SET_ERROR,
            error: ErrorKind.NULL,
          });
          let { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });
          if (error) throw Error(error?.message);
          if (data?.session?.access_token) {
            await SecureStore.setItemAsync(
              "userToken",
              data?.session?.access_token
            );
            dispatch({
              type: ActionKind.SIGN_IN,
              token: data?.session?.access_token,
            });
          }
        } catch (error: any) {
          if (error?.message == "Invalid login credentials") {
            dispatch({
              type: ActionKind.SET_ERROR,
              error: ErrorKind.CREDENTIALS,
            });
          }
        } finally {
          dispatch({
            type: ActionKind.SET_LOADING_FALSE,
          });
        }
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token
      },
      signOut: () => dispatch({ type: ActionKind.SIGN_OUT }),
      signUp: async (data: any) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        dispatch({ type: ActionKind.SIGN_IN, token: "dummy-auth-token" });
      },
    }),
    []
  );
  return { state, dispatch, authContext };
}
