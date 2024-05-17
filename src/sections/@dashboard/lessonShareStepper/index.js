import { useState, useEffect } from "react";
import { useSnackbar } from 'notistack';

import { LoadingButton } from '@mui/lab';
import { Stepper, Step, StepLabel, Button, Box, Card, CardHeader, CardContent, Container, Stack, Typography, TextField} from '@mui/material';

import LessonUpdateForm from './lessonUpdateForm'
import LessonCoverPreview from "./lessonCoverPreview";
import LessonSharing from "./lessonSharing";

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const LessonShareStepper = ({ lesson, updateLesson }) => {
    const [updatingLesson, setUpdatingLesson] = useState()
    const { enqueueSnackbar } = useSnackbar();

    const steps = ['Sobre a lição', 'Revisar', 'Copia link']
  
    const [activeStep, setActiveStep] = useState(0);
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

    return ( <Box
        >
            <Box display='flex' justifyContent='center' marginBottom={2}>
                                
                                <Typography variant='subtitle1'>Compartilhar</Typography>
                                
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
    </Box>
    )
}

export default LessonShareStepper