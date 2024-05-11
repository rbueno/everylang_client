import { m, useScroll } from 'framer-motion';
import { useEffect, useState } from 'react';
// next
import NextLink from 'next/link';
import NextImage from 'next/image';
// @mui
import { styled, alpha, useTheme } from '@mui/material/styles';
import { Button, Box, Link, Container, Typography, Stack, Grid } from '@mui/material';
// routes
import AndroidIcon from '@mui/icons-material/Android';
import AppleIcon from '@mui/icons-material/Apple';
import { PATH_DASHBOARD, PATH_FIGMA_PREVIEW, PATH_FREE_VERSION } from '../../routes/paths';
// hooks
import useResponsive from '../../hooks/useResponsive';
// utils
import { textGradient, bgGradient } from '../../utils/cssStyles';
// config
import { HEADER } from '../../config-global';
// theme
import { secondaryFont } from '../../theme/typography';
// components
import SvgColor from '../../components/svg-color';
import Iconify from '../../components/iconify';
import Image from '../../components/image';
import { MotionContainer, varFade } from '../../components/animate';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  // position: 'relative',
  ...bgGradient({
    color: alpha(theme.palette.background.default, theme.palette.mode === 'light' ? 0.9 : 0.94),
    imgUrl: '/assets/background/overlay_2.jpg',
  }),
  // [theme.breakpoints.up('md')]: {
  //   top: 0,
  //   left: 0,
  //   width: '100%',
  //   height: '100vh',
  //   position: 'fixed',
  // },
}));

const StyledDescription = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(5, 0),
  // height: '100%',
}));

const colorBSGray = '#8600b3'
const colorBSGreen = '#0073e6'

const StyledGradientText = styled(m.h1)(({ theme }) => ({
  ...textGradient(
    `300deg, ${colorBSGreen} 0%, ${colorBSGray} 25%, ${colorBSGreen} 50%, ${colorBSGray} 75%, ${colorBSGreen} 100%`
  ),
  backgroundSize: '400%',
  fontFamily: secondaryFont.style.fontFamily,
  fontSize: `${64 / 16}rem`,
  textAlign: 'center',
  lineHeight: 1,
  padding: 0,
  marginTop: 0,
  marginBottom: 0,
  letterSpacing: 4,
  [theme.breakpoints.up('md')]: {
    fontSize: `${96 / 16}rem`,
  },
}));

// ----------------------------------------------------------------------

export default function HomeHero() {
  const isDesktop = useResponsive('up', 'md');

  return (
      <StyledRoot>
        <Container sx={{ height: 1 }}>
        <Description />
        </Container>
      </StyledRoot>
  );
}

// ----------------------------------------------------------------------

function Description() {
  return (
    <StyledDescription>
      
      <Box marginBottom={-5}>

          <Image disabledEffect alt="logo" src="/logo/everylang_website_logo.png" sx={{ maxWidth: 120 }} />
      </Box>



      <m.div variants={varFade().in}>
        <StyledGradientText
          animate={{ backgroundPosition: '200% center' }}
          transition={{
            repeatType: 'reverse',
            ease: 'linear',
            duration: 20,
            repeat: Infinity,
          }}
        >
          Everylang
        </StyledGradientText>
      </m.div>

      
      <Box marginTop={5}>
      <Typography variant="h4" sx={{ textAlign: 'center' }}>
          Estude pronúncia e gramática com conversação e exercícios via WhatsApp
        </Typography>
      </Box>

     

      {/* <m.div variants={varFade().in}>
        <Typography variant="h3" sx={{ textAlign: 'center' }}>
          Teste grátis
        </Typography>
      </m.div> */}





      <m.div variants={varFade().in}>
        <Stack spacing={1.5} direction={{ xs: 'column-reverse', sm: 'row' }} sx={{ my: 5 }}>
          <Stack alignItems="center" spacing={2}>
      <Typography variant="h4" sx={{ textAlign: 'center' }}>
          Teste grátis
        </Typography>
          <Button
            // color="inherit"
            size="large"
            variant="contained"
            startIcon={<WhatsAppIcon/>}
            target="_blank"
            rel="noopener"
            href='https://wa.me/5511999284097?text=oi'
            // sx={{ borderColor: 'text.primary', width:"210px" }}
          >
            Começar agora
          </Button>
          </Stack>

          {/* <Button
            color="inherit"
            size="large"
            variant="outlined"
            startIcon={<AndroidIcon />}
            target="_blank"
            rel="noopener"
            href='https://play.google.com/store/apps/details?id=br.com.biosom.app&pli=1'
            sx={{ borderColor: 'text.primary', width:"180px"  }}
          >
            Google Play
          </Button> */}
        </Stack>
      </m.div>


    </StyledDescription>
  );
}

// ----------------------------------------------------------------------

