import { useDidMount } from '@/hooks';
import { useEffect, useState } from 'react';
import firebase from '@/services/firebase';

const useStichedProducts = (itemsCount) => {
  const [stichedProducts, setStichedProducts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const didMount = useDidMount(true);

  const fetchStichedProducts = async () => {
    try {
      setLoading(true);
      setError('');

      const docs = await firebase.getStichedProducts(itemsCount);

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
          setStichedProducts(items);
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
    if (stichedProducts.length === 0 && didMount) {
      fetchStichedProducts();
    }
  }, []);

  return {
    stichedProducts, fetchStichedProducts, isLoading, error
  };
};

export default useStichedProducts;
