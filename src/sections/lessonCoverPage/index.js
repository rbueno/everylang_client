import PropTypes from 'prop-types';
import { useEffect} from 'react'
import Head from 'next/head';

import { useTheme, alpha } from '@mui/material/styles';
import {
    Stack,
    Typography,
    Container,
    Box,
    Button,
    Card,
    CardHeader,
    CardContent,
    IconButton
} from '@mui/material'

import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import AppleIcon from '@mui/icons-material/Apple';
import ShopIcon from '@mui/icons-material/Shop';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import SchoolIcon from '@mui/icons-material/School';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TelegramIcon from '@mui/icons-material/Telegram';
import PhotoCameraFrontIcon from '@mui/icons-material/PhotoCameraFront';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import { useSettingsContext } from '../../components/settings';
import localStorageAvailable from '../../utils/localStorageAvailable';
import { useAuthContext } from '../../auth/useAuthContext';
import { CustomAvatar } from '../../components/custom-avatar'
import Footer from '../../layouts/main/Footer';
import useCopyToClipboard from '../../hooks/useCopyToClipboard'
import { useSnackbar } from '../../components/snackbar';



// MyPage.getLayout = (page) => <> {page} </>;
// MyPage.getLayout = (page) => <MainLayout>{page}</MainLayout>;

LessonCoverPage.propTypes = {
  lesson: PropTypes.object
  };

export function LessonCoverPage({ lesson }) {
  const { copy } = useCopyToClipboard();
  const { enqueueSnackbar } = useSnackbar();

    // const lesson = {
    //   type: "Exercícios de Pronúncia",
    //   creator: "Alexandre",
    //   title: "vamos praticar alguns verbos",
    //   description: "Um descrição bem simples sobre está lição incrível que você irá fazer.",
    //   sharingId: 'aiwoe123'
    // }

    const handleCopyLink = () => {
      const hasCopied = copy(`refl${lesson.sharingId}`)
      if (hasCopied) {
        enqueueSnackbar('Código copiado')
      }
      if (!hasCopied) {
        enqueueSnackbar('Erro ao copiar código', { variant: 'error'})
      }
    }
  
  
    return (
      <Box
      >
        <Head>
          <title>Everylang - Lesson Cover</title>
          <meta name="description" content="Everylang lesson cover" />
          <link href="https://www.everylang.ai/lesson-cover" rel="canonical" />
      
          {/* <meta name="theme-color" content={loadedTheme.general.color} /> */}
          <meta property="og:title" content="Everylang - Lesson Cover" />
          <meta property="og:url" content="https://www.everylang.ai/lesson-cover" />
          <meta property="og:description" content="Everylang lesson cover" />
          <meta property="og:image" content="https://www.everylang.ai/assets/everylang_logo_purple_square.png" />
        </Head>
  
          
        <Container 
          maxWidth='sm'
          // sx={{
          //   backgroundColor: '#191919'
          // }}
        >
        <Box pt={5}>
        <CustomAvatar
            src="https://www.everylang.ai/assets/everylang_logo_purple_square.png"
            alt="Everylang"
            name="Everylang"
            sx={{
              mx: 'auto',
              borderWidth: 2,
              borderStyle: 'solid',
              borderColor: 'common.white',
              width: { xs: 80, md: 80 },
              height: { xs: 80, md: 80 },
            }}
          />
        </Box>
  
          <Box
            sx={{
              ml: { xs: 1, md: 1 },
              mt: { xs: 1, md: 1 },
          //    color: 'common.white',
              textAlign: { xs: 'center', md: 'center' },
            }}
          >
            <Typography
              variant="h4"
              >
                {lesson?.type === 'pronunciation' && 'Exercícios de Pronúncia'}
                {lesson?.type === 'grammar' && 'Exercícios de Gramática'}
                {!lesson && 'Exercícios não encontrados'}
            </Typography>
          </Box>
          
          {!!lesson && <>
            
            <Box m={2}>
          <Card>
            {/* <CardHeader title="Criado por" subheader={lesson.creator}/> */}
            <CardContent>
              <Box marginBottom={2}>
              <Typography variant='caption'>Criado por</Typography>
              <Typography variant='h5'>{lesson.creator}</Typography>
              
              </Box>
              <Box >
              <Typography variant='subtitle1'>{lesson.title}</Typography>
              <Typography variant='body'>{lesson.description}</Typography>
              
              </Box>
              
            </CardContent>
          </Card>

          </Box>
          <Box m={2}>
          <Card>
            <CardHeader title="Os exercícios são feitos usando o WhatsApp" subheader="O exercício é feito enviando uma mensagem na conta de WhatsApp do Everylang. Para iniciar, siga os passos abaixo." />
            <CardContent>
              <Box marginLeft={2}>
                {/* <WhatsAppIcon /> */}
              {/* <Typography variant='subtitle1'>Utilize o WhatsApp para fazer este exercício.</Typography> */}
                  <Box marginBottom={4}>
                  <Typography variant='subtitle1'>1 - Copie o código abaixo.</Typography>
                    <Box display='flex' flexDirection='row' alignItems='center' >
                      <Box m={1} p={1} sx={{ backgroundColor: '#ece5dd'}}>
                        <Typography variant='subtitle1'>{`refl${lesson.sharingId}`}</Typography>
                        {/* <IconButton onClick={() => handleCopyLink()} size='large' sx={{ color: 'main.primary'}}>
                        <ContentCopyIcon/> 
                        </IconButton> */}
                      </Box>
                      <Button onClick={() => handleCopyLink()} startIcon={<ContentCopyIcon />} variant='contained' sx={{ backgroundColor: '#128c7e'}}>Copiar</Button>

                    </Box >
                  </Box>
                                {/* <Typography ml={1}>Copiar link</Typography> */}
              <Typography variant='subtitle1'>2 - Envie o código na conta de WhatsApp do Everylang</Typography>
              <Stack>
              
              <Button 
                href={`https://wa.me/5511999284097?text=refl${lesson.sharingId}`}
                target="_blank" 
                rel="noopener"
                startIcon={<WhatsAppIcon />} 
                variant='contained' 
                sx={{ backgroundColor: '#128c7e'}}>
                  Abrir WhatsApp
              </Button>
              </Stack>
              
              </Box>
              
            </CardContent>
          </Card>

          </Box>

          </>}
          
          
  
          
        
        </Container>
        <Footer />
      </Box>
    );
  }