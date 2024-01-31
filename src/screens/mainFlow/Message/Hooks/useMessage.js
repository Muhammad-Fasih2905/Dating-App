import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import useAxios from "../../../../GlobalHooks/useAxios";
import { useSelector, useDispatch } from "react-redux";
import { GET_CHATS } from "../../../../Constant";
import { ADD_CHATS } from "../../../../Redux/types";

const useMessage = () => {
  const { axios } = useAxios();
  const dispatch = useDispatch();

  const allChats = useSelector((state) => state.notificationReducer.chats);

  const [loading, setLoading] = useState(false);
  const [laodMore, setLoadMore] = useState(false);

  const getChats = async () => {
    try {
      setLoading(true);

      const res = await axios({
        url: GET_CHATS,
        method: "GET",
      });

      dispatch({ type: ADD_CHATS, payload: res });
    } catch (error) {
      console.log("Getting Chats Error ==> ", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const getLoadMore = async () => {
    if (laodMore || !allChats?.next) return;

    try {
      setLoadMore(true);

      const res = await axios({
        url: allChats?.next,
        method: "GET",
      });

      let newData = {
        ...allChats,
        data: allChats?.results.concat(res.resuts),
        next: res?.next,
      };

      dispatch({
        type: ADD_CHATS,
        payload: newData,
      });
    } catch (error) {
      console.log("Getting Error on Load more chats ", error);
      setLoadMore(false);
    } finally {
      setLoadMore(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getChats();
    }, [])
  );

  return {
    allChats,
    loading,
    getChats,
    getLoadMore,
  };
};

export default useMessage;
