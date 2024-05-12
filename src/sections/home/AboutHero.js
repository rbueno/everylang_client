import { m } from 'framer-motion';
// @mui
import { styled } from '@mui/material/styles';
import { Stack, Container, Typography, Button, Box } from '@mui/material';
// components
import { MotionContainer, TextAnimate, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  position: 'relative',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundImage: 'url(/assets/background/overlay_1.svg), url(/assets/images/fono_clinica.jpg)',
  padding: theme.spacing(10, 0),
  [theme.breakpoints.up('md')]: {
    height: 560,
    padding: 0,
  },
}));

const StyledContent = styled('div')(({ theme }) => ({
  textAlign: 'center',
  [theme.breakpoints.up('md')]: {
    bottom: 80,
    textAlign: 'left',
    position: 'absolute',
  },
}));

// ----------------------------------------------------------------------

export default function AboutHero() {
  return (
    <StyledRoot>
    <Box p={4}>
      <Typography variant='h2' sx={{ color: 'common.white'}}>Você é</Typography>
      <Typography variant='h1' sx={{ color: 'common.white'}}>Professor(a) ou escola?</Typography>
      <Typography
              variant="h4"
              sx={{
                mt: 5,
                color: 'common.white',
                fontWeight: 'fontWeightMedium',
              }}
            >
              Utilize a tecnologia Everylang com seus alunos.
            </Typography>
            <Box mt={2}>
          <Button
            size="large"
            variant="outlined"
            rel="noopener"
            href='/school'
            sx={{ borderColor: 'white', color: 'white' }}
          >
            Confira os benefícios
          </Button>
          </Box>
    </Box>
    </StyledRoot>
  );
}
