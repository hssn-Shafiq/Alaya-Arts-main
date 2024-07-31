import { useDidMount } from '@/hooks';
import { useEffect, useState } from 'react';
import firebase from '@/services/firebase';

const useWinterKidsProducts = (itemsCount) => {
  const [winterKidsProducts, setWinterKidsProducts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const didMount = useDidMount(true);

  const fetchWinterKidsProducts = async () => {
    try {
      setLoading(true);
      setError('');

      const docs = await firebase.getKidsWinterProducts(itemsCount);

      if (docs.empty) {
        if (didMount) {
          setError('No Winter Kids products found.');
          console.log('No Winter Kids products found');
          setLoading(false);
        }
      } else {
        const items = [];

        docs.forEach((snap) => {
          const data = snap.data();
          items.push({ id: snap.ref.id, ...data });
        });

        if (didMount) {
          setWinterKidsProducts(items);
          setLoading(false);
        }
      }
    } catch (e) {
      if (didMount) {
        setError('Failed to fetch Winter Kids products', e.message);
        console.log("failed to fetch Winter Kids products", e);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (winterKidsProducts.length === 0 && didMount) {
      fetchWinterKidsProducts();
    }
  }, []);

  return {
    winterKidsProducts, fetchWinterKidsProducts, isLoading, error
  };
};

export default useWinterKidsProducts;
