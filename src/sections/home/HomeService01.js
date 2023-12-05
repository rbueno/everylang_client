import { m } from 'framer-motion';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Button, Container, Typography, Grid, Stack } from '@mui/material';
// hooks
import useResponsive from '../../hooks/useResponsive';
// routes
import { PATH_ZONE_ON_STORE } from '../../routes/paths';
// components
import Image from '../../components/image';
import Iconify from '../../components/iconify';
import { MotionViewport, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  padding: theme.spacing(2, 0),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(2, 0),
  },
}));

// ----------------------------------------------------------------------

export default function HomeService01() {
  const isDesktop = useResponsive('up', 'md');

  return (
    <StyledRoot>
      <Container component={MotionViewport}>
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          spacing={{ xs: 5, md: 0 }}
        >
          <Grid item xs={12} md={7}>
          <Content />
          </Grid>

          <Grid item xs={12} md={4}>
            
            <Description />
          </Grid>

          {/* {!isDesktop && (
            <Grid item xs={12} sx={{ textAlign: 'center' }}>
              {VisitButton}
            </Grid>
          )} */}
        </Grid>
      </Container>
    </StyledRoot>
  );
}

// ----------------------------------------------------------------------

function Description() {
  const isDesktop = useResponsive('up', 'md');

  return (
    <Stack
      sx={{
        textAlign: {
          xs: 'center',
          md: 'left',
        },
      }}
    >
      <m.div variants={varFade().inDown}>
      <Typography variant="h2" sx={{ my: 3 }}>
      Simular conversas reais
        </Typography>
      </m.div>

      <m.div variants={varFade().inDown}>
      <Typography
          sx={{
            mb: 1,
            color: 'text.secondary',
          }}
        >
          Imersão é chave para fluência. Com Everylang, você se envolve em diálogos simulados que espelham situações cotidianas. Exemplos:
        </Typography>
      <Typography
          sx={{
            mb: 1,
            color: 'text.secondary',
          }}
        >
<strong>- Pedir comida:</strong> Interaja como se estivesse pedindo um prato em um restaurante movimentado.
        </Typography>
      <Typography
          sx={{
            mb: 1,
            color: 'text.secondary',
          }}
        >
<strong>- Pedir direção:</strong> Peça direções com confiança e receba orientações claras como se estivesse na rua.
        </Typography>
      <Typography
          sx={{
            mb: 5,
            color: 'text.secondary',
          }}
        >
<strong>- Realizar compras:</strong> Experimente comprar em um supermercado ou outros tipos de lojas em um idioma estrangeiro.
        </Typography>
      </m.div>

      {/* {isDesktop && <m.div variants={varFade().inDown}> {VisitButton} </m.div>} */}
    </Stack>
  );
}

// ----------------------------------------------------------------------

function Content() {
  return (
    <Box component={m.div} variants={varFade().inUp}>
      <Image disabledEffect alt="rocket" src='/assets/images/home/linkhaus_okahub_banner_01.png' />
    </Box>
  );
}

const VisitButton = (
  <Button
    color="inherit"
    size="large"
    variant="outlined"
    target="_blank"
    rel="noopener"
    href={PATH_ZONE_ON_STORE}
    endIcon={<Iconify icon="ic:round-arrow-right-alt" />}
  >
    Visit Zone Landing Page
  </Button>
);
