// next
import Head from 'next/head';
import { useRouter } from 'next/router'
// @mui
import { Container, Typography } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../../routes/paths';
// layouts
import DashboardLayout from '../../../../../layouts/dashboard';
// components
import { useSettingsContext } from '../../../../../components/settings';
import CustomBreadcrumbs from '../../../../../components/custom-breadcrumbs';
// sections
import StudentLessonInsight from '../../../../../sections/@dashboard/student/StudentLessonInsight';

// ----------------------------------------------------------------------

UserCreatePage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function UserCreatePage() {
  const { themeStretch } = useSettingsContext();
  const { query: { lessonid } } = useRouter()

  return (
    <>
      <Head>
        <title> Student | Everylang</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <StudentLessonInsight lessonId={lessonid} />
      </Container>
    </>
  );
}
