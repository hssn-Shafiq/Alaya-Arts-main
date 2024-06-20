import { useEffect, useState } from 'react';
import firebaseInstance from '@/services/firebase';

const useAdminContactDetails = () => {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const snapshot = await firebaseInstance.getContactDetails();
        const fetchedContacts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setContacts(fetchedContacts);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContacts();
  }, []);

  return { contacts, setContacts, isLoading, error };
};

export default useAdminContactDetails;
