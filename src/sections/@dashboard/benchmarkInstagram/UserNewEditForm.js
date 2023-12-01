/* eslint-disable no-unused-expressions */
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo, useState, useRef } from 'react';
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
  editingWorkspace: PropTypes.object,
};

export default function BusinessEdit({ editingWorkspace }) {
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

  const [data, setData] = useState({ adLabel: '', productServiceName: '', productServiceDescription: '', keywords: '' });
  const [dataError, setDataError] = useState({ name: null, slug: null, description: null });
  const [submitting, setSubmitting] = useState(false);
  const [newAdsGenerated, setNewAdsGenerated] = useState(null)
  const [generatingTimer, setGeneratingTimer] = useState(0)

  const [seconds, setSeconds] = useState(0);
  const [secRunning, setSecRunning] = useState(false);
  const intervalRef = useRef(null);

  function startSec() {
    if (!secRunning) {
      setSecRunning(true);
      intervalRef.current = setInterval(() => {
        setSeconds((sec) => sec + 1);
      }, 1000);
    }
  }

  function resetSec() {
    setSeconds(0);
  }

  function stopSec() {
    setSecRunning(false);
      resetSec()
      clearInterval(intervalRef.current);
  }
  


  useEffect(() => {
    if (editingWorkspace) {
      setDisplayName(editingWorkspace?.businessId.name)
      setNewBusinessName(editingWorkspace?.businessId.slug)

      setData({ name: editingWorkspace?.businessId.name, slug: editingWorkspace?.businessId.slug, description: editingWorkspace?.businessId.description || '' })
    }
  }, [editingWorkspace]);

  const handleAdGenerator = async () => {
    setSubmitting(true)
    startSec()
    // const timer = setInterval(() => {
    //   setGeneratingTimer(generatingTimer + 1)
    // }, 1000);

    try {
      const responseProccesCreated = await api.post('v1/adgenerator/google', data)
      // const { workspaceSession } = response.data

      // updateWorkspaces(workspaceSession)
      // updateWorkspaces(workspaceSession)

      const fetchResponse = async (adId, delay = 15000) => {
        await new Promise((resolve) => setTimeout(resolve, delay))
        const result = await api.get(`/v1/adgenerator/google/${adId}`)
        if (result.data.ad?.adContent && result.data.ad?.adContent.length > 0) return result.data.ad
         return fetchResponse(adId, 5000)
      }
      const responseAd =  await fetchResponse(responseProccesCreated.data.newAds._id)

      console.log('response.data', responseAd)
      setNewAdsGenerated(responseAd)
      enqueueSnackbar(`${responseAd?.adContent?.length} Anúncios gerados`);
    } catch (error) {
      enqueueSnackbar(error.message && error.message, { variant: 'error' });
      console.error(error);
    }
    // clearInterval(timer)
    stopSec()
    setSubmitting(false)
  };

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
            <Box mb={2}>
          <Card sx={{ p: 3 }}>
          <Box>
            <Box mb={2}>
            <Typography variant='subtitle1'>Rótulo do anúncio</Typography>
            </Box>
                  <TextField
                  fullWidth
                        label="Rótulo do anúncio"
                        value={data.adLabel}
                        color="primary"
                        placeholder="Ex.: Okahub"
                        // error={newBusinessNameError !== null}
                        helperText="Este é um nome interno apenas para você encontrar este conteúdo no histórico de criações. Caso você não informe nenhum nome, iremos escolher um código aleatório."
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={(e) => onChangeAdLabel({ field: 'adLabel', value: e.target.value })}
                      />
                  </Box>

          </Card>
          </Box>

          <Box mb={2}>
          <Card sx={{ p: 3 }}>
          <Box mb={2}>
            <Typography variant='subtitle1'>Dados para gerarmos o anúncio</Typography>
            </Box>
          <Box mb={2}>
                  <TextField
                  fullWidth
                  required
                        label="Nome do produto ou serviço"
                        value={data.productServiceName}
                        color="primary"
                        placeholder="Ex.: Curso de marketing digital"
                        helperText="Seja específico. Insira apenas o nome do seu produto ou serviço."
                        // error={newBusinessNameError !== null}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={(e) => onChangeAdLabel({ field: 'productServiceName', value: e.target.value })}
                      />
                  </Box>

            <Box mb={2}>
                    {/* <FormGroup> */}
                   
                      <TextField
                      fullWidth
                      required
                      multiline
                      rows={6}
                        label="Descrição do produto ou serviço"
                        value={data.productServiceDescription}
                        color="primary"
                        placeholder="Ex.: Um curso de marketing digital para pessoal que querem aumentar a conversão de leads"
                        helperText="Seja objetivo, descreva o seu produto ou serviço."
                        // error={dataError.description !== null}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={(e) => onChangeAdLabel({ field: 'productServiceDescription', value: e.target.value })}
                        // InputProps={{
                        //   startAdornment: <InputAdornment position="start">@</InputAdornment>,
                        // }}
                      />
                    {/* </FormGroup> */}
                  </Box>

                  <Box mb={2}>
            <Typography variant='subtitle1'>Informações adicionais</Typography>
            </Box>
                  <Box mb={2}>
                  <TextField
                  fullWidth
                  required
                        label="Palavras-chaves (keywords, hashtags)"
                        value={data.keywords}
                        color="primary"
                        placeholder="Ex.: funil de venda, leads"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        // error={newBusinessNameError !== null}
                        onChange={(e) => onChangeAdLabel({ field: 'keywords', value: e.target.value })}
                      />
                  </Box>

          </Card>
          </Box>


          <Stack alignItems="flex-end" sx={{ mt: 3 }}>
            {
              submitting && <Stack mb={2} alignItems="flex-end">
              <Typography variant='subtitle1'>Aguarde</Typography>
              <Typography>
                {seconds}
                {' '}
                 segundos ...
                </Typography>
              <Typography variant='caption'>Isso pode demorar 60 segundas</Typography>
              </Stack>
            }
              <LoadingButton onClick={() => handleAdGenerator()} variant="contained" loading={submitting}>
                Gerar anúncio
              </LoadingButton>
            </Stack>
          </> : <>
          <Box m={2}>
            <Typography variant="subtitle1">Geramos {newAdsGenerated?.adContent?.length} novos anúncios. Confira abaixo:</Typography>
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

            <Box>
              <Button variant='outlined' onClick={() => setNewAdsGenerated(null)}>Voltar para o gerador de anúncios</Button>
            </Box>
          </Box>
          </>
        }
        
      </Container>
  );
}
