// Payment.jsx

import { CHECKOUT_STEP_1 } from '@/constants/routes';
import { Form, Formik } from 'formik';
import { displayActionMessage } from '@/helpers/utils';
import { useDocumentTitle, useScrollTop } from '@/hooks';
import PropTypes from 'prop-types';
import React from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { StepTracker } from '../components';
import withCheckout from '../hoc/withCheckout';
import CreditPayment from './CreditPayment';
import PayPalPayment from './PayPalPayment';
import { useDispatch, useSelector } from 'react-redux';
import { setPaymentDetails } from '@/redux/actions/checkoutActions';
import { placeOrder } from '@/redux/actions/orderActions';
import firebaseInstance from '@/services/firebase';
import Total from './Total';

const FormSchema = Yup.object().shape({
  name: Yup.string()
    .min(4, 'Name should be at least 4 characters.')
    .required('Name is required'),
  cardnumber: Yup.string()
    .min(13, 'Card number should be 13-19 digits long')
    .max(19, 'Card number should only be 13-19 digits long')
    .required('Card number is required.'),
  expiry: Yup.date()
    .required('Credit card expiry is required.'),
  ccv: Yup.string()
    .min(3, 'CCV length should be 3-4 digit')
    .max(4, 'CCV length should only be 3-4 digit')
    .required('CCV is required.'),
  paymentMethod: Yup.string().required('Please select payment method'),
});

const Payment = ({ shipping, payment, subtotal }) => {
  useDocumentTitle('Confirm your order | Alaya Arts');
  useScrollTop();
  const dispatch = useDispatch();
  const history = useHistory();
  const userId = useSelector((state) => state.auth.id);
  const basket = useSelector((state) => state.basket); // Assuming your basket is stored in Redux

  const initFormikValues = {
    name: payment.name || '',
    cardnumber: payment.cardnumber || '',
    expiry: payment.expiry || '',
    ccv: payment.ccv || '',
    paymentMethod: payment.paymentMethod || 'paypal',
  };

  const onConfirm = async (formValues) => {
    try {
      const paymentDetails = {
        ...formValues,
        timestamp: firebaseInstance.firestore.FieldValue.serverTimestamp(), // Add a timestamp
      };

      // Save payment details to Redux
      dispatch(setPaymentDetails(paymentDetails));

      // Save order details to Firestore
      if (userId) {
        const orderDetails = {
          userId,
          shippingDetails: shipping,
          paymentDetails,
          items: basket.map((product) => ({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: product.quantity,
          })),
          subtotal,
          total: subtotal + (shipping.isInternational ? 350 : 0),
          paymentStatus: 'Pending',
          createdAt: new Date().toISOString(),
        };

        await firebaseInstance.firestore().collection('orders').add(orderDetails);

        // Clear the basket or perform other necessary cleanup
        // dispatch(clearBasket()); // Uncomment if you have a clear basket action

        // Display success message
        console.log('Order placed successfully!');
        displayActionMessage('Order placed successfully!', 'success');

        // You can handle navigation within this component or show a message without navigating
        // history.push('/confirmation'); // Example redirection to a confirmation page
      } else {
        displayActionMessage('User not authenticated.', 'error');
      }
    } catch (error) {
      console.error('Error placing order:', error); // Log error
      displayActionMessage(`Failed to place order: ${error.message}`, 'error');
    }
  };

  if (!shipping || !shipping.isDone) {
    return <Redirect to={CHECKOUT_STEP_1} />;
  }
  return (
    <div className="checkout">
      <StepTracker current={3} />
      <Formik
        initialValues={initFormikValues}
        validateOnChange
        validationSchema={FormSchema}
        onSubmit={onConfirm}
      >
        {() => (
          <Form className="checkout-step-3">
            <CreditPayment />
            <PayPalPayment />
            <Total isInternational={shipping.isInternational} subtotal={subtotal} />
          </Form>
        )}
      </Formik>
    </div>
  );
};

Payment.propTypes = {
  shipping: PropTypes.shape({
    isDone: PropTypes.bool,
    isInternational: PropTypes.bool,
  }).isRequired,
  payment: PropTypes.shape({
    name: PropTypes.string,
    cardnumber: PropTypes.string,
    expiry: PropTypes.string,
    ccv: PropTypes.string,
    paymentMethod: PropTypes.string,
  }).isRequired,
  subtotal: PropTypes.number.isRequired,
};

export default withCheckout(Payment);
