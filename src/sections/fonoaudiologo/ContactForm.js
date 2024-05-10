import { m } from 'framer-motion';
// @mui
import { Button, Typography, Box, TextField, Stack } from '@mui/material';
// components
import { MotionViewport, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

export default function ContactForm() {
  return (
    <Stack component={MotionViewport} spacing={5}>
      <m.div variants={varFade().inUp}>
        <Typography variant="h3">
          Crie uma conta grátis
        </Typography>
        <Typography >
          
          Você será direcionado para a página de cadastro
        </Typography>
      </m.div>

      <Box>
         <Button
            size="large"
            variant="contained"
            rel="noopener"
            href='/auth/register/'
            // sx={{ borderColor: 'white', color: 'white' }}
          >
            Criar conta grátis
          </Button>
      </Box>
    </Stack>
  );
}
