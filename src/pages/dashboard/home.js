// next
import FacebookIcon from '@mui/icons-material/Facebook';
import VoiceChatIcon from '@mui/icons-material/VoiceChat';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import GoogleIcon from '@mui/icons-material/Google';
import WebIcon from '@mui/icons-material/Web';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import { useEffect, useState, useCallback } from 'react'
import Head from 'next/head';
import { useRouter } from 'next/router'
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Box, TextField, Stack, MenuItem, Card, CardHeader, CardContent } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

import { add } from 'date-fns'
// layouts
import { Text } from '@visx/text';
import { scaleLog } from '@visx/scale';
import Wordcloud from '@visx/wordcloud/lib/Wordcloud';

import DashboardLayout from '../../layouts/dashboard';
// _mock_
import { _bookings, _analyticPost, _analyticOrderTimeline, _analyticTraffic } from '../../_mock/arrays';
// components
import { useSettingsContext } from '../../components/settings';
// import { useAuthContext } from '../../auth/useAuthContext';
import { PATH_DASHBOARD } from '../../routes/paths'

import { EcommerceSaleByGender, EcommerceYearlySales } from '../../sections/@dashboard/general/e-commerce'
import { BookingDetails } from '../../sections/@dashboard/general/booking'
import { AppWidgetSummary } from '../../sections/@dashboard/general/app'

// sections
import {
  AnalyticsTasks,
  AnalyticsNewsUpdate,
  AnalyticsOrderTimeline,
  AnalyticsCurrentVisits,
  AnalyticsWebsiteVisits,
  AnalyticsTrafficBySite,
  AnalyticsWidgetSummary,
  AnalyticsCurrentSubject,
  AnalyticsConversionRates,
  HomeOptions
} from '../../sections/@dashboard/general/analytics';
import api from '../../utils/axios'
// import { PATH_DASHBOARD } from '../../routes/paths'

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------



const SERVICE_OPTIONS = [
  'Hoje',
  '7 dias',
  '14 dias',
  '30 dias',
  '90 dias',
  '180 dias',
  '365 dias',
  // 'Este mês',
  // 'Último mês',
  // 'Últimos 3 mês',
  // 'Últimos 6 mês',
  // 'Últimos 12 mês',
  'Customizado'
];

const INPUT_WIDTH = 160;

