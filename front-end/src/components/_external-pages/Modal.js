import { BoxZoomHandler } from 'mapbox-gl';
import React from 'react';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import { styled } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import { Button, Box, Container, Typography, TextField, Stack } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Form from './Form';

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
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };

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
        <FormControl className={classes.form} fullWidth onSubmit={handleSubmit(onSubmit)}>
          <Typography className={classes.text}>First name *</Typography>
          <TextField
            fullWidth
            label="Last name"
            // error={Boolean(touched.lastName && errors.lastName)}
            // helperText={touched.lastName && errors.lastName}
          />
          {/* <input className={classes.input} {...register('firstName', { required: true })} />
          {errors.firstName?.type === 'required' && <p>First name is required.</p>} */}
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
          <Button className={classes.button} variant="contained" size="large" onClick={() => {}}>
            Submit Now
          </Button>
        </FormControl>
      </Box>
    </Modal>
  );
}

export default MyModal;
