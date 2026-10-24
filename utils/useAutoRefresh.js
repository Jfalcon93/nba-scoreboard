import { useEffect, useState } from "react";
import axios from "axios";

const REFRESH_INTERVAL = 30 * 1000;

// Fetches url, then refetches every 30s while keepRefreshing(data) is true.
// Refreshes pause while the tab is hidden and catch up when it's visible
// again. A failed refresh keeps the last data; a 4xx stops retrying.
// keepRefreshing must be a stable (module-level) function.
export default function useAutoRefresh(url, keepRefreshing) {
  const [result, setResult] = useState({ url: null, data: null, error: null });

  useEffect(() => {
    if (!url) return;
    let timer;
    let cancelled = false;

    const load = async () => {
      clearTimeout(timer);
      let again = true;
      try {
        const response = await axios.get(url);
        if (cancelled) return;
        setResult({ url, data: response.data, error: null });
        again = keepRefreshing(response.data);
      } catch (error) {
        if (cancelled) return;
        setResult((prev) => ({
          url,
          data: prev.url === url ? prev.data : null,
          error,
        }));
        again = !(error.response?.status < 500);
      }
      if (again && !document.hidden) {
        timer = setTimeout(load, REFRESH_INTERVAL);
      }
    };

    const onVisibilityChange = () => {
      if (!document.hidden) load();
    };

    load();
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      cancelled = true;
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [url, keepRefreshing]);

  // Until the first response for this url arrives, report loading
  const current = result.url === url;
  return {
    data: current ? result.data : null,
    error: current ? result.error : null,
    loading: Boolean(url) && !current,
  };
}
