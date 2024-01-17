import React, { useState } from 'react';
import { TextField, Paper, Tab, Tabs, TextareaAutosize, Typography } from '@mui/material';

const JobDescription = () => {
  const [aboutText, setAboutText] = useState('');

  return (
    <div>
      <TextField
        fullWidth
        id="message"
        name="message"
        label="Enter some description about"
        variant="outlined"
        multiline
        rows={4}
        value={aboutText}
        onChange={(e) => setAboutText(e.target.value)}
        margin="normal"
      />
    </div>
  );
};

export default JobDescription;
