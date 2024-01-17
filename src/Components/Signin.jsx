import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword,sendPasswordResetEmail } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { TextField, Button, Typography, Container, CssBaseline, Toolbar,Link } from '@mui/material';

const Signin = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyAXtFQVA5Q7K3F_IeqFrR_-wDdqj4KsLFY",
    authDomain: "shyam-gmbh.firebaseapp.com",
    projectId: "shyam-gmbh",
    storageBucket: "shyam-gmbh.appspot.com",
    messagingSenderId: "1096712939317",
    appId: "1:1096712939317:web:76f6238d5b6c418802ce7c",
    measurementId: "G-NVH7E83Z94"
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  initializeApp(firebaseConfig);

  const handleLogin = async () => {
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      if (user) {
        navigate(`/userdetails`);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handlePasswordReset = async () => {
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      setError('Password reset email sent. Check your email inbox.');
    } catch (error) {
      setError(error.message);
    }
  };


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Toolbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 shadow-md rounded-md w-96">
          <Typography component="h1" variant="h5" className="text-2xl font-semibold mb-6">
            Login
          </Typography>
          <form className="space-y-4">
            <TextField
              variant="outlined"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleLogin}
              className="py-2"
            >
              Log In
            </Button>
            <Link href="#" variant="body2" onClick={handlePasswordReset}>
              Forgot Password ?
            </Link>
          </form>
          {error && <Typography color="error" variant="body2" className="text-red-500 mt-4">{error}</Typography>}
        </div>
      </div>
    </Container>
  );
};

export default Signin;
