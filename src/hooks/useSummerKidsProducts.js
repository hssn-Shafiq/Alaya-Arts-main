import { useDidMount } from '@/hooks';
import { useEffect, useState } from 'react';
import firebase from '@/services/firebase';

const useSummerKidsProducts = (itemsCount) => {
  const [summerKidsProducts, setSummerKidsProducts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const didMount = useDidMount(true);

  const fetchSummerKidsProducts = async () => {
    try {
      setLoading(true);
      setError('');

      const docs = await firebase.getKidsSummerProducts(itemsCount);

      if (docs.empty) {
        if (didMount) {
          setError('No Summer Kids products found.');
          console.log('No Summer Kids products found');
          setLoading(false);
        }
      } else {
        const items = [];

        docs.forEach((snap) => {
          const data = snap.data();
          items.push({ id: snap.ref.id, ...data });
        });

        if (didMount) {
          setSummerKidsProducts(items);
          setLoading(false);
        }
      }
    } catch (e) {
      if (didMount) {
        setError('Failed to fetch Summer Kids products', e.message);
        console.log("failed to fetch Summer Kids products", e);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (summerKidsProducts.length === 0 && didMount) {
      fetchSummerKidsProducts();
    }
  }, []);

  return {
    summerKidsProducts, fetchSummerKidsProducts, isLoading, error
  };
};

export default useSummerKidsProducts;
