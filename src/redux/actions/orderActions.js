import firebaseInstance from '@/services/firebase'; // Adjust the import according to your file structure

const cleanObject = (obj) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v !== undefined)
  );
};

export const placeOrder = (orderDetails) => async (dispatch) => {
  dispatch({ type: 'PLACE_ORDER_REQUEST' });
  try {
    const firestore = firebaseInstance.getFirestore();
    const cleanedOrderDetails = cleanObject(orderDetails); // Clean the order details
    await firestore.collection('orders').add(cleanedOrderDetails);
    dispatch({ type: 'PLACE_ORDER_SUCCESS', payload: cleanedOrderDetails });
    console.log('Order added successfully to Firestore', cleanedOrderDetails);
  } catch (error) {
    dispatch({ type: 'PLACE_ORDER_FAIL', payload: error.message });
    console.log('Failed to add order to Firestore', error.message);
  }
};
