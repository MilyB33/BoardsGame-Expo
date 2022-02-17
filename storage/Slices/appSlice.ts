import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AppStateTest } from "../../types/types";
import { PaginationQuery } from "../../types/types";
import serverClient from "../../clients/serverClient";
import { RootState } from "../App/store";

import { Event } from "../../types/types";

const initialState: AppStateTest = {
  events: {
    items: [],
    loading: "idle",
    query: {
      offset: 0,
      limit: 3,
    },
  },
  users: {
    items: [],
    loading: "idle",
    query: {
      offset: 0,
      limit: 3,
    },
  },
};

export const fetchInitialEvents = createAsyncThunk(
  "app/fetchInitialEvents",
  async (_, { getState, rejectWithValue }) => {
    const query = getQuery(getState);

    const result = await serverClient.getAllEvents(query);

    if (!result.success) rejectWithValue(false);

    return result.result;
  }
);

export const reloadItems = createAsyncThunk(
  "app/reloadItems",
  async (_, { getState, rejectWithValue }) => {
    const { limit } = getQuery(getState);

    const result = await serverClient.getAllEvents({ offset: 0, limit });

    if (!result.success) rejectWithValue(false);

    return result.result;
  }
);

export const expandEvents = createAsyncThunk(
  "app/expandEvents",
  async (_, { getState, rejectWithValue }) => {
    const query = getQuery(getState);

    const result = await serverClient.getAllEvents(query);

    if (!result.success) rejectWithValue(false);

    return result.result;
  }
);

const AppSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    filterOutEvents(state, action: PayloadAction<string>) {
      state.events.items = state.events.items.filter(
        (event) => event._id !== action.payload
      );
    },
    replaceEvent(state, action: PayloadAction<Event>) {
      state.events.items = state.events.items.map((event) =>
        event._id === action.payload._id ? action.payload : event
      );
    },
    deleteInvite(
      state,
      action: PayloadAction<{ inviteID: string; eventID: string }>
    ) {
      const event = state.events.items.find(
        (event) => event._id === action.payload.eventID
      );

      if (!event) return; // I don't know that i can do that

      event.invites = event.invites.filter(
        (invite) => invite._id !== action.payload.inviteID
      );

      state.events.items = state.events.items.map((event) =>
        event._id === action.payload.eventID ? event : event
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchInitialEvents.pending, (state) => {
      state.events.loading = "loading";
    });
    builder.addCase(fetchInitialEvents.fulfilled, (state, action) => {
      state.events.items = action.payload;
      state.events.query.offset =
        state.events.query.offset + state.events.query.limit;
      state.events.loading = "succeeded";
    });
    builder.addCase(fetchInitialEvents.rejected, (state) => {
      state.events.loading = "failed";
    });
    builder.addCase(reloadItems.pending, (state) => {
      state.events.loading = "loading";
    });
    builder.addCase(reloadItems.fulfilled, (state, action) => {
      state.events.items = action.payload;
      state.events.query.offset = 0;
      state.events.loading = "succeeded";
    });
    builder.addCase(reloadItems.rejected, (state) => {
      state.events.loading = "failed";
    });
    builder.addCase(expandEvents.pending, (state) => {
      state.events.loading = "loading";
    });
    builder.addCase(expandEvents.fulfilled, (state, action) => {
      state.events.items = [...state.events.items, ...action.payload];
      state.events.query.offset =
        state.events.query.offset + state.events.query.limit;
      state.events.loading = "succeeded";
    });
    builder.addCase(expandEvents.rejected, (state) => {
      state.events.loading = "failed";
    });
  },
});

export const { filterOutEvents, replaceEvent, deleteInvite } = AppSlice.actions;

export const selectAllEvents = (state: RootState) => state.app.events.items;

// helper function

function getQuery(getState: () => unknown) {
  const {
    app: {
      events: { query },
    },
  } = getState() as RootState;

  return query;
}

export default AppSlice.reducer;
