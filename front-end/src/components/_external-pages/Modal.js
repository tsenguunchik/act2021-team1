import * as Yup from 'yup';
import React from 'react';
import Modal from 'react-modal';
import { useFormik, Form, FormikProvider } from 'formik';
import { makeStyles } from '@material-ui/styles';
import { Button, Box, Typography, TextField, Stack, Alert } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#fff',
    // backgroundColor: '#00AB55',
    // backgroundColor: '#007B55',
    borderRadius: 16,
    margin: 'auto',
    borderColor: '#00AB55',
    // border: 20,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    height: '80vh',
    bgcolor: 'background.paper',
    border: '2px solid #00AB55',
    boxShadow: 24,
    p: 4
  },

  modal: {
    width: '100vh',
    height: '100vh',
    overlay: {
      zIndex: 1200
    }
  },

  form: {
    width: '90%',
    height: '600px',
    justifyItems: 'center',
    top: '5vh',
    left: '5vh',
    boxShadow: '3px',
    display: 'flex'
  },

  input: {
    width: '90%',
    height: '40px',
    fontSize: '1rem',
    fontFamily: 'sans-serif',
    borderRadius: '8px',
    borderColor: '#f1f3f4',
    marginLeft: 15,
    marginTop: 5
  },

  button: {
    size: 'large',
    variant: 'contained',
    width: '25%',
    alignItems: 'flex-end',
    marginLeft: '70%',
    marginTop: 20
  },

  text: {
    align: 'center',
    marginLeft: 15,
    marginTop: 10
  },

  labelAsterisk: {
    color: 'red'
  }
});

function MyModal({ isOpen, closeModal }) {
  const classes = useStyles();
  const [pathNumber, setPath] = React.useState('');

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('First name is required'),
    lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last name is required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    essayLink: Yup.string().required('Essay link is required'),
    path: Yup.string().required('Please choose one of the paths')
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      essayLink: '',
      path: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: (data) => {
      console.log(data);
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  const handleChange = (event) => {
    setPath(event.target.value);
  };

  return (
    <Modal className={classes.modal} isOpen={isOpen} onRequestClose={closeModal}>
      <Box className={classes.root}>
        <Button onClick={() => closeModal(false)}>X</Button>
        <Typography variant="h2" sx={{ marginLeft: 10, color: '#00AB55' }}>
          Send us your essay
        </Typography>

        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Stack spacing={3}>
              {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}

              <Stack direction={{ xs: 'column' }} spacing={2} marginLeft="10%" marginRight="10%" marginTop="10px">
                <TextField
                  label="First name"
                  {...getFieldProps('firstName')}
                  error={Boolean(touched.firstName && errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                />

                <TextField
                  fullWidth
                  label="Last name"
                  {...getFieldProps('lastName')}
                  error={Boolean(touched.lastName && errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                />

                <TextField
                  fullWidth
                  autoComplete="email"
                  type="email"
                  label="Email address"
                  {...getFieldProps('email')}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                />

                <TextField
                  fullWidth
                  label="Essay link"
                  {...getFieldProps('essayLink')}
                  error={Boolean(touched.essayLink && errors.essayLink)}
                  helperText={touched.essayLink && errors.essayLink}
                />

                <Select
                  fullWidth
                  labelId="Path"
                  value={pathNumber}
                  onChange={handleChange}
                  {...getFieldProps('path')}
                  error={Boolean(touched.path && errors.path)}
                  helperText={touched.path && errors.path}
                >
                  <MenuItem value={1}>Public</MenuItem>
                  <MenuItem value={2}>Direct</MenuItem>
                </Select>
                <Button variant="contained" size="large" type="submit" loading={isSubmitting}>
                  Submit Now
                </Button>
              </Stack>

              {/* <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                Register
              </LoadingButton> */}
            </Stack>
          </Form>
        </FormikProvider>

        {/* <FormControl className={classes.form} fullWidth onSubmit={handleSubmit(onSubmit)}>
          <Typography className={classes.text}>First name *</Typography>
          <TextField
            fullWidth
            label="Last name"
            // error={Boolean(touched.lastName && errors.lastName)}
            // helperText={touched.lastName && errors.lastName}
          />
          // {/* <input className={classes.input} {...register('firstName', { required: true })} />
          // {errors.firstName?.type === 'required' && <p>First name is required.</p>} 
          <Typography className={classes.text}>Last name *</Typography>
          <input className={classes.input} {...register('lastName', { required: true })} />
          {errors?.lastName?.type === 'required' && 'Last name is required.'}
          <Typography className={classes.text}>Email *</Typography>
          <input className={classes.input} {...register('email')} />
          {errors?.email?.type === 'required' && 'Email is required.'}
          <Typography className={classes.text}>Essay - Google Docs Link *</Typography>
          <input className={classes.input} {...register('essay link')} />
          {errors?.lastName?.type === 'required' && 'Essay link is required.'}
          <Typography className={classes.text}>Path * </Typography>
          <Select className={classes.input} value={pathNumber} onChange={handleChange}>
            <MenuItem value={1}>Public</MenuItem>
            <MenuItem value={2}>Direct</MenuItem>
          </Select>
          {/* <input type="submit" /> */}
      </Box>
    </Modal>
  );
}

export default MyModal;
