import { useEffect, useRef, useState } from 'react';
import { fetchProducts } from '../api/marketplaceApi.js';

/**
 * Loads the product list for the given category/search query, exposing
 * standard { data, status, error } shape plus a retry() escape hatch.
 */
export function useProducts({ category, query }) {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [error, setError] = useState(null);
  const requestId = useRef(0);

  useEffect(() => {
    const currentRequest = ++requestId.current;
    setStatus('loading');
    setError(null);

    fetchProducts({ category, query })
      .then((products) => {
        if (requestId.current !== currentRequest) return; // stale response, ignore
        setData(products);
        setStatus('success');
      })
      .catch((err) => {
        if (requestId.current !== currentRequest) return;
        setError(err.message || 'Something went wrong.');
        setStatus('error');
      });
  }, [category, query]);

  return { data, status, error, isLoading: status === 'loading', isError: status === 'error' };
}
