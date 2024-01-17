// Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-green-800 text-green p-4 text-center absolute bottom-3 w-full">
      <div className="flex flex-col items-center space-y-2">
        <span>Impressum</span>
        <span>Datenschutz</span>
        <span>&#169; 2024 Your Company</span>
      </div>
    </footer>
  );
};

export default Footer;
