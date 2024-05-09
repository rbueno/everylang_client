/* eslint-disable no-unused-expressions */
import PropTypes from 'prop-types';
import VoiceChatIcon from '@mui/icons-material/VoiceChat';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import { useCallback, useEffect, useMemo, useState, useRef } from 'react';
import { useSnackbar } from 'notistack';
// next
import { useRouter } from 'next/router';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { useTheme } from '@mui/material/styles';
import { Divider, Box, Card, CardHeader, CardContent, Grid, Container, Stack, Switch, Typography, FormControlLabel, TextField, FormGroup, IconButton, Button } from '@mui/material';
// utils

// import { fData } from '../../../utils/formatNumber';
import api from '../../../utils/axios';

import useCopyToClipboard from '../../../hooks/useCopyToClipboard'

import { EcommerceSaleByGender, EcommerceYearlySales } from '../general/e-commerce'
import { AnalyticsConversionRates, HomeOptions, AnalyticsCurrentVisits } from '../general/analytics'
import { BookingDetails } from '../general/booking'
import { AppWidgetSummary } from '../general/app'
import StudentPronunciationLessonExercises from './StudentPronunciationLessonExercises'
import StudentGrammarLessonExercises from './StudentGrammarLessonExercises'
import Label from '../../../components/label'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { PATH_DASHBOARD } from '../../../routes/paths'
// ----------------------------------------------------------------------


import { _bookings, _bookingNew, _bookingsOverview, _bookingReview } from '../../../_mock/arrays';

function StudentGrammarLessonInsight({ dataInsight }) {
  const { push } = useRouter()

  const handleBackToStudent = () => {
  push(PATH_DASHBOARD.student.insight(dataInsight.student?._id));
}
  return (
  <>
  <Box marginBottom={4}>
  {/* <Button variant='outlined' startIcon={<ArrowBackIcon />}>Voltar</Button> */}
  <IconButton
        size="small"
        // color="inherit"
        onClick={() => handleBackToStudent()}
        // sx={{ color: 'text.secondary' }}
      >
        <ArrowBackIcon />
      </IconButton>

  </Box>
  <Box marginBottom={4}>
          <Typography variant='caption'>Aluno</Typography>
          <Typography variant='h5'>{dataInsight.student?.fullName || '---'}</Typography>
          
        </Box>
        
         <Grid container spacing={3}>

         


          <Grid item xs={12} md={4} sm={4}>
            <Card>
              <CardHeader title='Lição de gramática' />
              <CardContent>
              <Box display='flex' flexDirection='row' alignItems='center' marginBottom={2}>
                      {/* <Typography variant="subtitle2">Status</Typography> */}
                      <Label sx={{ marginLeft: 1}} color={dataInsight.grammarExerciseSession[0].status === 'done' ? 'success' : 'warning'}>status: {dataInsight.grammarExerciseSession[0].status}</Label>
                      <Label sx={{ marginLeft: 1}} color='success'>Pontuação: {dataInsight.exercisesPercent?.pronunciation?.averageScore}</Label>
                    </Box>

                    <Divider sx={{ margin: 2 }} />
              <Box marginBottom={2}>
                      <Typography variant="h6">Informação interna</Typography>

          </Box>
          <Box display='flex' flexDirection='column'>
                    <Box display='flex' flexDirection='row' alignItems='center'>
                      <Typography variant="subtitle2">- Título interno:</Typography>
                      <Typography sx={{ marginLeft: 1}} variant="caption">{dataInsight.lesson?.internalTitle}</Typography>
                    </Box>
                    <Box display='flex' flexDirection='row' alignItems='center'>
                      <Typography variant="subtitle2">- Idioma:</Typography>
                      <Typography sx={{ marginLeft: 1}} variant="caption">{dataInsight.lesson?.learningLanguage}</Typography>
                    </Box>
                    <Box display='flex' flexDirection='row' alignItems='center'>
                      <Typography variant="subtitle2">- Proficiência:</Typography>
                      <Typography sx={{ marginLeft: 1}} variant="caption">{dataInsight.lesson?.languageLevel}</Typography>
                    </Box>
                   
                    <Divider sx={{ margin: 2 }} />

                    <Box marginBottom={2}>
                      <Typography variant="h6">Informação pública</Typography>

                   </Box>

                   <Box display='flex' flexDirection='row' alignItems='center'>
                      <Typography variant="subtitle2">- Criado por:</Typography>
                      <Typography sx={{ marginLeft: 1}} variant="caption">{dataInsight.lesson?.creator}</Typography>
                    </Box>

                    
                    <Box display='flex' flexDirection='row' alignItems='center'>
                      <Typography variant="subtitle2">- Título público:</Typography>

                      <Typography sx={{ marginLeft: 1}} variant="caption">{dataInsight.lesson?.internalTitle || '---'}</Typography>
                    </Box>
                    
                    <Box display='flex' flexDirection='row' alignItems='center'>
                      <Typography variant="subtitle2">- Descrição:</Typography>
                      <Typography sx={{ marginLeft: 1}} variant="caption">{dataInsight.lesson?.description || '---'}</Typography>
                    </Box>

                   

                   
                  
                    
                   
                 
             
                  </Box>
              </CardContent>
            </Card>
          {/* <HomeOptions
              title="Pontuação geral"
              total={dataInsight.exercisesPercent?.pronunciation?.averageScore}
              color="success"
              py={3}
              // icon={<VoiceChatIcon />}
            />
            <HomeOptions
              title="Pontuação do speedy"
              total={80}
              color="warning"
              py={3}
              // icon={<VoiceChatIcon />}
            /> */}
          </Grid> 

          <Grid item xs={12} md={8} sm={8}>
          <AnalyticsConversionRates
                title="Erros mais frequêntes de gramática"
                subheader="Esses são os principais error de gramática que o aluno apresentou ao longo de todos os exercícios"
                chart={{
                  series: dataInsight.grammarToImprove,
                }}
              />
          </Grid> 

          {/* <Grid item xs={12} md={3} sm={6}>
            <HomeOptions
              title="Pontuação geral"
              total={12}
              color="warning"
              py={3}
              // icon={<VoiceChatIcon />}
            />
          </Grid>  */}

          {/* <Grid item xs={12} md={3} sm={6}>
          <HomeOptions
              title="Pontuação geral"
              total={12}
              color="warning"
              py={3}
              // icon={<VoiceChatIcon />}
            />
          </Grid> */}

            <Grid item xs={12}>
            <StudentGrammarLessonExercises grammarExercises={dataInsight.grammarExercises} grammarAssessment={dataInsight.grammarAssessment}/>
          </Grid>
          </Grid>
  </>
)
}

