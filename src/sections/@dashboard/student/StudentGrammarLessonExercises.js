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
  CardContent,
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
import Markdown from '../../../components/markdown'
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

import { styled } from '@mui/material/styles'
const DrawerRootStyled = styled('div')(({theme}) => ({
  [theme.breakpoints.up('xs')]: {
    width: 350
  },
  [theme.breakpoints.up('md')]: {
    width: 600
  }
}))

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
    question,
    answer,
    discussion,
    status,
    score,
    updatedAt
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
            {question.slice(0,30)}
            </Typography>
          </Box>
        </TableCell>
       
        <TableCell>
          <Stack direction="column" alignItems="left" spacing={2}>
            
          </Stack>
          <Box maxWidth={600}>
          <Typography variant="body1">
            {answer}
            </Typography>
          </Box>
        </TableCell>
      
        <TableCell>
          <Stack direction="column" alignItems="left" spacing={2}>
            
          </Stack>
          <Box maxWidth={600}>
          <Typography variant="body1">
            {discussion.length > 0 && discussion[0].content}
            </Typography>
          </Box>
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
            
            {(score !== 0 && !score) ? '---' : score}
          </Label></TableCell>
        
{/*         
        <TableCell align="left">
          <Label
            variant="soft"
            color='warning'
          >
            {speed || '---'}
          </Label></TableCell> */}

          

        <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {updatedAt ? format(new Date(updatedAt), 'dd/MM/yy') : '---'}
        {/* {fDate(createdAt)} */}
        
        </TableCell>

        <TableCell align="left">
        <Stack direction="row" alignItems="center" spacing={2}>
        {/* <Label
            variant="outlined"
            // color='success'
            sx={{ color: '#7635dc'}}
          >
            {tries || '---'}
          </Label> */}
          <Button variant='contained' disabled={status !== 'done'}>Abrir</Button>
            </Stack>
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

const GRAMMAR_TABLE_HEAD = [
  { id: 'question', label: 'Pergunta', align: 'left' },
  { id: 'answer', label: 'Resp. Esperada', align: 'left' },
  { id: 'answerStudent', label: 'Resp. Aluno', align: 'left' },
  { id: 'status', label: 'Status', align: 'left' },
  { id: 'score', label: 'Pontuação', align: 'left' },
  { id: 'updatedAt', label: 'Atualizado em', align: 'left' },
  { id: 'check', label: 'Conferir', align: 'left' },
  // { id: 'role', label: 'Permissão', align: 'left' },
  // { id: 'company', label: 'Negócio', align: 'left' },
  // { id: 'isVerified', label: 'Verified', align: 'center' },
  // { id: 'status', label: 'Status', align: 'left' },
  // { id: '' },
];

const GrammarExerciseDiscussion = (props) => {
  const { discussion = [] } = props
console.log('GrammarExerciseDiscussion', discussion)
  // audioURL: 'asd',
  //           score: 80,
  //           speedy: 90,
  //           sentenceScored: 'asd',
  //           wordsScore: [{ word: 'hi', score: 90}, { word: 'hi', score: 90}]
  return (
    <DrawerRootStyled>
    <Box m={4}>
      
      <Typography variant='h5'>Pergunta:</Typography>
      <Box m={2} sx={{ backgroundColor: '#fff4f1', p: 2}} >
                            {/* <Typography variant="subtitle2">- Questão:</Typography> */}
                            {/* <Typography sx={{ marginLeft: 1}} variant="caption">{content?.question}</Typography> */}
                            <Markdown
                                children={discussion?.question}
                          // sx={{
                          //   px: { md: 5 },
                          // }}
                        />
                          </Box>
    </Box>

    {/* <Box m={4}>
    <Card>
      <CardHeader title='Pergunta' />
      <CardContent>
      <Box m={2} sx={{ backgroundColor: '#fff4f1', p: 2}} >
                            <Markdown
                                children={content?.question}
                          // sx={{
                          //   px: { md: 5 },
                          // }}
                        />
                          </Box>
      </CardContent>
    </Card>
    </Box> */}
    

    {
      discussion.discussion.map((itemDiscussion) => (<Box key={itemDiscussion.content}>
         <Box m={4}>
          <Card>
            <CardHeader title={itemDiscussion.role === 'user' ? 'Resposta aluno' : 'Feedback Olivia'} />
            <CardContent>
              <Typography>{itemDiscussion.content}</Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>))
    }
    
    </DrawerRootStyled>
  )
}

// ----------------------------------------------------------------------

StudentGrammarLessonExercises.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function StudentGrammarLessonExercises({ grammarExercises, grammarAssessment }) {
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

  const [openDrawer, setOpenDrawer] = useState(false)
  const [drawerContent, setDrawerContent] = useState(null)

const toggleDrawer = (open) => (event) => {
  if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
    return;
  }

  setOpenDrawer(open)
};

const handleOpenDrawer = ({drawerForm, drawData }) => {

  if (drawerForm === 'grammarExerciseDiscussion') {
   


    setDrawerContent(<GrammarExerciseDiscussion
      discussion={drawData}
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

  const isNotFound = !grammarExercises.length


  const handleEditRow = ({ drawData }) => {



    
    handleOpenDrawer({ drawerForm: 'grammarExerciseDiscussion', drawData })
  };

  return (
    <>
      
        

        <Card>

        <CardHeader title='Exercícios' sx={{ mb: 3 }} />

          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            

            <Scrollbar>
            <Table size={dense ? 'small' : 'medium'}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={GRAMMAR_TABLE_HEAD}
                  rowCount={grammarExercises.length}
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
                  {grammarExercises.map((row) => (
                    <UserTableRow
                    key={row._id}
                    row={row}
                    selected={selected.includes(row._id)}
                    onSelectRow={() => onSelectRow(row._id)}
                    // onDeleteRow={() => handleDeleteRow(row._id)}
                    onEditRow={() => handleEditRow({ drawData: row })}
                  />
                  ))}

                  <TableEmptyRows height={denseHeight} emptyRows={emptyRows(page, rowsPerPage, grammarExercises.length)} />

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
