import { paramCase } from 'change-case';
import { useState, useEffect } from 'react';
// next
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
// @mui
import {
  Tab,
  Tabs,
  Card,
  Table,
  Button,
  Tooltip,
  Divider,
  TableBody,
  Container,
  IconButton,
  TableContainer,
  Typography,
  Box,
  Stack,
  CardHeader,
  CardContent,
  Avatar
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import PermDataSettingIcon from '@mui/icons-material/PermDataSetting';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import NotesIcon from '@mui/icons-material/Notes';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// routes
import { PATH_DASHBOARD } from '../../../../../routes/paths';
// _mock_
import { _userList } from '../../../../../_mock/arrays';
// layouts
import DashboardLayout from '../../../../../layouts/dashboard';
// components
import Iconify from '../../../../../components/iconify';
import Scrollbar from '../../../../../components/scrollbar';
import Markdown from '../../../../../components/markdown';
import { useSettingsContext } from '../../../../../components/settings';
import {
  useTable,
  getComparator,
  emptyRows,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from '../../../../../components/table';
// sections
import { UserTableToolbar, UserTableRow } from '../../../../../sections/@dashboard/benchmarkInstagram/listPost';
import { useAuthContext } from '../../../../../auth/useAuthContext'
import api from '../../../../../utils/axios'
import { GraphEngagement } from '../../../../../sections/@dashboard/general/benchmark-analytics'
import useCopyToClipboard from '../../../../../hooks/useCopyToClipboard'
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'rank', label: 'Rank', align: 'left' },
  { id: 'midia', label: 'Mídia', align: 'left' },
  { id: 'score', label: 'Engajamento', align: 'left' },
  { id: 'link', label: 'Post', align: 'left' },
  // { id: 'analytic' },
  // { id: 'email', label: 'Criado em', align: 'left' },
  // { id: 'role', label: 'Permissão', align: 'left' },
  // { id: 'company', label: 'Negócio', align: 'left' },
  // { id: 'isVerified', label: 'Verified', align: 'center' },
  // { id: 'status', label: 'Status', align: 'left' },
  // { id: '' },
];

// ----------------------------------------------------------------------

UserListPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function UserListPage() {
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    //
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  const { themeStretch } = useSettingsContext();
  const { user, workspaces, currentWorkspace } = useAuthContext()

  const [tableData, setTableData] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [profile, setProfile] = useState([]);
  const [contentAnalysis, setContentAnalysis] = useState(null);
  const [contentSugestion, setContentSugestion] = useState(null);
  // const [contentAnalytics, setContentAnalytics] = useState(null);
  // const [isProcessing , setPro]

  const { push } = useRouter();
  const { copy } = useCopyToClipboard();
  const { enqueueSnackbar } = useSnackbar();
  const { query: { id } } = useRouter()

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(order, orderBy),
    // filterName,
    // filterRole,
    // filterStatus,
  });

  const refresh = async () => {
    try {
      // const response = await api.get(`v1/adgenerator/google`)
      const responseRanking = await api.post(`v1/benchmark/instagram/ranking/refresh`)
      console.log('responseRanking.data update', responseRanking.data)
      setTableData(responseRanking.data.ranking)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    async function fetchData() {
      if(id) {
        try {
          // const response = await api.get(`v1/adgenerator/google`)
          const response = await api.get(`/v1/benchmark/instagram/profile/${id}`)
          console.log('post analytics response', response.data.orderedBycreatedAt)
          console.log('response?.data?.profile', response?.data?.profile)
          setGraphData(response?.data?.orderedBycreatedAt || []) 
          setTableData(response?.data?.orderedByScore || []) 
          setProfile(response?.data?.profile || []) 

          const fetchResponse = async (adId, delay = 15000) => {
            await new Promise((resolve) => setTimeout(resolve, delay))
            const contentAnalyticsResponse = await api.get(`/v1/benchmark/instagram/contentAnalytics/${adId}`)
            console.log('contentAnalyticsResponse', contentAnalyticsResponse.data)
            if (contentAnalyticsResponse.data.status === 'done') return contentAnalyticsResponse.data
             return fetchResponse(adId, 9000)
          }
          const responseContentAnalytics =  await fetchResponse(id, 100)

          setContentAnalysis(responseContentAnalytics.contentAnalytic.postAnalytic)
          setContentSugestion(responseContentAnalytics.contentAnalytic.postSugestion)

        } catch (error) {
          console.log(error)
        }
      }
    }
    fetchData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[id])

  const denseHeight = dense ? 52 : 72;

  const isNotFound = !dataFiltered.length


  const handleAnalyticRow = (adId) => {
    push(PATH_DASHBOARD.benchmark.instagram.content(adId));
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
  const postGenerate = async () => {
    console.log('profile', profile)
    try {
      // const response = await api.get(`v1/adgenerator/google`)
      const response = await api.post(`/v1/benchmark/instagram/post-generate`, {
        "username": profile
    })
      console.log('postGenerate', response.data)

      setContentAnalysis(response.data.responseAnalytic)
      setContentSugestion(response.data.responseSugestion)
    
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Head>
        <title> Benchmark | Okahub</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
      <Box sx={{ mb: 5 }}>
          <Stack direction="row" alignItems="center">
            <Box sx={{ flexGrow: 1 }}>
        <Button href={PATH_DASHBOARD.benchmark.instagram.rank} startIcon={<ArrowBackIcon />}>Voltar para ranking</Button>
            <Typography variant="h4" gutterBottom>
              Análise - Instagram
            </Typography>
            {/* <Typography variant="body1" gutterBottom>
                  Análise dos posts por engajamento
                </Typography> */}
                <Card style={{ border: "none", boxShadow: "none" }}>
                <CardHeader
               avatar={
                 <Avatar alt={profile.username} src={profile.avatarUrl} aria-label="recipe" />
               }
              //  action={
              //    <IconButton aria-label="settings">
              //      <MoreVertIcon />
              //    </IconButton>
              //  }
               title={profile.name}
               subheader={`@${profile.username}`}
             />
                </Card>
            </Box>
          </Stack>
        </Box>

        {/* <Box mb={2}>

        <Button href={PATH_DASHBOARD.benchmark.instagram.rank} startIcon={<ArrowBackIcon />}>Ranking</Button>
        <Typography variant='h3'>Benchmark Instagram</Typography>
        </Box> */}
        
        <Box mb={2}>
        <GraphEngagement
              title="Engajamento diário"
              subheader="Gráfico da taxa diária de engajamento"
              chart={{
                categories: graphData.map((item) => item.createdAt.slice(0,10)),
                series: [
                  {
                    data: [
                      { name: 'Engajamento', data: graphData.map((item) => item.score) },
                    ],
                  },
                ],
              }}
            />
        </Box>
        <Box mb={2}>
        <Card>
        <CardHeader title='Ranking por engajamento' subheader="Lista de posts rankeados pela taxa de engajamento diário" sx={{ mb: 3 }} />
          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            

            <Scrollbar>
            <Table size={dense ? 'small' : 'medium'}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={tableData.length}
                  numSelected={selected.length}
                  onSort={onSort}
                  // onSelectAllRows={(checked) =>
                  //   onSelectAllRows(
                  //     checked,
                  //     tableData.map((row) => row.id)
                  //   )
                  // }
                />

                <TableBody>
                  {dataFiltered.map((row) => (
                    <UserTableRow
                    key={row.postUrl}
                    row={row}
                    selected={selected.includes(row._id)}
                    onSelectRow={() => onSelectRow(row._id)}
                    // onDeleteRow={() => handleDeleteRow(row._id)}
                    onAnalyticRow={() => handleAnalyticRow(row.benchmarkProfileId)}
                  />
                  ))}

                  <TableEmptyRows height={denseHeight} emptyRows={emptyRows(page, rowsPerPage, tableData.length)} />

                  <TableNoData isNotFound={isNotFound} />
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>
        </Card>
        </Box>

        <Divider variant="middle" />

        <Box sx={{ mb: 2 }}>
          <Stack direction="row" alignItems="center">
            <Box sx={{ flexGrow: 1 }}>
        
            <Typography variant="h4" gutterBottom>
            Análise e geração de conteúdo com Inteligência Artificial
            </Typography>
            </Box>
          </Stack>
        </Box>

        <Box mb={2}>
          <Card>
          <CardHeader
            // action={
            //   <Button variant="contained"
            //     startIcon={<PermDataSettingIcon />}
            //     onClick={() => postGenerate()}>
            //       Gerar nova Análise
            //   </Button>
            // }
           avatar={<TipsAndUpdatesIcon />} title='Análise de conteúdo' subheader="Insights e feedbacks sobre os posts com maior engajamento." />
          {/* <Box>
            <TipsAndUpdatesIcon />
            <Typography> teste</Typography>

          </Box> */}

{/* <Stack direction="row" alignItems="center">
            <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h4" gutterBottom>
                  Benchmark - Instagram
                </Typography>
            <Typography variant="body1" gutterBottom>
                  Ranking de engajamento
                </Typography>
            </Box>

            <Box sx={{ flexShrink: 0 }}> 
                <Button variant="contained"
                  startIcon={<Iconify icon="eva:plus-fill" />}
                  onClick={() => postGenerate()}>Gerar</Button>
            </Box>
          </Stack> */}

          
          {/* <Box>
            <Markdown 
              children={contentAnalysis || 'sem análise'}
            />
          </Box> */}
          <CardContent>
            {/* <Box m={2}><div dangerouslySetInnerHTML={{ __html: contentAnalysis }} /></Box> */}
          <Markdown 
              children={contentAnalysis || '...Aguardando análise. Isso pode levar até 3 minutos'}
            />
          {/* <Markdown
                    children={`<b>O que os posts tem em comum?</b> <br/> O que os 3 posts tem em comum é o tema de produtividade e o direcionamento para ferramentas que ajudam a aumentá-la`}
                    // sx={{
                    //   px: { md: 5 },
                    // }}
                  />
          <Markdown
                    children={`<b>Qual é o tom em comum?</b> <br/> O tom em comum dos 3 posts é motivacional e encorajador, com o objetivo de incentivar os seguidores a utilizarem as ferramentas mencionadas e alcançarem uma maior produtividade`}
                    // sx={{
                    //   px: { md: 5 },
                    // }}
                  />
          <Markdown
                    children={`<b>Principais palavras chaves?</b> <br/> As principais palavras chave em comum entre os 3 posts são produtividade, redes sociais, ferramentas, link da bio, e inspiração`}
                    // sx={{
                    //   px: { md: 5 },
                    // }}
                  /> */}
          </CardContent>
          


          


          </Card>
        </Box>

        <Box mb={2}>
          <Card>
          <CardHeader avatar={<NotesIcon/>} title='Inspiração de post original' subheader="Sugestão baseada nos insight dos posts mais engajados."  />
          <CardContent>
            <Box mb={2}>
            {/* <Box m={2}><div dangerouslySetInnerHTML={{ __html: contentSugestion }} /></Box> */}
            <Markdown 
              children={contentSugestion || '...Aguardando análise. Isso pode levar até 3 minutos'}
            />
                  {/* <Markdown
                    children={`<b>Ideia de design:</b> Foto de uma pessoa fazendo exercício em casa`}
                    // sx={{
                    //   px: { md: 5 },
                    // }}
                  />
                  <Markdown
                    children={`<b>Texto principal:</b> Com nosso curso online você pode aprender a fazer exercícios em casa, economizando tempo e dinheiro. Em apenas 10 minutos por dia, você pode atingir seu objetivo de perda de peso e ter um estilo de vida saudável e ativo. Inscreva-se agora!`}
                    // sx={{
                    //   px: { md: 5 },
                    // }}
                  />
                  <Markdown
                    children={`<b>hashtags:</b> #teste1 #teste3 #teste4 #teste5`}
                    // sx={{
                    //   px: { md: 5 },
                    // }}
                  /> */}
                </Box>
                {
                  contentSugestion && <Box mt={2}>
                  <Button
                    onClick={() => handleCopyLink(`Ideia de design: `)}
                    variant='contained'
                    startIcon={<ContentCopyIcon />}
                  >
                    Copiar
                  </Button>
                </Box>
                }
                  
          </CardContent>
          </Card>
        </Box>
        
      </Container>
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter({ inputData, comparator, filterName, filterStatus, filterRole }) {
  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  // if (filterName) {
  //   inputData = inputData.filter(
  //     (user) => user.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
  //   );
  // }

  // if (filterStatus !== 'all') {
  //   inputData = inputData.filter((user) => user.status === filterStatus);
  // }

  // if (filterRole !== 'all') {
  //   inputData = inputData.filter((user) => user.role === filterRole);
  // }

  return inputData;
}
