import { useDispatch, useSelector, shallowEqual } from "react-redux";
import {
  GET_OTHER_PROFILE,
  BLOCK_USER,
  CREATE_SNAKS,
  DELETE_SNAKS,
  UNBLOCK_USER,
  UPDATE_SNAKS,
} from "./../../../../Constant/index";
import {
  ADD_BLOCKED_LIST,
  ADD_SNAKS,
  ADD_USER,
} from "./../../../../Redux/types";
import { useNavigation } from "@react-navigation/native";
import useAxios from "./../../../../GlobalHooks/useAxios";
import Toast from "react-native-toast-message";
import useNotificationHook from "../../../../GlobalHooks/handleNotificationCount";

export default () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { axios } = useAxios();
  const { handleUpdateNotificationCount } = useNotificationHook();

  const user = useSelector((state) => state.userReducer.user);
  const blockedList = useSelector((state) => state.userReducer.blockedList);
  const snaks = useSelector((state) => state.snakReducer.snaks);

  const getOtherProfile = async (id) => {
    // try {
    //   const res = await axios({
    //     url: GET_OTHER_PROFILE?.replace(":id", id),
    //     method: "GET",
    //   });

    //   return res?.data;
    // } catch (error) {
    //   console.log("error on get other profile", error);
    // }
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios({
          url: GET_OTHER_PROFILE?.replace(":id", id),
          method: "GET",
        });

        resolve(res?.data);
      } catch (error) {
        reject(error);
      }
    });
  };

  const createSnak = async (Obj) => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios({
          url: CREATE_SNAKS,
          method: "POST",
          data: Obj,
        });

        await handleUpdateNotificationCount(Obj?.to_user);
        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
  };

  const editSnak = async (Obj) => {
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

  const AcceptRejectSnak = async (Obj, id, notiCountId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios({
          url: UPDATE_SNAKS.replace(":id", id),
          method: "PATCH",
          data: Obj,
        });

        await handleUpdateNotificationCount(notiCountId);

        let newArr =
          snaks.invites_received.length &&
          snaks?.invites_received?.filter((v) => v.id !== id);
        dispatch({
          type: ADD_SNAKS,
          payload: {
            ...snaks,
            invites_received: [...newArr, res.data],
          },
        });
        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
  };

  const blockUser = async (id) => {
    try {
      const res = await axios({
        url: BLOCK_USER?.replace(":id", id),
        method: "POST",
      });

      let newData = {
        ...blockedList,
        data: blockedList.data.concat(res.data),
      };

      dispatch({
        type: ADD_BLOCKED_LIST,
        payload: newData,
      });

      Toast.show({
        type: "success",
        text1: "Success",
        text2: "User blocked successfully",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const unblockUser = async (id) => {
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
    }
  };

  const cancelSnak = async (id) => {
    try {
      const res = await axios({
        url: DELETE_SNAKS?.replace(":id", id),
        method: "DELETE",
      });

      dispatch({
        type: ADD_SNAKS,
        payload: {
          ...snaks,
          invites_sent: snaks?.invites_sent?.filter((v) => v.id !== id),
        },
      });

      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Snaksnak cancelled successfully",
      });
    } catch (error) {
      console.log(error?.message?.messages);
    }
  };

  return {
    getOtherProfile,
    createSnak,
    blockUser,
    unblockUser,
    cancelSnak,
    editSnak,
    AcceptRejectSnak,
  };
};
