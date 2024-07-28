import React, { useState, useEffect } from 'react';
import firebaseInstance from '@/services/firebase';
const BankDetails = () => {
  const [bankDetails, setBankDetails] = useState([]);
  const [formState, setFormState] = useState({
    bankName: '',
    bankHolderName: '',
    bankIBAN: '',
    bankAccountNumber: ''
  });
  const [selectedBank, setSelectedBank] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchBankDetails();
  }, []);

  const fetchBankDetails = async () => {
    const details = await firebaseInstance.getBankDetails(); // Fetching bank details
    setBankDetails(details);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { bankName, bankHolderName, bankIBAN, bankAccountNumber } = formState;

    const existingBank = bankDetails.find(detail => detail.bankName === bankName);
    if (existingBank) {
      setErrorMessage('This bank is already added.');
      return;
    }

    await firebaseInstance.addBankDetails({ bankName, bankHolderName, bankIBAN, bankAccountNumber });
    setFormState({ bankName: '', bankHolderName: '', bankIBAN: '', bankAccountNumber: '' });
    fetchBankDetails();
  };

  const handleBankSelection = (e) => {
    const selected = bankDetails.find(detail => detail.bankName === e.target.value);
    setSelectedBank(selected);
  };

  const handleDelete = async (id) => {
    await firebaseInstance.deleteBankDetail(id);
    fetchBankDetails();
  };

  const handleEdit = async (id) => {
    // Logic for editing bank details
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input name="bankName" placeholder="Bank Name" value={formState.bankName} onChange={handleInputChange} required />
        <input name="bankHolderName" placeholder="Bank Holder Name" value={formState.bankHolderName} onChange={handleInputChange} required />
        <input name="bankIBAN" placeholder="Bank IBAN Number" value={formState.bankIBAN} onChange={handleInputChange} required />
        <input name="bankAccountNumber" placeholder="Bank Account Number" value={formState.bankAccountNumber} onChange={handleInputChange} required />
        <button type="submit">Add Bank Details</button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
      <select onChange={handleBankSelection}>
        <option value="">Select Bank</option>
        {bankDetails.map(detail => (
          <option key={detail.id} value={detail.bankName}>{detail.bankName}</option>
        ))}
      </select>
      {selectedBank && (
        <table>
          <thead>
            <tr>
              <th>Bank Name</th>
              <th>Holder Name</th>
              <th>IBAN</th>
              <th>Account Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{selectedBank.bankName}</td>
              <td>{selectedBank.bankHolderName}</td>
              <td>{selectedBank.bankIBAN}</td>
              <td>{selectedBank.bankAccountNumber}</td>
              <td>
                <button onClick={() => handleEdit(selectedBank.id)}>Edit</button>
                <button onClick={() => handleDelete(selectedBank.id)}>Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BankDetails;
