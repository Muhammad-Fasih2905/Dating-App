import axios from "axios";

const handleSendNotification = async (data) => {
  try {
    const headers = {
      Authorization:
        "key=AAAAO5oEFMU:APA91bG4R72wtcPPuE3CJBABo3gUquuetFRp1t4pLjtONomDEOnqTB8-IL0N2R3e0A04hh97GFYcjOh_MjWzo6ZrCDguPj6-RTMshcbwd1U7BTfW7-iY5LQgFemsc5NDtkgfKFbV-pAD",
    };

    let res = await axios.post("https://fcm.googleapis.com/fcm/send", data, {
      headers,
    });
    // console.log("Notification send successfully!", res);
  } catch (error) {
    console.log("Error on sending notification.", error);
  }
};

export default handleSendNotification;
