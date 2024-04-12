import { paramCase } from 'change-case';
// next
import Head from 'next/head';
import { useRouter } from 'next/router';
// @mui
import { Container, Typography } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// _mock_
import { _userList } from '../../../../_mock/arrays';
// layouts
import DashboardLayout from '../../../../layouts/dashboard';
// components
import { useSettingsContext } from '../../../../components/settings';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
// sections
import UserNewEditForm from '../../../../sections/@dashboard/pronunciation/UserNewEditForm';

// ----------------------------------------------------------------------

UserEditPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function UserEditPage() {
  const { themeStretch } = useSettingsContext();

  const {
    query: { lessonId },
  } = useRouter();


  return (
    <>
    <Head>
      <title> Pronúncia | Everylang</title>
    </Head>

    <Container maxWidth={themeStretch ? false : 'lg'}>
    <Typography variant="h4">Editar lição de Pronúncia</Typography>
    {/* <Typography variant="subtitle1" sx={{ mb: 5}}>Você criará os exercícios após criar o título e detalhes da lição</Typography> */}
    <UserNewEditForm isEdit lessonId={lessonId} />
    </Container>
  </>
  );
}
