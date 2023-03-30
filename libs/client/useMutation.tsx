import { useState } from "react";

//[(data: any) => void, { loading:boolean; data: undefined | any; error: undefined | any }] 이것을 나눈것
interface UseMutationState {
    loading: boolean;
    data?: object;
    error?: object;
}

type UseMutationResult = [(data: any) => void, UseMutationState]



export default function useMutation(url: string): UseMutationResult {
    const [state, setState] = useState<UseMutationState>({
         loading: false,
         data: undefined,
         error: undefined,
    });
    // const [loading, setLoading] = useState(false);
    // const [data, setData] = useState<undefined | any>(undefined);
    // const [error, setError] = useState<undefined | any>(undefined);
    function mutation(data: any) {
        setState((prev) => ({ ...prev, loading: true }));
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        }).then((response) => response.json().catch(() => {}))
          .then((data) => setState((prev) => ({ ...prev, data})))
          .catch((error) => setState((prev) => ({ ...prev, error})))
          .finally(() => setState((prev) => ({...prev, loading: false})));
    }
    return [mutation, {...state}];
    
}