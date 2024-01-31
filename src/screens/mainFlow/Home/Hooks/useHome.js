import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import {
  GET_ADVENTURE_PREFS,
  GET_MY_PROFILE,
  GET_RECOMMENDED_SNAKS,
  GET_ALL_RECOMMENDED_SNAKS,
  GET_SNAKS,
  GET_TIME_PREFS,
  GET_BLOCK_LIST,
  STRIPTE_PUB_KEY,
  GET_NOTIFICATIONS,
} from "../../../../Constant/index";
import {
  ADD_ADVENTURE_PREF,
  ADD_BLOCKED_LIST,
  ADD_RECOMMENDED_SNAKS,
  ADD_ALL_RECOMMENDED_SNAKS,
  ADD_SNAKS,
  ADD_TIME_PREF,
  ADD_USER,
  ADD_NOTIFICATIONS,
} from "../../../../Redux/types";
import { useNavigation } from "@react-navigation/native";
import useSubscription from "../../Subscription/Hooks/useSubscription";
import useAxios from "../../../../GlobalHooks/useAxios";
import Toast from "react-native-toast-message";

const useHome = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { axios } = useAxios();
  const { getStripePubKey } = useSubscription();

  const user = useSelector((state) => state.userReducer.user);
  const activeUserCount = useSelector((state) => state.userReducer.activeCount);
  const recommendedSnaks = useSelector(
    (state) => state.snakReducer.recommendedSnaks,
    shallowEqual
  );
  const allRecommendedSnaks = useSelector(
    (state) => state.snakReducer.allRecommendedSnaks,
    shallowEqual
  );
  const snaks = useSelector((state) => state.snakReducer.snaks);
  const filters = useSelector(
    (state) => state.userReducer.recommendedSnaksFilter
  );

  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const getMyProfile = async () => {
    try {
      const res = await axios({
        url: GET_MY_PROFILE,
        method: "GET",
      });
      //   console.log("GET_MY_PROFILE", res)
      dispatch({ type: ADD_USER, payload: res });
    } catch (error) {
      console.log(error);
    }
  };

  const getAdventurePrefs = async () => {
    try {
      const res = await axios({
        url: GET_ADVENTURE_PREFS,
        method: "GET",
      });
      //   console.log("GET_MY_PROFILE", res)
      dispatch({ type: ADD_ADVENTURE_PREF, payload: res });
    } catch (error) {
      console.log(error);
    }
  };

  const getTimePrefs = async () => {
    try {
      const res = await axios({
        url: GET_TIME_PREFS,
        method: "GET",
      });
      dispatch({ type: ADD_TIME_PREF, payload: res });
    } catch (error) {
      console.log(error);
    }
  };

  // 2nd
  const getRecommendedSnaks = async () => {
    try {
      const res = await axios({
        url: GET_RECOMMENDED_SNAKS,
        method: "GET",
      });
      dispatch({
        type: ADD_RECOMMENDED_SNAKS,
        payload: res,
      });
    } catch (error) {
      console.log(error?.message?.messages);
    }
  };
  // 1st
  const getAllRecommendedSnaks = async (search) => {
    setLoading(true);
    try {
      const res = await axios({
        url: `${GET_ALL_RECOMMENDED_SNAKS}`,
        method: "GET",
        params: {
          search: search?.search,
          adventure_preference: filters?.adventurePreference,
          job_field: filters?.careerFields,
          time_preference: filters?.timePreference,
        },
      });

      dispatch({
        type: ADD_ALL_RECOMMENDED_SNAKS,
        payload: res,
      });
    } catch (error) {
      console.log(error?.message?.messages);
    } finally {
      setLoading(false);
    }
  };

  const getMoreAllRecommendedSnaks = async () => {
    if (loadingMore || !allRecommendedSnaks?.pagination?.links?.next) return; // Prevent multiple requests
    try {
      setLoadingMore(true);
      const res = await axios({
        url: allRecommendedSnaks?.pagination?.links?.next,
        method: "GET",
      });

      let newData = {
        data: allRecommendedSnaks.data.concat(res.data),
        pagination: {
          ...res.pagination,
        },
      };

      dispatch({
        type: ADD_ALL_RECOMMENDED_SNAKS,
        payload: newData,
      });
    } catch (error) {
      console.log(error?.message?.messages);
    } finally {
      setLoadingMore(false);
    }
  };

  const getSnaks = async () => {
    try {
      const res = await axios({
        url: GET_SNAKS,
        method: "GET",
      });
      // console.log("Get Snaks Req ===> ", res);
      dispatch({
        type: ADD_SNAKS,
        payload: res?.data,
      });
      // console.log(res?.data);
    } catch (error) {
      console.log(error?.message?.messages);
    }
  };

  const getBlockedList = async () => {
    try {
      const res = await axios({
        url: GET_BLOCK_LIST,
        method: "GET",
      });
      dispatch({
        type: ADD_BLOCKED_LIST,
        payload: res,
      });
    } catch (error) {
      console.log(error?.message?.messages);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getRecommendedSnaks();
      getSnaks();
    }, [])
  );

  useEffect(() => {
    getMyProfile();
    getTimePrefs();
    getAdventurePrefs();
    getBlockedList();
    getStripePubKey();
  }, []);

  useEffect(() => {
    getAllRecommendedSnaks();
  }, [filters]);

  return {
    user,
    activeUserCount,
    recommendedSnaks,
    allRecommendedSnaks,
    snaks,
    loading,
    loadingMore,
    getMyProfile,
    getSnaks,
    getRecommendedSnaks,
    getAllRecommendedSnaks,
    getMoreAllRecommendedSnaks,
  };
};

export default useHome;
