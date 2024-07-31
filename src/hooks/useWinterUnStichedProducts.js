import { useDidMount } from '@/hooks';
import { useEffect, useState } from 'react';
import firebase from '@/services/firebase';

const useWinterUnStichedProducts = (itemsCount) => {
  const [winterUnStichedProducts, setWinterUnStichedProducts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const didMount = useDidMount(true);

  const fetchWinterUnStichedProducts = async () => {
    try {
      setLoading(true);
      setError('');

      const docs = await firebase.getUnStichedWinterProducts(itemsCount);

      if (docs.empty) {
        if (didMount) {
          setError('No Winter UnStiched products found.');
          console.log('No Winter UnStiched products found');
          setLoading(false);
        }
      } else {
        const items = [];

        docs.forEach((snap) => {
          const data = snap.data();
          items.push({ id: snap.ref.id, ...data });
        });

        if (didMount) {
          setWinterUnStichedProducts(items);
          setLoading(false);
        }
      }
    } catch (e) {
      if (didMount) {
        setError('Failed to fetch Winter UnStiched products', e.message);
        console.log("failed to fetch Winter UnStiched products", e);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (winterUnStichedProducts.length === 0 && didMount) {
      fetchWinterUnStichedProducts();
    }
  }, []);

  return {
    winterUnStichedProducts, fetchWinterUnStichedProducts, isLoading, error
  };
};

export default useWinterUnStichedProducts;
