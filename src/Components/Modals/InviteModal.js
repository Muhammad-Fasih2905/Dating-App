import React, { useEffect, useState } from "react";
import { Button, Text, View, StyleSheet, Image } from "react-native";
import Modal from "react-native-modal";
import { useTheme } from "react-native-paper";
import ModalEditButton from "./../Buttons/ModalEditButton";
import InviteCard from "../Cards/InviteCard";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import PrimaryButton from "../Buttons/PrimaryButton";
import InviteLocationInput from "../Inputs/InviteLocationInput";
import InviteDateInput from "../Inputs/InviteDateInput";
import InviteTextField from "../Inputs/InviteTextField";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { ADD_SNAKS } from "./../../Redux/types";
import CHAT from "./../../assets/Images/chat-inverted.png";
import Toast from "react-native-toast-message";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import SendMessageModal from "./SendMessageModal";
import useOtherProfile from "../../screens/mainFlow/OthersProfile/Hooks/useOtherProfile";
import useAxios from "../../GlobalHooks/useAxios";
import { CREATE_SNAKS, UPDATE_SNAKS } from "../../Constant";
import handleSendNotification from "../../Helper/sendNotification";
import { ActivityIndicatorBase } from "react-native";
function InviteModal({ visible, onClose, data, sendInvite, handleInvite }) {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const { axios } = useAxios();
  const [editInvite, setEditInvite] = useState(false);

  const [toSend, setToSend] = useState(sendInvite);
  const [value, setValue] = useState(new Date());
  const [errors, setErrors] = useState({});
  const [place, setPlace] = useState("");
  const [message, setMessage] = useState("");

  const [time, setTime] = useState(new Date());
  const [loading, setLoading] = useState(false);

  const [sendMessageModal, setMessageModal] = useState(false);

  const snaks = useSelector((state) => state.snakReducer.snaks);
  const user = useSelector((state) => state.userReducer.user);
  const { AcceptRejectSnak, editSnak } = useOtherProfile();
  const isOwner = user?.id === data?.to_user?.id;

  const handleSubmit = async () => {
    try {
      let errors = {};

      if (!place) {
        errors.place = ["Place is required"];
      }

      if (!message) {
        errors.message = ["Message is required"];
      }
      if (!time) {
        errors.time = ["Time is required"];
      }
      if (!value) {
        errors.date = ["Date is required"];
      }

      if (Object.keys(errors).length > 0) {
        setErrors(errors);
        return;
      }

      setErrors({});

      const reqObj = {
        place,
        message,
        time: moment(time).format("HH:mm A"),
        to_user: data.id,
        date: moment(time).format("yyyy-MM-DD"),
      };
      setLoading(true);
      const req = await handleInvite(reqObj);
      dispatch({
        type: ADD_SNAKS,
        payload: {
          ...snaks,
          invites_sent: [...snaks?.invites_sent, req.data],
        },
      });

      if (req?.data) {
        data?.fcmToken && console.log("data ==> ", req);

        let newData = {
          to: data?.fcmToken,
          notification: {
            title: "New Snak Invite",
            body:
              "Congratulations! You have received a new snak invite from " +
              data?.name,
            mutable_content: true,
            sound: "Tri-tone",
            redirect_to: "Invite",
          },
        };

        handleSendNotification(newData);
        console.log("New Data Notification ==> ", newData);
      }

      setLoading(false);
      onClose();

      // console.log(req, "REQ OBJ");
    } catch (error) {
      setLoading(false);
      console.log(error);
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

  const handleEdit = async () => {
    try {
      let errors = {};

      if (!place) {
        errors.place = ["Place is required"];
      }

      if (!message) {
        errors.message = ["Message is required"];
      }
      if (!time) {
        errors.time = ["Time is required"];
      }
      if (!value) {
        errors.date = ["Date is required"];
      }

      if (Object.keys(errors).length > 0) {
        setErrors(errors);
        return;
      }

      setErrors({});

      const reqObj = {
        place,
        message,
        // time: new Date(time || ''),
        date: moment(value).format("YYYY-MM-DD"),
        to_user: data.id,
        time: moment(time).format("HH:mm A"),
      };

      // let response = await editSnak(reqObj);
      const response = await axios({
        url: UPDATE_SNAKS.replace(":id", data.id),
        method: "PATCH",
        data: reqObj,
      });
      let check = isOwner ? snaks.invites_sent : snaks.invites_received;
      let newArr = check.length && check?.filter((v) => v.id !== data.id);
      dispatch({
        type: ADD_SNAKS,
        payload: {
          ...snaks,
          invites_received: isOwner
            ? [...snaks.invites_received]
            : [...newArr, response.data],
          invites_sent: isOwner
            ? [...newArr, response.data]
            : [...snaks.invites_sent],
        },
      });
      setToSend(!toSend);
    } catch (error) {
      if (error.status === 400) {
        if (error?.message?.messages?.non_field) {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: error?.message?.messages?.non_field[0],
          });
        }
      }
    }
  };

  const acceptRejectInvite = (status) => {
    let inviteData = { status };
    let notiCountId = data?.from_user?.id;
    AcceptRejectSnak(inviteData, data.id, notiCountId);
    onClose();
  };

  useEffect(() => {
    if (data?.id) {
      setPlace(data.place);
      setMessage(data.message);
      setTime(new Date(data.time || new Date()));
      setValue(new Date(data.date || new Date()));
    }
    setToSend(sendInvite);
  }, [data?.id]);

  return (
    <Modal isVisible={visible} onBackdropPress={onClose}>
      <KeyboardAwareScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
        }}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View
          style={{
            // flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View style={[styles.card, { backgroundColor: colors.primary }]}>
            <View style={styles.header}>
              <Text
                style={[
                  styles.headerText,
                  {
                    color: colors.white,
                    textAlign: toSend ? "center" : "left",
                  },
                ]}
              >
                Invitation details
              </Text>
              {Boolean(!sendInvite) && (
                <ModalEditButton
                  text="Edit"
                  data={data}
                  onPress={() => setToSend(true)}
                />
              )}
            </View>
            <InviteCard
              data={sendInvite ? data : isOwner ? data.from_user : data.to_user}
              status={data?.status}
            />
            {toSend ? (
              <>
                <InviteLocationInput
                  value={place}
                  onChangeText={setPlace}
                  error={errors.place}
                />

                <View style={[styles.row, { zIndex: 1000 }]}>
                  <View style={[styles.invite, { flex: 1 }]}>
                    <InviteDateInput
                      title={"Date"}
                      onChange={setValue}
                      value={value}
                      minimumDate={new Date()}
                      mode="date"
                      error={errors?.date}
                    />
                  </View>
                  <View style={[styles.invite, { flex: 1 }]}>
                    <InviteDateInput
                      title={"Time"}
                      onChange={setTime}
                      value={time}
                      mode="time"
                      error={errors?.time}
                      icon={"angle-down"}
                    />
                  </View>
                </View>
                <View style={[styles.invite]}>
                  <InviteTextField
                    value={message}
                    onChangeText={setMessage}
                    error={errors.message}
                  />
                </View>
                {data?.to_user ? (
                  <View style={styles.btnContainer}>
                    <Text style={[styles.btnLabel, { color: colors.white }]}>
                      Set Changes
                    </Text>
                    <View style={styles.row}>
                      <View style={styles.rowItem}>
                        <PrimaryButton
                          text="Cancel"
                          hasShadow={false}
                          onPress={() => setToSend(false)}
                        />
                      </View>
                      <View style={styles.rowItem}>
                        <PrimaryButton
                          text={"Confirm"}
                          hasShadow={false}
                          onPress={
                            user.id === data?.to_user?.id
                              ? handleEdit
                              : handleEdit
                          }
                          loading={loading}
                        />
                      </View>
                    </View>
                  </View>
                ) : (
                  <View style={styles.btnContainer}>
                    <Text style={[styles.btnLabel, { color: colors.white }]}>
                      Response
                    </Text>
                    <View style={styles.row}>
                      <View style={styles.rowItem}>
                        <PrimaryButton
                          text="Cancel"
                          hasShadow={false}
                          onPress={onClose}
                        />
                      </View>
                      <View style={styles.rowItem}>
                        <PrimaryButton
                          text="Send"
                          hasShadow={false}
                          onPress={handleSubmit}
                          loading={loading}
                        />
                      </View>
                    </View>
                  </View>
                )}
              </>
            ) : (
              <>
                <View style={[styles.invite]}>
                  <Text style={[styles.inviteText, { color: colors.white }]}>
                    Place
                  </Text>
                  <View
                    style={[styles.input, { backgroundColor: colors.white }]}
                  >
                    <MaterialIcons
                      name="location-on"
                      size={26}
                      color={colors.primary}
                    />
                    <Text style={[styles.inputText, { color: colors.black }]}>
                      {data?.place}
                    </Text>
                  </View>
                </View>

                <View style={styles.row}>
                  <View style={[styles.invite, { flex: 1 }]}>
                    <Text style={[styles.inviteText, { color: colors.white }]}>
                      Place
                    </Text>
                    <View
                      style={[styles.input, { backgroundColor: colors.white }]}
                    >
                      <Text style={[styles.inputText, { color: colors.black }]}>
                        {moment(data?.date).format("MMM DD, YYYY")}
                      </Text>
                    </View>
                  </View>
                  <View style={[styles.invite, { flex: 1 }]}>
                    <Text style={[styles.inviteText, { color: colors.white }]}>
                      Time
                    </Text>
                    <View
                      style={[styles.input, { backgroundColor: colors.white }]}
                    >
                      <Text style={[styles.inputText, { color: colors.black }]}>
                        {data?.time?.slice(0, data?.time.length - 3)}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={[styles.invite]}>
                  <Text style={[styles.inviteText, { color: colors.white }]}>
                    Message
                  </Text>
                  <View
                    style={[styles.input, { backgroundColor: colors.white }]}
                  >
                    <Text style={[styles.inputText, { color: colors.black }]}>
                      {data?.message}
                    </Text>
                  </View>
                </View>
                <View style={styles.btnContainer}>
                  {!isOwner ? (
                    <>
                      <Text style={[styles.btnLabel, { color: colors.white }]}>
                        Proceed with
                      </Text>
                      <View style={styles.row}>
                        <View style={styles.rowItem}>
                          <PrimaryButton
                            text="Cancel"
                            hasShadow={false}
                            onPress={onClose}
                          />
                        </View>
                        <View style={styles.rowItem}>
                          <PrimaryButton
                            text="Chat"
                            hasShadow={false}
                            onPress={onClose}
                            left={
                              <Image source={CHAT} style={styles.chatIcon} />
                            }
                          />
                        </View>
                      </View>
                    </>
                  ) : snaks?.invites_received?.find((e) => e.id == data?.id)
                      ?.status == "accepted" ? (
                    <Text
                      style={{
                        color: "white",
                        textAlign: "center",
                        fontSize: 18,
                        fontWeight: "bold",
                      }}
                    >
                      Accepted
                    </Text>
                  ) : snaks?.invites_received?.find((e) => e.id == data?.id)
                      ?.status == "declined" ? (
                    <Text
                      style={{
                        color: "white",
                        textAlign: "center",
                        fontSize: 18,
                        fontWeight: "bold",
                      }}
                    >
                      Rejected
                    </Text>
                  ) : (
                    <>
                      <Text style={[styles.btnLabel, { color: colors.white }]}>
                        Response
                      </Text>
                      <View style={styles.row}>
                        <View style={styles.rowItem}>
                          <PrimaryButton
                            text="Reject"
                            hasShadow={false}
                            onPress={() => acceptRejectInvite("declined")}
                          />
                        </View>
                        <View style={styles.rowItem}>
                          <PrimaryButton
                            text="Accept"
                            hasShadow={false}
                            onPress={() => acceptRejectInvite("accepted")}
                          />
                        </View>
                      </View>
                    </>
                  )}
                </View>
              </>
            )}
          </View>
        </View>
      </KeyboardAwareScrollView>
      <SendMessageModal
        visible={sendMessageModal}
        onClose={() => setMessageModal(false)}
      />
    </Modal>
  );
}

export default InviteModal;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20,
    marginBottom: 20,
    // alignItems: "center",
    // justifyContent: "center",
    width: "100%",
  },
  header: {
    padding: 12,
    paddingTop: 20,
    paddingBottom: 10,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
    fontFamily: "OpenSans-Regular",
    flex: 1,
  },
  invite: {
    alignItems: "center",
    marginTop: 10,
  },
  inviteText: {
    fontSize: 16,
    fontFamily: "OpenSans-Regular",
    marginBottom: 7,
  },
  input: {
    padding: 12,
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    flexDirection: "row",
  },
  inputText: {
    marginLeft: 10,
    fontFamily: "OpenSans-Light",
    fontSize: 16,
  },
  row: {
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  btnContainer: {
    paddingVertical: 20,
  },
  btnLabel: {
    fontSize: 20,
    fontFamily: "OpenSans-SemiBold",
    textAlign: "center",
  },
  rowItem: {
    flex: 1,
    padding: 10,
  },
  chatIcon: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    marginRight: 5,
  },
});
