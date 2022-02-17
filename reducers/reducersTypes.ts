// I'm leaving this file because some things may be useful in the future.

// import { Event, User, Requests, UserEntry } from "../types/types";

// // PT = Payload Type
// // PTA = Payload Type Array
// // E = Enum
// // T = Type
// // EK = Enum Key

// export interface AppFieldState<T> {
//   items: Array<T>;
//   loading: boolean;
//   query: {
//     offset: number;
//     limit: number;
//   };
// }

// export enum AppStateKeys {
//   EVENTS = "events",
//   USERS = "users",
// }

// // Testing purpose
// export interface AppFieldStateTest<T> {
//   items: Array<T>;
//   loading: LoadingType;
//   query: {
//     offset: number;
//     limit: number;
//   };
// }

// export interface AppStateTest {
//   [AppStateKeys.EVENTS]: AppFieldStateTest<Event>;
//   [AppStateKeys.USERS]: AppFieldStateTest<UserEntry>;
// }

// export interface AppState {
//   [AppStateKeys.EVENTS]: AppFieldState<Event>;
//   [AppStateKeys.USERS]: AppFieldState<UserEntry>;
// }

// // ========================================================

// // Default Types

// export interface DeleteEventAction {
//   type: EventActions.FILTER_OUT_EVENT | UserActions.DELETE_EVENT;
//   payload: {
//     eventId: string;
//     field?: string;
//   };
// }

// export interface EditEventAction {
//   type: EventActions.REPLACE_EVENT | UserActions.EDIT_EVENT;
//   payload: {
//     event: Event;
//     field?: string;
//   };
// }

// export interface ActionWithoutPayload<T> {
//   type: T;
// }

// export interface ArrayPayload<E, PT> {
//   type: E;
//   payload: Array<PT>;
// }

// export interface Payload<E, P> {
//   type: E;
//   payload: P;
// }

// // Type if the actions are identical so key is from the enum
// export type GetDataAction<E, PT, EK> = {
//   type: E;
//   payload: {
//     field: EK;
//     items: Array<PT>;
//   };
// };

// // ========================================================

// // ========================================================

// export enum EventActions {
//   GET_EVENTS = "GET_EVENTS",
//   SET_EVENTS_LOADING = "SET_EVENTS_LOADING",
//   FILTER_OUT_EVENT = "FILTER_OUT_EVENT",
//   REPLACE_EVENT = "REPLACE_EVENT",
//   LOAD_EVENTS = "LOAD_EVENTS",
//   REFERESH_EVENTS = "REFERESH_EVENTS",
//   DELETE_INVITE = "DELETE_INVITE",
// }

// export type AppAllActions =
//   | ArrayPayload<EventActions.REFERESH_EVENTS, Event>
//   | ArrayPayload<EventActions.GET_EVENTS, Event>
//   | ArrayPayload<EventActions.LOAD_EVENTS, Event>
//   | ActionWithoutPayload<EventActions.SET_EVENTS_LOADING>
//   | Payload<EventActions.FILTER_OUT_EVENT, string>
//   | Payload<EventActions.DELETE_INVITE, { inviteID: string; eventID: string }>
//   | DeleteEventAction
//   | EditEventAction;

// // ========================================================

// type EventsType = {
//   [key: string | number]: Event[];
// };

// export interface EventEntry {
//   user: UserEntry;
//   eventId: string;
// }

// type EventsRequest = {
//   sent: string[];
//   received: string[];
// };

// export type UserState = {
//   _id: string;
//   isAuthenticated: boolean;
//   username: string;
//   loading: boolean;
//   events: EventsType;
//   friends: UserEntry[];
//   friendsRequests: Requests;
//   eventsRequests: EventsRequest;
// };

// export type UserStateTest = {
//   _id: string;
//   isAuthenticated: boolean;
//   username: string;
//   loading: LoadingType;
//   events: EventsType;
//   friends: UserEntry[];
//   friendsRequests: Requests;
//   eventsRequests: EventsRequest;
// };

// export type EventInvite = {
//   _id: string;
//   eventId: string;
//   user: UserEntry;
// };

