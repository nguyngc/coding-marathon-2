import { useState, useEffect, useCallback } from "react";

const useFetch = (url, options = {}, manual = false) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(!manual);
  const [error, setError] = useState(null);

  const execute = useCallback(async (overrideOptions = {}) => {
    try {
      setLoading(true);
      const response = await fetch(url, { ...options, ...overrideOptions });
      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `Error: ${response.status}`);
      }
      const result = await response.json();
      setData(result);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  useEffect(() => {
    if (!manual) {
      execute();
    }
  }, [execute, manual]);

  return { data, loading, error, execute };
};

export default useFetch;
