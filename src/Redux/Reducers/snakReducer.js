import {
  ADD_RECOMMENDED_SNAKS,
  ADD_ALL_RECOMMENDED_SNAKS,
  ADD_SNAKS,
  ADD_SNAK_PROFILE,
  ADD_USER_SETTINGS,
} from "./../types";

const initialState = {
  recommendedSnaks: null,
  allRecommendedSnaks: null,
  snaks: null,
  snakProfiles: {},
  userSettings: {},
};
export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_RECOMMENDED_SNAKS:
      return { ...state, recommendedSnaks: action.payload };
    case ADD_ALL_RECOMMENDED_SNAKS:
      return { ...state, allRecommendedSnaks: action.payload };
    case ADD_SNAKS:
      return { ...state, snaks: action.payload };
    case ADD_SNAK_PROFILE:
      return { ...state, snakProfiles: action.payload };
    case ADD_USER_SETTINGS:
      return { ...state, userSettings: action.payload };
    default:
      return state;
  }
};
