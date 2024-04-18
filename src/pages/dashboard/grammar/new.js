// next
import Head from 'next/head';
// @mui
import { Container, Typography } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// layouts
import DashboardLayout from '../../../layouts/dashboard';
// components
import { useSettingsContext } from '../../../components/settings';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
// sections
import UserNewEditForm from '../../../sections/@dashboard/grammar/NewLessonSimpleForm';

// ----------------------------------------------------------------------

UserCreatePage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function UserCreatePage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Head>
        <title> Grammar | Everylang</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
      <Typography variant="h4">Criar nova lição de gramática</Typography>
      <Typography variant="subtitle1" sx={{ mb: 5}}>Você criará os exercícios após definir idioma e nível da lição</Typography>
        <UserNewEditForm />
      </Container>
    </>
  );
}
