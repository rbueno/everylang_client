import { m } from 'framer-motion';
import PropTypes from 'prop-types'
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
  padding: theme.spacing(5, 0),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(2, 0),
  },
}));

// ----------------------------------------------------------------------

export default function TextLeft({ content }) {
  const { headText, bodyText, imageURL } = content
  const isDesktop = useResponsive('up', 'md');

  return (

      <Container component={MotionViewport}>
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          spacing={{ xs: 5, md: 0 }}
        >
          {
            isDesktop && <>
              <Grid item xs={12} md={7}>
                <Description headText={headText} bodyText={bodyText} customMaxWidth='450px'/>
              </Grid>

              <Grid item xs={12} md={4}>
                <Content imageURL={imageURL} imgMaxWidth='350px'/>
              </Grid>
            </>
          }

          {
            !isDesktop && <>
              <Grid item xs={12} md={7}>
                <Content imageURL={imageURL} imgMaxWidth='600px'/>
              </Grid>
              <Grid item xs={12} md={4}>
                <Description headText={headText} bodyText={bodyText} />
              </Grid>
            </>
          }
          {/* {!isDesktop && (
            <Grid item xs={12} sx={{ textAlign: 'center' }}>
              {VisitButton}
            </Grid>
          )} */}
        </Grid>
      </Container>

  );
}

// ----------------------------------------------------------------------
Description.propTypes = {
  customMaxWidth: PropTypes.string,
  headText: PropTypes.string,
  bodyText: PropTypes.string
}
function Description({ customMaxWidth, headText, bodyText }) {
  const isDesktop = useResponsive('up', 'md');

  return (
    <Stack
    maxWidth={customMaxWidth}
      sx={{
        textAlign: {
          xs: 'center',
          md: 'left',
        },
      }}
    >
      <m.div variants={varFade().inDown}>
      <Typography variant="h3" sx={{ my: 3 }}>
        {headText}
        </Typography>
      </m.div>

      <m.div variants={varFade().inDown}>
      <Typography
          sx={{
            mb: 5,
            color: 'text.secondary',
          }}
        >
          {bodyText}
        </Typography>
    
      </m.div>

      {/* {isDesktop && <m.div variants={varFade().inDown}> {VisitButton} </m.div>} */}
    </Stack>
  );
}

// ----------------------------------------------------------------------

// eslint-disable-next-line react/prop-types
function Content({ imgMaxWidth, imageURL }) {
  return (
    <Box
    // component={m.div}
    // variants={varFade().inUp}
    maxWidth={imgMaxWidth}
    >
      <Image disabledEffect alt="rocket" src={imageURL} />
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
