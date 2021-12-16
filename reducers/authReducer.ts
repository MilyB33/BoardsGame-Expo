import {
  AuthState,
  AuthAllActions,
  AuthActions,
} from './reducersTypes';

const authReducer = (state: AuthState, action: AuthAllActions) => {
  switch (action.type) {
    case AuthActions.SET_CURRENT_USER:
      return {
        ...state,
        id: action.payload.id,
        username: action.payload.username,
        isAuthenticated: true,
        loading: false,
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
    case AuthActions.LOGOUT_USER:
      return {
        ...state,
        id: '',
        username: '',
        isAuthenticated: false,
        loading: false,
      };
    case AuthActions.SET_USER_EVENTS:
      return {
        ...state,
        [action.payload.field]: action.payload.events,
      };
    default:
      return state;
  }
};

export default authReducer;
