// About.js
import React from 'react';
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

const FailurePage = () => {
const navigate = useNavigate(); // Use useNavigate to access the navigate function

  return (
    <div>
      <h2>There was some problem sending your request please try again</h2>
      <button onClick={() => navigate('/contactus')}>go to home page</button>
    </div>
  );
};

export default FailurePage;
