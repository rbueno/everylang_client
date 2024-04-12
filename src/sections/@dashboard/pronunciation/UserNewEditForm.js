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
import { Select, FormControl, MenuItem, InputLabel, Box, Card, Grid, Container, Stack, Switch, Typography, FormControlLabel, TextField, FormGroup, IconButton, Button } from '@mui/material';
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

  const [seconds, setSeconds] = useState(0);
  const [secRunning, setSecRunning] = useState(false);
  const intervalRef = useRef(null);
  const [level, setLevel] = useState('0');
  const [language, setLanguage] = useState('0');

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
      console.log('responseProccesCreated', responseProccesCreated)
      

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
        <Box mb={2}>
          <Card sx={{ p: 3 }}>
          <Box>
            <Box mb={2}>
            <Typography variant='subtitle1'>Informação interna</Typography>
            </Box>
                  <TextField
                  fullWidth
                        label="Título da lição"
                        value={data.internalLessonName}
                        color="primary"
                        placeholder="Ex.: Palavras com th"
                        // error={newBusinessNameError !== null}
                        helperText="O Aluno não visualizará este título, ficará visível apenas internamente para a sua organziação. Caso você não informe nenhum título, iremos escolher um código aleatório."
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={(e) => onChangeAdLabel({ field: 'internalLessonName', value: e.target.value })}
                      />
                  </Box>

                  <Box marginTop={2}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Escolha o nível</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={level}
                          label="Escolha o nível"
                          error={level === '0'}
                          onChange={handleChangeLevel}
                        >
                          <MenuItem value='beginner'>Iniciante</MenuItem>
                          <MenuItem value='elementary'>Básico 'A1 - A2'</MenuItem>
                          <MenuItem value='intermediate'>Intermediário 'B1 - B2'</MenuItem>
                          <MenuItem value='advanced'>Avançado 'C1 - C2'</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  <Box marginTop={2}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Escolha o idioma</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={language}
                          error={language === '0'}
                          label="Escolha o idioma"
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

          <Box mb={2}>
          <Card sx={{ p: 3 }}>
          <Box mb={2}>
            <Typography variant='subtitle1'>Informação pública</Typography>
            <Typography variant='caption'>Estas informações ficarão visíveis para o aluno que tiver acesso a esta lição</Typography>
            </Box>
          <Box mb={2}>
                  <TextField
                  fullWidth
                  required
                        label="Título da lição"
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
                        label="Criado por"
                        value={data.lessonCreator}
                        color="primary"
                        placeholder="Ex.: Professor Alexandre, Escola Smart Learning"
                        helperText="O nome do autor dessa lição."
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
                        label="Descrição da lição"
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

          <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton onClick={() => isEdit ? handleUpdateLesson() : handleAdGenerator()} variant="contained" loading={submitting}>
              {isEdit ? 'Atualizar lição' : 'Criar lição'}
              </LoadingButton>
            </Stack>
        
      </Container>
  );
}
