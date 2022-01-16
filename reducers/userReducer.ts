import { UserState, UserAllActions, UserActions } from "./reducersTypes";

const userReducer = (state: UserState, action: UserAllActions) => {
  switch (action.type) {
    case UserActions.SET_CURRENT_USER:
      return {
        ...state,
        ...action.payload,
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
        id: "",
        username: "",
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
        events: {
          ...state.events,
          [action.payload.field]: {
            ...state.events[action.payload.field],
            items: state.events[action.payload.field].items.filter(
              (event) => action.payload.eventId !== event._id
            ),
          },
        },
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
            items: [...state.events.userSignedEvents.items, action.payload],
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
    case UserActions.ADD_EVENT:
      return {
        ...state,
        events: {
          ...state.events,
          userEvents: {
            ...state.events.userEvents,
            items: [...state.events.userEvents.items, action.payload],
          },
        },
      };
    case UserActions.EDIT_EVENT:
      return {
        ...state,
        events: {
          ...state.events,
          userEvents: {
            ...state.events.userEvents,
            items: state.events.userEvents.items.map((item) =>
              item._id === action.payload.event._id
                ? action.payload.event
                : item
            ),
          },
        },
      };
    case UserActions.SEND_FRIEND_REQUEST:
      return {
        ...state,
        friendsRequests: {
          ...state.friendsRequests,
          sent: [...state.friendsRequests.sent, action.payload],
        },
      };
    default:
      return state;
  }
};

export default userReducer;
