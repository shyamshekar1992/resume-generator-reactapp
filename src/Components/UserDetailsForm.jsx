import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  doc,
  setDoc,
  getFirestore,
  getDoc,
} from 'firebase/firestore';
import {
  getAuth,
} from 'firebase/auth';
import {
  initializeApp,
} from 'firebase/app';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const firebaseConfig = {
  apiKey: "AIzaSyAXtFQVA5Q7K3F_IeqFrR_-wDdqj4KsLFY",
  authDomain: "shyam-gmbh.firebaseapp.com",
  projectId: "shyam-gmbh",
  storageBucket: "shyam-gmbh.appspot.com",
  messagingSenderId: "1096712939317",
  appId: "1:1096712939317:web:76f6238d5b6c418802ce7c",
  measurementId: "G-NVH7E83Z94"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

const UserDetailsForm = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  const [profilePicture, setProfilePicture] = useState(null);

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      streetAddress: '',
      cityName: '',
      country: '',
      email: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('Required'),
      lastName: Yup.string().required('Required'),
      phoneNumber: Yup.string().required('Required'),
      streetAddress: Yup.string().required('Required'),
      cityName: Yup.string().required('Required'),
      country: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        // Upload profile picture to Firebase Storage
        const profilePictureRef = ref(storage, `profilePictures/${user.uid}`);
        await uploadBytes(profilePictureRef, profilePicture);

        // Get download URL
        const profilePictureUrl = await getDownloadURL(profilePictureRef);

        const userDetails = {
            userId: user.uid,
            email: values.email,
            profilePicture: profilePictureUrl,
            firstName: values.firstName,
            lastName: values.lastName,
            phoneNumber: values.phoneNumber,
            streetAddress: values.streetAddress,
            cityName: values.cityName,
            country: values.country,
          };
          

        // Add or update the user details in Firestore
        const userDocRef = doc(db, 'user_data', user.uid);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          await setDoc(userDocRef, userDetails, { merge: true });
          alert('User data updated successfully');
        } else {
          await setDoc(userDocRef, userDetails);
        }

      } catch (error) {
        console.error('Error updating user data:', error);
      }
    },
  });

  const handleProfilePictureChange = (e) => {
    // Handle the selected profile picture file
    setProfilePicture(e.target.files[0]);
  };

  return (
    <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto my-4">
      <TextField
        id="firstName"
        label="First Name"
        variant="outlined"
        fullWidth
        margin="normal"
        {...formik.getFieldProps('firstName')}
        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
        helperText={formik.touched.firstName && formik.errors.firstName}
      />

      <TextField
        id="lastName"
        label="Last Name"
        variant="outlined"
        fullWidth
        margin="normal"
        {...formik.getFieldProps('lastName')}
        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
        helperText={formik.touched.lastName && formik.errors.lastName}
      />

      <TextField
        id="phoneNumber"
        label="Phone Number"
        variant="outlined"
        fullWidth
        margin="normal"
        {...formik.getFieldProps('phoneNumber')}
        error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
        helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
      />

      <TextField
        id="streetAddress"
        label="Street Address"
        variant="outlined"
        fullWidth
        margin="normal"
        {...formik.getFieldProps('streetAddress')}
        error={formik.touched.streetAddress && Boolean(formik.errors.streetAddress)}
        helperText={formik.touched.streetAddress && formik.errors.streetAddress}
      />

      <TextField
        id="cityName"
        label="City Name"
        variant="outlined"
        fullWidth
        margin="normal"
        {...formik.getFieldProps('cityName')}
        error={formik.touched.cityName && Boolean(formik.errors.cityName)}
        helperText={formik.touched.cityName && formik.errors.cityName}
      />

      <TextField
        id="country"
        label="Country"
        variant="outlined"
        fullWidth
        margin="normal"
        {...formik.getFieldProps('country')}
        error={formik.touched.country && Boolean(formik.errors.country)}
        helperText={formik.touched.country && formik.errors.country}
      />

      <TextField
        id="email"
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        {...formik.getFieldProps('email')}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />

      <h1>Choose your profile</h1>
      <input
        type="file"
        accept="image/*"
        onChange={handleProfilePictureChange}
      />

      <Button type="submit" variant="contained" color="primary" fullWidth>
        Submit
      </Button>
    </form>
  );
};

export default UserDetailsForm;
