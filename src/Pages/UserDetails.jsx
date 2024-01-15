// UserDetails.js
import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import UserDetailsForm from '../Components/UserDetailsForm';

const UserDetails = () => {

  // No need to use queryParams to get email from the URL, as we will get it from the authenticated user
  // const queryParams = new URLSearchParams(location.search);
  // const userEmailFromQueryParam = queryParams.get('email');

  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();

    // Check if a user is already logged in
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div>
      {user ? (
        <h2>Welcome, {user.email}!</h2>
        
        // Use the user's email directly from Firebase Authentication data
      ) : (
        <p>Please log in to view your saved details.</p>
      )}
    </div>
  );
};

export default UserDetails;
