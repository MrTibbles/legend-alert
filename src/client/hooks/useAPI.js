import { useState } from "react";

/**
 * Shared fetch util for TRN API

 * @return {Array} [0]      Network state representation
 *                 [1]      Method for submitting network request
 */
const useAPI = () => {
  const [networkState, setNeworkState] = useState({
    data: undefined,
    error: undefined,
    loading: false
  });

  const handleErrorResponse = error => {
    let _error = error;

    // Handle GraphQL errors
    if (Array.isArray(error)) {
      _error = error.map(({ message }) => message).join(", ");
    }

    return setNeworkState({
      ...networkState,
      error: _error,
      loading: false
    });
  };

  const submitQuery = async query => {
    setNeworkState({ ...networkState, error: undefined, loading: true });

    const { data, errors } = await fetch("http://localhost:4000/", {
      body: JSON.stringify({ query }),
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST"
    })
      .catch(err => handleErrorResponse(err.message))
      .then(res => {
        if (!res.ok) return handleErrorResponse("Something went wrong");

        return res.json();
      });

    if (errors) return handleErrorResponse(errors);

    return setNeworkState({
      ...networkState,
      data,
      loading: false
    });
  };

  return [networkState, submitQuery];
};

export default useAPI;
