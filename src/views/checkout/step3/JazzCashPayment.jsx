/* eslint-disable jsx-a11y/label-has-associated-control */
import { useFormikContext } from 'formik';
import React from 'react';

const JazzCashPayment = () => {
  const { values, setValues } = useFormikContext();

  return (
    <div className={`checkout-fieldset-collapse ${values.type === 'jazzcash' ? 'is-selected-payment' : ''}`}>
      <div className="checkout-field margin-0">
        <div className="checkout-checkbox-field">
          <input
            checked={values.type === 'jazzcash'}
            id="modeJazzCash"
            name="type"
            onChange={(e) => {
              if (e.target.checked) {
                setValues({ ...values, type: 'jazzcash' });
              }
            }}
            type="radio"
          />
          <label
            className="d-flex w-100"
            htmlFor="modeJazzCash"
          >
            <div className="d-flex-grow-1 margin-left-s">
              <h4 className="margin-0">JazzCash</h4>
              <span className="text-subtle d-block margin-top-s">
                Pay easily, fast and secure with JazzCash.
              </span>
            </div>
            <div className="payment-img payment-img-jazzcash" />
          </label>
        </div>
      </div>
    </div>
  );
};

export default JazzCashPayment;
