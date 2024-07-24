// src/hooks/useAccessoriesProducts.js
import { useDidMount } from '@/hooks';
import { useEffect, useState } from 'react';
import firebase from '@/services/firebase';

const useAccessoriesProducts = () => {
  const [accessoriesProducts, setAccessoriesProducts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const didMount = useDidMount(true);

  const fetchAccessoriesProducts = async () => {
    try {
      setLoading(true);
      setError('');

      const docs = await firebase.getAccessoriesProducts();

      if (docs.empty) {
        if (didMount) {
          setError('No Accessories found.');
          setLoading(false);
        }
      } else {
        const items = [];

        docs.forEach((snap) => {
          const data = snap.data();
          items.push({ id: snap.ref.id, ...data });
        });

        if (didMount) {
          setAccessoriesProducts(items);
          setLoading(false);
        }
      }
    } catch (e) {
      if (didMount) {
        setError('Failed to fetch accessories');
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (didMount) {
      fetchAccessoriesProducts();
    }
  }, [didMount]);

  return {
    accessoriesProducts, fetchAccessoriesProducts, isLoading, error
  };
};

export default useAccessoriesProducts;
