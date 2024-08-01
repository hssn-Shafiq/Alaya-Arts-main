import { CustomInput } from "@/components/formik";
import { Field, useFormikContext } from "formik";
import React, { useEffect, useRef, useState } from "react";
import firebaseInstance from "@/services/firebase";

const BankTransferPayment = () => {
  const { values, setValues } = useFormikContext();
  const containerRef = useRef(null);
  const checkboxContainerRef = useRef(null);
  const [message, setMessage] = useState("");
  const [selectedBank, setSelectedBank] = useState(null);
  const [bankDetails, setBankDetails] = useState([]);

  const toggleCollapse = () => {
    const cn = containerRef.current;
    const cb = checkboxContainerRef.current;

    if (cb && cn) {
      if (values.type === "bank") {
        cn.style.height = `${cb.offsetHeight + 400}px`; // Adjust height as needed
      } else {
        cn.style.height = `${cb.offsetHeight}px`;
      }
    }
  };

  useEffect(() => {
    toggleCollapse();
  }, [values.type]);

  useEffect(() => {
    const fetchBankDetails = async () => {
      try {
        const details = await firebaseInstance.getBankDetails();
        const fetchedDetails = details.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBankDetails(fetchedDetails);
      } catch (error) {
        console.error("Error fetching bank details:", error);
      }
    };

    fetchBankDetails();
  }, []);

  const onBankModeChange = (e) => {
    if (e.target.checked) {
      setValues({ ...values, type: "bank" });
      toggleCollapse();
    }
  };

  const handleBankSelectionChange = (e) => {
    const selectedBankId = e.target.value;
    setSelectedBank(selectedBankId);
  };

  // Find the selected bank details based on the selected bank ID
  const selectedBankDetails = bankDetails.find((detail) => detail.id === selectedBank);

  return (
    <>
      <h3 className="text-center">Payment</h3>
      <br />
      <span className="d-block padding-s">Payment Option</span>
      <div
        ref={containerRef}
        className={`checkout-fieldset-collapse ${
          values.type === "bank" ? "is-selected-payment" : ""
        }`}
      >
        {/* ---- CHECKBOX TOGGLER ------ */}
        <div className="checkout-field margin-0">
          <div className="checkout-checkbox-field" ref={checkboxContainerRef}>
            <input
              checked={values.type === "bank"}
              id="modeBank"
              name="type" // the field name in formik I used is type
              onChange={onBankModeChange}
              type="radio"
            />
            <label className="d-flex w-100" htmlFor="modeBank">
              <div className="d-flex-grow-1 margin-left-s">
                <h4 className="margin-0">Bank Transfer</h4>
                <span className="text-subtle d-block margin-top-s">
                  Pay via bank transfer, Easypaisa, Jazzcash, etc.
                </span>
              </div>
            </label>
          </div>
        </div>
        <div className="checkout-collapse-sub h-100">
          <div className="padding-s">
            <h4 className="fs-2 fw-bold text-center">Bank Details</h4>
            <div className="details d-flex align-items-center justify-content-between px-3">
              {selectedBankDetails ? (
                <>
                  <div className="frst">
                    <p>
                      <strong>Bank Name:</strong>{" "}
                      {selectedBankDetails.bankName}
                    </p>
                    <p>
                      <strong>Account Number:</strong>{" "}
                      {selectedBankDetails.bankAccountNumber}
                    </p>
                  </div>
                  <div className="scnd">
                    <p>
                      <strong>Account Holder Name:</strong>{" "}
                      {selectedBankDetails.bankHolderName}
                    </p>
                    <p>
                      <strong>IBAN:</strong>{" "}
                      {selectedBankDetails.bankIBAN}
                    </p>
                  </div>
                </>
              ) : (
                <div className="alert-dismissible mx-auto alert-warning text-center fs-3 fw-bold mt-2 p-2 px-4 rounded-4">plz select a bank to show details</div>
              )}
            </div>
          </div>
          <div className="checkout-field margin-0 ">
            <div className="checkout-fieldset d-flex align-items-center justify-content-between px-3">
              <div className="frst">
                <div className="checkout-field">
                  <label className="label-input" htmlFor="bank">
                    * Select Bank
                  </label>
                  <br />
                  <select
                    onChange={handleBankSelectionChange}
                    className="w-100"
                  >
                    <option value="">Select Bank</option>
                    {bankDetails.map((detail) => (
                      <option key={detail.id} value={detail.id}>
                        {detail.bankName}
                      </option>
                    ))}
                  </select>
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
