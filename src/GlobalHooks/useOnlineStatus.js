import { useEffect, useState } from "react";
import { AppState } from "react-native";
import firestore from "@react-native-firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { HANDLE_ONLINE_STATUS, UPDATE_ACTIVE_COUNT } from "../Redux/types";
import useAxios from "./useAxios";
import { PATCH_PROFILE } from "../Constant";

const useOnlineStatusHook = () => {
  const dispatch = useDispatch();
  const { axios } = useAxios();

  const [appState, setAppState] = useState(AppState.currentState);

  const user = useSelector((state) => state.userReducer.user);
  const userRef = firestore().collection("users").doc(`user_${user?.id}`);

  const handleUpdateSnakProfile = async (isOnline) => {
    const data = {
      is_online: isOnline,
    };

    const res = await axios({
      url: PATCH_PROFILE,
      method: "PATCH",
      data,
    });

    dispatch({
      type: HANDLE_ONLINE_STATUS,
      payload: {
        ...user,
        snak_profile: {
          ...user?.snak_profile,
          is_online: res?.data?.is_online,
        },
      },
    });
  };

  const updateOnlineStatus = async (isOnline) => {
    try {
      await userRef.set({
        is_online: isOnline,
        lastLoginTimestamp: firestore.FieldValue.serverTimestamp(),
      });

      handleUpdateSnakProfile(isOnline);
    } catch (error) {
      console.log("Error on handle online sttaus", error);
    }
  };

  const subscribeToActiveUserCount = () => {
    const activeUsersQuery = firestore()
      .collection("users")
      .where("is_online", "==", true);

    const unsubscribe = activeUsersQuery.onSnapshot((snapshot) => {
      const activeUsersCount = snapshot.size;
      dispatch({ type: UPDATE_ACTIVE_COUNT, payload: activeUsersCount });
    });

    return unsubscribe;
  };

  useEffect(() => {
    if (Object.keys(user).length) {
      updateOnlineStatus(true);
      const unsubscribeActiveCount = subscribeToActiveUserCount();

      return () => {
        updateOnlineStatus(false);
        unsubscribeActiveCount();
      };
    }
  }, []);

  return {
    updateOnlineStatus,
  };
};

export default useOnlineStatusHook;
