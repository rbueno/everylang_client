import { useState } from 'react';
import * as Yup from 'yup';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment, Alert, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import PropTypes from 'prop-types'
// auth
import { useAuthContext } from '../../auth/useAuthContext';
// components
import Iconify from '../../components/iconify';
import FormProvider, { RHFTextField } from '../../components/hook-form';
import * as fbq from '../../lib/fpixel'


// ----------------------------------------------------------------------

AuthRegisterForm.propTypes = {
  phoneNumberFromQuery: PropTypes.string
}
export default function AuthRegisterForm({ phoneNumberFromQuery }) {
  const { register } = useAuthContext();

  const [submitGuest, setSubmitGuest] = useState(false);


  const onSubmit = async () => {
    setSubmitGuest(true)
    try {
      await register(null, null, null, null, null, null, true);
      fbq.event('CompleteRegistration')
      
    } catch (error) {
      console.error(error);
    }
    setSubmitGuest(false)
  };

  return (
    <Stack spacing={2.5}>
        <Typography>Teste grátis sem precisar criar uma conta</Typography>
        <LoadingButton
          fullWidth
          // color="inherit"
          size="large"
          type="submit"
          variant="contained"
          loading={submitGuest}
          onClick={() => onSubmit()}
          // sx={{
          //   bgcolor: 'text.primary',
          //   color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
          //   '&:hover': {
          //     bgcolor: 'text.primary',
          //     color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
          //   },
          // }}
        >
          Entrar como visitante
        </LoadingButton>
      </Stack>
  );
}
