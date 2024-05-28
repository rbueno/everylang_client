/* eslint-disable no-unused-expressions */
import { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
// next
import { useRouter } from 'next/router';
// form

// @mui
import { LoadingButton } from '@mui/lab';
import { CardHeader, CardContent, Select, FormControl, MenuItem, InputLabel, Box, Card, Container, Stack, TextField, Button } from '@mui/material';
// utils

import api from '../../../utils/axios';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
import { generateShortId } from 'src/utils/generateShortId';
import Joyride, { ACTIONS, EVENTS, ORIGIN, STATUS } from 'react-joyride'

// ----------------------------------------------------------------------


const stepsAccessGuideNewLesson = [
  {
    content: (
      <div>
      <h3>Essa é a tela de criação de lição</h3>
      <p>Clique em "avançar" para iniciarmos</p>
      </div>
    ),
    placement: 'center',
    target: 'body',
  },
  // {
  //   target: '.lesson-step-1',
  //   content: 'Preencha um título para a lição ou clique no botão apra gerar um código aleatório',
  //   disableBeacon: true,
  //   disableOverlayClose: true,
  //   hideCloseButton: true,
  //   // hideFooter: true,
  //   placement: 'bottom',
  //   spotlightClicks: true,
  // },
  {
    target: '.lesson-step-2',
    content: 'Essas informações iniciais servem apenas para sua organização, ficarão visível apenas para você',
    disableBeacon: true,
    // disableOverlayClose: true,
    // disableOverlay: true,
    hideCloseButton: true,
    // hideFooter: true,
    placement: 'bottom',
    // spotlightClicks: true,
  },
  {
    target: '.lesson-step-4',
    content: 'Após preencher o nível e idioma da lição, clique aqui',
    disableBeacon: true,
    disableOverlayClose: true,
    hideCloseButton: true,
    // hideFooter: true,
    placement: 'top',
    // spotlightClicks: true,
  },
  {
    target: '.lesson-step-3',
    content: (
      <div>
      <h3>Agora, preencha essas informações:</h3>
      <p>- Nível</p>
      <p>- Idioma</p>
      <p>Após preencher, clique em "Avançar para exercícios"</p>
      </div>
    ),
    disableBeacon: true,
    disableOverlayClose: true,
    hideCloseButton: true,
    // hideFooter: true,
    placement: 'bottom',
    // spotlightClicks: true,
    locale: { last: 'preencher'}
  },
];


function NewLessonSimpleForm(props) {
  const { lessonType } = props

  const { push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const [submitting, setSubmitting] = useState(false);

  const [title, setTitle] = useState('');
  const [level, setLevel] = useState('0');
  const [language, setLanguage] = useState('0');
  
  const handleChangeLevel = (event) => {
    setLevel(event.target.value);
  };
  const handleChangeLanguage = (event) => {
    setLanguage(event.target.value);
  };


  const handleAdGenerator = async () => {
    setSubmitting(true)

    const payload = { internalLessonName: title, languageLevel: level, learningLanguage: language, lessonType }
    try {


      console.log('payload', payload)
      const { data } = await api.post('v1/everylang/lesson', payload)
      

      // eslint-disable-next-line consistent-return
      enqueueSnackbar(`lição criada`);
      setSubmitting(false)
      // redirect
      if (lessonType === 'grammar') push(PATH_DASHBOARD.lessonGrammar.content(data.lesson._id));
      if (lessonType === 'pronunciation') push(PATH_DASHBOARD.lessonPronunciation.content(data.lesson._id));
    
    } catch (error) {
      enqueueSnackbar(error.message && error.message, { variant: 'error' });
      console.error(error);
    }
    // clearInterval(timer)
  
    setSubmitting(false)
  };

  const generateTitleAsCode = () => {
    const generatedCode = generateShortId({ size: 20 })
    setTitle(generatedCode)
  }

  const [run, setRun] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const handleJoyrideCallback = (data) => {
    const { action, index, origin, status, type } = data;

    console.log('data ==>', data)

    if (action === ACTIONS.CLOSE && origin === ORIGIN.KEYBOARD) {
      // do something
    }

    if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type)) {
      // Update state to advance the tour
      setStepIndex(index + (action === ACTIONS.PREV ? -1 : 1));
    } else if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      // You need to set our running state to false, so we can restart if we click start again.
      setRun(false);
    }

    console.groupCollapsed(type);
    console.log(data); //eslint-disable-line no-console
    console.groupEnd();
  };

  useEffect(() => {
    setRun(true)
  }, [])
  
  const [displayOnboarding, setDisplayOnboarding] = useState(false)
  useEffect(() => {
    const onboardinStatus = window.localStorage.getItem('onboarding_status');
    if(onboardinStatus !== 'done') {
      window.localStorage.setItem('onboarding_status', 'pending');
      setDisplayOnboarding(true)
    } else {
      setDisplayOnboarding(false)
    }
  })

  return (

      <Container
      disableGutters
      maxWidth='sm'
      >
       
       <Card>
          <CardHeader className='lesson-step-2' title='Informações internas da lição' subheader='Estas informações são visíveis apenas para você. O aluno não terá acesso à esses dados'/>
          <CardContent className='lesson-step-3'>
           {/* <Box mb={4} className='lesson-step-1'>
           <TextField
           fullWidth
           required
                 label="Título da lição"
                 value={title}
                 color="primary"
                 placeholder={lessonType === 'grammar' ? 'Verbos irregulares' : "Ex.: Pronúncia de palavras com TH"}
                 // helperText="Seja específico. Insira apenas o nome do seu produto ou serviço."
                 // error={newBusinessNameError !== null}
                 InputLabelProps={{
                   shrink: true,
                 }}
                 onChange={(e) => setTitle(e.target.value)}
               />
               <Button variant='contained' onClick={() => generateTitleAsCode()}>Gerar um código como título</Button>
           </Box> */}
          <Box >
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Nível (obrigatório)</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={level}
                          label="Nível (obrigatório)"
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

                      <Stack  alignItems="flex-end" sx={{ mt: 3 }}>
                        <LoadingButton className='lesson-step-4' disabled={language === '0' || level === '0'} onClick={() => handleAdGenerator()} variant="contained" loading={submitting}>
                          Avançar para exercícios
                        </LoadingButton>
                      </Stack>

          </CardContent>
          </Card>

          {
            displayOnboarding &&  <Joyride
            steps={stepsAccessGuideNewLesson}
            continuous={true}
            // locale={{ next: 'Avançar'}}
            callback={handleJoyrideCallback}
            run={run}
            stepIndex={stepIndex}
            locale={{ next: 'Avançar', back: 'voltar', 'last': 'fechar'}}
            scrollToFirstStep
            showProgress
            disableCloseOnEsc
            disableOverlayClose
            hideCloseButton
            styles={{
              // overlay: { height: '100vh' },
              options: {
                zIndex: 10000,
                // overlay: { height: '100vh' },
              },
            }}
            />
          }
         
      </Container>
  );
}

export { NewLessonSimpleForm }