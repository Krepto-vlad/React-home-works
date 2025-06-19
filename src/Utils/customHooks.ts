import { useState, useEffect } from "react";
import { useAppDispatch } from "../app/hooks";
import { Dispatch } from "redux";

interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useFetch<T = unknown>(
  url: string | null,
  reduxAction: (data: T) => { type: string; payload: T },
  skipIfAlreadyLoaded: boolean = true,
  existingData: T | null = null
): UseFetchResult<T> {
  const dispatch: Dispatch = useAppDispatch();
  const [data, setData] = useState<T | null>(existingData || null);
  const [loading, setLoading] = useState<boolean>(!existingData);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!url) return;
    if (skipIfAlreadyLoaded && existingData) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const result: T = await response.json();
        setData(result);
        dispatch(reduxAction(result));
        setLoading(false);
      } catch (err) {
        setError((err as Error).message);
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}
