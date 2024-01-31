import { createStore, applyMiddleware, combineReducers } from "redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

import userReducer from "./Reducers/userReducer";
import snakReducer from "./Reducers/snakReducer";
import configReducer from "./Reducers/configReducer";
import notificationReducer from "./Reducers/notificationReducer";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};
let rootReducer = combineReducers({
  userReducer,
  snakReducer,
  configReducer,
  notificationReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, applyMiddleware(thunk));
const persistor = persistStore(store);

export { store, persistor };
