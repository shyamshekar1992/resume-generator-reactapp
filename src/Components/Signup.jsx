// SignUp.jsx
import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { Container, Paper, Typography, TextField, Button, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [passwordOne, setPasswordOne] = useState('');
  const [passwordTwo, setPasswordTwo] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Use useNavigate to access the navigate function

  useEffect(() => {
    // Initialize Firebase
    const firebaseConfig = {
      apiKey: "AIzaSyAXtFQVA5Q7K3F_IeqFrR_-wDdqj4KsLFY",
      authDomain: "shyam-gmbh.firebaseapp.com",
      projectId: "shyam-gmbh",
      storageBucket: "shyam-gmbh.appspot.com",
      messagingSenderId: "1096712939317",
      appId: "1:1096712939317:web:76f6238d5b6c418802ce7c",
      measurementId: "G-NVH7E83Z94"
    };

    initializeApp(firebaseConfig);
  }, []); // Empty dependency array ensures the effect runs only once after the initial render

  const onSubmit = (event) => {
    setError(null);

    // Check if passwords match. If they do, create a user in Firebase
    // and redirect to UserDetails page with user's email in the URL
    if (passwordOne === passwordTwo) {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, passwordOne)
        .then((authUser) => {
          console.log('Success. The user is created in Firebase', authUser);

          // Redirect to UserDetails page with user's email in the URL
          navigate(`/userdetails?email=${encodeURIComponent(email)}`);
        })
        .catch((error) => {
          // An error occurred. Set an error message to be displayed to the user.
          setError(error.message);
          console.log("error ", error);
        });
    } else {
      setError('Passwords do not match');
    }

    event.preventDefault();
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <form onSubmit={onSubmit} style={{ width: '100%', marginTop: '16px' }}>
          {error && <Alert severity="error">{error}</Alert>}
          <TextField
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextField
            margin="normal"
            fullWidth
            name="passwordOne"
            label="Password"
            type="password"
            id="passwordOne"
            autoComplete="new-password"
            value={passwordOne}
            onChange={(event) => setPasswordOne(event.target.value)}
          />
          <TextField
            margin="normal"
            fullWidth
            name="passwordTwo"
            label="Confirm Password"
            type="password"
            id="passwordTwo"
            autoComplete="new-password"
            value={passwordTwo}
            onChange={(event) => setPasswordTwo(event.target.value)}
          />
          <Button type="submit" fullWidth variant="contained" style={{ marginTop: '16px', marginBottom: '16px' }}>
            Sign Up
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default SignUp;
