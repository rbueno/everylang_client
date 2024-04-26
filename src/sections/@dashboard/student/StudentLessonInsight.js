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

export default function BusinessEdit({ lessonId }) {
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

         


          <Grid item xs={12} md={6} sm={6}>
          <HomeOptions
              title="Pontuação geral"
              total={97}
              color="success"
              py={3}
              // icon={<VoiceChatIcon />}
            />
          </Grid> 

          <Grid item xs={12} md={6} sm={6}>
          <HomeOptions
              title="Pontuação do speedy"
              total={80}
              color="warning"
              py={3}
              // icon={<VoiceChatIcon />}
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

          <Grid item xs={12} md={12} lg={12}>
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
