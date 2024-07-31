import { useDidMount } from '@/hooks';
import { useEffect, useState } from 'react';
import firebase from '@/services/firebase';

const useSummerUnStichedProducts = (itemsCount) => {
  const [summerUnStichedProducts, setSummerUnStichedProducts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const didMount = useDidMount(true);

  const fetchSummerUnStichedProducts = async () => {
    try {
      setLoading(true);
      setError('');

      const docs = await firebase.getUnStichedSummerProducts(itemsCount);

      if (docs.empty) {
        if (didMount) {
          setError('No Summer UnStiched products found.');
          console.log('No Summer UnStiched products found');
          setLoading(false);
        }
      } else {
        const items = [];

        docs.forEach((snap) => {
          const data = snap.data();
          items.push({ id: snap.ref.id, ...data });
        });

        if (didMount) {
          setSummerUnStichedProducts(items);
          setLoading(false);
        }
      }
    } catch (e) {
      if (didMount) {
        setError('Failed to fetch Summer UnStiched products', e.message);
        console.log("failed to fetch Summer UnStiched products", e);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (summerUnStichedProducts.length === 0 && didMount) {
      fetchSummerUnStichedProducts();
    }
  }, []);

  return {
    summerUnStichedProducts, fetchSummerUnStichedProducts, isLoading, error
  };
};

export default useSummerUnStichedProducts;
