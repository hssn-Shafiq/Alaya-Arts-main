import { ArrowLeftOutlined, CheckOutlined } from '@ant-design/icons';
import { displayActionMessage } from '@/helpers/utils';
import { CHECKOUT_STEP_2 } from '@/constants/routes';
import { useFormikContext } from 'formik';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setPaymentDetails } from '@/redux/actions/checkoutActions';
import { clearBasket } from '@/redux/actions/basketActions';
import { placeOrder } from '@/redux/actions/orderActions';
import firebase from '@/services/firebase';

const Total = ({ isInternational, subtotal }) => {
  const { values, setFieldValue } = useFormikContext();
  const history = useHistory();
  const dispatch = useDispatch();
  const basket = useSelector((state) => state.basket);
  const shippingDetails = useSelector((state) => state.checkout.shipping);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const onClickBack = () => {
    const { bank, senderBankAccountName, senderBankAccountNumber, trxOrTid, ...rest } = values;
    dispatch(setPaymentDetails({ ...rest }));
    history.push(CHECKOUT_STEP_2);
  };

  const handlePlaceOrder = async () => {
    const user = firebase.auth.currentUser;

    if (!user) {
      displayActionMessage('You need to be logged in to place an order.', 'error');
      return;
    }

    if(!values.senderBankAccountName || !values.senderBankAccountNumber || !values.trxOrTid || !values.paymentMethod){
      displayActionMessage('plzz add the payment details to place an order');
      setMessage("plzz verify your payment details to place an order")
      console.log('plzz add the payment details to place an order');
    }
      else{
        const orderDetails = {
          userId: user.uid,
          orderStatus: 'Processing',
          products: basket.map((product) => ({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: product.quantity,
            imageUrl: product.image,
            color: product.selectedColor || 'N/A',
            size: product.selectedSize || 'N/A',
          })),
          shippingDetails: {
            fullname: shippingDetails.fullname,
            email: shippingDetails.email,
            address: shippingDetails.address,
            mobile: shippingDetails.mobile,
            isInternational: shippingDetails.isInternational,
            isDone: true,
          },
          paymentDetails: {
            bank: values.bank,
            senderBankAccountName: values.senderBankAccountName,
            senderBankAccountNumber: values.senderBankAccountNumber,
            trxOrTid: values.trxOrTid,
            type: values.paymentMethod,
          },
          subtotal,
          total: subtotal + (isInternational ? 350 : 0),
          paymentStatus: 'Pending',
          createdAt: new Date().toISOString(),
        };
    
        try {
          setUploading(true);
    
          // Upload product images to Firestore storage
          for (const product of basket) {
            const imageUrl = await firebase.storeImage(product.id, 'orderProducts', product.imageFile);
            product.imageUrl = imageUrl; // Add imageUrl to the product
          }
    
          // Update order details with image URLs
          orderDetails.products = basket.map((product) => ({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: product.quantity,
            imageUrl: product.image,
            color: product.selectedColor || 'N/A',
            size: product.selectedSize || 'N/A'
          }));
    
          // Place order in Firestore
          await dispatch(placeOrder(orderDetails));
    
          // Clear the basket
          dispatch(clearBasket());
    
          // Clear payment details
          setFieldValue('bank', '');
          setFieldValue('senderBankAccountName', '');
          setFieldValue('senderBankAccountNumber', '');
          setFieldValue('trxOrTid', '');
          setFieldValue('paymentMethod', '');
    
          // Display success message
          console.log('Order placed successfully!', orderDetails);
          displayActionMessage('Order placed successfully!', 'success');
    
          // Redirect to account page
          history.push('/all_orders');
        } catch (error) {
          console.log('Error placing order:', error);
          displayActionMessage(`Failed to place order: ${error.message}`, 'error');
        } finally {
          setUploading(false);
        }
      }

  };

  return (
    <>
      <div className="basket-total text-right">
      {message && (
          <div className="alert-dismissible alert-danger text-center fs-3 fw-bold mt-2 py-2">
            {message}
          </div>
        )}
        <h2 className="basket-total-amount fw-bold">
        Total:  {(subtotal + (isInternational ? isInternational : 0)).toFixed(0)}/pkr
        </h2>
      </div>
      <br />
      <div className="checkout-shipping-action mb-5">
        <button
          className="button button-muted"
          onClick={() => onClickBack(values)}
          type="button"
          disabled={uploading}
        >
          <ArrowLeftOutlined />
          &nbsp;
          Go Back
        </button>
        <button
          className="button"
          onClick={handlePlaceOrder}
          type="button"
          disabled={uploading}
        >
          <CheckOutlined />
          &nbsp;
          Confirm
        </button>
      </div>
    </>
  );
};

Total.propTypes = {
  isInternational: PropTypes.bool.isRequired,
  subtotal: PropTypes.number.isRequired,
};

export default Total;
