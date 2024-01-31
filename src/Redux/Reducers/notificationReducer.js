import {
  ADD_CHATS,
  ADD_NOTIFICATION_PREFERENCES,
  ADD_NOTIFICATIONS,
} from "./../types";

const initialState = {
  notifications: null,
  notificationPreferences: null,

  chats: null,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_NOTIFICATION_PREFERENCES:
      return { ...state, notificationPreferences: action.payload };
    case ADD_NOTIFICATIONS:
      return { ...state, notifications: action.payload };
    case ADD_CHATS:
      return { ...state, chats: action.payload };
    default:
      return state;
  }
};
