import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');

  const handleAddSkill = () => {
    if (newSkill.trim() !== '') {
      setSkills((prevSkills) => [...prevSkills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleDeleteSkill = (skillIndex) => {
    setSkills((prevSkills) => prevSkills.filter((_, index) => index !== skillIndex));
  };

  return (
    <div>
      <h2>Add your skills or tools you have used so that the recruiter knows what are the skills you are proficient in</h2>
      <div>
        <TextField
          label="Add Skill"
          variant="outlined"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleAddSkill}>
          Add
        </Button>
      </div>
      <div style={{ marginTop: '10px' }}>
        {skills && skills.map((skill, index) => (
          <Chip
            key={index}
            label={skill}
            onDelete={() => handleDeleteSkill(index)}
            style={{ margin: '5px' }}
          />
        ))}
      </div>
    </div>
  );
};

export default Skills;
