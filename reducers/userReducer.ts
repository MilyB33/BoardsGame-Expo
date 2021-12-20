import {
  UserState,
  UserAllActions,
  UserActions,
} from './reducersTypes';

const userReducer = (state: UserState, action: UserAllActions) => {
  switch (action.type) {
    case UserActions.SET_CURRENT_USER:
      return {
        ...state,
        id: action.payload.id,
        username: action.payload.username,
        isAuthenticated: true,
        loading: false,
      };
    case UserActions.SET_CURRENT_USER_LOADING:
      return {
        ...state,
        loading: true,
      };
    case UserActions.END_CURRENT_USER_LOADING:
      return {
        ...state,
        loading: false,
      };
    case UserActions.LOGOUT_USER:
      return {
        ...state,
        id: '',
        username: '',
        isAuthenticated: false,
        loading: false,
        userEvents: [],
        userSignedEvents: [],
      };
    case UserActions.SET_USER_EVENTS:
      return {
        ...state,
        [action.payload.field]: action.payload.events,
      };
    case UserActions.DELETE_EVENT:
      if (!action.payload.field) return state; // temporary because i'm tired for today
      return {
        ...state,
        [action.payload.field]: state.userEvents.filter(
          (event) => event._id !== action.payload.eventId
        ),
      };
    default:
      return state;
  }
};

export default userReducer;
