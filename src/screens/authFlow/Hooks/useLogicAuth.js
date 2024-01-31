import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import {
  GET_MY_PROFILE,
  LOGIN_URL,
  OTP_GENERATE,
  OTP_VERIFY,
  SIGNUP_URL,
} from "../../../Constant/index";
import {
  ADD_AUTH_TOKEN,
  ADD_USER,
  OTP_VERIFY_SUCCESS,
} from "../../../Redux/types";
import { useNavigation } from "@react-navigation/native";
import {
  CREATE_SIGNUP_PROFILE_PATH,
  VERIFICATION_PATH,
} from "../../../Navigation/Routes";
import useAxios from "../../../GlobalHooks/useAxios";
import Toast from "react-native-toast-message";
export default () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { axios } = useAxios();
  const token = useSelector((state) => state.userReducer.token);

  const [loading, setLoading] = useState(false);

  const sendOTP = async (phoneNo, type) => {
    let formData = { phone: phoneNo, type };
    try {
      const res = await axios({
        url: OTP_GENERATE,
        method: "POST",
        data: formData,
      });
      // console.log(res)
      if (
        res.status === 200 ||
        res.message === "OTP token created successfully!"
      ) {
        navigation.navigate(VERIFICATION_PATH, { type, phoneNo });
      }
    } catch (error) {
      console.log(error?.message);
      if (error.status === 400) {
        if (error?.message?.messages?.non_field) {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: error?.message?.messages?.non_field[0],
          });
          console.log(
            error?.message?.messages?.non_field?.[0],
            "error?.message?.messages?.non_field"
          );
        }
      }
    }
  };

  const verifyOTP = async (code, phoneNo, type) => {
    let formData = { phone: phoneNo, type, code };
    // console.log("this is formData", formData)
    try {
      setLoading(true);
      const res = await axios({
        url: OTP_VERIFY,
        method: "POST",
        data: formData,
      });
      if (res?.status === 200 || res?.verification_token) {
        if (type === "login") {
          handleLogin(res?.verification_token, phoneNo);
        } else {
          navigation.navigate(CREATE_SIGNUP_PROFILE_PATH, {
            token: res?.verification_token,
            phoneNo,
            type,
            isSignup: true,
          });
        }
        // getMyProfile(type)
      }
      return res;
    } catch (error) {
      setLoading(false);
      console.log(error, "rroe");
      if (error.status === 400) {
        if (error?.message?.messages?.non_field) {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: error?.message?.messages?.non_field[0],
          });
          // console.log(
          //   error?.message?.messages?.non_field?.[0],
          //   "error?.message?.messages?.non_field"
          // )
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (password, phone, type) => {
    try {
      console.log(LOGIN_URL, "LOGIN_URL", { phone, password, type: "login" });
      const res = await axios({
        url: LOGIN_URL,
        method: "POST",
        data: {
          phone,
          password,
          type: "login",
        },
      });
      dispatch({
        type: ADD_AUTH_TOKEN,
        payload: res,
      });
    } catch (error) {
      if (error.status === 400) {
        if (error?.message?.messages?.non_field) {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: error?.message?.messages?.non_field[0],
          });
          console.log(
            error?.message?.messages?.non_field?.[0],
            "error?.message?.messages?.non_field"
          );
        }
      }
    }
  };

  const getMyProfile = (type) => {
    try {
      const res = axios({
        url: GET_MY_PROFILE,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(GET_MY_PROFILE, "GET_MY_PROFILE");
      if (res?.status === 200) {
        dispatch({
          type: ADD_USER,
          payload: res.data,
        });
        navigation.navigate(CREATE_PROFILE_PATH);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    sendOTP,
    verifyOTP,
    loading,
  };
};
