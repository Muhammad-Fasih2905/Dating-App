import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { CREATE_SNAKS, GET_USER_PROFILE } from "./../../../../Constant/index";
import { ADD_USER, ADD_SNAK_PROFILE } from "./../../../../Redux/types";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import useAxios from "./../../../../GlobalHooks/useAxios";
import Toast from "react-native-toast-message";

import useHome from "./../../Home/Hooks/useHome";

export default () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { axios } = useAxios();
  const snakProfiles = useSelector((state) => state.snakReducer.snakProfiles);
  const snaks = useSelector((state) => state.snakReducer.snaks);

  const { getSnaks } = useHome();

  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const blockUser = async (Obj) => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios({
          url: CREATE_SNAKS,
          method: "POST",
          data: Obj,
        });

        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
  };

  const getSnakProfile = async (id) => {
    try {
      const res = await axios({
        url: GET_USER_PROFILE?.replace(":id", id),
        method: "GET",
      });

      dispatch({
        type: ADD_SNAK_PROFILE,
        payload: {
          ...(snakProfiles || {}),
          [id]: res.data,
        },
      });
      console.log(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetSnaks = async () => {
    try {
      setLoading(true);
      await getSnaks();
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      handleGetSnaks();
    }, [])
  );

  return {
    loading,
    loadingMore,
    snaks,
    blockUser,
    handleGetSnaks,
    getSnakProfile,
  };
};
