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
    default:
      return state;
  }
};

export default appReducer;
