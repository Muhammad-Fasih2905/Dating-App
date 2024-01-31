import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";

import useAxios from "../../../../GlobalHooks/useAxios";
import {
  STRIPTE_PUB_KEY,
  PAYMENT_LIST,
  PAYMENT_BY_ID,
  STRIPE_CARD_LIST,
  ADD_STRIPE_CARD,
  DELETE_STRIPE_CARD,
  UPDATE_STRIPE_CARD,
} from "../../../../Constant/index";
import {
  ADD_STRIPE_PUB_KEY,
  ADD_STRIPE_PAYMENT_LIST,
  ADD_STRIPE_CARD_LIST,
} from "../../../../Redux/types";

const useSubscription = () => {
  const dispatch = useDispatch();
  const { axios } = useAxios();

  const getStripePubKey = async () => {
    try {
      const res = await axios({
        url: STRIPTE_PUB_KEY,
        method: "GET",
      });

      dispatch({
        type: ADD_STRIPE_PUB_KEY,
        payload: res.stripe_publishable_key,
      });
    } catch (error) {
      console.log("error on stripe publish key ", error);
    }
  };

  const getStripePaymentList = async () => {
    try {
    } catch (error) {}
  };

  const getStripeCardList = async () => {
    try {
    } catch (error) {}
  };

  const postStripeCardAttach = async () => {
    try {
    } catch (error) {}
  };

  const patchStripeCardUpdate = async () => {
    try {
    } catch (error) {}
  };

  const deleteStripeCardDelete = async () => {
    try {
    } catch (error) {}
  };

  return {
    getStripePubKey,
    getStripePaymentList,
    getStripeCardList,
    postStripeCardAttach,
    patchStripeCardUpdate,
    deleteStripeCardDelete,
  };
};

export default useSubscription;
