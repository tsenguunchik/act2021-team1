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
import { submitEssay, clearIndicators } from '../../../redux/slices/essay';
import { getMentors } from '../../../redux/slices/mentor';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '70%'
    }
  })
);

export default function BlogAdd({ open, onClose }) {
  const dispatch = useDispatch();
  const [loadedMentors, setLoadedMentors] = useState(null);
  const { loaded, error } = useSelector((state) => state.essay);
  const { mentors } = useSelector((state) => state.mentor);
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
    personal_note: Yup.string().required('Title is required'),
    university_name: Yup.string().required('University name is required'),
    google_doc_link: Yup.string().required('Essay link is required'),
    essay_intro: Yup.string().required('Essay intro is required')
  });

  const formik = useFormik({
    initialValues: {
      personal_note: '',
      essay_rule: 0,
      mentor: { label: null, id: null },
      university_name: '',
      google_doc_link: '',
      essay_intro: ''
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      let tempValue = values;

      if (values.mentor.label) {
        tempValue = { ...tempValue, mentor_id: values.mentor.id };
      } else {
        tempValue = { ...tempValue, mentor_id: null };
      }
      delete tempValue.mentor;

      dispatch(submitEssay(tempValue));
    }
  });

  useEffect(() => {
    if (loaded && isMountedRef.current) {
      enqueueSnackbar('Essay created successfully', {
        variant: 'success',
        action: (key) => (
          <MIconButton size="small" onClick={() => closeSnackbar(key)}>
            <Icon icon={closeFill} />
          </MIconButton>
        )
      });
      setSubmitting(false);
      onClose(false);
      resetForm();
    }
  }, [loaded, isMountedRef]);

  useEffect(() => {
    if (!!error && isMountedRef.current) {
      setSubmitting(false);
      setErrors({ afterSubmit: error.message });
    }
  }, [error]);

  useEffect(() => {
    dispatch(getMentors());

    return () => dispatch(clearIndicators());
  }, []);

  useEffect(() => {
    if (mentors.length > 0) {
      const topMentors = mentors.map((mentor) => ({
        label: `${mentor.first_name} ${mentor.last_name}`,
        id: mentor.id
      }));

      setLoadedMentors(topMentors);
    }
  }, [mentors]);

  const {
    errors,
    touched,
    values,
    isSubmitting,
    handleSubmit,
    getFieldProps,
    setErrors,
    setSubmitting,
    setFieldValue,
    resetForm
  } = formik;

  return (
    <Drawer anchor="right" open={open} onClose={toggleDrawer(false)} classes={{ paper: classes.root }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 1, py: 2 }}>
        <Typography variant="h6" sx={{ ml: 1 }}>
          {/* Send us your essay */}
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
                      label="Title"
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
                        {...getFieldProps('essay_rule')}
                      >
                        <MenuItem value={0}>Public</MenuItem>
                        <MenuItem value={1}>Private</MenuItem>
                      </Select>
                    </FormControl>

                    {values.essay_rule === 1 && (
                      <FormControl fullWidth>
                        <Autocomplete
                          disablePortal
                          value={values.mentor.label}
                          isOptionEqualToValue={(option, value) => option.label}
                          onChange={(event, newValue) => setFieldValue('mentor', newValue)}
                          id="mentor"
                          options={loadedMentors}
                          renderInput={(params) => <TextField {...params} label="Mentors" />}
                        />
                      </FormControl>
                    )}

                    <TextField
                      fullWidth
                      type="text"
                      label="University"
                      {...getFieldProps('university_name')}
                      error={Boolean(touched.university_name && errors.university_name)}
                      helperText={touched.university_name && errors.university_name}
                    />

                    <TextField
                      fullWidth
                      type="text"
                      label="Google doc link"
                      {...getFieldProps('google_doc_link')}
                      error={Boolean(touched.google_doc_link && errors.google_doc_link)}
                      helperText={touched.google_doc_link && errors.google_doc_link}
                    />

                    <TextField
                      fullWidth
                      multiline
                      maxRows={4}
                      minRows={4}
                      type="text"
                      label="Essay introduction"
                      {...getFieldProps('essay_intro')}
                      error={Boolean(touched.essay_intro && errors.essay_intro)}
                      helperText={touched.essay_intro && errors.essay_intro}
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
