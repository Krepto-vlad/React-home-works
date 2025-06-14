import { useState, useEffect } from "react";

interface FetchLog {
  requestUrl: string;
  timestamp: string;
  status: number | string | null;
}

interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useFetch<T = unknown>(url: string | null): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      const log: FetchLog = {
        requestUrl: url,
        timestamp: new Date().toISOString(),
        status: null,
      };

      try {
        const response = await fetch(url);
        log.status = response.status;
        const result: T = await response.json();
        setData(result);
        setLoading(false);
        saveLog(log);
      } catch (err) {
        log.status = "error_fetch";
        setError((err as Error).message);
        setLoading(false);
        saveLog(log);
      }
    };

    fetchData();
  }, [url]);

  const saveLog = (log: FetchLog) => {
    const prevLogs = JSON.parse(localStorage.getItem("fetchLogs") || "[]");
    localStorage.setItem("fetchLogs", JSON.stringify([...prevLogs, log]));
  };

  return { data, loading, error };
}
