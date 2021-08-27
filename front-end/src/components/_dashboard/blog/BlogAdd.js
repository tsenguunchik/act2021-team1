import * as Yup from 'yup';
import { makeStyles, createStyles } from '@material-ui/styles';
import { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack5';
import closeFill from '@iconify/icons-eva/close-fill';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import {
  Stack,
  Alert,
  TextField,
  Box,
  Drawer,
  Container,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Autocomplete,
  Divider,
  IconButton
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
import { MIconButton } from '../../@material-extend';
import { login, clearIndicators } from '../../../redux/slices/user';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '70%'
    }
  })
);

export default function BlogAdd({ open, onClose }) {
  const dispatch = useDispatch();
  const { loaded, error } = useSelector((state) => state.user);
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const classes = useStyles();

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    onClose(open);
  };

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required')
  });

  const formik = useFormik({
    initialValues: {
      personal_note: '',
      essay_type: 0,
      mentor: null,
      university: '',
      essay_link: '',
      essay_intro: ''
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      dispatch(login(values));
    }
  });

  useEffect(() => {
    if (loaded && isMountedRef.current) {
      enqueueSnackbar('Login success', {
        variant: 'success',
        action: (key) => (
          <MIconButton size="small" onClick={() => closeSnackbar(key)}>
            <Icon icon={closeFill} />
          </MIconButton>
        )
      });
      setSubmitting(false);
      dispatch(clearIndicators());
    }
  }, [loaded, isMountedRef]);

  useEffect(() => {
    if (!!error && isMountedRef.current) {
      setSubmitting(false);
      setErrors({ afterSubmit: error.message });
    }
  }, [error]);

  const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
    { label: 'The Dark Knight', year: 2008 },
    { label: '12 Angry Men', year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: 'Pulp Fiction', year: 1994 }
  ];

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps, setErrors, setSubmitting } = formik;

  return (
    <Drawer anchor="right" open={open} onClose={toggleDrawer(false)} classes={{ paper: classes.root }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 1, py: 2 }}>
        <Typography variant="subtitle1" sx={{ ml: 1 }}>
          Send us your essay
        </Typography>
        <IconButton onClick={toggleDrawer(false)}>
          <Icon icon={closeFill} width={20} height={20} />
        </IconButton>
      </Stack>
      <Divider />
      <Container maxWidth="sm">
        <Stack my={4}>
          <Box role="presentation">
            <FormikProvider value={formik}>
              <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Stack spacing={3}>
                  {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}

                  <Typography variant="h4" sx={{ mt: 5 }}>
                    Submit essay
                  </Typography>

                  <Stack spacing={3}>
                    <TextField
                      fullWidth
                      type="text"
                      label="Personal note"
                      {...getFieldProps('personal_note')}
                      error={Boolean(touched.personal_note && errors.personal_note)}
                      helperText={touched.personal_note && errors.personal_note}
                    />

                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Essay type</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Essay type"
                        {...getFieldProps('essay_type')}
                      >
                        <MenuItem value={0}>Public</MenuItem>
                        <MenuItem value={1}>Private</MenuItem>
                      </Select>
                    </FormControl>

                    {values.essay_type === 1 && (
                      <FormControl fullWidth>
                        <Autocomplete
                          disablePortal
                          {...getFieldProps('mentor')}
                          options={top100Films}
                          renderInput={(params) => <TextField {...params} label="Mentors" />}
                        />
                      </FormControl>
                    )}

                    <TextField
                      fullWidth
                      type="text"
                      label="University"
                      {...getFieldProps('university')}
                      error={Boolean(touched.university && errors.university)}
                      helperText={touched.university && errors.university}
                    />

                    <TextField
                      fullWidth
                      type="text"
                      label="Google doc link"
                      {...getFieldProps('essay_link')}
                      error={Boolean(touched.essay_link && errors.essay_link)}
                      helperText={touched.essay_link && errors.essay_link}
                    />

                    <TextField
                      fullWidth
                      type="text"
                      label="Essay introduction"
                      {...getFieldProps('essay_intro')}
                      error={Boolean(touched.essay_link && errors.essay_link)}
                      helperText={touched.essay_link && errors.essay_link}
                    />
                  </Stack>
                </Stack>

                <LoadingButton size="large" type="submit" variant="contained" loading={isSubmitting} sx={{ mt: 5 }}>
                  Submit
                </LoadingButton>
              </Form>
            </FormikProvider>
          </Box>
        </Stack>
      </Container>
    </Drawer>
  );
}
