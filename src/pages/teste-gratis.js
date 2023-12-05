// next
import Head from 'next/head';
// @mui
import { Container, Typography } from '@mui/material';
// layouts
import MainLayout from '../layouts/main';

// sections
import { AboutHero, AboutWhat, AboutTeam, AboutVision, AboutTestimonials } from '../sections/about';

// ----------------------------------------------------------------------

AboutPage.getLayout = (page) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function AboutPage() {
  return (
    <>
      <Head>
        <title> Teste Grátis | Pulse Everylang</title>
      </Head>

      <Container>
      <Typography>Irei analisar o seu Instagram gerar 3 dicas de posts automáticametne com base em seu negócio</Typography>
      <Typography>Irei gerar 3 dicas de posts automáticametne com base em seu negócio</Typography>

      </Container>
      
              
            

      {/* <AboutVision />

      <Divider orientation="vertical" sx={{ my: 10, mx: 'auto', width: 2, height: 40 }} />

      <AboutTeam />

      <AboutTestimonials /> */}
    </>
  );
}
