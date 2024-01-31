export const IS_DEV = false;
let DEV_API_URL = "http://localhost:8000/api";
export const API_URL = IS_DEV
  ? DEV_API_URL
  : "https://snaksnak-new-35878.botics.co/api";

export const OTP_GENERATE = API_URL + "/otp/generate"; // POST METHOD
export const OTP_VERIFY = API_URL + "/otp/verify"; // POST METHOD

export const LOGIN_URL = API_URL + "/login"; // POST METHOD
export const SIGNUP_URL = API_URL + "/register"; // POST METHOD

export const REFRESH = API_URL + "/refresh"; // POST METHOD

// user me api
export const GET_MY_PROFILE = API_URL + "/me"; // GET METHOD
export const PATCH_MY_PROFILE = API_URL + "/me"; // PATCH METHOD

export const GET_RECOMMENDED_SNAKS = API_URL + "/users/recommended-snaks"; // GET METHOD
export const GET_ALL_RECOMMENDED_SNAKS = API_URL + "/users/Recommended"; // GET METHOD

export const GET_OTHER_PROFILE = API_URL + "/users/:id/view"; // GET METHOD

export const GET_USER__PROFILES_IMAGES = API_URL + "/users/images"; // GET METHOD
export const SET_USER__PROFILES_IMAGES = API_URL + "/users/images"; // POST METHOD

export const PATCH_PROFILE = API_URL + "/users/profile"; // PATCH METHOD

// Block
export const BLOCK_USER = API_URL + "/users/:id/block"; // POST METHOD
export const UNBLOCK_USER = API_URL + "/users/:id/unblock"; // POST METHOD
export const GET_BLOCK_LIST = API_URL + "/users/blocked"; // POST METHOD

export const GET_USER_PROFILE = API_URL + "/users/:id/view"; // GET METHOD

export const SET_USER_SETTINGS = API_URL + "/users/settings"; // PATCH METHOD

// Snaks
export const GET_SNAKS = API_URL + "/snaks"; // GET METHOD
export const CREATE_SNAKS = API_URL + "/snaks"; // POST METHOD
export const UPDATE_SNAKS = API_URL + "/snaks/:id"; // PATCH METHOD
export const DELETE_SNAKS = API_URL + "/snaks/:id"; // DELETE METHOD

// Config GET METHOD
export const GET_TIME_PREFS = API_URL + "/configs/time-prefs/list";
export const GET_ADVENTURE_PREFS = API_URL + "/configs/adventure-prefs/list";
export const GET_JOB_FIELDS = API_URL + "/configs/job-fields/list";
export const GET_SPORTS_PREFS = API_URL + "/configs/sports";

// Devices
export const GET_DEVICES = API_URL + "/devices"; // GET METHOD
export const POST_DEVICES = API_URL + "/devices"; // POST METHOD
export const GET_DEVICES_BY_ID = API_URL + "/devices/:id"; // GET METHOD
export const PATHCH_DEVICES = API_URL + "/devices/:id"; // PATHCH METHOD
export const DELETE_DEVICES = API_URL + "/devices/:id"; // DELETE METHOD

// Notification
export const GET_NOTIFICATIONS_PREFERENCES =
  API_URL + "/notifications/preferences"; // GET METHOD
export const GET_NOTIFICATIONS = API_URL + "/notifications/"; // GET METHOD
export const PATHCH_NOTIFICATIONS = API_URL + "/notifications/:id"; // PATCH METHOD

// SUBSCRIPTION
export const STRIPTE_PUB_KEY = API_URL + "/payments/stripe/stripe-public-key"; // GET METHOD
export const PAYMENT_LIST = API_URL + "/payments/stripe/list"; // GET METHOD
export const PAYMENT_BY_ID = API_URL + "/payments/stripe/:id"; // GET METHOD
export const STRIPE_CARD_LIST = API_URL + "/payments/stripe/card/list"; // GET METHOD
export const ADD_STRIPE_CARD = API_URL + "/payments/stripe/card/attach"; // POST METHOD
export const DELETE_STRIPE_CARD = API_URL + "/payments/stripe/card/delete"; // DELETE METHOD
export const UPDATE_STRIPE_CARD = API_URL + "/payments/stripe/card/update"; // PATCH METHOD

// Chats
export const GET_CHATS = API_URL + "/chatschats/";
