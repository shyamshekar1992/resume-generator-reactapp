import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';

const Languages = () => {
  const [languages, setLanguages] = useState([]);
  const [newLanguage, setNewLanguage] = useState('');

  const handleAddLanguage = () => {
    if (newLanguage.trim() !== '') {
      setLanguages((prevLanguages) => [...prevLanguages, newLanguage.trim()]);
      setNewLanguage('');
    }
  };

  const handleDeleteLanguage = (index) => {
    const updatedLanguages = [...languages];
    updatedLanguages.splice(index, 1);
    setLanguages(updatedLanguages);
  };

  return (
    <div>
      <h2>Languages</h2>
      <div>
        <TextField
          label="Add Language"
          variant="outlined"
          value={newLanguage}
          onChange={(e) => setNewLanguage(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleAddLanguage}>
          Add
        </Button>
      </div>
      <div style={{ marginTop: '10px' }}>
        {languages && languages.map((language, index) => (
          <Chip
            key={index}
            label={language}
            onDelete={() => handleDeleteLanguage(index)}
            style={{ margin: '5px' }}
          />
        ))}
      </div>
    </div>
  );
};

export default Languages;
