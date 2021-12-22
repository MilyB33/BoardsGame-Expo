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
        events: {
          userEvents: {
            items: [],
            loading: false,
          },
          userSignedEvents: {
            items: [],
            loading: false,
          },
        },
      };
    case UserActions.SET_USER_EVENTS:
      return {
        ...state,
        events: {
          ...state.events,
          [action.payload.field]: {
            items: action.payload.events,
            loading: false,
          },
        },
      };
    case UserActions.DELETE_EVENT:
      if (!action.payload.field) return state; // temporary because i'm tired for today
      return {
        ...state,
        [action.payload.field]: state.events.userEvents.items.filter(
          (event) => event._id !== action.payload.eventId
        ),
      };
    case UserActions.SET_EVENTS_LOADING:
      return {
        ...state,
        events: {
          ...state.events,
          [action.payload.field]: {
            ...state.events[action.payload.field],
            loading: true,
          },
        },
      };
    case UserActions.SIGN_USER_TO_EVENT:
      return {
        ...state,
        events: {
          ...state.events,
          userSignedEvents: {
            items: [
              ...state.events.userSignedEvents.items,
              action.payload,
            ],
            loading: false,
          },
        },
      };
    case UserActions.SIGN_OUT_USER_FROM_EVENT:
      return {
        ...state,
        events: {
          ...state.events,
          userSignedEvents: {
            items: state.events.userSignedEvents.items.filter(
              (event) => event._id !== action.payload
            ),
            loading: false,
          },
        },
      };
    default:
      return state;
  }
};

export default userReducer;
