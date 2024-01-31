import Onboarding from "../screens/authFlow/Onboarding/index.js";
import Welcome from "../screens/authFlow/Welcome/index.js";
import Auth from "../screens/authFlow/Auth/index.js";
import Verification from "../screens/authFlow/Verification/index.js";
import CreateProfile from "../screens/mainFlow/CreateProfile/index.js";
import CreateSignupProfile from "../screens/mainFlow/CreateProfile/signupProfile.js";
import MyProfile from "../screens/mainFlow/MyProfile/index.js";
import OthersProfile from "../screens/mainFlow/OthersProfile/index.js";
import Home from "../screens/mainFlow/Home/index.js";
import Search from "../screens/mainFlow/Search/index.js";
import Settings from "../screens/mainFlow/Settings/index.js";
import Subscription from "../screens/mainFlow/Subscription/index.js";
import Payment from "../screens/mainFlow/Payment/index.js";
import Message from "../screens/mainFlow/Message/index.js";
import Chat from "../screens/mainFlow/Message/chat.js";
import DirectMessage from "../screens/mainFlow/DirectMessage/index.js";
import BlockedAccount from "../screens/mainFlow/BlockedAccount/index.js";
import InviteManagement from "../screens/mainFlow/InviteManagement/index.js";
import TermsCondition from "../screens/mainFlow/Terms&Condition/index.js";
import PrivacyPolicy from "../screens/mainFlow/PrivacyPolicy/index.js";
import ContactUs from "../screens/mainFlow/ContactUs/index.js";
import DeleteAccount from "../screens/mainFlow/DeleteAccount/index.js";
import Notifications from "../screens/mainFlow/Notifications/index.js";

// images

import SEARCH_IMAGE from "./../assets/Images/Navigation/search.png";
import INVITE_IMAGE from "./../assets/Images/Navigation/invite.png";
import SETTINGS_IMAGE from "./../assets/Images/Navigation/settings.png";
import PERSON_IMAGE from "./../assets/Images/Navigation/person.png";
import PHONE_IMAGE from "./../assets/Images/Navigation/phone.png";
import SUBSCRIPTION_IMAGE from "./../assets/Images/Navigation/subscription.png";
import PRIVACY_IMAGE from "./../assets/Images/Navigation/privacy.png";
import BELL_IMAGE from "./../assets/Images/Navigation/bell.png";
import DOC_IMAGE from "./../assets/Images/Navigation/doc.png";
import CHAT_IMAGE from "./../assets/Images/Navigation/chat.png";

export const ONBOARDING_PATH = "Onboarding";
export const WELCOME_PATH = "Welcome";
export const AUTH_PATH = "Auth";
export const VERIFICATION_PATH = "Verification";
export const CREATE_PROFILE_PATH = "My Profile";
export const CREATE_SIGNUP_PROFILE_PATH = "SignupProfile";
export const MY_PROFILE_PATH = "ViewProfile";
export const OTHERS_PROFILE_PATH = "OthersProfile";
export const HOME_PATH = "Home";
export const SEARCH_PATH = "Search for Snak";
export const SETTINGS_PATH = "Settings";
export const SUBSCRIPTION_PATH = "Subscription";
export const PAYMENT_PATH = "Payment";
export const MESSAGE_PATH = "Messages";
export const CHAT_PATH = "Chat";
export const DIRECT_MESSAGE_PATH = "DirectMessage";
export const BLOCKED_ACCOUNT_PATH = "Blocked Account";
export const INVITE_MANAGEMENT_PATH = "Invite Management";
export const TERMS_CONDITION_PATH = "Terms And Conditions";
export const CONTACT_US_PATH = "Contact Us";
export const PRIVACY_POLICY_PATH = "Privacy Policy";
export const DELETE_ACCOUNT_PATH = "DeleteAccount";
export const NOTIFICATIONS_PATH = "Notifications";
export const AUTH_ROUTES = [
  {
    component: Onboarding,
    path: ONBOARDING_PATH,
  },
  {
    component: Welcome,
    path: WELCOME_PATH,
  },
  {
    component: Auth,
    path: AUTH_PATH,
  },
  {
    component: Verification,
    path: VERIFICATION_PATH,
  },
  {
    component: CreateProfile,
    path: CREATE_PROFILE_PATH,
    sidebar: false,
  },
  {
    component: CreateSignupProfile,
    path: CREATE_SIGNUP_PROFILE_PATH,
    sidebar: true,
    image: PERSON_IMAGE,
  },
  {
    component: ContactUs,
    path: CONTACT_US_PATH,
    sidebar: true,
    image: PHONE_IMAGE,
  },
];

export const MAIN_ROUTES = [
  {
    component: Home,
    path: HOME_PATH,
    sidebar: false,
  },
  {
    component: Search,
    path: SEARCH_PATH,
    sidebar: true,
    image: SEARCH_IMAGE,
  },
  {
    component: Message,
    path: MESSAGE_PATH,
    sidebar: true,
    image: CHAT_IMAGE,
  },
  {
    component: Chat,
    path: CHAT_PATH,
    sidebar: false,
  },
  {
    component: InviteManagement,
    path: INVITE_MANAGEMENT_PATH,
    sidebar: true,
    image: INVITE_IMAGE,
  },
  {
    component: CreateProfile,
    path: CREATE_PROFILE_PATH,
    sidebar: true,
    image: PERSON_IMAGE,
  },
  {
    component: MyProfile,
    path: MY_PROFILE_PATH,
    sidebar: false,
    image: PERSON_IMAGE,
  },
  {
    component: Settings,
    path: SETTINGS_PATH,
    sidebar: true,
    image: SETTINGS_IMAGE,
  },
  {
    component: ContactUs,
    path: CONTACT_US_PATH,
    sidebar: true,
    image: PHONE_IMAGE,
  },
  {
    component: BlockedAccount,
    path: BLOCKED_ACCOUNT_PATH,
    sidebar: false,
  },
  {
    component: OthersProfile,
    path: OTHERS_PROFILE_PATH,
    sidebar: false,
    options: { unmountOnBlur: true },
  },
  {
    component: Payment,
    path: PAYMENT_PATH,
    sidebar: false,
  },
  {
    component: DirectMessage,
    path: DIRECT_MESSAGE_PATH,
    sidebar: false,
  },
  {
    component: TermsCondition,
    path: TERMS_CONDITION_PATH,
    sidebar: true,
    image: DOC_IMAGE,
  },
  {
    component: PrivacyPolicy,
    path: PRIVACY_POLICY_PATH,
    sidebar: true,
    image: PRIVACY_IMAGE,
  },
  {
    component: Subscription,
    path: SUBSCRIPTION_PATH,
    sidebar: true,
    image: SUBSCRIPTION_IMAGE,
  },
  {
    component: DeleteAccount,
    path: DELETE_ACCOUNT_PATH,
    sidebar: false,
  },
  {
    component: Notifications,
    path: NOTIFICATIONS_PATH,
    sidebar: false,
  },
];
