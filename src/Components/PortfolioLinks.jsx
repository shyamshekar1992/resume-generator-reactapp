import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const PortfolioLinks = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [newPortfolio, setNewPortfolio] = useState('');
  const portfolioRegex = /^(?:(?:https?|ftp):\/\/)?(?:www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}([/?].*)?$/;

  const isPortfolioValid = (portfolio) => {
    try {
      const url = new URL(portfolio);
      return url.protocol === 'http:' || url.protocol === 'https:';
    } catch (error) {
      return false;
    }
  };
  
  const handleAddPortfolio = () => {
    if (isPortfolioValid(newPortfolio.trim())) {
      setPortfolios((prevPortfolios) => [...prevPortfolios, newPortfolio.trim()]);
      setNewPortfolio('');
    } else {
      alert('Invalid portfolio link format. Please use a valid link.');
    }
  };

  const handleDeletePortfolio = (portfolioIndex) => {
    setPortfolios((prevPortfolios) => prevPortfolios.filter((_, index) => index !== portfolioIndex));
  };

  return (
    <div>
      <div>
        <h3>Add Your Portfolio Links</h3>
        <TextField
          label="Add Portfolio Link"
          variant="outlined"
          fullWidth
          value={newPortfolio}
          onChange={(e) => setNewPortfolio(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleAddPortfolio}>
          Add
        </Button>
      </div>
      {portfolios.length > 0 && (
        <div>
          <h4>Your Portfolio Links:</h4>
          <ul>
            {portfolios.map((portfolio, index) => (
              <li key={index}>
                {portfolio}
                <Button color="secondary" onClick={() => handleDeletePortfolio(index)}>
                  Remove
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PortfolioLinks;
