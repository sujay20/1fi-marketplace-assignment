import { useCallback, useEffect, useState } from 'react';
import { fetchEmiPlans } from '../api/marketplaceApi.js';

export function useEmiPlans(productId, variantId) {
  const [plans, setPlans] = useState([]);
  const [price, setPrice] = useState(null);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  const load = useCallback(() => {
    if (!productId || !variantId) return;
    setStatus('loading');
    setError(null);

    fetchEmiPlans(productId, variantId)
      .then((res) => {
        setPlans(res.plans);
        setPrice(res.price);
        setStatus('success');
      })
      .catch((err) => {
        setError(err.message || 'Could not load EMI plans.');
        setStatus('error');
      });
  }, [productId, variantId]);

  useEffect(() => {
    load();
  }, [load]);

  return { plans, price, status, error, isLoading: status === 'loading', isError: status === 'error', retry: load };
}