// export enum UserActions {
//   LOGIN = "LOGIN",
//   LOGOUT = "LOGOUT",
//   SET_CURRENT_USER_LOADING = "SET_CURRENT_USER_LOADING",
//   END_CURRENT_USER_LOADING = "END_CURRENT_USER_LOADING",
//   DELETE_EVENT = "DELETE_EVENT",
//   EDIT_EVENT = "EDIT_EVENT",
//   SIGN_USER_TO_EVENT = "SIGN_USER_TO_EVENT",
//   SIGN_OUT_USER_FROM_EVENT = "SIGN_OUT_USER_FROM_EVENT",
//   SEND_FRIEND_REQUEST = "SEND_FRIEND_REQUEST",
//   ADD_EVENT = "ADD_EVENT",
//   ACCEPT_FRIEND_REQUEST = "ACCEPT_FRIEND_REQUEST",
//   REJECT_FRIEND_REQUEST = "REJECT_FRIEND_REQUEST",
//   DELETE_FRIEND = "DELETE_FRIEND",
//   SEND_EVENT_REQUEST = "SEND_EVENT_REQUEST",
//   REJECT_EVENT_REQUEST = "REJECT_EVENT_REQUEST",
//   ACCEPT_EVENT_REQUEST = "ACCEPT_EVENT_REQUEST",
// }

// export enum EventTypes {
//   USER_EVENTS = "userEvents",
//   USER_SIGNED_EVENTS = "userSignedEvents",
//   USER_INVITED_EVENTS = "userInvitedEvents",
// }

// type AcceptPayload = {
//   event: Event;
//   inviteID: string;
// };

// export type UserAllActions =
//   | Payload<UserActions.LOGIN, any>
//   | Payload<UserActions.SIGN_USER_TO_EVENT, Event>
//   | Payload<UserActions.SIGN_OUT_USER_FROM_EVENT, string>
//   | Payload<UserActions.ADD_EVENT, Event>
//   | Payload<UserActions.SEND_FRIEND_REQUEST, UserEntry>
//   | Payload<UserActions.ACCEPT_FRIEND_REQUEST, UserEntry>
//   | Payload<UserActions.REJECT_FRIEND_REQUEST, string>
//   | Payload<UserActions.DELETE_FRIEND, string>
//   | Payload<UserActions.SEND_EVENT_REQUEST, EventInvite>
//   | Payload<UserActions.REJECT_EVENT_REQUEST, string>
//   | Payload<UserActions.ACCEPT_EVENT_REQUEST, AcceptPayload>
//   | ActionWithoutPayload<UserActions.SET_CURRENT_USER_LOADING>
//   | ActionWithoutPayload<UserActions.END_CURRENT_USER_LOADING>
//   | ActionWithoutPayload<UserActions.LOGOUT>
//   | DeleteEventAction
//   | EditEventAction;

// // ========================================================

// export interface ModalsState {
//   [key: string]: boolean;
// }

// export enum ModalsActions {
//   OPEN_LOGIN_MODAL = "OPEN_LOGIN_MODAL",
//   OPEN_REGISTER_MODAL = "OPEN_REGISTER_MODAL",
//   OPEN_ADD_EVENT_MODAL = "OPEN_ADD_EVENT_MODAL",
//   CLOSE_MODAL = "CLOSE_MODAL",
// }

// export type ModalsAllActions =
//   | ActionWithoutPayload<ModalsActions.OPEN_LOGIN_MODAL>
//   | ActionWithoutPayload<ModalsActions.CLOSE_MODAL>
//   | ActionWithoutPayload<ModalsActions.OPEN_REGISTER_MODAL>
//   | ActionWithoutPayload<ModalsActions.OPEN_ADD_EVENT_MODAL>;

// // ========================================================

// export interface ContactsState {
//   users: {
//     items: User[];
//     loading: boolean;
//     query: {
//       offset: number;
//       limit: number;
//     };
//   };
// }

// export enum ContactsActions {
//   GET_USERS = "GET_USERS",
//   SET_USERS_LOADING = "SET_USERS_LOADING",
// }

// export type ContactsAllActions =
//   | Payload<ContactsActions.GET_USERS, User[]>
//   | ActionWithoutPayload<ContactsActions.SET_USERS_LOADING>;
