import request from "axios";
import { useSelector } from "react-redux";

const useAxios = () => {
  const accessToken = useSelector((state) => state?.userReducer?.accessToken);
  const axios = async (optionss) => {
    const tokenAndHeaders = {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
    };

    if (accessToken) {
      tokenAndHeaders["authorization"] = `Bearer ${accessToken}`;
    }

    const authorization = tokenAndHeaders?.authorization;

    const headers = {
      ...(optionss?.headers ? optionss.headers : {}),
      authorization,
    };

    const options = {
      ...(optionss ? optionss : {}),
      headers,
    };
    return new Promise((resolve, reject) => {
      request(options)
        .then((response) => {
          resolve(response?.data);
        })
        .catch(async (e) => {
          const badRequest = e?.response?.request?._response;
          if (badRequest) {
            reject({
              status: 400,
              message:
                typeof badRequest === "string" ? JSON.parse(badRequest) : {},
            });
            return;
          }

          reject(e);
        });
    });
  };

  return { axios };
};

export default useAxios;
