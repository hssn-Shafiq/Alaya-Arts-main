import React, { useState, useEffect } from "react";
import firebaseInstance from "@/services/firebase";
import { DeleteFilled, EditFilled } from "@ant-design/icons";

const BankDetails = () => {
  const [bankDetails, setBankDetails] = useState([]);
  const [formState, setFormState] = useState({
    bankName: "",
    bankHolderName: "",
    bankIBAN: "",
    bankAccountNumber: "",
  });
  const [selectedBank, setSelectedBank] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchBankDetails();
  }, []);

  const fetchBankDetails = async () => {
    setLoading(true);
    try {
      const details = await firebaseInstance.getBankDetails();
      const fetchedDetails = details.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBankDetails(fetchedDetails);
    } catch (error) {
      setErrorMessage("Error fetching bank details");
      console.error("Error fetching bank details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setMessage("");
    const { bankName, bankHolderName, bankIBAN, bankAccountNumber } = formState;

    try {
      if (selectedBank) {
        if (!selectedBank.id) {
          throw new Error("No selected bank ID");
        }
        await firebaseInstance.updateBankDetails(selectedBank.id, {
          bankName,
          bankHolderName,
          bankIBAN,
          bankAccountNumber,
        });
        setMessage("Bank details updated successfully");
      } else {
        const existingBank = bankDetails.find(
          (detail) => detail.bankName === bankName
        );
        if (existingBank) {
          setErrorMessage("This bank is already added.");
          return;
        }
        await firebaseInstance.addBankDetails({
          bankName,
          bankHolderName,
          bankIBAN,
          bankAccountNumber,
        });
        setMessage("Bank added successfully");
      }
      fetchBankDetails();
      setFormState({
        bankName: "",
        bankHolderName: "",
        bankIBAN: "",
        bankAccountNumber: "",
      });
      setSelectedBank(null);
    } catch (error) {
      console.error("Error submitting bank details:", error);
      setErrorMessage("Failed to submit bank details");
    } finally {
      setLoading(false);
    }
  };

  const handleBankSelection = (e) => {
    const selected = bankDetails.find(
      (detail) => detail.bankName === e.target.value
    );
    setSelectedBank(selected);
    if (selected) {
      setFormState({
        bankName: selected.bankName,
        bankHolderName: selected.bankHolderName,
        bankIBAN: selected.bankIBAN,
        bankAccountNumber: selected.bankAccountNumber,
      });
    } else {
      setFormState({
        bankName: "",
        bankHolderName: "",
        bankIBAN: "",
        bankAccountNumber: "",
      });
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    setErrorMessage("");
    setMessage("");
    try {
      await firebaseInstance.deleteBankDetails(id);
      fetchBankDetails();
      setMessage("Bank details deleted successfully");
    } catch (error) {
      console.error("Error deleting bank details:", error);
      setErrorMessage("Error deleting bank details");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (bank) => {
    setMessage("");
    setErrorMessage("");
    setSelectedBank(bank);
    setFormState({
      bankName: bank.bankName,
      bankHolderName: bank.bankHolderName,
      bankIBAN: bank.bankIBAN,
      bankAccountNumber: bank.bankAccountNumber,
    });
  };

  return (
    <div>
      <div className="loader">
        <h2 className=" order_page_title">All Bank Details</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="inputs_bank gap-3 gap-md-0 text-center w-100 d-flex justify-content-between flex-wrap">
          <input
            name="bankName"
            placeholder="Bank Name"
            value={formState.bankName}
            onChange={handleInputChange}
            required
          />
          <input
            name="bankHolderName"
            placeholder="Bank Holder Name"
            value={formState.bankHolderName}
            onChange={handleInputChange}
            required
          />
          <input
            name="bankIBAN"
            placeholder="Bank IBAN Number"
            value={formState.bankIBAN}
            onChange={handleInputChange}
            required
            maxLength={34}
            minLength={34}
          />
          <input
            name="bankAccountNumber"
            placeholder="Bank Account Number"
            value={formState.bankAccountNumber}
            onChange={handleInputChange}
            required
          />
        </div>
        {message && <div className="alert-dismissible alert-success text-center fs-3 fw-bold mt-2 py-2">{message}</div>}
        <button
          type="submit"
          className="btn btn-info fw-bold text-light mt-3"
          disabled={loading}
        >
          {selectedBank ? "Update Bank Details" : "Add Bank Details"}
        </button>
      </form>
      {errorMessage && <p className="text-center fs-3 fw-bold text-danger">{errorMessage}</p>}
      <div className="all_orders mt-5">
        <h2 className="fw-bold">Select Bank to View Details</h2>
        <div className="select_bank my-3 w-100">
          <select onChange={handleBankSelection} className="w-100">
            <option value="">Select Bank</option>
            {bankDetails.map((detail) => (
              <option key={detail.id} value={detail.bankName}>
                {detail.bankName}
              </option>
            ))}
          </select>
        </div>

        <table>
          <thead>
            <tr className="text-center">
              <th>Bank Name</th>
              <th>Holder Name</th>
              <th>IBAN</th>
              <th>Account Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {selectedBank ? (
              <tr>
                <td>{selectedBank.bankName}</td>
                <td>{selectedBank.bankHolderName}</td>
                <td>{selectedBank.bankIBAN}</td>
                <td>{selectedBank.bankAccountNumber}</td>
                <td>
                  <button
                    className="btn btn-secondary me-2"
                    onClick={() => handleEdit(selectedBank)}
                  >
                    <EditFilled />
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(selectedBank.id)}
                  >
                    <DeleteFilled />
                  </button>
                </td>
              </tr>
            ) : (
              <tr>
                <td colSpan={6} className="fs-3 fw-bold text-warning">
                  Please select a bank to check details
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BankDetails;
