import React, { createContext, useReducer } from 'react';
import {
  ModalsState,
  ModalsActions,
} from '../reducers/reducersTypes';
import modalsReducer from '../reducers/modalsReducer';

interface Props {
  children: React.ReactNode;
}

interface Context {
  modals: ModalsState;
  openLoginModal: () => void;
  openSignupModal: () => void;
  openAddEventModal: () => void;
  closeModal: () => void;
}

const initialState: ModalsState = {
  showLoginModal: false,
  showRegisterModal: false,
  showAddEventModal: false,
};

export const ModalsContext = createContext({} as Context);

export const ModalsContextProvider: React.FC<Props> = ({
  children,
}) => {
  const [modals, dispatch] = useReducer(modalsReducer, initialState);

  const openLoginModal = () =>
    dispatch({ type: ModalsActions.OPEN_LOGIN_MODAL });
  const openSignupModal = () =>
    dispatch({ type: ModalsActions.OPEN_REGISTER_MODAL });
  const openAddEventModal = () =>
    dispatch({ type: ModalsActions.OPEN_ADD_EVENT_MODAL });
  const closeModal = () =>
    dispatch({ type: ModalsActions.CLOSE_MODAL });

  return (
    <ModalsContext.Provider
      value={{
        modals,
        openLoginModal,
        closeModal,
        openSignupModal,
        openAddEventModal,
      }}
    >
      {children}
    </ModalsContext.Provider>
  );
};
