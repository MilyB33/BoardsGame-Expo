import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { UserStateTest } from "../../types/types";
import serverClient from "../../clients/serverClient";
import { LoginCredentials, EventPayload } from "../../types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { replaceEvent, deleteInvite } from "./appSlice";
import { RootState } from "../App/store";

export const login = createAsyncThunk(
  "user/login",
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    let token = (await AsyncStorage.getItem("JWT")) || null;
    let result = {} as any;

    if (!credentials.password && !credentials.username && !token)
      return rejectWithValue(false);

    if (token) {
      serverClient.setToken(token);
      result = await serverClient.loginUser();
    } else {
      result = await serverClient.loginUser(credentials);
    }

    if (!result.success) {
      serverClient.removeToken();

      return rejectWithValue(false);
    }

    if (!token) {
      token = result.result.token;
      serverClient.setToken(token!);
      await AsyncStorage.setItem("JWT", token!);
    }

    const userData = await serverClient.getUserInfo(result.result._id);

    if (!userData.success) {
      serverClient.removeToken();

      return rejectWithValue(false);
    }

    delete result.result.token;

    return {
      ...result.result,
      ...userData.result,
    };
  }
);

export const logout = createAsyncThunk("user/logout", async () => {
  await AsyncStorage.removeItem("JWT");
  serverClient.removeToken();

  return;
});

export const deleteAccount = createAsyncThunk(
  "user/deleteAccount",
  async (_, { getState, rejectWithValue }) => {
    const _id = getUserID(getState);

    const result = await serverClient.deleteAccount(_id);

    if (!result.success) {
      return rejectWithValue(false);
    }
  }
);

export const deleteUserEvent = createAsyncThunk(
  "user/deleteUserEvent",
  async (eventID: string, { getState, rejectWithValue }) => {
    const _id = getUserID(getState);

    const result = await serverClient.deleteUserEvent(eventID, _id);

    if (!result.success) {
      return rejectWithValue(false);
    }

    return {
      eventID,
      field: "userEvents",
    };
  }
);

export const signUserForEvent = createAsyncThunk(
  "user/signUserForEvent",
  async (eventID: string, { getState, rejectWithValue }) => {
    const _id = getUserID(getState);

    const result = await serverClient.signUserForEvent(eventID, _id);

    if (!result.success) rejectWithValue(false);

    replaceEvent(result.result);

    return result.result;
  }
);

export const signOutUserFromEvent = createAsyncThunk(
  "user/signOutUserFromEvent",
  async (eventID: string, { getState, rejectWithValue }) => {
    const _id = getUserID(getState);

    const result = await serverClient.signOutUserFromEvent(eventID, _id);

    if (!result.success) rejectWithValue(false);

    replaceEvent(result.result);

    return result.result;
  }
);

export const addEvent = createAsyncThunk(
  "user/addEvent",
  async (event: EventPayload, { getState, rejectWithValue }) => {
    const _id = getUserID(getState);

    const result = await serverClient.addEvent(event, _id);

    if (!result.success) rejectWithValue(false);

    return result.result;
  }
);

export const editEvent = createAsyncThunk(
  "user/editEvent",
  async (
    { event, eventID }: { event: EventPayload; eventID: string },
    { getState, rejectWithValue }
  ) => {
    const _id = getUserID(getState);

    const result = await serverClient.editEvent(event, _id, eventID);

    if (!result.success) rejectWithValue(false);

    replaceEvent(result.result);

    return result.result;
  }
);

export const updatePassword = createAsyncThunk(
  "user/updatePassword",
  async (
    data: { oldPassword: string; newPassword: string },
    { getState, rejectWithValue }
  ) => {
    const _id = getUserID(getState);

    const result = await serverClient.updatePassword(_id, data);

    if (!result.success) rejectWithValue(false);

    return result.result;
  }
);

export const sendFriendRequest = createAsyncThunk(
  "user/sendFriendRequest",
  async (friendID: string, { getState, rejectWithValue }) => {
    const _id = getUserID(getState);

    const result = await serverClient.sendFriendRequest(_id, friendID);

    if (!result.success) rejectWithValue(false);

    return result.result;
  }
);

export const acceptFriendRequest = createAsyncThunk(
  "user/acceptFriendRequest",
  async (requestID: string, { getState, rejectWithValue }) => {
    const _id = getUserID(getState);

    const result = await serverClient.acceptFriendRequest(_id, requestID);

    if (!result.success) rejectWithValue(false);

    return result.result;
  }
);

export const rejectFriendRequest = createAsyncThunk(
  "user/rejectFriendRequest",
  async (requestID: string, { getState, rejectWithValue }) => {
    const _id = getUserID(getState);

    const result = await serverClient.rejectFriendRequest(_id, requestID);

    if (!result.success) rejectWithValue(false);

    return result.result;
  }
);

