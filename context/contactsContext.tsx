import React, { createContext, useEffect, useReducer } from 'react';
import usePagination from '../hooks/usePagination';
import contactsReducer from '../reducers/contactsReducer';
import serverClient from '../clients/serverClient';

import {
  ContactsState,
  ContactsActions,
} from '../reducers/reducersTypes';

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
  },
};

export const ContactsContext = createContext({} as Context);

export const ContactsContextProvider: React.FC<Props> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(contactsReducer, initialState);
  const { pagination, setOffset } = usePagination();

  const getUsers = async () => {
    const { offset, limit } = pagination; // Think about adding this to reducer
    const result = await serverClient.getUsers(offset, limit);

    if (!result.success) {
      alert(result.message);
      return;
    }

    setOffset();

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
