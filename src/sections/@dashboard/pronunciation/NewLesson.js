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
import { Divider, Select, FormControl, MenuItem, InputLabel, Box, Card, Grid, Container, Stack, Switch, Typography, FormControlLabel, TextField, FormGroup, IconButton, Button } from '@mui/material';
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

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

// ----------------------------------------------------------------------

BusinessEdit.propTypes = {
  editingWorkspace: PropTypes.object,
  lessonId: PropTypes.string,
  isEdit: PropTypes.bool,
};

export default function BusinessEdit({ editingWorkspace, lessonId, isEdit }) {
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

  const [data, setData] = useState({ internalLessonName: '', lessonName: '', lessonDescription: '', lessonCreator: '', languageLevel: '0', learningLanguage: '0', lessonType: 'pronunciation' });
  const [dataError, setDataError] = useState({ name: null, slug: null, description: null });
  const [submitting, setSubmitting] = useState(false);
  const [newAdsGenerated, setNewAdsGenerated] = useState(null)
  const [generatingTimer, setGeneratingTimer] = useState(0)
  const [activeStep, setActiveStep] = useState(0);

  const [seconds, setSeconds] = useState(0);
  const [secRunning, setSecRunning] = useState(false);
  const intervalRef = useRef(null);
  const [level, setLevel] = useState('0');
  const [language, setLanguage] = useState('0');

  const steps = ['Informações internas', 'Informações públicas', 'Revisar']

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  
  const handleChangeLevel = (event) => {
    setLevel(event.target.value);
  };
  const handleChangeLanguage = (event) => {
    setLanguage(event.target.value);
  };

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
    if (isEdit) {
      async function fetData() {
        try {

          const { data } = await api.get(`v1/everylang/lesson?lessonId=${lessonId}`)
          console.log('get lesson', data)
          
          const initialValue = { 
            internalLessonName: data.lesson.internalTitle, 
            lessonName: data.lesson.title, 
            lessonDescription: data.lesson.description, 
            lessonCreator: data.lesson.creator, 
            languageLevel: data.lesson.languageLevel, 
            learningLanguage: data.lesson.learningLanguage, 
            lessonType: data.lesson.type 
          }
          
    
          setData(initialValue)
          setLevel(data.lesson.languageLevel)
          setLanguage(data.lesson.learningLanguage)
    
          // eslint-disable-next-line consistent-return
          // enqueueSnackbar(`lição criada`);
          setSubmitting(false)
          // redirect
    
        
        } catch (error) {
          enqueueSnackbar(error.message && error.message, { variant: 'error' });
          console.error(error);
        }
      }
      fetData()
    }
  }, []);

  const handleAdGenerator = async () => {
    setSubmitting(true)

    const payload = {...data, languageLevel: level, learningLanguage: language, lessonType: 'pronunciation'}
    try {


      console.log('payload', payload)
      const { data } = await api.post('v1/everylang/lesson', payload)
      

      // eslint-disable-next-line consistent-return
      enqueueSnackbar(`lição criada`);
      setSubmitting(false)
      // redirect
      push(PATH_DASHBOARD.lessonPronunciation.content(data.lesson._id));
    
    } catch (error) {
      enqueueSnackbar(error.message && error.message, { variant: 'error' });
      console.error(error);
    }
    // clearInterval(timer)
  
    setSubmitting(false)
  };
  const handleUpdateLesson = async () => {
    setSubmitting(true)

    const payload = {...data, lessonId, languageLevel: level, learningLanguage: language, lessonType: 'pronunciation'}
    try {


      console.log('payload', payload)
      const { data } = await api.put(`v1/everylang/lesson`, payload)
      console.log('updated', data)
      

      // eslint-disable-next-line consistent-return
      enqueueSnackbar(`lição criada`);
      setSubmitting(false)
      // redirect

      push(PATH_DASHBOARD.lessonPronunciation.content(lessonId));
    } catch (error) {
      enqueueSnackbar(error.message && error.message, { variant: 'error' });
      console.error(error);
    }
    // clearInterval(timer)
  
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
        {/* <HorizontalLabelPositionBelowStepper getStepContent={step}/> */}
        <Box>
                <Stepper activeStep={activeStep} alternativeLabel>
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
        </Box>

        {
          activeStep === 0 && <>
          <Box >
          <Card>
          <Box>
            <Box marginBottom={4}>
            <Typography >Informações internas ficam visíveis apenas para você. O aluno não terá acesso à essas informações.</Typography>
            {/* <Typography variant='caption'>Informações internas ficam visíveis apenas para você. O aluno não terá acesso à essas informações.</Typography> */}
            </Box>
                  <TextField
                  fullWidth
                        label="Título da lição (opcional)"
                        value={data.internalLessonName}
                        color="primary"
                        placeholder="Ex.: Palavras com th"
                        // error={newBusinessNameError !== null}
                        helperText="Caso você não informe nenhum título, iremos escolher um código aleatório."
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={(e) => onChangeAdLabel({ field: 'internalLessonName', value: e.target.value })}
                      />
                  </Box>

                  <Box marginTop={2}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Nível (obrigatório)</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={level}
                          label="Nível (obrigatório)"
                          error={level === '0'}
                          onChange={handleChangeLevel}
                        >
                          <MenuItem value='beginner'>Iniciante</MenuItem>
                          <MenuItem value='elementary'>Básico</MenuItem>
                          <MenuItem value='intermediate'>Intermediário</MenuItem>
                          <MenuItem value='advanced'>Avançado</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  <Box marginTop={2}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Idioma (obrigatório)</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={language}
                          error={language === '0'}
                          label="Idioma (obrigatório)"
                          onChange={handleChangeLanguage}
                        >
                          <MenuItem value='english'>Inglês</MenuItem>
                          <MenuItem value='french'>Francês</MenuItem>
                          <MenuItem value='german'>Alemão</MenuItem>
                          <MenuItem value='spanish'>Espanhol</MenuItem>
                          <MenuItem value='korean'>Coreano</MenuItem>
                          <MenuItem value='mandarin'>Chinês (Mandarim)</MenuItem>
                          <MenuItem value='japonese'>Japonês</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
          </Card>
          </Box>
          </>
        }

        {
          activeStep === 1 && <>
            <Box>
          <Card >
          <Box marginBottom={4}>
            <Typography >Informações públicas ficam visíveis para o aluno que tiver acesso a esta lição</Typography>
            <Typography variant='p'>Estas são apenas informações de capa, você irá criar os exercícios no próximo passo</Typography>
            </Box>
          <Box mb={2}>
                  <TextField
                  fullWidth
                  required
                        label="Título da lição (obrigatório)"
                        value={data.lessonName}
                        color="primary"
                        placeholder="Ex.: Domine a pronúncia de palavras com TH"
                        // helperText="Seja específico. Insira apenas o nome do seu produto ou serviço."
                        // error={newBusinessNameError !== null}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={(e) => onChangeAdLabel({ field: 'lessonName', value: e.target.value })}
                      />
                  </Box>
          <Box mb={2}>
                  <TextField
                  fullWidth
                  required
                        label="Criado por (obrigatório)"
                        value={data.lessonCreator}
                        color="primary"
                        placeholder="Ex.: Professor Alexandre, Escola Smart Learning"
                        // helperText="O nome do autor dessa lição."
                        // error={newBusinessNameError !== null}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={(e) => onChangeAdLabel({ field: 'lessonCreator', value: e.target.value })}
                      />
                  </Box>

            <Box mb={2}>
                      <TextField
                      fullWidth
                      required
                      multiline
                      rows={6}
                        label="Descrição da lição (obrigatório)"
                        value={data.lessonDescription}
                        color="primary"
                        placeholder="Ex.: Com estes exercícios você nunca mais irá errar a pronúncia de palavras com TH"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={(e) => onChangeAdLabel({ field: 'lessonDescription', value: e.target.value })}
                      />
                  </Box>
          </Card>
          </Box>
          </>
        }

        {
          activeStep === 2 && <>
          <Box marginBottom={2}>
                      <Typography variant="h6">Informação interna</Typography>

          </Box>
          <Box display='flex' flexDirection='column'>
                    <Box display='flex' flexDirection='row' alignItems='center'>
                      <Typography variant="subtitle2">- Título interno:</Typography>
                      <Typography sx={{ marginLeft: 1}} variant="caption">{data.internalLessonName}</Typography>
                    </Box>
                    <Box display='flex' flexDirection='row' alignItems='center'>
                      <Typography variant="subtitle2">- Idioma:</Typography>
                      <Typography sx={{ marginLeft: 1}} variant="caption">{language}</Typography>
                    </Box>
                    <Box display='flex' flexDirection='row' alignItems='center'>
                      <Typography variant="subtitle2">- Proficiência:</Typography>
                      <Typography sx={{ marginLeft: 1}} variant="caption">{level}</Typography>
                    </Box>
                    <Divider sx={{ margin: 2 }} />

                    <Box marginBottom={2}>
                      <Typography variant="h6">Informação pública</Typography>

                   </Box>
                    <Box display='flex' flexDirection='row' alignItems='center'>
                      <Typography variant="subtitle2">- Título público:</Typography>

                      




                      <Typography sx={{ marginLeft: 1}} variant="caption">{data.lessonName}</Typography>
                    </Box>
                    <Box display='flex' flexDirection='row' alignItems='center'>
                      <Typography variant="subtitle2">- Criado por:</Typography>
                      <Typography sx={{ marginLeft: 1}} variant="caption">{data.lessonCreator}</Typography>
                    </Box>
                    <Box display='flex' flexDirection='row' alignItems='center'>
                      <Typography variant="subtitle2">- Descrição:</Typography>
                      <Typography sx={{ marginLeft: 1}} variant="caption">{data.lessonDescription}</Typography>
                    </Box>
                   
                 
                    <Box marginTop={2}>
                      <Typography variant='caption'>* Não se preocupe, você poderá editar essas informações depois!</Typography>

                   </Box>
             
                  </Box>

         
          </>
        }
        
        {
          activeStep === steps.length &&
            
              <Stack alignItems="center" sx={{ margin: 6 }}>
                
                <Box marginBottom={2}>
              <CheckCircleOutlineIcon fontSize='large' sx={{ color: 'green'}}/>

                </Box>
              <Typography variant='h4'>Tudo certo</Typography>
              <Typography>Na próxima etapa você iniciará a criação de exercícios</Typography>
              </Stack>
              
            
        }
      
        <Box m={2}>
        <Stack  alignItems="flex-end" sx={{ mt: 3 }}>
          

                    <Box display='flex' flexDirection='row'>

                    
                          <Button
                            variant='outlined'
                            disabled={activeStep === 0}
                            onClick={handleBack}
                          >
                            Voltar
                          </Button>

                            <Box marginLeft={2}>
                                    {
                                    activeStep === steps.length ? (
                                    <LoadingButton onClick={() => handleAdGenerator()} variant="contained" loading={submitting}>
                                    Avançar para exercícios
                                    </LoadingButton>
                                    ) : (
                                    <Button
                                      disabled={(activeStep === 0 && (level === '0' || language === '0')) || (activeStep === 1 && (data.lessonName === '' || data.lessonCreator === '' || data.lessonDescription === '')) }
                                     variant="contained" color="primary" onClick={handleNext}>
                                      Avançar
                                    </Button>
                                    )
                                  }
                              </Box>
                        
                    </Box>

            </Stack>
      </Box>

     

          
        
      </Container>
  );
}
