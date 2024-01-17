// About.js
import React from 'react';
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

const SucessPage = () => {
const navigate = useNavigate(); // Use useNavigate to access the navigate function

  return (
    <div>
      <h2>Your message was successfully sent to us</h2>
      <button onClick={() => navigate('/home')}>go to home page</button>
    </div>
  );
};

export default SucessPage;
