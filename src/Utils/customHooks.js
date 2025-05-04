import { useState, useEffect } from "react";

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      const log = {
        requestUrl: url,
        timestamp: new Date().toISOString(),
        status: null,
      };

      try {
        const response = await fetch(url);
        log.status = response.status;
        const result = await response.json();
        setData(result);
        setLoading(false);
        saveLog(log);
      } catch (err) {
        log.status = "error_fetch";
        setError(err.message);
        setLoading(false);
        saveLog(log);
      }
    };

    fetchData();
  }, [url]);

  const saveLog = (log) => {
    const prevLogs = JSON.parse(localStorage.getItem("fetchLogs")) || [];
    localStorage.setItem("fetchLogs", JSON.stringify([...prevLogs, log]));
  };

  return { data, loading, error };
}