export function FetchController() {

  const [filterService, setFilterService] = useState('30 dias');

  const [filterStartDate, setFilterStartDate] = useState(null);

  const [filterEndDate, setFilterEndDate] = useState(null);

  const [pickDateStart, setPickDateStart] = useState(null);

  const [pickDateEnd, setPickDateEnd] = useState(null);

  const [isSubmittingDateFilter, setIsSubmittingDateFilter] = useState(false)

  function buildDateInterval(value) {
    if (value === 'Customizado') return { startDate: null, endDate: null }
    const rangeType = {
      'Hoje': { start: {}, end: {} },
      '7 dias': { start: { days: -7}, end: { days: -1} },
      '14 dias': { start: { days: -7}, end: {days: -1} },
      '30 dias': { start: { days: -30}, end: {days: -1} },
      '90 dias': { start: { days: -90}, end: {days: -1} },
      '180 dias': { start: { days: -180}, end: {days: -1} },
      '365 dias': { start: { days: -365}, end: {days: -1} },
      // 'Este mês': { start: { days: -7}, end: {days: -1} },
      // 'Último mês': { start: { days: -7}, end: {days: -1} },
      // 'Últimos 3 mês': { start: { days: -7}, end: {days: -1} },
      // 'Últimos 6 mês': { start: { days: -7}, end: {days: -1} },
      // 'Últimos 12 mês': { start: { days: -7}, end: {days: -1} },
      // 'Customizado': { start: {}, end: {} },
    }
    return {
      startDate: add(new Date(), rangeType[value].start),
      endDate: add(new Date(), rangeType[value].end)
    }
  }

  const fetchData = useCallback(async (startDate, endDate) => {
    console.log('startDate', startDate)
    console.log('filterStartDate', filterStartDate)
    const start = startDate || filterStartDate
    const end = endDate || filterEndDate
    
    console.log('start', start)
    console.log('end', end)
    const query = start && end ? `/v1/evententry?startDate=${start}&endDate=${end}` : `/v1/evententry`
    try {
      const response = await api.get(query)
      // console.log('_mock', _mock)
      console.log('response.data', response.data)
      // setTableData(response.data.deals)
      // setDataFiltered(response.data.deals)
      // setStageCount(response.data.stageCount)
      // setTablePaging(response.data.paging)
    } catch (error) {
      console.log('error sales get', error)
    }
  },[filterStartDate, filterEndDate])

  useEffect(() => {
     fetchData()
  },[fetchData])

  const handleSetCustomDateFilter = (ref, newValue) => {

    if (ref === 'start') {
      setFilterStartDate(newValue)
      setPickDateStart(newValue)
    }
    if (ref === 'end') {
      setFilterEndDate(newValue)
      setPickDateEnd(newValue)
    }
    // setFilterService('Customizado')
  }

  const handleSubmitDateFilter = async (startDate, endDate) => {
    setIsSubmittingDateFilter(true)
    setFilterStartDate(startDate)
    setFilterEndDate(endDate)
    
    try {
      // setPage(0)
      await fetchData(startDate, endDate)
    setIsSubmittingDateFilter(false)
    } catch(error) {
      console.log('deu erro', error)
    }
  }

  const handleFilterService = async (event) => {
    const dateFilter = event.target.value
    const {startDate, endDate} = buildDateInterval(dateFilter)
    
    setFilterService(event.target.value);
    // eslint-disable-next-line no-unused-expressions
    dateFilter !== 'Customizado' && await handleSubmitDateFilter(startDate, endDate)
  };

  return (
    <Box display='flex' justifyContent='space-between' alignContent='center' alignItems='center'>
        <Typography variant="h4" >Período</Typography>
        <Stack spacing={2} direction={{ xs: 'column', md: 'row' }} sx={{ py: 2.5, px: 3 }}>
        {
          filterService === 'Customizado' && <>
            <DatePicker
            label="Start date"
            value={pickDateStart}
            onChange={(newValue) => {
              handleSetCustomDateFilter('start', newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                sx={{
                  maxWidth: { md: INPUT_WIDTH },
                }}
              />
            )}
          />

          <DatePicker
            label="End date"
            value={pickDateEnd}
            onChange={(newValue) => {
              handleSetCustomDateFilter('end', newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                sx={{
                  maxWidth: { md: INPUT_WIDTH },
                }}
              />
            )}
          />
          <LoadingButton
            disabled={!filterStartDate || !filterEndDate}
            variant='contained'
            loading={isSubmittingDateFilter}
            onClick={() => handleSubmitDateFilter(filterStartDate, filterEndDate)}
          >
            Aplicar
          </LoadingButton>
          </>
        }
          

          <TextField
                  fullWidth
                  select
                  label="Intervalo"
                  value={filterService}
                  onChange={handleFilterService}
                  SelectProps={{
                    MenuProps: {
                      sx: { '& .MuiPaper-root': { maxHeight: 260 } },
                    },
                  }}
                  sx={{
                    maxWidth: { md: INPUT_WIDTH },
                    textTransform: 'capitalize',
                  }}
                >
                  {SERVICE_OPTIONS.map((option) => (
                    <MenuItem
                      key={option}
                      value={option}
                      sx={{
                        mx: 1,
                        my: 0.5,
                        borderRadius: 0.75,
                        typography: 'body2',
                        textTransform: 'capitalize',
                      }}
                    >
                      {option}
                    </MenuItem>
                  ))}
          </TextField>
              </Stack>
      </Box>
  )

}






// ----------------------------------------------------------------------

GeneralAnalyticsPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function GeneralAnalyticsPage() {
  const theme = useTheme();
  // const { currentWorkspace, updateWorkspaces } = useAuthContext()
  const { themeStretch } = useSettingsContext();
  const [homeInsight, setHomeInsight] = useState({})
  const { push } = useRouter()

  useEffect(() => {
    async function fetchData() {
      try {
        const insightResponse = await api.get(`v1/everylang/insight`)
        console.log('insightResponse', insightResponse.data)
        setHomeInsight(insightResponse.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  },[])

  const data = {
    dailyExercises: {
      months: homeInsight.dailyExercises?.months,
      data: homeInsight.dailyExercises?.data
    },
    exercisesPercent: {
      grammar: 30,
      pronunciation: 70
    },
    totalExercises: {
      grammar: {
        total: 30,
        score: {
          average: 97,
          last: [30, 50, 60]
        }
      },
      pronunciation: {
        total: 30,
        score: {
          average: 97,
          last: [30, 50, 60]
        }
      }
    },
    pronunciationToImprove: [
      { label: 'World', value: 70 },
      { label: 'Money', value: 60 },
      { label: 'Mouth', value: 55 },
      { label: 'That', value: 50 },
      { label: 'It', value: 45 },
      { label: 'Manegement', value: 40 },
      { label: 'Travel', value: 30 },
      { label: 'Go', value: 20 },
      { label: 'Want', value: 20 },
      { label: 'Eat', value: 20 },
    ],
    grammarToImprove: [
      { label: 'Verb tense', value: 70 },
      { label: 'Present perfect', value: 70 },
      { label: 'Spelling', value: 50 },
      { label: 'Feature', value: 40 }
    ]
  }
  // const { push } = useRouter()
  // useEffect(() => {
  //   if (!currentWorkspace) push(PATH_DASHBOARD.business.new)
  // }, [currentWorkspace, push])

  // const handleDashBoardOptionClick = ()

  return (
    <>
      <Head>
        <title> Dashboard | Everylang</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Everylang
        </Typography>

        <Grid container spacing={3}>
          


        <Grid container spacing={3}>


        <Grid item xs={12} md={6} lg={8}>
            <EcommerceYearlySales
              title="Total de exercícios diários"
              height={200}
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
                    { label: 'Pronúncia', value: homeInsight.exercisesPercent?.pronunciation?.percent },
                    { label: 'Gramática', value: homeInsight.exercisesPercent?.grammar?.percent }
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
                  series: homeInsight.grammarToImprove,
                }}
              />
            </Grid>
  
            
          
            {/* <Grid item xs={12}>
            <BookingDetails
              title="Alunos"
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
            />
          </Grid> */}
          </Grid>

          
        </Grid>

        {/* <FetchController /> */}

        

       
      </Container>
    </>
  );
}
