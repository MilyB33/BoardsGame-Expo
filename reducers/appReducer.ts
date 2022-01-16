import { AppAllActions, EventActions, AppState } from "./reducersTypes";

const appReducer = (state: AppState, action: AppAllActions) => {
  switch (action.type) {
    case EventActions.GET_EVENTS:
      return {
        ...state,
        events: {
          ...state.events,
          items: [...action.payload],
          loading: false,
          query: {
            ...state.events.query,
            offset: state.events.query.offset + state.events.query.limit,
          },
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
          query: {
            ...state.events.query,
          },
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
    case EventActions.LOAD_EVENTS: // Rename to Expand
      return {
        ...state,
        events: {
          ...state.events,
          items: [...state.events.items, ...action.payload],
          loading: false,
          query: {
            ...state.events.query,
            offset: state.events.query.offset + state.events.query.limit,
          },
        },
      };
    case EventActions.REFERESH_EVENTS:
      return {
        ...state,
        events: {
          ...state.events,
          items: [...action.payload],
          loading: false,
          query: {
            ...state.events.query,
            offset: 3,
          },
        },
      };
    default:
      return state;
  }
};

export default appReducer;
