import { useState, useEffect } from "react";
import { useSnackbar } from 'notistack';

import { LoadingButton } from '@mui/lab';
import { Stepper, Step, StepLabel, Button, Box, Card, CardHeader, CardContent, Container, Stack, Typography, TextField} from '@mui/material';

import LessonUpdateForm from './lessonUpdateForm'
import LessonCoverPreview from "./lessonCoverPreview";
import LessonSharing from "./lessonSharing";

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

import Joyride, { ACTIONS, EVENTS, ORIGIN, STATUS } from 'react-joyride'

// ----------------------------------------------------------------------


const stepsSharingLesson = [
  {
    content: (
      <div>
      <h3>Agora, aprenda como compartilhar com seus alunos</h3>
      </div>
    ),
    placement: 'center',
    target: 'body',
  },
  {
    target: '.lesson-exercise-sharing-step-1',
    content: 'Este é o link que o aluno deve ter para encontra a sua lição.',
    disableBeacon: true,
    // disableOverlayClose: true,
    // disableOverlay: true,
    hideCloseButton: true,
    // hideFooter: true,
    placement: 'bottom',
    // spotlightClicks: true,
  },
  {
    target: '.lesson-exercise-sharing-step-2',
    content: (
      <div>
      <h3>Parabés, passo a passo concluído.</h3>
      <p>Clique aqui para copiar o link e envie para um ou mais alunos.</p>
      </div>
    ),
    disableBeacon: true,
    // disableOverlayClose: true,
    hideCloseButton: true,
    // hideFooter: true,
    locale: { last: 'Concluir e copiar link' },
    placement: 'top',
    // spotlightClicks: true,
  }
]


const LessonShareStepper = ({ lesson, updateLesson, initialStep = 0 }) => {
    const [updatingLesson, setUpdatingLesson] = useState()
    const { enqueueSnackbar } = useSnackbar();

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

    const steps = ['Sobre a lição', 'Revisar', 'Copia link']
  
    const [activeStep, setActiveStep] = useState(initialStep);
    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  
    const handleReset = () => {
      setActiveStep(0);
    };


    const handleUpdateLesson = async ({ params, shouldUpdate }) => {
      
        handleNext()
        console.log('shouldUpdate', shouldUpdate)
        if(shouldUpdate) {
console.log('call update')
            updateLesson(params)
        }
      };
   
      const handleCopySharingLink = async () => {
      
        handleNext()

      };

useEffect(() => {
    console.log('useEffect stepper lesson', lesson) 
}, [lesson])

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

    return ( <Box
        >
                            <Box display='flex' flexDirection='column' textAlign='center' marginBottom={4}>
                                
                                <Typography variant='h4'>Compartilhar</Typography>
                                <Typography variant='subtitle1'>Compartilhe com um ou mais alunos</Typography>
                                
                            </Box>
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
                activeStep === 0 && <LessonUpdateForm
                initialDataValue={lesson}
                lessonType={lesson?.type}
                lessonForm='public'
                mainAction={handleUpdateLesson}
                />
             }
             {
                activeStep === 1 && <LessonCoverPreview lesson={lesson} />
             }
             {
                activeStep === 2 && <LessonSharing lesson={lesson} mainAction={handleNext}/>
             }

{
          activeStep === steps.length &&
            
              <Stack alignItems="center" sx={{ margin: 6 }}>
                
                <Box marginBottom={2}>
              <CheckCircleOutlineIcon fontSize='large' sx={{ color: 'green'}}/>

                </Box>
              <Typography variant='h4'>Link copiado</Typography>
              <Box marginBottom={2}>
                <Typography variant="body1">Envie o link para um ou mais alunos.</Typography>
              </Box>
              <Box>
                <Typography variant="body1">O aluno, que responder os exercícios, aparecerá na seção "Alunos".</Typography>
              </Box>
              </Stack>
              
            
        }
      
        {
            activeStep > 0 && <Box m={2}>
            <Stack  alignItems="flex-end" sx={{ mt: 3 }}>
                        <Box display='flex' flexDirection='row'>
    
                        
                              <Button
                                variant='outlined'
                                disabled={activeStep === 0}
                                onClick={handleBack}
                              >
                                Voltar
                              </Button>
    
    {
      activeStep < 2 &&  <Box marginLeft={2}>
      <Button
                disabled={activeStep === steps.length}
               variant="contained" color="primary" onClick={handleNext}>
                Avançar
              </Button>
        </Box>
    }
                               
                            
                        </Box>
    
                </Stack>
          </Box>
        }
{
  displayOnboarding && <Joyride
  steps={stepsSharingLesson}
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

    </Box>
    )
}

export default LessonShareStepper