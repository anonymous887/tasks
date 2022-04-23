// useCustomHTTP HOOK
// To reuse our Custom HTTP Request Logic in across multiple components

import { useCallback, useState } from "react";

const useCustomHTTP = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState(null);

  const sendHTTPRequest = useCallback(async (requestConfig, applyData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: JSON.stringify(requestConfig.body)
          ? JSON.stringify(requestConfig.body)
          : null,
      });

      if (!response.ok) {
        throw new Error("Request Failed. Response not OK!");
      }

      const data = await response.json();

      applyData(data);
    } catch (err) {
      setError(err.message || "Something went wrong...");
    }

    setIsLoading(false);
  }, []);

  return {
    isLoading: isLoading,
    error: error,
    sendHTTPRequest: sendHTTPRequest,
  };
};

export default useCustomHTTP;
