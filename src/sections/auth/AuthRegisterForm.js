import { useState } from 'react';
import * as Yup from 'yup';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment, Alert, TextField } from '@mui/material';
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

  const [showPassword, setShowPassword] = useState(false);
  const [guestCode, setGuestCode] = useState(false);

  const RegisterSchema = Yup.object().shape({
    guestCode: Yup.string().required('Código de convite é obrigatório'),
    firstName: Yup.string().required('Nome é obrigatório'),
    lastName: Yup.string().required('Sobrenome é obrigatório'),
    email: Yup.string().email('Email must be a valid email address').required('Email é obrigatório'),
    emailConfirm: Yup.string().oneOf([Yup.ref('email')], 'Email precisa ser igual').required('Confirmação de email é obrigatório'),
    // phoneNumber: phoneNumberFromQuery ? Yup.string() : Yup.string().required('Telefone é obrigatório').min(8),
    password: Yup.string().required('Senha é obrigatória'),
    passwordConfirm: Yup.string().oneOf([Yup.ref('password')], 'Senha precisa ser igual').required('Confirmação de senha é obrigatório')
  });

  const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    emailConfirm: '',
    // phoneNumber: phoneNumberFromQuery || '',
    password: '',
    passwordConfirm: '',
    guestCode: ''
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const onSubmit = async (data) => {
    const phone = data.phoneNumber || phoneNumberFromQuery
    try {
      if (register) {
        await register(data.email, data.password, data.firstName, data.lastName);
        // fbq.event('CompleteRegistration')
      }
    } catch (error) {
      console.error(error);

      reset();

      setError('afterSubmit', {
        ...error,
        message: error.message,
      });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2.5}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

        <RHFTextField name="guestCode" label="Código de convite" />
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name="firstName" label="Nome" />
          <RHFTextField name="lastName" label="Sobrenome" />
        </Stack>

        <RHFTextField name="email" label="Email" />
        <RHFTextField name="emailConfirm" label="Repetir email" />
        {/* {
          phoneNumberFromQuery ? <TextField
          disabled
          value={phoneNumberFromQuery}
          /> : <RHFTextField
            name="phoneNumber" 
            label="Telefone" 
            placeholder="Ex.: 11943128360"
            type="number"
            />
        } */}

        <RHFTextField
          name="password"
          label="Senha"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

<RHFTextField
          name="passwordConfirm"
          label="Repetir Senha"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <LoadingButton
          fullWidth
          // color="inherit"
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting || isSubmitSuccessful}
          // sx={{
          //   bgcolor: 'text.primary',
          //   color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
          //   '&:hover': {
          //     bgcolor: 'text.primary',
          //     color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
          //   },
          // }}
        >
          Criar conta
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