function StudentPronunciationLessonInsight({ dataInsight }) {
const { push } = useRouter()

  const handleBackToStudent = () => {
  push(PATH_DASHBOARD.student.insight(dataInsight.student?._id));
}
  return (
  <>
  <Box marginBottom={4}>
  {/* <Button variant='outlined' startIcon={<ArrowBackIcon />}>Voltar</Button> */}
  <IconButton
        size="small"
        // color="inherit"
        onClick={() => handleBackToStudent()}
        // sx={{ color: 'text.secondary' }}
      >
        <ArrowBackIcon />
      </IconButton>

  </Box>
  <Box marginBottom={4}>
          <Typography variant='caption'>Aluno</Typography>
          <Typography variant='h5'>{dataInsight.student?.fullName || '---'}</Typography>
          
        </Box>
        
         <Grid container spacing={3}>

         


          <Grid item xs={12} md={4} sm={4}>
            <Card>
              <CardHeader title='Lição de pronúncia' />
              <CardContent>
              <Box display='flex' flexDirection='row' alignItems='center' marginBottom={2}>
                      {/* <Typography variant="subtitle2">Status</Typography> */}
                      <Label sx={{ marginLeft: 1}} color={dataInsight.pronunciationPracticeSession[0].status === 'done' ? 'success' : 'warning'}>status: {dataInsight.pronunciationPracticeSession[0].status}</Label>
                      <Label sx={{ marginLeft: 1}} color='success'>Pontuação: {dataInsight.exercisesPercent?.pronunciation?.averageScore}</Label>
                    </Box>

                    <Divider sx={{ margin: 2 }} />
              <Box marginBottom={2}>
                      <Typography variant="h6">Informação interna</Typography>

          </Box>
          <Box display='flex' flexDirection='column'>
                    <Box display='flex' flexDirection='row' alignItems='center'>
                      <Typography variant="subtitle2">- Título interno:</Typography>
                      <Typography sx={{ marginLeft: 1}} variant="caption">{dataInsight.lesson?.internalTitle}</Typography>
                    </Box>
                    <Box display='flex' flexDirection='row' alignItems='center'>
                      <Typography variant="subtitle2">- Idioma:</Typography>
                      <Typography sx={{ marginLeft: 1}} variant="caption">{dataInsight.lesson?.learningLanguage}</Typography>
                    </Box>
                    <Box display='flex' flexDirection='row' alignItems='center'>
                      <Typography variant="subtitle2">- Proficiência:</Typography>
                      <Typography sx={{ marginLeft: 1}} variant="caption">{dataInsight.lesson?.languageLevel}</Typography>
                    </Box>
                   
                    <Divider sx={{ margin: 2 }} />

                    <Box marginBottom={2}>
                      <Typography variant="h6">Informação pública</Typography>

                   </Box>

                   <Box display='flex' flexDirection='row' alignItems='center'>
                      <Typography variant="subtitle2">- Criado por:</Typography>
                      <Typography sx={{ marginLeft: 1}} variant="caption">{dataInsight.lesson?.creator}</Typography>
                    </Box>

                    
                    <Box display='flex' flexDirection='row' alignItems='center'>
                      <Typography variant="subtitle2">- Título público:</Typography>

                      <Typography sx={{ marginLeft: 1}} variant="caption">{dataInsight.lesson?.internalTitle || '---'}</Typography>
                    </Box>
                    
                    <Box display='flex' flexDirection='row' alignItems='center'>
                      <Typography variant="subtitle2">- Descrição:</Typography>
                      <Typography sx={{ marginLeft: 1}} variant="caption">{dataInsight.lesson?.description || '---'}</Typography>
                    </Box>

                   

                   
                  
                    
                   
                 
             
                  </Box>
              </CardContent>
            </Card>
          {/* <HomeOptions
              title="Pontuação geral"
              total={dataInsight.exercisesPercent?.pronunciation?.averageScore}
              color="success"
              py={3}
              // icon={<VoiceChatIcon />}
            />
            <HomeOptions
              title="Pontuação do speedy"
              total={80}
              color="warning"
              py={3}
              // icon={<VoiceChatIcon />}
            /> */}
          </Grid> 

          <Grid item xs={12} md={8} sm={8}>
          <AnalyticsConversionRates
                title="Palavras com maior dificuldade de pronúncia"
                subheader="Essas são as principais palavras que o aluno apresentou dificuldade ao longo de todos os exercícios"
                chart={{
                  series: dataInsight.pronunciationToImprove,
                }}
              />
          </Grid> 

          {/* <Grid item xs={12} md={3} sm={6}>
            <HomeOptions
              title="Pontuação geral"
              total={12}
              color="warning"
              py={3}
              // icon={<VoiceChatIcon />}
            />
          </Grid>  */}

          {/* <Grid item xs={12} md={3} sm={6}>
          <HomeOptions
              title="Pontuação geral"
              total={12}
              color="warning"
              py={3}
              // icon={<VoiceChatIcon />}
            />
          </Grid> */}

        
  
  
              
  
            <Grid item xs={12}>
            <StudentPronunciationLessonExercises pronunciationExercises={dataInsight.pronunciationExercises} pronunciationAssessment={dataInsight.pronunciationAssessment}/>
          </Grid>
          </Grid>
  </>
)
}
StudentLessonInsight.propTypes = {
  editingWorkspace: PropTypes.object,
  lessonId: PropTypes.string,
  isEdit: PropTypes.bool,
};

export default function StudentLessonInsight({ lessonId }) {
  const { push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { copy } = useCopyToClipboard();
  const theme = useTheme()
  const [dataInsight, setDataInsight] = useState({ 
    lessonType: 'loading', 
    pronunciationExercises: [],
    pronunciationAssessment: []
  })

  useEffect(() => {
    async function fetData() {
      try {

        const { data } = await api.get(`v1/everylang/lesson-insight/${lessonId}`)
        console.log('lesson-insight', data)
        setDataInsight(data)
    
      } catch (error) {
        enqueueSnackbar(error.message && error.message, { variant: 'error' });
        console.error(error);
      }
    }
    fetData()
  }, []);

  
  return (

      <Container
      disableGutters
      maxWidth='xl'
      >
        {
          dataInsight.lessonType === 'loading' && <>Carregando</>
        }
        {
          dataInsight.lessonType === 'pronunciation' && <StudentPronunciationLessonInsight dataInsight={dataInsight}/>
        }
        {
          dataInsight.lessonType === 'grammar' && <StudentGrammarLessonInsight dataInsight={dataInsight}/>
        }
        
      </Container>
  );
}
