import { Action, ActionKind, AuthState } from "./types";

export const reducer = (prevState: AuthState, action: Action): AuthState => {
  switch (action.type) {
    case ActionKind.RESTORE_TOKEN:
      return {
        ...prevState,
        refreshToken: action.token,
        isLoading: false,
      };
    case ActionKind.SIGN_IN:
      return {
        ...prevState,
        isSignout: false,
        refreshToken: action.token,
        isLoading: false,
      };
    case ActionKind.SIGN_OUT:
      return {
        ...prevState,
        isSignout: true,
        refreshToken: null,
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
};

export const initialAuthState = {
  isLoading: true,
  isSignout: false,
  refreshToken: undefined,
  error: undefined,
};
