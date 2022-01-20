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
          userEvents: [],
          userSignedEvents: [],
        },
        friends: [],
        friendsRequests: {
          sent: [],
          received: [],
        },
        eventsRequests: {
          sent: [],
          received: [],
        },
      };
    case UserActions.DELETE_EVENT:
      if (!action.payload.field) return state; // temporary because i'm tired for today
      return {
        ...state,
        events: {
          ...state.events,
          [action.payload.field]: state.events[action.payload.field].filter(
            (event) => action.payload.eventId !== event._id
          ),
        },
      };
    case UserActions.SIGN_USER_TO_EVENT:
      return {
        ...state,
        events: {
          ...state.events,
          userSignedEvents: [...state.events.userSignedEvents, action.payload],
        },
      };
    case UserActions.SIGN_OUT_USER_FROM_EVENT:
      return {
        ...state,
        events: {
          ...state.events,
          userSignedEvents: state.events.userSignedEvents.filter(
            (event) => event._id !== action.payload
          ),
        },
      };
    case UserActions.ADD_EVENT:
      return {
        ...state,
        events: {
          ...state.events,
          userEvents: [...state.events.userEvents, action.payload],
        },
      };
    case UserActions.EDIT_EVENT:
      return {
        ...state,
        events: {
          ...state.events,
          userEvents: state.events.userEvents.map((event) =>
            event._id === action.payload.event._id
              ? action.payload.event
              : event
          ),
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
    case UserActions.ACCEPT_FRIEND_REQUEST:
      return {
        ...state,
        friends: [...state.friends, action.payload],
        friendsRequests: {
          ...state.friendsRequests,
          received: state.friendsRequests.received.filter(
            (request) => request._id !== action.payload._id
          ),
        },
      };
    case UserActions.REJECT_FRIEND_REQUEST:
      return {
        ...state,
        friendsRequests: {
          ...state.friendsRequests,
          received: state.friendsRequests.received.filter(
            (request) => request._id !== action.payload
          ),
        },
      };
    case UserActions.DELETE_FRIEND:
      return {
        ...state,
        friends: state.friends.filter(
          (friend) => friend._id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default userReducer;
