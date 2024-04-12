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
import { _analyticPost, _analyticOrderTimeline, _analyticTraffic } from '../../_mock/arrays';
// components
import { useSettingsContext } from '../../components/settings';
// import { useAuthContext } from '../../auth/useAuthContext';
import { PATH_DASHBOARD } from '../../routes/paths'
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




const totoAfricaLyrics = `Hoje cedo
Quando eu acordei e não te vi
Eu pensei em tanta coisa
Tive medo
Ah, como eu chorei
Eu sofri em segredo
Tudo isso hoje cedo
Holofotes fortes, purpurina
E o sorriso dessas mina só me lembra cocaína
Em cinco abrem-se cortinas
Estáticas retinas brilham, garoa fina
Que fita, meus poema me trouxe onde eles não habita
A fama irrita, a grana dita, 'cê desacredita?
Fantoches, pique Celso Pitta mentem
Mortos tipo meu pai, nem eu me sinto presente
Aí, é rima que cês quer, toma, duas, três
Farta pra infartar cada um de vocês
Num abismo sem volta, de festa, ladainha
Minha alma afunda igual minha família em casa, sozinha
Entre putas como um cafetão, coisas que afetam
Sintonia, como eu sonhei em tá aqui um dia?
Crise, trampo, ideologia, pause
E é aqui onde nóis entende a Amy Winehouse
Hoje cedo
Quando eu acordei e não te vi
Eu pensei em tanta coisa
Tive medo
Ah, como eu chorei
Eu sofri em segredo
Tudo isso hoje cedo
Vagabundo, a trilha
É um precipício, penso o melhor
Quero salvar o mundo, pois desisti da minha família
E numa luta mais difícil a frustração vai ser menor
Digno de dó, só o pó, vazio, comum
Que já é moda no século XXI
Blacks com voz sagaz gravada
Contra vilões que sangram a quebrada
Só que raps por nóiz, por paz, mais nada
Me pôs nas Gerais, numa cela trancada
Eu lembrei do Racionais, reflexão
Aí, "os próprio preto num 'tá nem aí com isso, não"
É um clichê romântico, triste
Vai perceber, vai ver, se matou e o paraíso não existe
Eu ainda sou o Emicida da Rinha
Lotei casas do Sul ao Norte,
Mas esvaziei a minha
E vou por aí, Taliban
Vendo os boy beber dois mês de salário da minha irmã
Hennessys, avelãs, camarins, fãs, globais
Mano, onde eles tavam há dez anos atrás?
Showbiz como a regra diz, lek
A sociedade vende Jesus, por que não ia vender rap?
O mundo vai se ocupar com seu cifrão
Dizendo que a miséria é quem carecia de atenção
Hoje cedo
Quando eu acordei e não te vi
Eu pensei em tanta coisa
Tive medo
Ah, como eu chorei
Eu sofri em segredo
Tudo isso hoje cedo`


const colors = ['#143059', '#2F6B9A', '#82a6c2'];

function wordFreq(text) {
  const words = text.replace(/\./g, '').split(/\s/);
  const freqMap = {};

  for (const w of words) {
    if (!freqMap[w]) freqMap[w] = 0;
    freqMap[w] += 1;
  }
  return Object.keys(freqMap).map((word) => ({ text: word, value: freqMap[word] }));
}

function getRotationDegree() {
  const rand = Math.random();
  const degree = rand > 0.5 ? 60 : -60;
  return rand * degree;
}

const words = wordFreq(totoAfricaLyrics);
console.log('words', words)
const fontScale = scaleLog({
  domain: [Math.min(...words.map((w) => w.value)), Math.max(...words.map((w) => w.value))],
  range: [10, 100],
});
const fontSizeSetter = (datum) => fontScale(datum.value);

const fixedValueGenerator = () => 0.5;


