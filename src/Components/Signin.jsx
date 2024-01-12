import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import { initializeApp } from 'firebase/app'; // Import initializeApp from firebase/app

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
  const navigate = useNavigate(); // Use useNavigate to access the navigate function
  initializeApp(firebaseConfig); // Initialize Firebase with your configuration

  const handleLogin = async () => {
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      if(user)
      {
        navigate(`/userdetails`);

      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 shadow-md rounded-md w-96">
        <h2 className="text-2xl font-semibold mb-6">Login</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <button
            type="button"
            onClick={handleLogin}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Log In
          </button>
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default Signin;
