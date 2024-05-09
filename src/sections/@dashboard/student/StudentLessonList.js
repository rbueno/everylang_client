import { paramCase } from 'change-case';
import { useState, useEffect } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
// next
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
// @mui
import {
  Tab,
  Tabs,
  Card,
  CardHeader,
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
  Avatar,
  Checkbox,
  TableRow,
  MenuItem,
  TableCell,
  Drawer
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// _mock_
import { _userList } from '../../../_mock/arrays';
// layouts
import DashboardLayout from '../../../layouts/dashboard';
// components
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
import ConfirmDialog from '../../../components/confirm-dialog';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../../components/settings';
import {
  useTable,
  getComparator,
  emptyRows,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from '../../../components/table';
// sections

import { useAuthContext } from '../../../auth/useAuthContext'
import api from '../../../utils/axios'

import PropTypes from 'prop-types';
import { format } from 'date-fns'

// components
import Label from '../../../components/label';
import MenuPopover from '../../../components/menu-popover';
import { fDate } from '../../../utils/formatTime';
import StudentLessonWordsList from './StudentLessonWordsList'

import VoiceChatIcon from '@mui/icons-material/VoiceChat';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';

// ----------------------------------------------------------------------

const SECTIONS = [
  {
    value: 'pronunciationSection',
    label: 'Pronúncia',
    icon:  <VoiceChatIcon />,
    component: <Box>Exercícios de pronúncia</Box>,
  },
  {
    value: 'grammarSection',
    label: 'Gramática',
    icon: <TextSnippetIcon />,
    component: <Box>Exercícios de gramática</Box>,
  },
];


UserTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  onSelectRow: PropTypes.func,
};

function UserTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow }) {
  const { 
    internalTitle,
    languageLevel,
    learningLanguage,
    totalPhrases,
    status,
    createdAt
  } = row;

  const [openConfirm, setOpenConfirm] = useState(false);

  const [openPopover, setOpenPopover] = useState(null);

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  return (
    <>
      <TableRow hover selected={selected} onClick={() => onEditRow() }>
        <TableCell>
          <Stack direction="column" alignItems="left" spacing={2}>
            
          </Stack>
          <Box maxWidth={600}>
          <Typography variant="body1">
            {internalTitle || '---'}
            </Typography>
          </Box>
        </TableCell>

        <TableCell align="left">
        
        <Label
            variant="outlined"
            // color='success'
            sx={{ color: '#7635dc'}}
          >
            {languageLevel}
          </Label>
         
         
         </TableCell>
        <TableCell align="left">
        
        <Label
            variant="outlined"
            // color='success'
            sx={{ color: '#7635dc'}}
          >
            {learningLanguage}
          </Label>
         
         
         </TableCell>

         <TableCell align="left">
          <Label
            variant="soft"
            color='warning'
          >
            {totalPhrases}
          </Label></TableCell>


        <TableCell align="left">
          <Label
            variant="soft"
            color={status === 'done' ? 'success' : 'error'}
            // sx={{ backgroundColor: `status === 'done' ? ${#7635dc} : 'error'`, color: 'white'}}
          >
            {status}
          </Label></TableCell>
        
        
      
        
        


          

        <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {createdAt ? format(new Date(createdAt), 'dd/MM/yy') : '---'}
        {/* {fDate(createdAt)} */}
        
        </TableCell>

        {/* <TableCell>{format(new Date(row.checkIn), 'dd MMM yyyy')}</TableCell> */}

        {/* <TableCell align="right">
          <IconButton color={openPopover ? 'inherit' : 'default'} onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell> */}
      </TableRow>

      {/* <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            onEditRow();
            handleClosePopover();
          }}
        >
          <Iconify icon="eva:edit-fill" />
          Abrir
        </MenuItem>
      </MenuPopover> */}
    </>
  );
}


// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'internalTitle', label: 'Nome Interno', align: 'left' },
  { id: 'languageLevel', label: 'Nível', align: 'left' },
  { id: 'learningLanguage', label: 'Estudo', align: 'left' },
  { id: 'totalPhrases', label: 'Exercícios', align: 'left' },
  { id: 'status', label: 'Status', align: 'left' },
  { id: 'createdAt', label: 'Criado em', align: 'left' },
  // { id: 'role', label: 'Permissão', align: 'left' },
  // { id: 'company', label: 'Negócio', align: 'left' },
  // { id: 'isVerified', label: 'Verified', align: 'center' },
  // { id: 'status', label: 'Status', align: 'left' },
  // { id: '' },
];

