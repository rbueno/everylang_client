import { paramCase } from 'change-case';
import { useState, useEffect } from 'react';
// next
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
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
  Stack
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
import { UserTableToolbar, UserTableRow } from '../../../sections/@dashboard/student/list';
import { useAuthContext } from '../../../auth/useAuthContext'
import api from '../../../utils/axios'

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'fullName', label: 'Nome completo', align: 'left' },
  { id: 'phoneNumber', label: 'Contato', align: 'left' },
  { id: 'languageLevel', label: 'Nível', align: 'left' },
  { id: 'languageLearning', label: 'Estuda', align: 'left' },
  // { id: 'lessons', label: 'Lições', align: 'left' },
  // { id: 'Ativo', label: 'Contato', align: 'left' },
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

  const mock = [
    { _id: '123asd', fullName: 'Rafael Bueno', phoneNumber: '351929345306', languageLevel: 'advanced', learningLanguage: 'english', active: true  },
    { _id: '123asd', fullName: 'Alexandre Andreoni', phoneNumber: '5511981294375', languageLevel: 'advanced', learningLanguage: 'english', active: true   },
    { _id: '123asd', fullName: 'Glauci Oliveira', phoneNumber: '5511949486465', languageLevel: 'advanced', learningLanguage: 'english', active: false },
    { _id: '123asd', fullName: 'Juliana Soprani', phoneNumber: '351929345307', languageLevel: 'advanced', learningLanguage: 'english', active: true   }
  ]
  const [tableData, setTableData] = useState([]);

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
        const response = await api.get(`v1/everylang/professor-students`)
        console.log('response students', response.data)
        setTableData(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  },[])

  const denseHeight = dense ? 52 : 72;

  const isNotFound = !dataFiltered.length


  const handleEditRow = (adId) => {
    push(PATH_DASHBOARD.student.insight(adId));
  };

  return (
    <>
      <Head>
        <title> Student | Everylang</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
      <Box sx={{ mb: 5 }}>
          <Stack direction="row" alignItems="center">
            <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h4" gutterBottom>
                  Alunos
                </Typography>
            {/* <Typography variant="body1" gutterBottom>
                  histórico
                </Typography> */}
            </Box>

            {/* <Box sx={{ flexShrink: 0 }}> 
            <Button
                  component={NextLink}
                  href={PATH_DASHBOARD.lessonPronunciation.new}
                  variant="contained"
                  startIcon={<Iconify icon="eva:plus-fill" />}
                >
                  Criar lição
                </Button>
            </Box> */}
          </Stack>
        </Box>
        

        <Card>

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
