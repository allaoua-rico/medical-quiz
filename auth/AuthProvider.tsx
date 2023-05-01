import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { FormValues } from "../screens/Login";
import supabase from "../utils/supabase";
import * as SecureStore from "expo-secure-store";
import { ActionKind, ErrorKind, MyContext } from "./types";
import { initialAuthState, reducer } from "./context";
import useAlert from "../components/shared/Alert/useAlert";

const AuthContext = createContext<MyContext>({});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialAuthState);
console.log("state",state)
  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let refresh_token;
      // let access_token;
      try {
        refresh_token = (await SecureStore.getItemAsync("refreshToken")) || "";
        // access_token = (await SecureStore.getItemAsync("accessToken")) || "";
        console.log("refresh_token", refresh_token);
        const { data, error } = await supabase.auth.refreshSession({
          refresh_token,
          // access_token,
        });
        console.log("data", data);
        console.log("error", error);
        if (error) throw new Error("Invalid Refresh Token");
        dispatch({
          type: ActionKind.RESTORE_TOKEN,
          token: refresh_token,
        });
      } catch (e) {
        dispatch({ type: ActionKind.RESTORE_TOKEN, token: null });
      }
      // After restoring token, we may need to validate it in production apps
      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
    };
    bootstrapAsync();
  }, []);
  const { setAlert } = useAlert();

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
          if (error) throw error;
          if (data?.session) {
            await SecureStore.setItemAsync(
              "refreshToken",
              data?.session?.refresh_token
            );
            await SecureStore.setItemAsync(
              "accessToken",
              data?.session?.access_token
            );
            dispatch({
              type: ActionKind.SIGN_IN,
              token: data?.session?.refresh_token,
            });
          }
        } catch (error: any) {
          if (error?.message == "Invalid login credentials")
            dispatch({
              type: ActionKind.SET_ERROR,
              error: ErrorKind.CREDENTIALS,
            });
            console.log(error)
          if (error?.message == "Network request failed")
            setAlert("Erreur serveur", "error");
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
      signOut: () => {
        dispatch({ type: ActionKind.SIGN_OUT });
      },
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
  return (
    <AuthContext.Provider value={{ state, dispatch, authContext }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
