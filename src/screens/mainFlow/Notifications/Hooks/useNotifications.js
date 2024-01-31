import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import {
  GET_NOTIFICATIONS_PREFERENCES,
  GET_NOTIFICATIONS,
} from "../../../../Constant/index";
import {
  ADD_NOTIFICATION_PREFERENCES,
  ADD_NOTIFICATIONS,
} from "../../../../Redux/types";
import { useNavigation } from "@react-navigation/native";
import useAxios from "../../../../GlobalHooks/useAxios";
import useNotificationHook from "../../../../GlobalHooks/handleNotificationCount";

const useNotifications = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { axios } = useAxios();

  const { deleteNotificationCount } = useNotificationHook();

  const user = useSelector((state) => state.userReducer.user);
  const { notificationCount } = useSelector((state) => state.userReducer);
  const allNotifications = useSelector(
    (state) => state.notificationReducer.notifications
  );

  const notificationPreferences = useSelector(
    (state) => state.notificationReducer.notificationPreferences,
    shallowEqual
  );

  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const getNotificationsPreferences = async () => {
    try {
      const res = await axios({
        url: GET_NOTIFICATIONS_PREFERENCES,
        method: "GET",
      });
      dispatch({ type: ADD_NOTIFICATION_PREFERENCES, payload: res });
    } catch (error) {
      console.log(error);
    }
  };

  const getNotifications = async () => {
    try {
      setLoading(true);
      const res = await axios({
        url: GET_NOTIFICATIONS,
        method: "GET",
      });

      dispatch({ type: ADD_NOTIFICATIONS, payload: res });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getMoreNotifications = async () => {
    if (loadingMore || !allNotifications?.pagination?.links?.next) return; // Prevent multiple requests
    try {
      setLoadingMore(true);
      const res = await axios({
        url: allNotifications?.pagination?.links?.next,
        method: "GET",
      });

      let newData = {
        data: allNotifications.data.concat(res.data),
        pagination: {
          ...res.pagination,
        },
      };

      dispatch({
        type: ADD_NOTIFICATIONS,
        payload: newData,
      });
    } catch (error) {
      setLoadingMore(false);
      console.log(error?.message?.messages);
    } finally {
      setLoadingMore(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getNotifications();

      if (notificationCount) {
        deleteNotificationCount(user?.id);
      }
    }, [])
  );

  useEffect(() => {
    getNotificationsPreferences();
  }, []);

  return {
    loading,
    loadingMore,
    allNotifications,
    notificationPreferences,
    getNotificationsPreferences,
    getNotifications,
    getMoreNotifications,
  };
};

export default useNotifications;