export function WordcloudPronunciation({ width, height, showControls }) {
  const [spiralType, setSpiralType] = useState('archimedean');
  const [withRotation, setWithRotation] = useState(false);

  return (
    <div className="wordcloud">
      <Wordcloud
        words={words}
        width={width}
        height={height}
        fontSize={fontSizeSetter}
        font={'Impact'}
        padding={2}
        spiral={spiralType}
        rotate={withRotation ? getRotationDegree : 0}
        random={fixedValueGenerator}
      >
        {(cloudWords) =>
          cloudWords.map((w, i) => (
            <Text
              key={w.text}
              fill={colors[i % colors.length]}
              textAnchor={'middle'}
              transform={`translate(${w.x}, ${w.y}) rotate(${w.rotate})`}
              fontSize={w.size}
              fontFamily={w.font}
            >
              {w.text}
            </Text>
          ))
        }
      </Wordcloud>
      {showControls && (
        <div>
          <label>
            Spiral type &nbsp;
            <select
              onChange={(e) => setSpiralType(e.target.value)}
              value={spiralType}
            >
              <option key={'archimedean'} value={'archimedean'}>
                archimedean
              </option>
              <option key={'rectangular'} value={'rectangular'}>
                rectangular
              </option>
            </select>
          </label>
          <label>
            With rotation &nbsp;
            <input
              type="checkbox"
              checked={withRotation}
              onChange={() => setWithRotation(!withRotation)}
            />
          </label>
          <br />
        </div>
      )}
      <style jsx>{`
        .wordcloud {
          display: flex;
          flex-direction: column;
          user-select: none;
        }
        .wordcloud svg {
          margin: 1rem 0;
          cursor: pointer;
        }

        .wordcloud label {
          display: inline-flex;
          align-items: center;
          font-size: 14px;
          margin-right: 8px;
        }
        .wordcloud textarea {
          min-height: 100px;
        }
      `}</style>
    </div>
  );
}
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
  const { push } = useRouter()

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

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Everylang
        </Typography>

        <Grid container spacing={3}>
          


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
            <AnalyticsCurrentVisits
              title="Erros mais comuns de gramática"
              chart={{
                // categories: ['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math'],
                series: [
                  { label: 'Verb tense', value: 4344 },
                  { label: 'Present perfect', value: 5435 },
                  { label: 'Spelling', value: 1443 },
                  { label: 'Feature', value: 4443 },
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

          
        </Grid>

{/* <Box>
  <Card>
    <CardHeader title='Palavras com maior dificuldade' />
    <CardContent>

  <WordcloudPronunciation width={600} height={300} showControls={true} />
    </CardContent>
  </Card>
</Box> */}
        {/* <FetchController /> */}

        <Box mb={4}>
        <Typography variant='h5' sx={{ mb: 2 }}>Gerencie lições com inteligência artificial</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Box
            onClick={() => push(PATH_DASHBOARD.lessonPronunciation.list)}
            >
            <HomeOptions
              title="Pronúncia"
              // total={2}
              color="info"
              icon={<VoiceChatIcon />}
            />
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
          <Box
            onClick={() => push(PATH_DASHBOARD.googleAds.new)}
            >
            <HomeOptions
              title="Gramática"
              // total={2}
              color="warning"
              icon={<TextSnippetIcon />}
            />
          </Box>
          </Grid>

          {/* <Grid item xs={12} sm={6} md={3}>
            <AnalyticsWidgetSummary
              title="Item Orders"
              total={1723315}
              color="warning"
              icon="ant-design:windows-filled"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AnalyticsWidgetSummary
              title="Bug Reports"
              total={234}
              color="error"
              icon="ant-design:bug-filled"
            />
          </Grid> */}

        </Grid>
        </Box>

       <Box mb={4}>
       <Typography variant='h5' sx={{ mb: 2 }}>Sua página web</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
          <Box
            onClick={() => push(PATH_DASHBOARD.mypage.main)}
            >
            <HomeOptions
              title="Editar página"
              // total={2}
              // color="info"
              icon={<WebIcon />}
            />
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
          <Box
            onClick={() => push(PATH_DASHBOARD.general.analytics)}
            >
            <HomeOptions
              title="Analisar métricas"
              // total={2}
              color="error"
              icon={<LeaderboardIcon />}
            />
            </Box>
          </Grid>

          {/* <Grid item xs={12} sm={6} md={3}>
            <AnalyticsWidgetSummary
              title="Item Orders"
              total={1723315}
              color="warning"
              icon="ant-design:windows-filled"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AnalyticsWidgetSummary
              title="Bug Reports"
              total={234}
              color="error"
              icon="ant-design:bug-filled"
            />
          </Grid> */}

        </Grid>
       </Box>
      </Container>
    </>
  );
}
