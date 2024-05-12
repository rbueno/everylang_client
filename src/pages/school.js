// next
import Head from 'next/head';
// @mui
import { Box, Container } from '@mui/material';
// layouts
import MainLayout from '../layouts/main';
// sections
import { AboutHero, AboutWhat, AboutTeam, AboutVision, AboutTestimonials, ContactForm } from '../sections/fonoaudiologo';

import {
  HomeBannerSchool,
} from '../sections/home';

// ----------------------------------------------------------------------

AboutPage.getLayout = (page) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>Everylang | professores e escola</title>
      </Head>

      <HomeBannerSchool />

      {/* <AboutWhat /> */}

      {/* <AboutVision /> */}

      {/* <Divider orientation="vertical" sx={{ my: 10, mx: 'auto', width: 2, height: 40 }} /> */}

      <AboutTeam />
      <Box mb={4}>
      <Container sx={{ textAlign: 'center' }}>
<ContactForm />

</Container>
      </Box>

      {/* <AboutTestimonials /> */}
    </>
  );
}
