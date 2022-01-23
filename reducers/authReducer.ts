import { AuthAllActions, AuthActions, AuthState } from "./reducersTypes";

const authReducer = (state: AuthState, action: AuthAllActions) => {
  switch (action.type) {
    case AuthActions.LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        username: action.payload.username,
        _id: action.payload._id,
        loading: false,
      };
    case AuthActions.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        username: "",
        _id: "",
      };
    case AuthActions.SET_CURRENT_USER_LOADING:
      return {
        ...state,
        loading: true,
      };
    case AuthActions.END_CURRENT_USER_LOADING:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default authReducer;