export const deleteFriend = createAsyncThunk(
  "user/deleteFriend",
  async (friendID: string, { getState, rejectWithValue }) => {
    const _id = getUserID(getState);

    const result = await serverClient.deleteFriend(_id, friendID);

    if (!result.success) rejectWithValue(false);

    return result.result;
  }
);

export const sendEventRequest = createAsyncThunk(
  "user/sendEventRequest",
  async (
    {
      eventID,
      requestedUserID,
    }: {
      eventID: string;
      requestedUserID: string;
    },
    { getState, rejectWithValue }
  ) => {
    const _id = getUserID(getState);

    const result = await serverClient.sendEventInvite(
      _id,
      eventID,
      requestedUserID
    );

    if (!result.success) rejectWithValue(false);

    return result.result;
  }
);

export const rejectEventRequest = createAsyncThunk(
  "user/rejectEventRequest",
  async (
    {
      eventID,
      inviteID,
    }: {
      eventID: string;
      inviteID: string;
    },
    { getState, rejectWithValue }
  ) => {
    const _id = getUserID(getState);

    const result = await serverClient.rejectEventInvite(_id, inviteID);

    if (!result.success) rejectWithValue(false);

    deleteInvite({ inviteID, eventID });

    return inviteID;
  }
);

export const acceptEventRequest = createAsyncThunk(
  "user/acceptEventRequest",
  async (inviteID: string, { getState, rejectWithValue }) => {
    const _id = getUserID(getState);

    const result = await serverClient.acceptEventInvite(_id, inviteID);

    if (!result.success) rejectWithValue(false);

    replaceEvent(result.result);

    return {
      inviteID,
      event: result.result,
    };
  }
);

const initialState: UserStateTest = {
  isAuthenticated: false,
  username: "",
  _id: "",
  loading: "idle",
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
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = "loading";
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.username = action.payload.username;
      state._id = action.payload._id;
      state.events = action.payload.events;
      state.friends = action.payload.friends;
      state.friendsRequests = action.payload.friendsRequests;
      state.eventsRequests = action.payload.eventsRequests;
      state.loading = "succeeded";
      state.isAuthenticated = true;
    });
    builder.addCase(login.rejected, (state) => {
      state.loading = "failed";
    });
    builder.addCase(logout.fulfilled, (state) => {
      state = initialState;
    });
    builder.addCase(deleteAccount.fulfilled, (state) => {
      state = initialState;
    });
    builder.addCase(deleteUserEvent.fulfilled, (state, action) => {
      state.events.userEvents = state.events.userEvents.filter(
        (event) => action.payload.eventID !== event._id
      );
    });
    builder.addCase(signUserForEvent.fulfilled, (state, action) => {
      state.events.userEvents.push(action.payload);
    });
    builder.addCase(signOutUserFromEvent.fulfilled, (state, action) => {
      state.events.userEvents = state.events.userEvents.filter(
        (event) => action.payload.eventID !== event._id
      );
    });
    builder.addCase(addEvent.fulfilled, (state, action) => {
      state.events.userEvents.push(action.payload);
    });
    builder.addCase(editEvent.fulfilled, (state, action) => {
      state.events.userEvents = state.events.userEvents.map((event) => {
        if (event._id === action.payload._id) {
          return action.payload;
        }

        return event;
      });
    });
    builder.addCase(updatePassword.fulfilled, (state) => {
      state.loading = "succeeded";
    });
    builder.addCase(sendFriendRequest.fulfilled, (state, action) => {
      state.friendsRequests.sent.push(action.payload);
    });
    builder.addCase(acceptFriendRequest.fulfilled, (state, action) => {
      state.friends.push(action.payload);
      state.friendsRequests.received = state.friendsRequests.received.filter(
        (request) => request._id !== action.payload._id
      );
    });
    builder.addCase(rejectFriendRequest.fulfilled, (state, action) => {
      state.friendsRequests.received = state.friendsRequests.received.filter(
        (request) => request._id !== action.payload._id
      );
    });
    builder.addCase(deleteFriend.fulfilled, (state, action) => {
      state.friends = state.friends.filter(
        (friend) => friend._id !== action.payload._id
      );
    });
    builder.addCase(sendEventRequest.fulfilled, (state, action) => {
      state.eventsRequests.sent.push(action.payload);
    });
    builder.addCase(rejectEventRequest.fulfilled, (state, action) => {
      state.eventsRequests.received = state.eventsRequests.received.filter(
        (request) => request !== action.payload
      );
    });
    builder.addCase(acceptEventRequest.fulfilled, (state, action) => {
      state.events.userEvents.push(action.payload.event);
      state.eventsRequests.received = state.eventsRequests.received.filter(
        (request) => request !== action.payload.inviteID
      );
    });
  },
});

export const {} = UserSlice.actions;

// helper functions

function getUserID(getState: () => unknown) {
  const {
    user: { _id },
  } = getState() as RootState;

  return _id;
}

export default UserSlice.reducer;
