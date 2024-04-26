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

  useEffect(() => {
    async function fetData() {
      try {

        // const { data } = await api.get(`v1/everylang/student?studentId=${studentId}`)
        // console.log('get student', data)
        
    
      
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
        <Box marginBottom={4}>
          <Typography variant='caption'>Aluno</Typography>
          <Typography variant='h5'>Rafael Bueno</Typography>

        </Box>
        
         <Grid container spacing={3}>

         <Grid item xs={12} md={6} lg={8}>
            <EcommerceYearlySales
              title="Atividade"
              height={200}
              // subheader="(+43%) than last year"
              chart={{
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
                series: [
                  {
                    // year: '2019',
                    data: [
                      { name: 'Total de alunos', data: [10, 41, 35, 151, 49, 62, 69, 91, 48] },
                      // { name: 'Total Expenses', data: [10, 34, 13, 56, 77, 88, 99, 77, 45] },
                    ],
                  },
                  // {
                  //   year: '2020',
                  //   data: [
                  //     { name: 'Total Income', data: [148, 91, 69, 62, 49, 51, 35, 41, 10] },
                  //     // { name: 'Total Expenses', data: [45, 77, 99, 88, 77, 56, 13, 34, 10] },
                  //   ],
                  // },
                ],
              }}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            {/* <EcommerceSaleByGender
              title="Sale By Gender"
              total={2324}
              chart={{
                series: [
                  { label: 'Mens', value: 44 },
                  { label: 'Womens', value: 75 },
                ],
              }}
            /> */}
            <AnalyticsCurrentVisits
                title="Exercícios"
                chart={{
                  // categories: ['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math'],
                  series: [
                    { label: 'Pronúncia', value: 70 },
                    { label: 'Gramática', value: 30 }
                  ],
                  colors: [
                    theme.palette.primary.main,
                    theme.palette.info.main,
                    theme.palette.error.main,
                    theme.palette.warning.main,
                  ],
                }}
              />
          </Grid>


          <Grid item xs={12} md={3} sm={6}>
            <AppWidgetSummary
              title="Pontuação de Pronúncia"
              // percent={2.6}
              total={97}
              chartColor={theme.palette.primary.main}
              chartData={[90, 70, 65]}
            />
          </Grid> 

          <Grid item xs={12} md={3} sm={6}>
          <HomeOptions
              title="Exercícios de pronúncia"
              total={22}
              color="info"
              py={3}
              // icon={<VoiceChatIcon />}
            />
          </Grid> 

          <Grid item xs={12} md={3} sm={6}>
            <AppWidgetSummary
              title="Pontuação de gramática"
              // percent={88}
              total={80}
              chartColor={theme.palette.primary.main}
              chartData={[100, 60, 90]}
            />
          </Grid> 

          <Grid item xs={12} md={3} sm={6}>
          <HomeOptions
              title="Exercícios de gramática"
              total={12}
              color="warning"
              py={3}
              // icon={<VoiceChatIcon />}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
              <AnalyticsConversionRates
                title="Palavras com maior dificuldade de pronúncia"
                // subheader="Dados Everylang"
                chart={{
                  series: [
                    { label: 'World', value: 1380 },
                    { label: 'Money', value: 1200 },
                    { label: 'Mouth', value: 1100 },
                    { label: 'That', value: 690 },
                    { label: 'It', value: 580 },
                    { label: 'Manegement', value: 540 },
                    { label: 'Travel', value: 470 },
                    { label: 'Go', value: 448 },
                    { label: 'Want', value: 430 },
                    { label: 'Eat', value: 400 },
                  ],
                }}
              />
            </Grid>
  
  
              <Grid item xs={12} md={6} lg={6}>
              {/* <AnalyticsCurrentVisits
                title="Erros mais comuns de gramática"
                chart={{
                  // categories: ['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math'],
                  series: [
                    { label: '', value: 4344 },
                    { label: '', value: 5435 },
                    { label: '', value: 1443 },
                    { label: '', value: 4443 },
                  ],
                  colors: [
                    theme.palette.primary.main,
                    theme.palette.info.main,
                    theme.palette.error.main,
                    theme.palette.warning.main,
                  ],
                }}
              /> */}
              <AnalyticsConversionRates
                title="Erros frequêntes de gramática"
                // subheader="Dados Everylang"
                chart={{
                  series: [
                    { label: 'Verb tense', value: 1380 },
                    { label: 'Present perfect', value: 1200 },
                    { label: 'Spelling', value: 1100 },
                    { label: 'Feature', value: 690 }
                  ],
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
            <StudentLessonList />
          </Grid>
          </Grid>
        
      </Container>
  );
}
