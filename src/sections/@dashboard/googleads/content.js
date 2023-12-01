/* eslint-disable no-unused-expressions */
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
import { Box, Card, Grid, Container, Stack, Switch, Typography, FormControlLabel, TextField, FormGroup, IconButton, Button } from '@mui/material';
// utils
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
// import { fData } from '../../../utils/formatNumber';
import api from '../../../utils/axios';
import slugify from '../../../utils/slugify';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// _mock
// import { countries } from '../../../_mock';
// components
// import Label from '../../../components/Label';
import FormProvider, { RHFSelect, RHFSwitch, RHFTextField, RHFUploadAvatar } from '../../../components/hook-form';
import { useAuthContext } from '../../../auth/useAuthContext'
import Markdown from '../../../components/markdown'
import useCopyToClipboard from '../../../hooks/useCopyToClipboard'

// ----------------------------------------------------------------------

BusinessEdit.propTypes = {
  adId: PropTypes.string,
};

export default function BusinessEdit({ adId }) {
  const { push } = useRouter();
  const { updateWorkspaces, switchWorkspace } = useAuthContext()
  const { enqueueSnackbar } = useSnackbar();
  const { copy } = useCopyToClipboard();

  const [newBusinessName, setNewBusinessName] = useState('');
  const [newBusinessNameError, setNewBusinessNameError] = useState(null);

  const [displayName, setDisplayName] = useState('');
  const [displayNameError, setDisplayNameError] = useState(null);

  // const [description, setDescription] = useState('');
  // const [descriptionError, setDescriptionError] = useState(null);

  const [data, setData] = useState({ adLabel: '', productServiceName: '', productServiceDescription: '', adOccasion: '', adPromotion: '' });
  const [dataError, setDataError] = useState({ name: null, slug: null, description: null, loadingError: null });
  const [submitting, setSubmitting] = useState(false);
  const [newAdsGenerated, setNewAdsGenerated] = useState(null)

 

  useEffect(() => {
    async function fetchData() {
      if (adId) {
        try {
          const response = await api.get(`/v1/adgenerator/google/${adId}`)
          // const { workspaceSession } = response.data
    
          // updateWorkspaces(workspaceSession)
          // updateWorkspaces(workspaceSession)
    
          console.log('response.data', response.data.ad)
          setNewAdsGenerated(response.data.ad) 
          if (!response.data.ad) setDataError({ ...dataError, loadingError: 'Anúncio não encontrado. Tente novamente!' })
        } catch (error) {
          setDataError({ ...dataError, loadingError: 'Anúncio não encontrado. Tente novamente!' })
          console.error(error);
        }
      }
    }
    fetchData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adId]);

 

  const onChangeAdLabel = ({ field, value }) => {
    // if (adLabel.length > 60) return;
    setData({
      ...data,
      [field]: value
    })
  };

  const handleCopyLink = (adString) => {
    const hasCopied = copy(adString)
    if (hasCopied) {
      enqueueSnackbar('Anúncio copiado')
    }
    if (!hasCopied) {
      enqueueSnackbar('Erro ao copiar link', { variant: 'error'})
    }
  }


  return (

      <Container
      disableGutters
      maxWidth='sm'
      >
        {
          !newAdsGenerated ? <>
          {
            dataError?.loadingError ? <Typography>{dataError?.loadingError}</Typography> : <Typography>Carregando</Typography>
          }

           </> : <>
          <Box m={2}>
            <Typography variant="subtitle1"> Identificador: {newAdsGenerated?.adName}</Typography>
            <Typography variant="subtitle1"> Total: {newAdsGenerated?.adContent?.length} anúncios</Typography>
          </Box>
          <Box>
          {
          newAdsGenerated?.adContent?.map(content => <Box key={content} mb={2}>
            <Card sx={{ p: 3 }}>
              <Box>
              <Box mb={2}>
                  {
                    content.titles.map((title, idx) => <Markdown key={title}
                    children={`<b>Título ${idx + 1}: </b> ${title}`}
                    // sx={{
                    //   px: { md: 5 },
                    // }}
                  />)
                  }
                  <Markdown
                    children={`<b>Descrição:</b> ${content.description}`}
                    // sx={{
                    //   px: { md: 5 },
                    // }}
                  />
                </Box>        
                <Box mt={2}>
                  <Button
                    onClick={() => handleCopyLink(`Ideia de design: ${content.image}\n\nTítulo: ${content.title}\n\nTexto principal: ${content.text}`)}
                    variant='contained'
                    startIcon={<ContentCopyIcon />}
                  >
                    Copiar anúncio
                  </Button>
                </Box>
              </Box>
            </Card>
          </Box>)
        }
          </Box>
          </>
        }
        
      </Container>
  );
}
