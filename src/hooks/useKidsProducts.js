import { useDidMount } from '@/hooks';
import { useEffect, useState } from 'react';
import firebase from '@/services/firebase';

const useKidsProducts = (itemsCount) => {
  const [kidsProducts, setKidsProducts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const didMount = useDidMount(true);

  const fetchKidsProducts = async () => {
    try {
      setLoading(true);
      setError('');

      const docs = await firebase.getKidsProducts(itemsCount);

      if (docs.empty) {
        if (didMount) {
          setError('No Kids products found.');
          console.log('No kids products found');
          setLoading(false);
        }
      } else {
        const items = [];

        docs.forEach((snap) => {
          const data = snap.data();
          items.push({ id: snap.ref.id, ...data });
        });

        if (didMount) {
          setKidsProducts(items);
          setLoading(false);
        }
      }
    } catch (e) {
      if (didMount) {
        setError('Failed to fetch Kids products');
        console.log("failed to fetch kids products");
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (kidsProducts.length === 0 && didMount) {
      fetchKidsProducts();
    }
  }, []);

  return {
    kidsProducts, fetchKidsProducts, isLoading, error
  };
};

export default useKidsProducts;