const PronunciationTries = (props) => {
  const { sentence, tries } = props

  // audioURL: 'asd',
  //           score: 80,
  //           speedy: 90,
  //           sentenceScored: 'asd',
  //           wordsScore: [{ word: 'hi', score: 90}, { word: 'hi', score: 90}]
  return (
    <Box sx={{ width: 600 }}>
    <Box m={4}>
      
      <Typography variant='h5'>Frase</Typography>
      <Typography variant='subtitle1'>{sentence}</Typography>
    </Box>
    <Box marginLeft={4}>
      <Typography variant='h5'>Tentativas</Typography>
    </Box>

    {
      tries.map(item => (<Box key={item.id} m={4}>
           <AudioPlayer
                              defaultDuration=''
                              showJumpControls={false}
                              autoPlayAfterSrcChange={false}
                              showDownloadProgress={false}
                              showFilledProgress={false}
                              src={item.audioURL}
                              onPlay={e => console.log(`onPlay`)}
                            />
        <StudentLessonWordsList words={item.words}/>
      </Box>))
    }
    </Box>
  )
}

// ----------------------------------------------------------------------

StudentLessonList.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function StudentLessonList({ tableData }) {
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
  const [currentTab, setCurrentTab] = useState('pronunciationSection')
  // const [tableData, setTableData] = useState({
  //   pronunciationSection: [
  //     { 
  //       id: 1,
  //       internalName: 'Exercício 2',
  //       languageLevel: 'Avançado',
  //       learningLanguage: 'Inglês',
  //       totalExercises: 5,
  //       status: 'inProgress',
  //       createdAt: '2024-04-01'
  //     },
  //     { 
  //       id: 1,
  //       internalName: 'Exercício 1',
  //       languageLevel: 'Avançado',
  //       learningLanguage: 'Inglês',
  //       totalExercises: 5,
  //       status: 'done',
  //       createdAt: '2024-04-01'
  //     }, 
  //   ],
  //   grammarSection: [
  //     { 
  //       id: 1,
  //       internalName: 'Gramática Exercício 2',
  //       languageLevel: 'Avançado',
  //       learningLanguage: 'Inglês',
  //       totalExercises: 5,
  //       status: 'inProgress',
  //       createdAt: '2024-04-01'
  //     },
  //     { 
  //       id: 1,
  //       internalName: 'Gramática Exercício 1',
  //       languageLevel: 'Avançado',
  //       learningLanguage: 'Inglês',
  //       totalExercises: 5,
  //       status: 'done',
  //       createdAt: '2024-04-01'
  //     },
  //     { 
  //       id: 1,
  //       internalName: 'Gramática Exercício 1',
  //       languageLevel: 'Avançado',
  //       learningLanguage: 'Inglês',
  //       totalExercises: 5,
  //       status: 'done',
  //       createdAt: '2024-04-01'
  //     },
      
  //   ]
  // });

  const [openDrawer, setOpenDrawer] = useState(false)
  const [drawerContent, setDrawerContent] = useState(null)

const toggleDrawer = (open) => (event) => {
  if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
    return;
  }

  setOpenDrawer(open)
};

const handleOpenDrawer = (drawerForm) => {

  if (drawerForm === 'pronunciationTries') {
    setDrawerContent(<PronunciationTries
      sentence={tableData[1].sentence}
      tries={tableData[1].tries}
      />)
  }

  
  setOpenDrawer(true)
}

  

  const { push } = useRouter();

  // const dataFiltered = applyFilter({
  //   inputData: tableData,
  //   comparator: getComparator(order, orderBy),
  //   // filterName,
  //   // filterRole,
  //   // filterStatus,
  // });

  useEffect(() => {
    async function fetchData() {
      try {
        // const response = await api.get(`v1/everylang/lesson?lessonType=pronunciation`)
        // console.log('response lessons', response.data.lessons)
        // setTableData(response.data.lessons)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  },[currentWorkspace])

  const denseHeight = dense ? 52 : 72;

  const isNotFound = !tableData[currentTab].length


  const handleEditRow = (adId) => {
    push(PATH_DASHBOARD.student.lessonInsight(adId));
    // handleOpenDrawer('pronunciationTries')
  };

  return (
    <>
      
        

        <Card>

        <CardHeader title='Lições' subheader='Pronúncia e gramática' sx={{ mb: 3 }} />

        <Box>
        <Tabs variant="fullWidth" value={currentTab} onChange={(event, newValue) => setCurrentTab(newValue)}>
            {SECTIONS.map((tab) => (
              <Tab key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />
            ))}
          </Tabs>
    </Box>

          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            

            <Scrollbar>
            <Table size={dense ? 'small' : 'medium'}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={tableData[currentTab].length}
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
                  {tableData[currentTab].map((row) => (
                    <UserTableRow
                    key={row._id}
                    row={row}
                    selected={selected.includes(row._id)}
                    onSelectRow={() => onSelectRow(row._id)}
                    // onDeleteRow={() => handleDeleteRow(row._id)}
                    onEditRow={() => handleEditRow(row._id)}
                  />
                  ))}

                  <TableEmptyRows height={denseHeight} emptyRows={emptyRows(page, rowsPerPage, tableData[currentTab].length)} />

                  <TableNoData isNotFound={isNotFound} />
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>
        </Card>
        <Drawer
            anchor='right'
            open={openDrawer}
            onClose={toggleDrawer(false)}
          >
            {drawerContent}
          </Drawer>
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
