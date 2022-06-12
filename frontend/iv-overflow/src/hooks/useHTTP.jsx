import { useState, useCallback } from "react";
import axios from "axios";
import useLogout from "./useLogout";

const useHTTP = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { checkExpiration } = useLogout();

  const sendRequest = useCallback(
    async (config, resHandler, withToken) => {
      setIsLoading(true);
      setError(null);
      const allowedToSend = withToken ? checkExpiration() : true;

      if (allowedToSend) {
        try {
          if (withToken) {
            config.headers = {
              Authorization: "Bearer " + localStorage.getItem("token"),
            };
          }

          const res = await axios(config);

          if (resHandler) {
            resHandler(res);
          }
        } catch (err) {
          setError(err.message || "Something went wrong!");
        }
        setIsLoading(false);
      }
    },
    [checkExpiration]
  );

  return { isLoading, error, sendRequest };
};

export default useHTTP;
