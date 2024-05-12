import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import mongoose, { Schema } from 'mongoose'


import Head from 'next/head';
// @mui
import { Tab, Card, Tabs, Container, Box, Chip, Stack, Avatar, Rating, Button, CardHeader, Typography } from '@mui/material';


import { m, useScroll, useSpring } from 'framer-motion';
// routes
import { PATH_DASHBOARD } from '../routes/paths';
// auth

// _mock_
import {
  _userAbout,
  _userFeeds,
  _userFriends,
  _userGallery,
  _userFollowers,
} from '../_mock/arrays';
// layouts
import DashboardLayout from '../layouts/dashboard';
import MainLayout from '../layouts/main';
// components
import Iconify from '../components/iconify';
import CustomBreadcrumbs from '../components/custom-breadcrumbs';

// sections
import {
  Profile,
  ProfileCover,
  ProfileFriends,
  ProfileGallery,
  ProfileFollowers,
} from '../sections/@dashboard/user/profile';

// import { Home } from '@mui/icons-material';
import NotFound from './404'
import api from '../utils/axios'


// sections
import {
  HomeHero,
  HomeMinimal,
  HomeDarkMode,
  TextLeft,
  HomeForDesigner,
  HomeColorPresets,
  HomePricingPlans,
  HomeAdvertisement,
  HomeCleanInterfaces,
  HomeHugePackElements,
  TextRight,
  HomeServiceL02,
  HomeServiceR2,
  HomeBanner,
  AboutHero
} from '../sections/home';
import { FaqsHero, FaqsCategory, FaqsList, FaqsForm } from '../sections/faqs';

import { MyPage } from '../sections/myPage'
import { useSettingsContext } from '../components/settings/SettingsContext';
// ----------------------------------------------------------------------

// UserProfilePage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;


// ----------------------------------------------------------------------


const appBrandColor = {
  youtube: { main: '#FF0000' },
  telegram: { main: '#229ED9' }
}

const eventEntry = ({ component, eventType, data }) => {


  const payload = {
    createdAt: new Date,
    context: { userAgent: '' },
    data: component,
    eventType,
    bid: data.businessId,
    pid: data._id,
    componentId: component?.componentId
  }
  
  fetch('/api/evententry', {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
}

Home.getLayout = (page) => <MainLayout> {page} </MainLayout>;

export default function Home() {
  const theme = useTheme();

  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

const homeContent = [
  { 
    textPosition: 'left',
    headText: 'Conversação Natural',
    bodyText: 'Converse por áudio e texto com Olivia, nossa IA que ajuda a tornar suas conversas fluidas e engajadoras. Ela ajusta a complexidade ao seu nível e fornece correções sutis de gramática e pronúncia ao longo do papo, sem julgamento.',
    imageURL: '/assets/images/home/everylang_conversation.png'
  },
  { 
    textPosition: 'right',
    headText: 'Exercícios de Pronúncia',
    bodyText: 'Receba feedback instantâneo e realize exercícios personalizados para corrigir suas dificuldades. A Olivia identifica padrões e cria atividades direcionadas para aperfeiçoar sua pronúncia de maneira eficaz.',
    imageURL: '/assets/images/home/everylang_pronunciation.png'
  },
  { 
    textPosition: 'left',
    headText: 'Exercícios de Gramática',
    bodyText: 'Corrija erros gramaticais comuns com orientações em tempo real. Os exercícios personalizados ajudam a desenvolver sua gramática de forma prática e adaptada às suas necessidades.',
    imageURL: '/assets/images/home/everylang_grammar.png'
  },
  { 
    textPosition: 'right',
    headText: 'Simulados Práticos',
    bodyText: 'Treine situações reais, como pedir em um restaurante ou fazer check-in em um hotel, para ganhar confiança e fluência. Ao final de cada simulado, você recebe feedback detalhado.',
    imageURL: '/assets/images/home/everylang_simulation.png'
  },
]

  return (
    <>
      <Head>
        <title>Estude pronúncia e gramática com conversação e exercícios via WhatsApp | Everylang</title>
        <meta name="description" content="Estude pronúncia e gramática com conversação e exercícios usando o WhatsApp." />
        <link href="https://www.everylang.ai" rel="canonical" />

        <meta property="og:title" content="Estude pronúncia e gramática com conversação e exercícios usando o WhatsApp." />
        <meta property="og:url" content="https://www.everylang.ai" />
        <meta property="og:description" content="Estude pronúncia e gramática com conversação e exercícios via WhatsApp" />
        <meta property="og:image" content="https://www.everylang.ai/assets/everylang_logo_purple_square.png" />
      </Head>

      <HomeBanner />

      <Box
        sx={{
          overflow: 'hidden',
          position: 'relative',
          bgcolor: 'background.default',
        }}
      >
        {
          homeContent.map((item) => (<Box key={item.id}>
            {item.textPosition === 'left' ? <TextLeft content={item} /> : <TextRight content={item} />}
          </Box>))
        }
        
        
<Box sx={{ backgroundColor: '#E2E2E2'  }}>

        <Container sx={{ pb: 10, pt: 10, textAlign: 'center'}}>
            <Typography variant="h2" sx={{ my: 3 }}>
              Perguntas frequêntes
            </Typography>
            {/* <m.div>
          </m.div> */}

          <m.div >
          <FaqsList />
          </m.div>
        </Container>
</Box>
        

        <AboutHero />
      </Box>
    </>
  );
}


