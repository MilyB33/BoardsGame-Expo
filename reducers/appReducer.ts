import {
  AppAllActions,
  EventActions,
  AppState,
} from './reducersTypes';

const appReducer = (state: AppState, action: AppAllActions) => {
  switch (action.type) {
    case EventActions.GET_EVENTS:
      return {
        ...state,
        events: {
          ...state.events,
          // filter out duplicates, i don't know how it works but it works (it's temporary)
          items: [...state.events.items, ...action.payload].filter(
            (item, index, self) =>
              self.findIndex((t) => t._id === item._id) === index
          ),
          loading: false,
        },
      };
    case EventActions.SET_EVENTS_LOADING:
      return {
        ...state,
        events: {
          ...state.events,
          loading: true,
        },
      };
    case EventActions.SIGN_USER_TO_EVENT:
      return {
        ...state,
        events: {
          ...state.events,
          items: state.events.items.map((item) => {
            if (item._id === action.payload.eventId) {
              return {
                ...item,
                signedUsers: [
                  ...item.signedUsers,
                  action.payload.userId,
                ],
              };
            }
            return item;
          }),
        },
      };
    case EventActions.SIGN_OUT_USER_FROM_EVENT:
      return {
        ...state,
        events: {
          ...state.events,
          items: state.events.items.map((item) => {
            if (item._id === action.payload.eventId) {
              return {
                ...item,
                signedUsers: item.signedUsers.filter(
                  (user) => user !== action.payload.userId
                ),
              };
            }
            return item;
          }),
        },
      };
    default:
      return state;
  }
};

export default appReducer;
