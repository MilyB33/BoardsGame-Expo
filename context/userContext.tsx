import React, { createContext, useReducer, useContext, useEffect } from "react";
import ServerClient from "../clients/serverClient";
import authReducer from "../reducers/userReducer";
import { UserActions } from "../reducers/reducersTypes";
import { UserState } from "../reducers/reducersTypes";
import { AppContext } from "./appContext";
import { EventPayload, P } from "../types/types";

interface Props {
  children: React.ReactNode;
}

interface Context {
  userInfoState: UserState;
  clearFields(): void;
  deleteUserEvent(eventId: string): P;
  signUserForEvent(eventId: string): P;
  signOutUserFromEvent(eventId: string): P;
  addEvent(event: EventPayload): P<boolean>;
  editEvent(event: EventPayload, eventId: string): P<boolean>;
  updatePassword(newPassword: { oldPassword: string; newPassword: string }): P;
  sendFriendRequest(requestedUserId: string): P;
  acceptFriendRequest(requestedUserId: string): P;
  rejectFriendRequest(requestedUserId: string): P;
  deleteFriend(requestedUserId: string): P;
  sendEventRequest(eventId: string, requestedUserID: string): P;
  setUserInfo(userID: string): void;
  rejectEventRequest(inviteID: string, eventID: string): P;
  acceptEventRequest(inviteID: string, eventID: string): P;
}

const initialState = {
  _userID: "", // this id is here to avoid context cycle warning
  events: {
    userEvents: [],
    userSignedEvents: [],
    userInvitedEvents: [],
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
} as UserState;

export const UserContext = createContext({} as Context);

export const UserContextProvider: React.FC<Props> = ({ children }) => {
  const [userInfoState, dispatch] = useReducer(authReducer, initialState);
  const { FilterOutEvent, replaceEvent, deleteInvite } = useContext(AppContext);

  const setUserInfo = async (userID: string) => {
    const result = await ServerClient.getUserInfo(userID);

    if (!result.success) {
      alert(result.message);
      return;
    }

    result.result._userID = userID; // this can be added server side or will be in this context

    dispatch({
      type: UserActions.SET_USER_INFO,
      payload: result.result,
    });
  };

  const clearFields = () => dispatch({ type: UserActions.CLEAR_FIELDS });

  const deleteUserEvent = async (eventId: string) => {
    const result = await ServerClient.deleteUserEvent(
      eventId,
      userInfoState._userID
    );

    if (!result.success) {
      alert(result.message);
      return;
    }

    dispatch({
      type: UserActions.DELETE_EVENT,
      payload: {
        eventId,
        field: "userEvents",
      },
    });

    FilterOutEvent(eventId);
  };

  const signUserForEvent = async (eventId: string) => {
    const result = await ServerClient.signUserForEvent(
      eventId,
      userInfoState._userID
    );

    if (!result.success) {
      alert(result.message);
      return;
    }

    dispatch({
      type: UserActions.SIGN_USER_TO_EVENT,
      payload: result.result,
    });

    replaceEvent(result.result);
  };

  const signOutUserFromEvent = async (eventId: string) => {
    const result = await ServerClient.signOutUserFromEvent(
      eventId,
      userInfoState._userID
    );

    if (!result.success) {
      alert(result.message);
      return;
    }

    dispatch({
      type: UserActions.SIGN_OUT_USER_FROM_EVENT,
      payload: eventId,
    });

    replaceEvent(result.result);
  };

  const addEvent = async (event: EventPayload) => {
    const result = await ServerClient.addEvent(event, userInfoState._userID);

    if (!result.success) {
      alert(result.message);
      return false;
    }

    dispatch({
      type: UserActions.ADD_EVENT,
      payload: result.result,
    });

    return true;
  };

  const editEvent = async (event: EventPayload, eventId: string) => {
    const result = await ServerClient.editEvent(
      event,
      userInfoState._userID,
      eventId
    );

    if (!result.success) {
      alert(result.message);
      return false;
    }

    dispatch({
      type: UserActions.EDIT_EVENT,
      payload: {
        event: result.result,
      },
    });

    replaceEvent(result.result);

    return true;
  };

  const updatePassword = async (data: {
    oldPassword: string;
    newPassword: string;
  }) => {
    const result = await ServerClient.updatePassword(
      userInfoState._userID,
      data
    );

    if (!result.success) {
      alert(result.message);
      return;
    }
  };

  const sendFriendRequest = async (requestedUserId: string) => {
    const result = await ServerClient.sendFriendRequest(
      userInfoState._userID,
      requestedUserId
    );

    if (!result.success) {
      alert(result.message);
      return;
    }

    dispatch({
      type: UserActions.SEND_FRIEND_REQUEST,
      payload: result.result,
    });
  };

  const acceptFriendRequest = async (requestId: string) => {
    const result = await ServerClient.acceptFriendRequest(
      userInfoState._userID,
      requestId
    );

    if (!result.success) {
      alert(result.message);
      return;
    }

    dispatch({
      type: UserActions.ACCEPT_FRIEND_REQUEST,
      payload: result.result,
    });
  };

  const rejectFriendRequest = async (requestId: string) => {
    const result = await ServerClient.rejectFriendRequest(
      userInfoState._userID,
      requestId
    );

    if (!result.success) {
      alert(result.message);
      return;
    }

    dispatch({
      type: UserActions.REJECT_FRIEND_REQUEST,
      payload: requestId,
    });
  };

  const deleteFriend = async (friendId: string) => {
    const result = await ServerClient.deleteFriend(
      userInfoState._userID,
      friendId
    );

    if (!result.success) {
      alert(result.message);
      return;
    }

    dispatch({
      type: UserActions.DELETE_FRIEND,
      payload: friendId,
    });
  };

  const sendEventRequest = async (eventId: string, requestedUserID: string) => {
    const result = await ServerClient.sendEventInvite(
      userInfoState._userID,
      eventId,
      requestedUserID
    );

    if (!result.success) {
      alert(result.message);
      return;
    }

    dispatch({
      type: UserActions.SEND_EVENT_REQUEST,
      payload: result.result,
    });
  };

  const rejectEventRequest = async (inviteID: string, eventID: string) => {
    const result = await ServerClient.rejectEventInvite(
      userInfoState._userID,
      inviteID
    );

    if (!result.success) {
      alert(result.message);
      return;
    }

    dispatch({
      type: UserActions.REJECT_EVENT_REQUEST,
      payload: inviteID,
    });

    deleteInvite(inviteID, eventID);
  };

  const acceptEventRequest = async (inviteID: string, eventID: string) => {
    const result = await ServerClient.acceptEventInvite(
      userInfoState._userID,
      inviteID
    );

    if (!result.success) {
      alert(result.message);
      return;
    }

    dispatch({
      type: UserActions.ACCEPT_EVENT_REQUEST,
      payload: {
        inviteID,
        event: result.result,
      },
    });

    replaceEvent(result.result);
  };

  return (
    <UserContext.Provider
      value={{
        userInfoState,
        clearFields,
        deleteUserEvent,
        signUserForEvent,
        signOutUserFromEvent,
        addEvent,
        editEvent,
        updatePassword,
        sendFriendRequest,
        acceptFriendRequest,
        rejectFriendRequest,
        deleteFriend,
        sendEventRequest,
        setUserInfo,
        rejectEventRequest,
        acceptEventRequest,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
