import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSnackbar } from 'notistack';
// next
import { useRouter } from 'next/router';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Switch, Typography, FormControlLabel, Button } from '@mui/material';
// utils
import { fData } from '../../../utils/formatNumber';
import api from '../../../utils/axios';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// _mock
import { countries } from '../../../_mock';
// components
import Label from '../../../components/Label';
import { FormProvider, RHFSelect, RHFSwitch, RHFTextField, RHFUploadAvatar } from '../../../components/hook-form';
import useAuth from '../../../hooks/useAuth'

// ----------------------------------------------------------------------

UserRemoveWorkSpace.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object,
};

export default function UserRemoveWorkSpace({ isEdit = false, currentUser, editingWorkspace }) {
  const { push } = useRouter();
  const { updateWorkspaces } = useAuth()
  const { enqueueSnackbar } = useSnackbar();
  const [isDeleting, setIsDeleting] = useState(false)
  const [workspaceDetail, setWorkspaceDetail] = useState({})

  const NewUserSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email(),
    // role: Yup.string().required('Role Number is required'),
    // company: Yup.string().required('Nome do negócio é obrigatório'),
    // name: Yup.string().required('Name is required'),
    // phoneNumber: Yup.string().required('Phone number is required'),
    // address: Yup.string().required('Address is required'),
    // country: Yup.string().required('country is required'),
    // state: Yup.string().required('State is required'),
    // city: Yup.string().required('City is required'),
    // avatarUrl: Yup.mixed().test('required', 'Avatar is required', (value) => value !== ''),
  });

  const defaultValues = useMemo(
    () => ({
      // company: currentUser?.company || '',
      email: currentUser?.email || '',
      // role: currentUser?.role || '',
      // whatsapp: currentUser?.whatsapp || '',
      // phoneNumber: currentUser?.phoneNumber || '',
      // name: currentUser?.name || '',
      // address: currentUser?.address || '',
      // country: currentUser?.country || '',
      // state: currentUser?.state || '',
      // city: currentUser?.city || '',
      // zipCode: currentUser?.zipCode || '',
      // avatarUrl: currentUser?.avatarUrl || '',
      // isVerified: currentUser?.isVerified || true,
      // status: currentUser?.status,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentUser]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const fetchData = async () => {
    try {
      const response = await api.get(`v1/workspace/${editingWorkspace}`)
      setWorkspaceDetail(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (isEdit && editingWorkspace) {
      fetchData()
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentUser]);

  const deleteWorkspace = async (data) => {
    // console.log('onSubmit add user', data)
    try {
      const response = await api.delete(`v1/workspace/${editingWorkspace}`)
      const { workspaceSession } = response.data

      updateWorkspaces(workspaceSession)
      reset();
      enqueueSnackbar(isEdit ? 'Edição concluída' : 'Usuários adicionado ao negócio');
      push(PATH_DASHBOARD.user.list);
    } catch (error) {
      enqueueSnackbar(error.message && error.message, { variant: 'error' });
      console.error(error);
    }
  };



  return (
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
            <Typography m={2} variant="h6">Remover acesso do usuário</Typography>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: 'grid',
                columnGap: 1,
                rowGap: 3,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
              }}
            >
                
                <Typography>- Nome: {workspaceDetail?.userId?.firstName} {workspaceDetail?.userId?.lastName}</Typography>
                <Typography>- Email: {workspaceDetail?.userId?.email}</Typography>
                <Typography>- Permissão: {workspaceDetail?.roles?.join(', ')}</Typography>

            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isDeleting} onClick={() => deleteWorkspace()}>
                {!isEdit ? 'Adicionar Usuário' : 'Remover usuário'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
  );
}
