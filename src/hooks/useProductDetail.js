import { useCallback, useEffect, useState } from 'react';
import { fetchProductById } from '../api/marketplaceApi.js';

export function useProductDetail(productId) {
  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  const load = useCallback(() => {
    setStatus('loading');
    setError(null);

    fetchProductById(productId)
      .then((data) => {
        setProduct(data);
        setStatus('success');
      })
      .catch((err) => {
        setError(err.message || 'Something went wrong.');
        setStatus('error');
      });
  }, [productId]);

  useEffect(() => {
    load();
  }, [load]);

  return { product, status, error, isLoading: status === 'loading', isError: status === 'error', retry: load };
}
