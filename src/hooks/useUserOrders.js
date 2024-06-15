// useUserOrders.js

import { useEffect, useState } from 'react';
import firebase from '@/services/firebase';
import { useDidMount } from '@/hooks';

const useUserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const didMount = useDidMount(true);
  
  const fetchUserOrders = async (userId) => {
    try {
      setLoading(true);
      setError('');

      const docs = await firebase.getUserOrders(userId);

      if (docs.empty) {
        if (didMount) {
          setError('No orders found 🥲. ');
          setLoading(false);
        }
      } else {
        const ordersList = [];

        docs.forEach((doc) => {
          const data = doc.data();
          ordersList.push({ id: doc.id, ...data });
        });

        if (didMount) {
          setOrders(ordersList);
          setLoading(false);
        }
      }
    } catch (e) {
      if (didMount) {
        setError('Failed to fetch user orders');
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const user = firebase.auth.currentUser;
    if (user && didMount) {
      fetchUserOrders(user.uid);
    }
  }, [didMount]);

  return {
    orders, fetchUserOrders, isLoading, error
  };
};

export default useUserOrders;
