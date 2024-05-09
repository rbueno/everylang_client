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
import { Select, FormControl, MenuItem, InputLabel, Box, Card, CardHeader, CardContent, Grid, Container, Stack, Switch, Typography, FormControlLabel, TextField, FormGroup, IconButton, Button } from '@mui/material';
// utils

// import { fData } from '../../../utils/formatNumber';
import api from '../../../utils/axios';

import useCopyToClipboard from '../../../hooks/useCopyToClipboard'

import { EcommerceSaleByGender, EcommerceYearlySales } from '../general/e-commerce'
import { AnalyticsConversionRates, HomeOptions, AnalyticsCurrentVisits } from '../general/analytics'
import { BookingDetails } from '../general/booking'
import { AppWidgetSummary } from '../general/app'
import StudentLessonList from './StudentLessonList'
// ----------------------------------------------------------------------


import { _bookings, _bookingNew, _bookingsOverview, _bookingReview } from '../../../_mock/arrays';


BusinessEdit.propTypes = {
  editingWorkspace: PropTypes.object,
  lessonId: PropTypes.string,
  isEdit: PropTypes.bool,
};

export default function BusinessEdit({ studentId }) {
  const { push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { copy } = useCopyToClipboard();
  const theme = useTheme()
  const [homeInsight, setHomeInsight] = useState({
    "dailyExercises": {
        "months": [],
        "data": []
    },
    "exercisesPercent": {
        "grammar": {
            "totalExercises": 0,
            "sumScore": 0,
            "averageScore": 0,
            "last": [],
            "percent": 0
        },
        "pronunciation": {
            "totalExercises": 0,
            "sumScore": 0,
            "averageScore": 0,
            "last": [],
            "percent": 0
        },
        "totalExercises": 0
    },
    "pronunciationToImprove": [],
    "grammarToImprove": [],
    student: {}
})

  useEffect(() => {
    async function fetchData() {
      try {
        const insightResponse = await api.get(`v1/everylang/insight?studentId=${studentId}`)
        console.log('insightResponse', insightResponse.data)
        setHomeInsight(insightResponse.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  },[])

  
  return (

      <Container
      disableGutters
      maxWidth='xl'
      >
        <Box marginBottom={4}>
          <Typography variant='caption'>Aluno</Typography>
          <Typography variant='h5'>{homeInsight.student?.fullName}</Typography>

        </Box>
        
         <Grid container spacing={3}>

         <Grid item xs={12} md={6} lg={8}>
            <EcommerceYearlySales
              title="Total de exercícios diários"
              height={245}
              // subheader="(+43%) than last year"
              chart={{
                categories: homeInsight.dailyExercises?.months,
                series: [
                  {
                    // year: '2019',
                    data: [
                      { name: 'Exercícios', data: homeInsight.dailyExercises?.data },
                      // { name: 'Total Expenses', data: [10, 34, 13, 56, 77, 88, 99, 77, 45] },
                    ],
                  },
                ],
              }}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AnalyticsCurrentVisits
                title="Exercícios"
                chart={{
                  // categories: ['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math'],
                  series: [
                    { label: 'Pronúncia', value: homeInsight.exercisesPercent?.pronunciation?.percent },
                    { label: 'Gramática', value: homeInsight.exercisesPercent?.grammar?.percent }
                  ],
                  colors: [
                    theme.palette.primary.main,
                    theme.palette.info.main,
                    // theme.palette.error.main,
                    // theme.palette.warning.main,
                  ],
                }}
              />
            
          </Grid>

          <Grid item xs={12} md={3} sm={6}>
          <HomeOptions
              title="Exercícios de pronúncia"
              total={homeInsight.exercisesPercent?.pronunciation?.totalExercises}
              color="info"
              py={3}
              // icon={<VoiceChatIcon />}
            />
          </Grid> 

          <Grid item xs={12} md={3} sm={6}>
            <AppWidgetSummary
              title="Pontuação de Pronúncia"
              // percent={2.6}
              total={homeInsight.exercisesPercent?.pronunciation?.averageScore}
              chartColor={theme.palette.primary.main}
              chartData={homeInsight.exercisesPercent?.pronunciation?.last}
            />
          </Grid> 

        
          <Grid item xs={12} md={3} sm={6}>
          <HomeOptions
              title="Exercícios de gramática"
              total={homeInsight.exercisesPercent?.grammar?.totalExercises}
              color="warning"
              py={3}
              // icon={<VoiceChatIcon />}
            />
          </Grid>
          
          <Grid item xs={12} md={3} sm={6}>
            <AppWidgetSummary
              title="Pontuação de gramática"
              // percent={88}
              total={homeInsight.exercisesPercent?.grammar?.averageScore}
              chartColor={theme.palette.primary.main}
              chartData={homeInsight.exercisesPercent?.grammar?.last}
            />
          </Grid> 

        

         


          <Grid item xs={12} md={6} lg={6}>
              <AnalyticsConversionRates
                title="Palavras com maior dificuldade de pronúncia"
                // subheader="Dados Everylang"
                chart={{
                  series: homeInsight.pronunciationToImprove,
                }}
              />
            </Grid>
  
  
              <Grid item xs={12} md={6} lg={6}>
           
              <AnalyticsConversionRates
                title="Erros frequêntes de gramática"
                // subheader="Dados Everylang"
                chart={{
                  series: homeInsight.grammarToImprove,
                }}
              />
            </Grid>
  
            <Grid item xs={12}>
            {/* <BookingDetails
              title="Booking Details"
              tableData={_bookings}
              tableLabels={[
                { id: 'booker', label: 'Booker' },
                { id: 'checkIn', label: 'Check In' },
                { id: 'checkOut', label: 'Check Out' },
                { id: 'status', label: 'Status' },
                { id: 'phone', label: 'Phone' },
                { id: 'roomType', label: 'Room Type' },
                { id: '' },
              ]}
            /> */}
            <StudentLessonList tableData={{ pronunciationSection: homeInsight.pronunciationPracticeSession,  grammarSection: homeInsight.grammarExerciseSession }} />
          </Grid>
          </Grid>
        
      </Container>
  );
}
