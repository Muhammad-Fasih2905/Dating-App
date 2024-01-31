import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
// import axios from "axios"
import {
  GET_MY_PROFILE,
  OTP_GENERATE,
  OTP_VERIFY,
  SIGNUP_URL,
  PATCH_MY_PROFILE,
} from "../../../../Constant/index";
import {
  ADD_AUTH_TOKEN,
  ADD_JOBS,
  ADD_USER,
  OTP_VERIFY_SUCCESS,
  ADD_IMAGES,
} from "../../../../Redux/types";
import { useNavigation } from "@react-navigation/native";
import {
  CREATE_PROFILE_PATH,
  VERIFICATION_PATH,
} from "../../../../Navigation/Routes";
import {
  GET_JOB_FIELDS,
  GET_USER__PROFILES_IMAGES,
} from "../../../../Constant/index";
import useAxios from "../../../../GlobalHooks/useAxios";
const useLogicProfile = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.configReducer.jobs);
  const user = useSelector((state) => state.userReducer.user);
  const { axios } = useAxios();

  const getJobFields = async () => {
    try {
      const res = await axios({
        url: GET_JOB_FIELDS,
        method: "GET",
      });
      // console.log("this is res", res?.data)
      dispatch({
        type: ADD_JOBS,
        payload: res?.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getProfileImages = async () => {
    try {
      const res = await axios({
        url: GET_USER__PROFILES_IMAGES,
        method: "GET",
      });
      dispatch({
        type: ADD_IMAGES,
        payload: res?.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const setProfileImages = async (formData) => {
    try {
      const res = await axios({
        url: GET_USER__PROFILES_IMAGES,
        method: "POST",
        data: formData,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onSignup = async (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios({
          url: SIGNUP_URL,
          method: "POST",
          data: data,
        });
        dispatch({
          type: ADD_AUTH_TOKEN,
          payload: res,
        });

        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
  };

  const getMyProfile = (token) => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios({
          url: GET_MY_PROFILE,
          method: "GET",
        });
        console.log("profile", res);
        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
  };

  const updateProfile = (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios({
          url: PATCH_MY_PROFILE,
          method: "PATCH",
          data: data,
        });
        // console.log("profile", res)

        dispatch({
          type: ADD_USER,
          payload: res,
        });
        resolve(res);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  };

  useEffect(() => {
    getJobFields();
    getProfileImages();
  }, []);

  return {
    getJobFields,
    jobs,
    onSignup,
    user,
    updateProfile,
    setProfileImages,
  };
};

export default useLogicProfile;
