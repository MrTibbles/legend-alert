import { useState } from "react";

/**
 * Shared fetch util for TRN API

 * @return {Array} [0]      Network state representation
 *                 [1]      Method for submitting network request
 */
const useTrackerNetworkAPI = () => {
  const [networkState, setNeworkState] = useState({
    data: undefined,
    error: undefined,
    loading: false
  });

  const doFetch = async url => {
    setNeworkState({ ...networkState, error: undefined, loading: true });

    const { data } = await fetch(url, {
      credentials: "omit",
      headers: { "TRN-Api-Key": TRN_TOKEN },
      mode: "cors"
    })
      .catch(err => {
        setNeworkState({
          ...networkState,
          error: err.message,
          loading: false
        });
      })
      .then(res => {
        if (!res.ok) {
          setNeworkState({
            ...networkState,
            error: "Something went wrong",
            loading: false
          });
        }

        return res.json();
      });

    return setNeworkState({
      ...networkState,
      data,
      loading: false
    });
  };

  return [networkState, doFetch];
};

export default useTrackerNetworkAPI;
