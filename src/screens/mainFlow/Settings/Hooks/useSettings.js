import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_USER_SETTINGS } from "../../../../Constant/index";
import { ADD_USER_SETTINGS } from "../../../../Redux/types";
import useAxios from "../../../../GlobalHooks/useAxios";

const useSearch = () => {
  const dispatch = useDispatch();
  const userSettings = useSelector((state) => state.snakReducer.userSettings);
  const [settingsObj, setSettingsObj] = useState({
    snak_invite_notification: true,
    meeting_reminder_notification: true,
    meeting_canceled_notification: true,
    meeting_deleted_notification: true,
    meeting_updated_notification: true,
    hide_profile: true,
  });
  const [isMounted, setIsMounted] = useState(false);
  const { axios } = useAxios();
  const updateSettings = async (data) => {
    try {
      //   setLoading(true)
      const res = await axios({
        url: SET_USER_SETTINGS,
        method: "PATCH",
        data: data,
      });
      dispatch({ type: ADD_USER_SETTINGS, payload: res.data });
    } catch (error) {
      //   setLoading(false)
      console.log(error?.message?.messages);
    }
  };

  useEffect(() => {
    setSettingsObj(userSettings);
  }, [
    userSettings.hide_profile,
    userSettings.meeting_canceled_notification,
    userSettings.meeting_deleted_notification,
    userSettings.meeting_reminder_notification,
    userSettings.meeting_updated_notification,
    userSettings.snak_invite_notification,
  ]);

  useEffect(() => {
    if (!isMounted) setIsMounted(true);
    else updateSettings(settingsObj);
  }, [
    settingsObj.hide_profile,
    settingsObj.meeting_canceled_notification,
    settingsObj.meeting_deleted_notification,
    settingsObj.meeting_reminder_notification,
    settingsObj.meeting_updated_notification,
    settingsObj.snak_invite_notification,
  ]);

  useEffect(() => {
    if (!userSettings) {
      try {
        //   setLoading(true)
        axios({
          url: SET_USER_SETTINGS,
          method: "PATCH",
          data: {},
        }).then((e) => {
          dispatch({ type: ADD_USER_SETTINGS, payload: e.data });
        });
      } catch (error) {
        //   setLoading(false)
        console.log(error?.message?.messages);
      }
    }
  }, []);

  return {
    settingsObj,
    setSettingsObj,
  };
};

export default useSearch;
