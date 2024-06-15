import { useDidMount } from '@/hooks';
import { useEffect, useState } from 'react';
import firebase from '@/services/firebase';

const useUnstichedProducts = (itemsCount) => {
  const [unstichedProducts, setUnstichedProducts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const didMount = useDidMount(true);

  const fetchUnstichedProducts = async () => {
    try {
      setLoading(true);
      setError('');

      const docs = await firebase.getUnstichedProducts(itemsCount);

      if (docs.empty) {
        if (didMount) {
          setError('No Un-Stiched products found.');
          console.log('No Un-Stiched products found');
          setLoading(false);
        }
      } else {
        const items = [];

        docs.forEach((snap) => {
          const data = snap.data();
          items.push({ id: snap.ref.id, ...data });
        });

        if (didMount) {
          setUnstichedProducts(items);
          setLoading(false);
        }
      }
    } catch (e) {
      if (didMount) {
        setError('Failed to fetch Un-Stiched products');
        console.log("failed to fetch Un-Stiched products");
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (unstichedProducts.length === 0 && didMount) {
      fetchUnstichedProducts();
    }
  }, []);

  return {
    unstichedProducts, fetchUnstichedProducts, isLoading, error
  };
};

export default useUnstichedProducts;
