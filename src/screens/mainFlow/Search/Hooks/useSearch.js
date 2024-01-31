import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
// import axios from "axios"
import {
  GET_SNAKS,
  PATCH_PROFILE,
  GET_MY_PROFILE,
} from "../../../../Constant/index";
import { ADD_USER, FILTER_RECOMMENDED } from "../../../../Redux/types";
import { useNavigation } from "@react-navigation/native";
import useAxios from "../../../../GlobalHooks/useAxios";
import { HOME_PATH } from "../../../../Navigation/Routes";

const useSearch = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const user = useSelector((state) => state.userReducer.user);
  const [loading, setLoading] = useState(false);
  const { axios } = useAxios();
  const updateProfile = async (data) => {
    try {
      setLoading(true);
      const res = await axios({
        url: PATCH_PROFILE,
        method: "PATCH",
        data: data,
      });
      getMyProfile();

      let filter = {
        timePreference: data?.time_preference,
        adventurePreference: data?.adventure_preference,
        careerFields: data?.job_field,
      };
      dispatch({ type: FILTER_RECOMMENDED, payload: filter });
      // console.log("profile", res);
    } catch (error) {
      setLoading(false);
      console.log(error?.message?.messages);
    }
  };
  const getMyProfile = async (token) => {
    try {
      const res = await axios({
        url: GET_MY_PROFILE,
        method: "GET",
      });
      //   console.log("GET_MY_PROFILE", res)
      setLoading(false);
      dispatch({ type: ADD_USER, payload: res });
      navigation.navigate(HOME_PATH);
    } catch (error) {
      console.log(error);
    }
  };
  return {
    user,
    updateProfile,
    loading,
  };
};

export default useSearch;
