import { useState, useCallback } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (requestConfig, page, applyData) => {
    setIsLoading(true);
    setError(null);

    let data = [];
    //trying to get result for multiple pages
    if (page && page >= 1) {
      for (let i = 1; i <= page; i++) {
        const newUrl =
          requestConfig.url +
          "?api_key=9ae8bfdb347b67a5ffe47c15b82cc7ce&query=String" +
          "&page=" + i;
        try {
          const response = await fetch(newUrl, {
            method: requestConfig.method ? requestConfig.method : "GET",
            headers: requestConfig.headers ? requestConfig.headers : {},
            body: requestConfig.body
              ? JSON.stringify(requestConfig.body)
              : null,
          });

          if (!response.ok) {
            throw new Error("Request failed!");
          }

          //if it is an empty conent
          if (response.status === 204) {
            data = [...data];
            //applyData();
          }
          else {
            //const data = await response.json();
            data = [...data, await response.json()];
            //applyData(data);
          }
        } catch (err) {
          setError(err.message || "Something went wrong!");
        }
      }
    }

    applyData(data);
    setIsLoading(false);
  }, []);

  return { isLoading, error, sendRequest };
};

export default useHttp;
