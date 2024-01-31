import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { GET_BLOCK_LIST, UNBLOCK_USER } from "../../../../Constant/index";
import { ADD_BLOCKED_LIST } from "../../../../Redux/types";
import { useNavigation } from "@react-navigation/native";
import useAxios from "../../../../GlobalHooks/useAxios";
import Toast from "react-native-toast-message";
const useHook = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { axios } = useAxios();

  const blockedList = useSelector((state) => state.userReducer.blockedList);

  const [userLoadingStatus, setUserLoadingStatus] = useState({});
  const [loadingMore, setLoadingMore] = useState(false);
  const [loading, setLoading] = useState(false);

  const getBlockedList = async () => {
    setLoading(true);
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
      setLoading(false);
      console.log(error?.message?.messages);
    } finally {
      setLoading(false);
    }
  };

  const unblockUser = async (id) => {
    setUserLoadingStatus((prevStatus) => ({
      ...prevStatus,
      [id]: true,
    }));

    try {
      const res = await axios({
        url: UNBLOCK_USER?.replace(":id", id),
        method: "POST",
      });

      let newData = {
        ...blockedList,
        data: blockedList?.data?.filter((v) => v.id !== id),
      };

      dispatch({
        type: ADD_BLOCKED_LIST,
        payload: newData,
      });

      Toast.show({
        type: "success",
        text1: "Success",
        text2: "User unblocked successfully",
      });
    } catch (error) {
      console.log(error);
    } finally {
      setUserLoadingStatus((prevStatus) => ({
        ...prevStatus,
        [id]: false,
      }));
    }
  };

  const getMoreBlockedList = async () => {
    if (loadingMore || !blockedList?.pagination?.links?.next) return; // Prevent multiple requests
    try {
      setLoadingMore(true);
      const res = await axios({
        url: blockedList?.pagination?.links?.next,
        method: "GET",
      });

      let newData = {
        data: blockedList.data.concat(res.data),
        pagination: {
          ...res.pagination,
        },
      };

      dispatch({
        type: ADD_BLOCKED_LIST,
        payload: newData,
      });
    } catch (error) {
      console.log(error?.message?.messages);
    } finally {
      setLoadingMore(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getBlockedList();
    }, [])
  );

  return {
    blockedList,
    userLoadingStatus,
    loadingMore,
    loading,
    getBlockedList,
    unblockUser,
    getMoreBlockedList,
  };
};

export default useHook;
