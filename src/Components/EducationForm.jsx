import React, {useState} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const EducationForm = () => {

  const [educations, setEducations] = useState([]); // Add this line for state

  const validationSchema = Yup.object({
    university: Yup.string().required('University/School is required'),
    city: Yup.string().required('City is required'),
    country: Yup.string().required('Country is required'),
    startYear: Yup.number().required('Start Year is required'),
    endYear: Yup.number().required('End Year is required'),
    description: Yup.string().required('Description is required'),
  });

  const formik = useFormik({
    initialValues: {
      university: '',
      city: '',
      country: '',
      startYear: '',
      endYear: '',
      description: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleAddEducation(values);
    },
  });

  const handleInputChange = (field, value) => {
    formik.setFieldValue(field, value);
  };

  const handleAddEducation = (values) => {
    setEducations((prevEducations) => [...prevEducations, values]);
    formik.resetForm();
  };

  const handleDeleteEducation = (index) => {
    const updatedEducations = [...educations];
    updatedEducations.splice(index, 1);
    setEducations(updatedEducations);
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Education Details</h1>

      <form onSubmit={formik.handleSubmit} className="mb-4">
        <div className="flex flex-wrap gap-4">
          <TextField
            label="University/School"
            variant="outlined"
            fullWidth
            value={formik.values.university}
            onChange={(e) => handleInputChange('university', e.target.value)}
            error={formik.touched.university && Boolean(formik.errors.university)}
            helperText={formik.touched.university && formik.errors.university}
          />
          <TextField
            label="City"
            variant="outlined"
            fullWidth
            value={formik.values.city}
            onChange={(e) => handleInputChange('city', e.target.value)}
            error={formik.touched.city && Boolean(formik.errors.city)}
            helperText={formik.touched.city && formik.errors.city}
          />
          <TextField
            label="Country"
            variant="outlined"
            fullWidth
            value={formik.values.country}
            onChange={(e) => handleInputChange('country', e.target.value)}
            error={formik.touched.country && Boolean(formik.errors.country)}
            helperText={formik.touched.country && formik.errors.country}
          />
          <TextField
            label="Start Year"
            variant="outlined"
            type="number"
            value={formik.values.startYear}
            onChange={(e) => handleInputChange('startYear', e.target.value)}
            error={formik.touched.startYear && Boolean(formik.errors.startYear)}
            helperText={formik.touched.startYear && formik.errors.startYear}
          />
          <TextField
            label="End Year"
            variant="outlined"
            type="number"
            value={formik.values.endYear}
            onChange={(e) => handleInputChange('endYear', e.target.value)}
            error={formik.touched.endYear && Boolean(formik.errors.endYear)}
            helperText={formik.touched.endYear && formik.errors.endYear}
          />
          <TextField
            label="Description"
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
            Add Education
          </Button>
        </div>
      </form>

      {/* Display the list of educations with delete button */}
      {educations && educations.map((edu, index) => (
        <div key={index} className="flex gap-4 items-center mb-4">
          <div className="border p-4 flex-grow">
            <h3 className="text-lg font-semibold">{edu.university}</h3>
            <p>{`${edu.city}, ${edu.country}`}</p>
            <p>{`${edu.startYear} - ${edu.endYear}`}</p>
            <p>{edu.description}</p>
          </div>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => handleDeleteEducation(index)}
          >
            Delete
          </Button>
        </div>
      ))}
    </div>
  );
};

export default EducationForm;
