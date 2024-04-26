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

// ----------------------------------------------------------------------

UserTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  onSelectRow: PropTypes.func,
};

function UserTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow }) {
  const { 
    sentence,
    totalTries,
    status,
    score,
    speedy,
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
      <TableRow hover selected={selected} onClick={() => status === 'done' ? onEditRow() : function(){} }>
        <TableCell>
          <Stack direction="column" alignItems="left" spacing={2}>
            
          </Stack>
          <Box maxWidth={600}>
          <Typography variant="body1">
            {sentence}
            </Typography>
          </Box>
        </TableCell>

        <TableCell align="left">
        <Stack direction="row" alignItems="center" spacing={2}>
        <Label
            variant="outlined"
            // color='success'
            sx={{ color: '#7635dc'}}
          >
            {totalTries || '---'}
          </Label>
          <Button variant='contained' disabled={status !== 'done'}>Ouvir</Button>
            </Stack>
         </TableCell>

        
        <TableCell align="left">
          <Label
            variant="soft"
            color={status === 'done' ? 'success' : 'error'}
            // sx={{ backgroundColor: `status === 'done' ? ${#7635dc} : 'error'`, color: 'white'}}
          >
            {status}
          </Label></TableCell>
        
        
        <TableCell align="left">
          <Label
            variant="soft"
            color='warning'
          >
            {score || '---'}
          </Label></TableCell>
        
        
        <TableCell align="left">
          <Label
            variant="soft"
            color='warning'
          >
            {speedy || '---'}
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
  { id: 'sentence', label: 'Frases', align: 'left' },
  { id: 'tries', label: 'Tentativas', align: 'left' },
  { id: 'status', label: 'Status', align: 'left' },
  { id: 'score', label: 'Pontuação geral', align: 'left' },
  { id: 'speedy', label: 'Pontuação de speedy', align: 'left' },
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
    <Box>
      <Typography>Tentativas</Typography>
      <Typography>{sentence}</Typography>
    </Box>

    {
      tries.map(item => (<Box key={item.sentence}>
           <AudioPlayer
                              defaultDuration=''
                              showJumpControls={false}
                              autoPlayAfterSrcChange={false}
                              showDownloadProgress={false}
                              showFilledProgress={false}
                              src={item.audioURL}
                              onPlay={e => console.log(`onPlay`)}
                            />
      </Box>))
    }
    </Box>
  )
}

// ----------------------------------------------------------------------

StudentLessonList.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function StudentLessonList() {
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

  const [tableData, setTableData] = useState([
    { 
      id: 1,
      sentence: 'Excuse me, where is the nearest bus stop?',
      // totalTries: 3,
      status: 'pending',
      // score: 80,
      // speedy: 90,
      // createdAt: '2024-10-10',
      // tries: [
      //     {
      //       audioURL: 'https://everylang.s3.us-east-1.amazonaws.com/pronunciation-demo/TravessadoDrBarros3mp3_dafe26acea.mp3',
      //       score: 80,
      //       speedy: 90,
      //       sentenceScored: 'Excuse me, where is the nearest bus stop?',
      //       wordsScore: [{ word: 'Excuse', score: 90}, { word: 'me', score: 90}, { word: 'where', score: 90}, { word: 'is', score: 90}, { word: 'the', score: 90}, { word: 'nearest', score: 90}, { word: 'bus', score: 90}, { word: 'stop', score: 90}]
      //     }
      //   ]
    },
    { 
      id: 2,
      sentence: 'Excuse me, where is the nearest bus stop?',
      totalTries: 3,
      status: 'done',
      score: 80,
      speedy: 90,
      createdAt: '2024-10-10',
      tries: [
          {
            audioURL: 'https://everylang.s3.us-east-1.amazonaws.com/pronunciation-demo/TravessadoDrBarros3mp3_dafe26acea.mp3',
            score: 80,
            speedy: 90,
            sentenceScored: 'Excuse me, where is the nearest bus stop?',
            wordsScore: [{ word: 'Excuse', score: 90}, { word: 'me', score: 90}, { word: 'where', score: 90}, { word: 'is', score: 90}, { word: 'the', score: 90}, { word: 'nearest', score: 90}, { word: 'bus', score: 90}, { word: 'stop', score: 90}]
          }
        ]
    },
    { 
      id: 3,
      sentence: 'Excuse me, where is the nearest bus stop?',
      totalTries: 3,
      status: 'done',
      score: 80,
      speedy: 90,
      createdAt: '2024-10-10',
      tries: [
          {
            audioURL: 'https://everylang.s3.us-east-1.amazonaws.com/pronunciation-demo/TravessadoDrBarros3mp3_dafe26acea.mp3',
            score: 80,
            speedy: 90,
            sentenceScored: 'Excuse me, where is the nearest bus stop?',
            wordsScore: [{ word: 'Excuse', score: 90}, { word: 'me', score: 90}, { word: 'where', score: 90}, { word: 'is', score: 90}, { word: 'the', score: 90}, { word: 'nearest', score: 90}, { word: 'bus', score: 90}, { word: 'stop', score: 90}]
          }
        ]
    },
  ]);

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

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(order, orderBy),
    // filterName,
    // filterRole,
    // filterStatus,
  });

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

  const isNotFound = !dataFiltered.length


  const handleEditRow = (adId) => {
    // push(PATH_DASHBOARD.lessonPronunciation.content(adId));
    handleOpenDrawer('pronunciationTries')
  };

  return (
    <>
      
        

        <Card>

        <CardHeader title='Lições' subheader='Pronúncia e gramática' sx={{ mb: 3 }} />

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
                    key={row._id}
                    row={row}
                    selected={selected.includes(row._id)}
                    onSelectRow={() => onSelectRow(row._id)}
                    // onDeleteRow={() => handleDeleteRow(row._id)}
                    onEditRow={() => handleEditRow(row._id)}
                  />
                  ))}

                  <TableEmptyRows height={denseHeight} emptyRows={emptyRows(page, rowsPerPage, tableData.length)} />

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
