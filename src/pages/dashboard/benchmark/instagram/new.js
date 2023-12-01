// next
import Head from 'next/head';
// @mui
import { Container, Box, Button, Typography, TextField, InputAdornment, Stack, Divider } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ArrowBack } from '@mui/icons-material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// _mock_

// layouts
import DashboardLayout from '../../../../layouts/dashboard';
// components
import { useSettingsContext } from '../../../../components/settings';
import api from '../../../../utils/axios'

import { _userCards } from '../../../../_mock/arrays';
import { UserCard } from '../../../../sections/@dashboard/user/cards';
// sections

// ----------------------------------------------------------------------

UserCardsPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function UserCardsPage() {
  const { themeStretch } = useSettingsContext();
  const [showPreview, setShowPreview] = useState(false)
  const [showDeletarSection, setShowDeletarSection] = useState(null)
  const [updatingComponent, setUpdatingComponent] = useState({
    verifyProfile: false,
    addProfile: false,
    deleteProfile: false
  })
  const [profileData, setProfileData] = useState({})
  const [username, setUsername] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [profiles, setProfiles] = useState([])

  const getProfile = async () => {
    setUpdatingComponent({
      ...updatingComponent,
      verifyProfile: true
    })
    try {
      const response = await api.get(`/v1/benchmark/instagram/ig-profile/${username}`)
      console.log('response ads', response.data)
      setProfileData(response.data)
      setShowPreview(true)
    } catch (error) {
      if(error.message) setErrorMessage(error.message)
      console.log(error)
    }
    setUpdatingComponent({
      ...updatingComponent,
      verifyProfile: false
    })
  }
  const createProfile = async () => {
    setUpdatingComponent({
      ...updatingComponent,
      addProfile: true
    })
    try {
      const response = await api.post(`/v1/benchmark/instagram/ig-profile`, profileData)
      console.log('response.data', response.data)
      setProfileData({})
      setShowPreview(false)
      setProfiles([response.data, ...profiles])
    } catch (error) {
      if(error.message) setErrorMessage(error.message)
      console.log(error)
    }
    setUpdatingComponent({
      ...updatingComponent,
      addProfile: false
    })
  }
  const deleteProfile = async (profileAccount) => {
    setUpdatingComponent({
      ...updatingComponent,
      deleteProfile: true
    })
    try {
      await api.delete(`/v1/benchmark/instagram/${profileAccount._id}`)
      setProfiles(profiles.filter(item => item._id !== profileAccount._id))
    } catch (error) {
      if(error.message) setErrorMessage(error.message)
      console.log(error)
    }
    setUpdatingComponent({
      ...updatingComponent,
      deleteProfile: false
    })
  }

  const handleUsername = (value) => {
    if(errorMessage) setErrorMessage('')
    setUsername(value)
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const responseRanking = await api.get(`v1/benchmark/instagram`)
        console.log('responseRanking.data', responseRanking.data)
        setProfiles(responseRanking.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  },[])

  return (
    <>
      <Head>
        <title> Benchmark | Okahub</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <Box mb={2}>

        <Typography variant='h3'>Benchmark Instagram</Typography>
        <Button href={PATH_DASHBOARD.benchmark.instagram.rank} startIcon={<ArrowBackIcon />}>Ranking</Button>
        </Box>

        <Box m={2}>
          <Typography>Adicione 3 ou mais contas de concorrentes para criar um ranking. Adicione também a sua própria conta para comparar.</Typography>
        </Box>

        <Box
          m={2}
          gap={3}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          }}
        >
          <Card sx={{ maxWidth: 345 }}>
            { showPreview ? <>
              <CardHeader
               avatar={
                 <Avatar alt={profileData.username} src={profileData.profile_picture_url} aria-label="recipe" />
               }
              //  action={
              //    <IconButton aria-label="settings">
              //      <MoreVertIcon />
              //    </IconButton>
              //  }
               title={profileData.name}
               subheader={`@${profileData.username}`}
             />

<Box m={2}>

             <Divider />
</Box>

              <Box m={2}>

                  <Box m={2}>
                    <Typography variant='subtitle2'>Adicionar esta conta?</Typography>
                    {/* <Typography variant='caption'>Clique em confirmar para adicionar está conta, ou cancelar para trocar</Typography> */}

                  </Box>

                          
              <Stack
              spacing={2}
              direction="row"
              alignItems="flex-end"
              >
              <LoadingButton fullWidth variant='outlined' color="error" onClick={() => setShowPreview(false)} >Cancelar</LoadingButton>

              <LoadingButton fullWidth variant='contained' loading={updatingComponent.addProfile} onClick={() => createProfile()}>Adicionar</LoadingButton>

              </Stack>
              </Box>

            </> :  <Box m={2}>
            <Typography variant='h5' mb={2}>Adicionar Instagram</Typography>
              <Box display='flex' flexDirection='column' >
                <TextField
                // fullWidth
                value={username}
                onChange={(e) => handleUsername(e.target.value)}
                error={!!errorMessage}
                  InputProps={{
                    startAdornment: <InputAdornment position='start'>@</InputAdornment>
                  }} helperText={errorMessage || 'Adicione o @perfil do Instagram'}
                />
                <Box m={2}>

                <LoadingButton fullWidth disabled={!username} variant='contained' loading={updatingComponent.verifyProfile} onClick={() => getProfile()}>Verificar perfil</LoadingButton>
                </Box>

              </Box>
            </Box>
            }
           </Card>

           {profiles.map((profile) => (
            <Card sx={{ height: '160px'}}>
              <CardHeader
               avatar={
                 <Avatar alt={profile.username} src={profile.profileDetail.profile_picture_url} aria-label="recipe" />
               }
              //  action={
              //    <IconButton aria-label="settings">
              //      <MoreVertIcon />
              //    </IconButton>
              //  }
               title={profile.profileDetail.name}
               subheader={`@${profile.username}`}
             />
             {console.log('profile.username', profile.username)}
             {console.log('profile.profileDetail.profile_picture_url', profile.profileDetail.profile_picture_url)}
             {
              showDeletarSection !== profile.username ? <Box m={2}>
              <Button fullWidth variant='outlined' onClick={() => setShowDeletarSection(profile.username)}>Editar conta</Button>
          </Box> : <Box m={2}>
          <Stack
              spacing={2}
              direction="row"
              alignItems="flex-end"
              >
              <LoadingButton fullWidth variant='outlined' color="error" loading={updatingComponent.deleteProfile} onClick={() => deleteProfile(profile)} >Deletar Agora</LoadingButton>

              <LoadingButton fullWidth variant='contained' onClick={() => setShowDeletarSection(null)}>Cancelar</LoadingButton>

              </Stack>
            </Box>
             }
           
            </Card>
          ))}
        </Box>
      </Container>
    </>
  );
}
