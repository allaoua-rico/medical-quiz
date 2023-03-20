import { FormValues } from "../screens/Login";

type RefreshToken = string | null | undefined;

type AuthState = {
  isLoading: boolean;
  isSignout: boolean;
  refreshToken: RefreshToken;
  error: ErrorKind | undefined;
};

enum ErrorKind {
  CREDENTIALS = "CREDENTIALS",
  NETWORK = "NETWORK",
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
  token?: RefreshToken;
  error?: ErrorKind;
}

type AuthContextType = {
  signIn: ({ email, password }: FormValues) => Promise<void>;
  signOut: () => void;
  signUp: (data: any) => Promise<void>;
};
type MyContext = {
  state?: AuthState;
  dispatch?: React.Dispatch<Action>;
  authContext?: AuthContextType;
};

export {
  RefreshToken,
  AuthState,
  ErrorKind,
  ActionKind,
  Action,
  AuthContextType,
  MyContext,
};
