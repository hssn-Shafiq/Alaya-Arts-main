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
import BankTransferPayment from './BankTransferPayment';
import PayPalPayment from './PayPalPayment';
import { useDispatch, useSelector } from 'react-redux';
import { setPaymentDetails } from '@/redux/actions/checkoutActions';
import { placeOrder } from '@/redux/actions/orderActions';
import firebaseInstance from '@/services/firebase';
import Total from './Total';

const FormSchema = Yup.object().shape({
  bank: Yup.string().required('Please select a bank'),
  senderBankAccountName: Yup.string().required('Sender bank account name is required'),
  senderBankAccountNumber: Yup.string().required('Sender bank account number is required'),
  trxOrTid: Yup.string().required('TRX/TID number is required'),
  paymentMethod: Yup.string().required('Please select payment method'),
});

const Payment = ({ shipping, payment, subtotal }) => {
  useDocumentTitle('Confirm your order | Alaya Arts');
  useScrollTop();
  const dispatch = useDispatch();
  const history = useHistory();
  const userId = useSelector((state) => state.auth.id);
  const basket = useSelector((state) => state.basket);

  const initFormikValues = {
    bank: payment.bank || 'meezan',
    senderBankAccountName: payment.senderBankAccountName || '',
    senderBankAccountNumber: payment.senderBankAccountNumber || '',
    trxOrTid: payment.trxOrTid || '',
    paymentMethod: payment.paymentMethod || 'bank',
  };

  const onConfirm = async (formValues) => {
    try {
      const paymentDetails = {
        ...formValues,
        timestamp: firebaseInstance.firestore.FieldValue.serverTimestamp(),
      };

      dispatch(setPaymentDetails(paymentDetails));

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

        displayActionMessage('Order placed successfully!', 'success');
      } else {
        displayActionMessage('User not authenticated.', 'error');
      }
    } catch (error) {
      console.error('Error placing order:', error);
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
          <Form className="checkout-step-3 p-4">
            <BankTransferPayment />
            {/* <PayPalPayment /> */}
            <Total isInternational={shipping.isInternational} subtotal={subtotal + 350} />
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
    bank: PropTypes.string,
    senderBankAccountName: PropTypes.string,
    senderBankAccountNumber: PropTypes.string,
    trxOrTid: PropTypes.string,
    paymentMethod: PropTypes.string,
  }).isRequired,
  subtotal: PropTypes.number.isRequired,
};

export default withCheckout(Payment);
