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

  function handleErrorResponse(error: string): any {
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

  async function submitQuery(query: string): Promise<void> {
    setNeworkState(state => ({ ...state, error: "", loading: true }));

    const { data, errors } = await fetch("http://localhost:4000/graphql", {
      body: JSON.stringify({ query }),
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST"
    }).then(
      (res): Promise<any> =>
        res.ok
          ? (res.json() as Promise<T>)
          : handleErrorResponse("Something went wrong")
    );

    if (errors) {
      const _error: string = errors
        .map(({ message }: { message: string }): string => message)
        .join(", ");

      return handleErrorResponse(_error);
    }

    return handleSuccessResponse(data);
  }

  return [networkState, submitQuery];
}

export default useGraphQLAPI;
