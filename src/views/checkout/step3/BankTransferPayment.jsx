import { CustomInput } from '@/components/formik';
import { Field, useFormikContext } from 'formik';
import React, { useEffect, useRef, useState } from 'react';

const BankTransferPayment = () => {
  const { values, setValues } = useFormikContext();
  const containerRef = useRef(null);
  const checkboxContainerRef = useRef(null);
  
  const [selectedBank, setSelectedBank] = useState('meezan');

  const bankDetails = {
    meezan: {
      name: 'Meezan Bank',
      accountNumber: '1234567890',
      accountHolder: 'John Doe',
      iban: 'PK36SCBL0000001123456702'
    },
    hbl: {
      name: 'HBL Bank',
      accountNumber: '0987654321',
      accountHolder: 'Jane Doe',
      iban: 'PK36HABB0000001987654302'
    },
    // Add details for Easypaisa, Jazzcash here as needed
  };

  const toggleCollapse = () => {
    const cn = containerRef.current;
    const cb = checkboxContainerRef.current;

    if (cb && cn) {
      if (values.type === 'bank') {
        cn.style.height = `${cb.offsetHeight + 400}px`; // Adjust height as needed
      } else {
        cn.style.height = `${cb.offsetHeight}px`;
      }
    }
  };

  useEffect(() => {
    toggleCollapse();
  }, [values.type]);

  const onBankModeChange = (e) => {
    if (e.target.checked) {
      setValues({ ...values, type: 'bank' });
      toggleCollapse();
    }
  };

  const handleBankSelectionChange = (e) => {
    setSelectedBank(e.target.value);
  };

  return (
    <>
      <h3 className="text-center">Payment</h3>
      <br />
      <span className="d-block padding-s">Payment Option</span>
      <div
        ref={containerRef}
        className={`checkout-fieldset-collapse ${values.type === 'bank' ? 'is-selected-payment' : ''}`}
      >
        {/* ---- CHECKBOX TOGGLER ------ */}
        <div className="checkout-field margin-0">
          <div className="checkout-checkbox-field" ref={checkboxContainerRef}>
            <input
              checked={values.type === 'bank'}
              id="modeBank"
              name="type" // the field name in formik I used is type
              onChange={onBankModeChange}
              type="radio"
            />
            <label
              className="d-flex w-100"
              htmlFor="modeBank"
            >
              <div className="d-flex-grow-1 margin-left-s">
                <h4 className="margin-0">Bank Transfer</h4>
                <span className="text-subtle d-block margin-top-s">
                  Pay via bank transfer, Easypaisa, Jazzcash, etc.
                </span>
              </div>
            </label>
          </div>
        </div>
        <div className="checkout-collapse-sub">
          <div className="padding-s">
            <h4 className='fs-2 fw-bold text-center'>Bank Details</h4>
            <div className='details d-flex align-items-center justify-content-between px-3'>
            <div className="frst">
            <p><strong>Bank Name:</strong> {bankDetails[selectedBank].name}</p>
            <p><strong>Account Number:</strong> {bankDetails[selectedBank].accountNumber}</p>
            </div>
            <div className="scnd">
            <p><strong>Account Holder Name:</strong> {bankDetails[selectedBank].accountHolder}</p>
            <p><strong>IBAN:</strong> {bankDetails[selectedBank].iban}</p>
            </div>
            </div>
          </div>
          <br />
          <div className="checkout-field margin-0 ">
            <div className="checkout-fieldset d-flex align-items-center justify-content-between px-3">
              <div className="frst">
              <div className="checkout-field">
                <label className="label-input" htmlFor="bank">* Select Bank</label><br />
                <Field
                  name="bank"
                  as="select"
                  component="select"
                  onChange={handleBankSelectionChange}
                  className="input-form w-100"
                >
                  <option value="meezan">Meezan Bank</option>
                  <option value="hbl">HBL Bank</option>
                  <option value="easypaisa">Easypaisa</option>
                  <option value="jazzcash">Jazzcash</option>
                </Field>
              </div>
              
              <div className="checkout-field">
                <Field
                  name="senderBankAccountName"
                  type="text"
                  label="* Sender Bank Account Name"
                  placeholder="Enter sender's bank account name"
                  component={CustomInput}
                />
              </div>
              </div>
              <div className="scnd">
              <div className="checkout-field">
                <Field
                  name="senderBankAccountNumber"
                  type="text"
                  label="* Sender Bank Account Number"
                  placeholder="Enter sender's bank account number"
                  component={CustomInput}
                />
              </div>
              <div className="checkout-field">
                <Field
                  name="trxOrTid"
                  type="text"
                  label="* TRX/TID Number"
                  placeholder="Enter transaction or TID number"
                  component={CustomInput}
                />
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BankTransferPayment;
