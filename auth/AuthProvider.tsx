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
import { getUniqueId, getModel } from "react-native-device-info";
import { getUserId } from "../components/courses/functionsAndHooks";

const AuthContext = createContext<MyContext>({});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialAuthState);
  useEffect(() => {
    // dispatch({
    //   type: ActionKind.SET_LOADING_FALSE,
    // });
    const bootstrapAsync = async () => {
      try {
        const refresh_token = await SecureStore.getItemAsync("refreshToken");
        if (!refresh_token) throw new Error("Invalid Refresh Token");
        const { data, error } = await supabase.auth.refreshSession({
          refresh_token,
        });
        if (error) throw new Error(error?.message);
        dispatch({
          type: ActionKind.RESTORE_TOKEN,
          token: refresh_token,
        });
      } catch (e) {
        dispatch({ type: ActionKind.RESTORE_TOKEN, token: null });
      }
    };
    bootstrapAsync();
  }, []);

  const { setAlert } = useAlert();

  const authContext = useMemo(
    () => ({
      signIn: async (creds: FormValues) => {
        try {
          dispatch({
            type: ActionKind.SET_LOADING_TRUE,
          });
          dispatch({
            type: ActionKind.SET_ERROR,
            error: ErrorKind.NULL,
          });
          let { data, error } = await supabase.auth.signInWithPassword(creds);
          // console.log("data", data);
          let authorized = false;
          const userDevices = await getUserDevices();
          // No device registered for user ( new Login )
          if (userDevices.length == 0) {
            registerDevice();
            authorized = true;
          } else {
            const device_id = await getUniqueId();
            const isSameDevice = userDevices.some(
              (device) => device.device_id == device_id
            );
            if (isSameDevice) authorized = true;
            else throw { message: "Account already associated to a device" };
          }
          if (error || !authorized) throw error;
          if (data?.session && authorized) {
            await SecureStore.setItemAsync(
              "refreshToken",
              data?.session?.refresh_token
            );
            await SecureStore.setItemAsync("user_id", data?.session?.user?.id);
            dispatch({
              type: ActionKind.SIGN_IN,
              token: data?.session?.refresh_token,
            });
          }
        } catch (error: any) {
          await SecureStore.setItemAsync("refreshToken", "");
          if (error?.message == "Invalid login credentials")
            dispatch({
              type: ActionKind.SET_ERROR,
              error: ErrorKind.CREDENTIALS,
            });
          if (error?.message == "Network request failed")
            setAlert("Erreur serveur", "error");
          else setAlert(error?.message, "error");
        } finally {
          dispatch({
            type: ActionKind.SET_LOADING_FALSE,
          });
        }
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

const getUserDevices = async () => {
  try {
    const user_id = await getUserId();
    const { data, error } = await supabase
      .from("devices")
      .select("*")
      .eq("user_id", user_id);
    // console.log("getUserDevices", data);
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error retrieving user devices:", error);
    return [];
  }
};

const registerDevice = async () => {
  try {
    const device_id = await getUniqueId();
    const device_name = getModel();
    const user_id = await getUserId();
    // console.log({ user_id, device_id, device_name });
    const { data, error } = await supabase.from("devices").upsert(
      { user_id, device_id, device_name },
      {
        onConflict: "user_id",
      }
    );
    if (error) throw error;
    console.log("Device registered successfully!");
  } catch (error) {
    console.error("Error registering device:", error);
  }
};
