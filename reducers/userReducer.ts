// I'm leaving this file because some things may be useful in the future.

// import { UserState, UserAllActions, UserActions } from "./reducersTypes";

// const userReducer = (state: UserState, action: UserAllActions): UserState => {
//   switch (action.type) {
//     case UserActions.LOGIN:
//       return {
//         ...state,
//         ...action.payload,
//         isAuthenticated: true,
//         loading: false,
//       };
//     case UserActions.LOGOUT:
//       return {
//         isAuthenticated: false,
//         username: "",
//         _id: "",
//         loading: false,
//         events: {
//           userEvents: [],
//           userSignedEvents: [],
//           userInvitedEvents: [],
//         },
//         friends: [],
//         friendsRequests: {
//           sent: [],
//           received: [],
//         },
//         eventsRequests: {
//           sent: [],
//           received: [],
//         },
//       };
//     case UserActions.SET_CURRENT_USER_LOADING:
//       return {
//         ...state,
//         loading: true,
//       };
//     case UserActions.END_CURRENT_USER_LOADING:
//       return {
//         ...state,
//         loading: false,
//       };
//     case UserActions.DELETE_EVENT:
//       if (!action.payload.field) return state;
//       return {
//         ...state,
//         events: {
//           ...state.events,
//           [action.payload.field]: state.events[action.payload.field].filter(
//             (event) => action.payload.eventId !== event._id
//           ),
//         },
//       };
//     case UserActions.SIGN_USER_TO_EVENT:
//       return {
//         ...state,
//         events: {
//           ...state.events,
//           userSignedEvents: [...state.events.userSignedEvents, action.payload],
//         },
//       };
//     case UserActions.SIGN_OUT_USER_FROM_EVENT:
//       return {
//         ...state,
//         events: {
//           ...state.events,
//           userSignedEvents: state.events.userSignedEvents.filter(
//             (event) => event._id !== action.payload
//           ),
//         },
//       };
//     case UserActions.ADD_EVENT:
//       return {
//         ...state,
//         events: {
//           ...state.events,
//           userEvents: [...state.events.userEvents, action.payload],
//         },
//       };
//     case UserActions.EDIT_EVENT:
//       return {
//         ...state,
//         events: {
//           ...state.events,
//           userEvents: state.events.userEvents.map((event) =>
//             event._id === action.payload.event._id
//               ? action.payload.event
//               : event
//           ),
//         },
//       };
//     case UserActions.SEND_FRIEND_REQUEST:
//       return {
//         ...state,
//         friendsRequests: {
//           ...state.friendsRequests,
//           sent: [...state.friendsRequests.sent, action.payload],
//         },
//       };
//     case UserActions.ACCEPT_FRIEND_REQUEST:
//       return {
//         ...state,
//         friends: [...state.friends, action.payload],
//         friendsRequests: {
//           ...state.friendsRequests,
//           received: state.friendsRequests.received.filter(
//             (request) => request._id !== action.payload._id
//           ),
//         },
//       };
//     case UserActions.REJECT_FRIEND_REQUEST:
//       return {
//         ...state,
//         friendsRequests: {
//           ...state.friendsRequests,
//           received: state.friendsRequests.received.filter(
//             (request) => request._id !== action.payload
//           ),
//         },
//       };
//     case UserActions.DELETE_FRIEND:
//       return {
//         ...state,
//         friends: state.friends.filter(
//           (friend) => friend._id !== action.payload
//         ),
//       };
//     case UserActions.SEND_EVENT_REQUEST:
//       return {
//         ...state,
//         eventsRequests: {
//           ...state.eventsRequests,
//           sent: [...state.eventsRequests.sent, action.payload._id],
//         },
//         events: {
//           ...state.events,
//           userEvents: state.events.userEvents.map((event) =>
//             event._id === action.payload.eventId
//               ? {
//                   ...event,
//                   invites: [
//                     ...event.invites,
//                     {
//                       _id: action.payload._id,
//                       user: action.payload.user,
//                     },
//                   ],
//                 }
//               : event
//           ),
//         },
//       };
//     case UserActions.REJECT_EVENT_REQUEST:
//       return {
//         ...state,
//         eventsRequests: {
//           ...state.eventsRequests,
//           received: state.eventsRequests.received.filter(
//             (request) => request !== action.payload
//           ),
//         },
//         events: {
//           ...state.events,
//           userInvitedEvents: state.events.userInvitedEvents.filter(
//             (event) => event.inviteId !== action.payload
//           ),
//         },
//       };
//     case UserActions.ACCEPT_EVENT_REQUEST:
//       return {
//         ...state,
//         events: {
//           ...state.events,
//           userInvitedEvents: state.events.userInvitedEvents.filter(
//             (event) => event.inviteId !== action.payload.inviteID
//           ),
//           userSignedEvents: [
//             ...state.events.userSignedEvents,
//             action.payload.event,
//           ],
//         },
//         eventsRequests: {
//           ...state.eventsRequests,
//           received: state.eventsRequests.received.filter(
//             (request) => request !== action.payload.inviteID
//           ),
//         },
//       };
//     default:
//       return state;
//   }
// };

// export default userReducer;
