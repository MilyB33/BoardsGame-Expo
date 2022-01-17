import {
  ContactsState,
  ContactsAllActions,
  ContactsActions,
} from "./reducersTypes";

const contactsReducer = (state: ContactsState, action: ContactsAllActions) => {
  switch (action.type) {
    case ContactsActions.GET_USERS:
      return {
        ...state,
        users: {
          items: action.payload,
          loading: false,
          query: {
            ...state.users.query,
            offset: state.users.query.offset + state.users.query.limit,
          },
        },
      };
    case ContactsActions.SET_USERS_LOADING:
      return {
        ...state,
        users: {
          ...state.users,
          loading: true,
        },
      };
    default:
      return state;
  }
};

export default contactsReducer;
