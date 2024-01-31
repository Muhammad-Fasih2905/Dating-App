import {
  ADD_JOBS,
  ADD_ADVENTURE_PREF,
  ADD_TIME_PREF,
  ADD_IMAGES,
  SET_IMAGES
} from "./../types"

const initialState = {
  jobs: [],
  adventurePref: [],
  timePref: [],
  profileImages: []
}
export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_JOBS:
      return { ...state, jobs: action.payload }
    case ADD_ADVENTURE_PREF:
      return { ...state, adventurePref: action.payload }
    case ADD_TIME_PREF:
      return { ...state, timePref: action.payload }
    case ADD_IMAGES:
      return {
        ...state,
        profileImages: action.payload.sort((a, b) => b.id - a.id)
      }
    case SET_IMAGES:
      return {
        ...state,
        profileImages: [action.payload, ...state.profileImages]
      }
    default:
      return state
  }
}
