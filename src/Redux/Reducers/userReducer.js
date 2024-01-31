import {
  ADD_USER,
  OTP_VERIFY_SUCCESS,
  ADD_AUTH_TOKEN,
  ADD_BLOCKED_LIST,

  // Subscription
  ADD_STRIPE_PUB_KEY,
  ADD_STRIPE_PAYMENT_LIST,
  ADD_STRIPE_CARD_LIST,
  UPDATE_COUNT_NOTIFICATION,
  FILTER_RECOMMENDED,
  HANDLE_ONLINE_STATUS,
  UPDATE_ACTIVE_COUNT,
} from "./../types";

const initialState = {
  user: null,
  activeCount: 0,
  token: "",
  phone: "",
  accessToken: null,
  refreshToken: null,
  blockedList: null,

  stripePubKey: null,
  notificationCount: 0,

  recommendedSnaksFilter: {
    timePreference: null,
    adventurePreference: null,
    careerFields: null,
  },
};
export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return { ...state, user: action.payload };
    case ADD_BLOCKED_LIST:
      return { ...state, blockedList: action.payload };
    case OTP_VERIFY_SUCCESS:
      const { token, phone } = action.payload;
      return { ...state, token: token, phone: phone };
    case ADD_AUTH_TOKEN:
      const access = action.payload?.access || null;
      const refresh = action.payload?.refresh || null;
      return { ...state, accessToken: access, refreshToken: refresh };
    case ADD_STRIPE_PUB_KEY:
      return { ...state, stripePubKey: action.payload };
    case UPDATE_COUNT_NOTIFICATION:
      return { ...state, notificationCount: action.payload };
    case FILTER_RECOMMENDED:
      return { ...state, recommendedSnaksFilter: action.payload };
    case HANDLE_ONLINE_STATUS:
      return { ...state, user: action.payload };
    case UPDATE_ACTIVE_COUNT:
      return { ...state, activeCount: action.payload };
    default:
      return state;
  }
};
