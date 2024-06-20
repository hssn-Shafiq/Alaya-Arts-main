import { useEffect, useState } from 'react';
import firebaseInstance from '@/services/firebase';

const useAdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [deliveredOrders, setDeliveredOrders] = useState([]);
  const [rejectedOrders, setRejectedOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersSnapshot = await firebaseInstance.getAllOrders();
        const fetchedOrders = ordersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setOrders(fetchedOrders);

        const deliveredSnapshot = await firebaseInstance.getDeliveredOrders();
        const fetchedDeliveredOrders = deliveredSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setDeliveredOrders(fetchedDeliveredOrders);

        const rejectedSnapshot = await firebaseInstance.getRejectedOrders();
        const fetchedRejectedOrders = rejectedSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setRejectedOrders(fetchedRejectedOrders);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return { orders, deliveredOrders, rejectedOrders, isLoading, error };
};

export default useAdminOrders;
