// next
import Head from 'next/head';
import { useRouter } from 'next/router'
// @mui
import { Container, Typography } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// layouts
import DashboardLayout from '../../../../layouts/dashboard';
// components
import { useSettingsContext } from '../../../../components/settings';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
// sections
import UserNewEditForm from '../../../../sections/@dashboard/pronunciation/content';

// ----------------------------------------------------------------------

UserCreatePage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function UserCreatePage() {
  const { themeStretch } = useSettingsContext();
  const { query: { adId } } = useRouter()

  return (
    <>
      <Head>
        <title> Pronunciation | Everylang</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
      <Typography variant="h4">Lição de pronúncia</Typography>
        <UserNewEditForm adId={adId} />
      </Container>
    </>
  );
}
