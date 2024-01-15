import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

const ContactMe = () => {
  const [isSubmitting, setSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      message: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      setSubmitting(true);

      // Replace 'your-formspree-endpoint' with your Formspree endpoint
      const formSpreeEndpoint = "https://formspree.io/f/xyybonpy";

      try {
        const response = await fetch(formSpreeEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          alert("Message sent successfully!");
          formik.resetForm();
        } else {
          alert("Error sending message. Please try again later.");
        }
      } catch (error) {
        console.error("Error sending message:", error);
        alert("Error sending message. Please try again later.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        fullWidth
        id="name"
        name="name"
        label="Name"
        variant="outlined"
        value={formik.values.name}
        onChange={formik.handleChange}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
        margin="normal"
      />
      <TextField
        fullWidth
        id="email"
        name="email"
        label="Email"
        variant="outlined"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
        margin="normal"
      />
      <TextField
        fullWidth
        id="message"
        name="message"
        label="Message"
        variant="outlined"
        multiline
        rows={4}
        value={formik.values.message}
        onChange={formik.handleChange}
        error={formik.touched.message && Boolean(formik.errors.message)}
        helperText={formik.touched.message && formik.errors.message}
        margin="normal"
      />
      <Box mt={2}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isSubmitting}
        >
          Submit
        </Button>
      </Box>
    </form>
  );
};

export default ContactMe;
