import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, updateProfile } from 'firebase/auth';
import { Container, Paper, Typography, TextField, Button, Alert } from '@mui/material';

const firebaseConfig = {
  apiKey: "AIzaSyAXtFQVA5Q7K3F_IeqFrR_-wDdqj4KsLFY",
  authDomain: "shyam-gmbh.firebaseapp.com",
  projectId: "shyam-gmbh",
  storageBucket: "shyam-gmbh.appspot.com",
  messagingSenderId: "1096712939317",
  appId: "1:1096712939317:web:76f6238d5b6c418802ce7c",
  measurementId: "G-NVH7E83Z94"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const ContactInfo = () => {
  const [user, setUser] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [updatedUserInfo, setUpdatedUserInfo] = useState(null); // New state for retrieved user information
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [auth]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setProfilePicture(file);
  };

  const handleUpdateUserInfo = async () => {
    try {
      if (user) {
        // Update user profile information
        await updateProfile(user, {
          displayName: `${firstName} ${lastName}`,
          photoURL: profilePicture ? URL.createObjectURL(profilePicture) : null,
        });

        // Retrieve updated user information
        const updatedUser = await auth.currentUser;
        setUpdatedUserInfo(updatedUser);

        console.log('User information updated successfully');
        setError(null);
      } else {
        setError('User is not signed in');
      }
    } catch (error) {
      setError('Error updating user information');
      console.error('Error updating user information:', error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Update User Information
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}

        <TextField
          margin="normal"
          fullWidth
          id="firstName"
          label="First Name"
          name="firstName"
          autoComplete="given-name"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
        />

        <TextField
          margin="normal"
          fullWidth
          id="lastName"
          label="Last Name"
          name="lastName"
          autoComplete="family-name"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
        />

        <TextField
          margin="normal"
          fullWidth
          id="phoneNumber"
          label="Phone Number"
          name="phoneNumber"
          autoComplete="tel"
          value={phoneNumber}
          onChange={(event) => setPhoneNumber(event.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ margin: '16px 0' }}
        />

        {profilePicture && (
          <img
            src={URL.createObjectURL(profilePicture)}
            alt="Profile Preview"
            style={{ maxWidth: '100%', marginBottom: '16px' }}
          />
        )}

        <Button onClick={handleUpdateUserInfo} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Update Information
        </Button>

        <Button
          onClick={() => setUpdatedUserInfo(auth.currentUser)}
          fullWidth
          variant="outlined"
          sx={{ mt: 2, mb: 3 }}
        >
          Retrieve Updated Information
        </Button>

        {updatedUserInfo && (
          <div>
            <Typography variant="h6">Retrieved User Information:</Typography>
            <Typography>
              Display Name: {updatedUserInfo.displayName}<br />
              Email: {updatedUserInfo.email}<br />
              Phone Number: {updatedUserInfo.phoneNumber}<br />
              Profile Picture: {updatedUserInfo.photoURL}
              <img alt='dp' src={updatedUserInfo.photoURL}></img>
            </Typography>
          </div>
        )}
      </Paper>
    </Container>
  );
};

export default ContactInfo;
