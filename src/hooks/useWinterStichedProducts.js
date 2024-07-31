import { useDidMount } from '@/hooks';
import { useEffect, useState } from 'react';
import firebase from '@/services/firebase';

const useWinterStichedProducts = (itemsCount) => {
  const [winterStichedProducts, setWinterStichedProducts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const didMount = useDidMount(true);

  const fetchWinterStichedProducts = async () => {
    try {
      setLoading(true);
      setError('');

      const docs = await firebase.getStichedWinterProducts(itemsCount);

      if (docs.empty) {
        if (didMount) {
          setError('No Winter Pret products found.');
          console.log('No Winter Pret products found');
          setLoading(false);
        }
      } else {
        const items = [];

        docs.forEach((snap) => {
          const data = snap.data();
          items.push({ id: snap.ref.id, ...data });
        });

        if (didMount) {
          setWinterStichedProducts(items);
          setLoading(false);
        }
      }
    } catch (e) {
      if (didMount) {
        setError('Failed to fetch Winter Pret products', e.message);
        console.log("failed to fetch Winter Pret products", e);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (winterStichedProducts.length === 0 && didMount) {
      fetchWinterStichedProducts();
    }
  }, []);

  return {
    winterStichedProducts, fetchWinterStichedProducts, isLoading, error
  };
};

export default useWinterStichedProducts;
