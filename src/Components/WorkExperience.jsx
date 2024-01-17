import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DatePicker from 'react-datepicker'; // Import from react-datepicker
import 'react-datepicker/dist/react-datepicker.css'; // Import the styles

const WorkExperience = () => {
  const [workExperiences, setWorkExperiences] = useState([]);

  const validationSchema = Yup.object({
    company: Yup.string().required('Company name is required'),
    jobTitle: Yup.string().required('Job title is required'),
    startDate: Yup.date().required('Start date is required'),
    endDate: Yup.date().required('End date is required'),
    description: Yup.string().required('Job description is required'),
  });

  const formik = useFormik({
    initialValues: {
      company: '',
      jobTitle: '',
      startDate: null,
      endDate: null,
      description: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleAddExperience(values);
    },
  });

  const handleInputChange = (field, value) => {
    formik.setFieldValue(field, value);
  };

  const handleAddExperience = (values) => {
    setWorkExperiences((prevExperiences) => [...prevExperiences, values]);
    formik.resetForm();
  };

  const handleDeleteExperience = (index) => {
    const updatedExperiences = [...workExperiences];
    updatedExperiences.splice(index, 1);
    setWorkExperiences(updatedExperiences);
  };

  return (
    <div className="my-4">
      <h2 className="text-xl font-bold mb-4">Work Experience</h2>

      <form onSubmit={formik.handleSubmit} className="mb-4">
        <div className="flex flex-wrap gap-4">
          <TextField
            label="Company"
            variant="outlined"
            fullWidth
            value={formik.values.company}
            onChange={(e) => handleInputChange('company', e.target.value)}
            error={formik.touched.company && Boolean(formik.errors.company)}
            helperText={formik.touched.company && formik.errors.company}
          />
          <TextField
            label="Job Title"
            variant="outlined"
            fullWidth
            value={formik.values.jobTitle}
            onChange={(e) => handleInputChange('jobTitle', e.target.value)}
            error={formik.touched.jobTitle && Boolean(formik.errors.jobTitle)}
            helperText={formik.touched.jobTitle && formik.errors.jobTitle}
          />
          <DatePicker
            selected={formik.values.startDate}
            onChange={(date) => handleInputChange('startDate', date)}
            dateFormat="yyyy-MM-dd"
          />
          <DatePicker
            selected={formik.values.endDate}
            onChange={(date) => handleInputChange('endDate', date)}
            dateFormat="yyyy-MM-dd"
          />
          <TextField
            label="Job Description"
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            value={formik.values.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            error={formik.touched.description && Boolean(formik.errors.description)}
            helperText={formik.touched.description && formik.errors.description}
          />
          <Button variant="contained" color="primary" type="submit" disabled={!formik.isValid}>
            Add Experience
          </Button>
        </div>
      </form>

      {/* Display the list of work experiences with delete button */}
      {workExperiences && workExperiences.map((experience, index) => (
        <div key={index} className="flex gap-4 items-center mb-4">
          <div className="border p-4 flex-grow">
            <h3 className="text-lg font-semibold">{experience.company}</h3>
            <p>{`${experience.jobTitle}, ${experience.startDate} - ${experience.endDate}`}</p>
            <ul>
              {experience.description.split('\n').map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          </div>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => handleDeleteExperience(index)}
          >
            Delete
          </Button>
        </div>
      ))}
    </div>
  );
};

export default WorkExperience;
