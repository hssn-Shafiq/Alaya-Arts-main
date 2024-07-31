import { useDidMount } from '@/hooks';
import { useEffect, useState } from 'react';
import firebase from '@/services/firebase';

const useSummerStichedProducts = (itemsCount) => {
  const [summerStichedProducts, setSummerStichedProducts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const didMount = useDidMount(true);

  const fetchSummerStichedProducts = async () => {
    try {
      setLoading(true);
      setError('');

      const docs = await firebase.getStichedSummerProducts(itemsCount);

      if (docs.empty) {
        if (didMount) {
          setError('No Summer Pret products found.');
          console.log('No Summer Pret products found');
          setLoading(false);
        }
      } else {
        const items = [];

        docs.forEach((snap) => {
          const data = snap.data();
          items.push({ id: snap.ref.id, ...data });
        });

        if (didMount) {
          setSummerStichedProducts(items);
          setLoading(false);
        }
      }
    } catch (e) {
      if (didMount) {
        setError('Failed to fetch Summer Pret products', e.message);
        console.log("failed to fetch Summer Pret products", e);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (summerStichedProducts.length === 0 && didMount) {
      fetchSummerStichedProducts();
    }
  }, []);

  return {
    summerStichedProducts, fetchSummerStichedProducts, isLoading, error
  };
};

export default useSummerStichedProducts;
