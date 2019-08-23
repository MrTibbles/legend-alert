import { useState } from "react";

interface NetworkState<T> {
  data?: T;
  error?: string;
  loading: boolean;
}

interface SubmitQueryFn {
  (query: string): Promise<any>;
}

function useGraphQLAPI<T>(): [NetworkState<T>, SubmitQueryFn] {
  const initialState: NetworkState<T> = {
    loading: false
  };

  const [networkState, setNeworkState] = useState(initialState);

  function handleErrorResponse(error: string): void {
    setNeworkState({
      ...initialState,
      error
    });
  }

  function handleSuccessResponse(data: T): void {
    setNeworkState({
      ...initialState,
      data
    });
  }

  async function handleResponse(res: Response): Promise<void> {
    if (!res || !res.ok) {
      const errorMsg: string = res ? res.statusText : "No network connection";

      return handleErrorResponse(errorMsg);
    }

    const { data, errors } = await res.json();

    if (errors) {
      const _error: string = errors
        .map(({ message }: { message: string }): string => message)
        .join(", ");

      return handleErrorResponse(_error);
    }

    return handleSuccessResponse(data);
  }

  async function submitQuery(query: string): Promise<void> {
    setNeworkState(state => ({ ...state, error: "", loading: true }));

    return fetch(GRAPHQL_API, {
      body: JSON.stringify({ query }),
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST"
    })
      .catch(console.warn)
      .then(handleResponse);
  }

  return [networkState, submitQuery];
}

export default useGraphQLAPI;
