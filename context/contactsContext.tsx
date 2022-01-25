import React, { createContext, useEffect, useReducer } from "react";
import contactsReducer from "../reducers/contactsReducer";
import serverClient from "../clients/serverClient";

import { ContactsState, ContactsActions } from "../reducers/reducersTypes";

interface Props {
  children: React.ReactNode;
}

interface Context {
  state: ContactsState;
  getUsers(): Promise<void>;
}

const initialState: ContactsState = {
  users: {
    items: [],
    loading: false,
    query: {
      offset: 0,
      limit: 5,
    },
  },
};

export const ContactsContext = createContext({} as Context);

export const ContactsContextProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(contactsReducer, initialState);

  const getUsers = async () => {
    const { query } = state.users; // Think about adding this to reducer
    const result = await serverClient.getUsers(query);

    if (!result.success) {
      alert(result.message);
      return;
    }

    dispatch({
      type: ContactsActions.GET_USERS,
      payload: result.result,
    });
  };

  useEffect(() => {
    if (state.users.items.length === 0) getUsers();
  }, []);

  return (
    <ContactsContext.Provider
      value={{
        state,
        getUsers,
      }}
    >
      {children}
    </ContactsContext.Provider>
  );
};
