import { ModalsState, ModalsAllActions, ModalsActions } from "./reducersTypes";

const modalsReducer = (
  state: ModalsState,
  action: ModalsAllActions
): ModalsState => {
  switch (action.type) {
    case ModalsActions.OPEN_LOGIN_MODAL:
      return {
        ...state,
        showLoginModal: true,
        showRegisterModal: false,
        showAddEventModal: false,
      };
    case ModalsActions.OPEN_REGISTER_MODAL:
      return {
        ...state,
        showLoginModal: false,
        showRegisterModal: true,
        showAddEventModal: false,
      };
    case ModalsActions.CLOSE_MODAL:
      return {
        ...state,
        showLoginModal: false,
        showRegisterModal: false,
        showAddEventModal: false,
      };
    case ModalsActions.OPEN_ADD_EVENT_MODAL:
      return {
        ...state,
        showAddEventModal: true,
        showLoginModal: false,
        showRegisterModal: false,
      };
    default:
      return state;
  }
};

export default modalsReducer;
