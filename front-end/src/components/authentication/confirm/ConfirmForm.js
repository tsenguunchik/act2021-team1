import { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack5';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import closeFill from '@iconify/icons-eva/close-fill';
import { Link, Stack, Alert } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
import { MIconButton } from '../../@material-extend';
import PinInput from './PinInput';
import { getConfirm, clearIndicators, getResend } from '../../../redux/slices/user';

export default function ConfirmForm() {
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { myProfile, loaded, error, resendSuccess } = useSelector((state) => state.user);
  const [confirmationCode, setConfirmationCode] = useState('');

  const formik = useFormik({
    initialValues: {
      email: myProfile?.email
    },
    onSubmit: (values) => {
      dispatch(
        getConfirm({
          email: values.email,
          confirmation_code: confirmationCode
        })
      );
    }
  });

  const resendCode = () => {
    dispatch(clearIndicators());
    dispatch(getResend({ email: myProfile?.email }));
  };

  const { errors, isSubmitting, handleSubmit, resetForm, setSubmitting, setErrors } = formik;

  useEffect(() => {
    if (resendSuccess) {
      enqueueSnackbar('Confirmation code sent successfully.', {
        variant: 'success',
        action: (key) => (
          <MIconButton size="small" onClick={() => closeSnackbar(key)}>
            <Icon icon={closeFill} />
          </MIconButton>
        )
      });
    }
  }, [resendSuccess]);

  useEffect(() => {
    if (loaded && isMountedRef.current) {
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
      dispatch(clearIndicators());
      // navigate('/auth/confirm');
    }
  }, [loaded, isMountedRef]);

  useEffect(() => {
    if (!!error && isMountedRef.current) {
      resetForm();
      setSubmitting(false);
      setErrors({ afterSubmit: error.message });
    }
  }, [error]);

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3} sx={{ mb: 4 }} alignItems="center">
          {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}

          <PinInput error={false} value={confirmationCode} onChange={(value) => setConfirmationCode(value)} />
        </Stack>

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Verify
        </LoadingButton>

        <Stack direction="row" alignItems="center" justifyContent="center" sx={{ my: 2 }}>
          <Link variant="subtitle2" style={{ cursor: 'pointer' }} onClick={() => resendCode()}>
            Resend code
          </Link>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
