import * as Yup from 'yup';
import { useState } from 'react';
import { useSnackbar } from 'notistack5';
import { Link as RouterLink } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import closeFill from '@iconify/icons-eva/close-fill';
// material
import { Link, Stack, Alert, TextField } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
// routes
import { PATH_AUTH } from '../../../routes/paths';
// hooks
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
//
import { MIconButton } from '../../@material-extend';

// ----------------------------------------------------------------------

export default function ConfirmForm() {
  const { confirm } = useAuth();
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const ConfirmSchema = Yup.object().shape({
    confirmation_code: Yup.string()
      .min(6, 'At least 6 character')
      .max(6, 'Max value exceeded')
      .required('Confirmation number is required')
  });

  const formik = useFormik({
    initialValues: {
      confirmation_code: '',
      email: ''
    },
    validationSchema: ConfirmSchema,
    onSubmit: async (values, { setErrors, setSubmitting, resetForm }) => {
      try {
        await confirm(values.email, values.confirmation_code);
        enqueueSnackbar('Your account has been verified.', {
          variant: 'success',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          )
        });
        if (isMountedRef.current) {
          setSubmitting(false);
        }
      } catch (error) {
        console.error(error);
        resetForm();
        if (isMountedRef.current) {
          setSubmitting(false);
          setErrors({ afterSubmit: error.message });
        }
      }
    }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3} sx={{ mb: 4 }}>
          {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}

          <TextField
            fullWidth
            autoComplete="off"
            type="number"
            label="Confirmation numbers"
            {...getFieldProps('confirmation_code')}
            error={Boolean(touched.confirmation_code && errors.confirmation_code)}
            helperText={touched.confirmation_code && errors.confirmation_code}
          />
        </Stack>

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Verify
        </LoadingButton>

        <Stack direction="row" alignItems="center" justifyContent="center" sx={{ my: 2 }}>
          <Link component={RouterLink} variant="subtitle2" to={PATH_AUTH.resetPassword}>
            Resend code
          </Link>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
