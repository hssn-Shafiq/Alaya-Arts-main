import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import useAdminContactDetails from '@/hooks/useAdminContactDetails';
import firebaseInstance from '@/services/firebase';
import * as ROUTES from '@/constants/routes';
import { DeleteFilled } from '@ant-design/icons';

const ContactsDetails = () => {
  const { contacts, setContacts, isLoading, error } = useAdminContactDetails();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleDelete = async (contactId) => {
    try {
      await firebaseInstance.deleteContactDetails(contactId);
      const updatedContacts = contacts.filter(contact => contact.id !== contactId);
      setContacts(updatedContacts); // Update the contacts state after deletion
    } catch (error) {
      console.error("Error deleting contact: ", error);
    }
  };

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // if (contacts.length === 0) {
  //   return <div>No contact details available.</div>;
  // }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentContacts = contacts.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(contacts.length / itemsPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <div className="loader">
        <h2 className=' order_page_title'>All Contact Details</h2>
      </div>
      <div className="all_orders">
        <table>
          <thead>
            <tr className='text-center'>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Actions</th> {/* Added Actions column */}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
               <tr>
               <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>
               {isLoading ? <div class="order_loader"></div> :  "Not found"}
               </td>
             </tr>
            ) : (
              currentContacts.length === 0 ? (
                <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>
                {isLoading ? <div class="order_loader"></div> :  "Sorry we found nothing.!😢"}
                </td>
              </tr>
             ) : (
               currentContacts.map((contact) => (
                 <tr key={contact.id}>
                   <td>{contact.name}</td>
                   <td>{contact.email}</td>
                   <td>{contact.message}</td>
                   <td>
                     <button className='btn btn-danger ' onClick={() => handleDelete(contact.id)}><DeleteFilled /></button>
                   </td>
                 </tr>
               ))
             )
            )}
          </tbody>
        </table>
        <div className="pagination">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            style={{
              background: 'gray',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontWeight: '600',
              padding: '5px 10px',
              margin: '5px'
            }}
          >
            Previous
          </button>
          <span style={{ margin: '0 10px' }}>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            style={{
              background: 'blue',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontWeight: '600',
              padding: '5px 10px',
              margin: '5px'
            }}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default ContactsDetails;
