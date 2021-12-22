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
          // filter out duplicates (it's temporary)
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
    case EventActions.FILTER_OUT_EVENT:
      return {
        ...state,
        events: {
          ...state.events,
          items: state.events.items.filter(
            (event) => event._id !== action.payload.eventId
          ),
        },
      };
    case EventActions.REPLACE_EVENT:
      return {
        ...state,
        events: {
          ...state.events,
          items: state.events.items.map((event) =>
            event._id === action.payload.event._id
              ? action.payload.event
              : event
          ),
        },
      };
    default:
      return state;
  }
};

export default appReducer;
