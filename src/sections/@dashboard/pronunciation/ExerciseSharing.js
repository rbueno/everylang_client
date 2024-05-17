import { useState} from 'react'
import {
    Box,
    Card,
    CardHeader,
    CardContent,
    Grid,
    Stack,
    Button
} from '@mui/material'

import { LoadingButton } from '@mui/lab';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import { useSnackbar } from 'notistack';

import TagsInput from './TagsInput'
import useCopyToClipboard from '../../../hooks/useCopyToClipboard'

import { styled } from '@mui/material/styles'
const DrawerRootStyled = styled('div')(({theme}) => ({
  [theme.breakpoints.up('xs')]: {
    width: 350
  },
  [theme.breakpoints.up('md')]: {
    width: 600
  }
}))

const ExerciseSharing = (props) => {

    const {
        toggleDrawer,
        mainAction,
        lesson
    } = props
  
    const { enqueueSnackbar } = useSnackbar();
  const { copy } = useCopyToClipboard();

  const lessonTitle = lesson?.title ? `\n\nLição: ${newAdsGenerated?.lesson?.title}` : ''
  const lessonDetails = lesson?.description ? `\n\nDetalhes: ${newAdsGenerated?.lesson?.description}` : ''

    const lessonCoverPreview = `EVERYLANG - Exercícios de pronúncia\n\nCriado por: ${lesson?.creator}${lessonTitle}${lessonDetails}`
    const sharingLink = `https://www.everylang.ai/lesson-cover/${lesson?.sharingId}`

    const handleCopyLink = (adString) => {
      const hasCopied = copy(adString)
      if (hasCopied) {
        enqueueSnackbar('Mensagem copiada')
      }
      if (!hasCopied) {
        enqueueSnackbar('Erro ao copiar link', { variant: 'error'})
      }
    }
    
  
    return (<DrawerRootStyled
    >
  
  <>
           
     
        
           <Box>


           


<Card>
  {/* <CardHeader title='Preview' subheader="Informações que o aluno visualizará antes de iniciar os exerícios"/> */}
    
    
                
  <CardContent>





  <Grid container spacing={3}>
  




  <Grid item xs={12} md={6}>
  <Card>
    <CardHeader title='Informação de capa dessa lição' subheader="Como o aluno visualizará as informações de capa dessa lição antes de iniciar os exerícios"/>
              <Box m={2} sx={{ backgroundColor: '#fff4f1', p: 2}} >
                {lessonCoverPreview}
              </Box>        
              <Box display='flex' flexDirection='column'>
            

         
            <Stack m={2}>

               {/* <Button variant='outlined' onClick={() => handleOpenDrawer('lessonPublicForm')}>Editar</Button> */}
               <Button variant='outlined' >Editar</Button>
            </Stack>
             </Box>
               
              </Card>
  </Grid>

  <Grid item xs={12} md={6}>
  <Card>
                <CardHeader 
                title='Copiar o link dessa lição'
                subheader='Para comparitlhar essa lição, copie o link abaixo e envie para um ou mais alunos.'
                />
              <Box m={2} sx={{ backgroundColor: '#fff4f1', p: 2}} >
                {sharingLink}
              </Box>        
                <Stack m={2}>
                  <Button
                    onClick={() => handleCopyLink(sharingLink)}
                    variant='contained'
                    startIcon={<ContentCopyIcon />}
                  >
                    Copiar link
                  </Button>
              </Stack>
              </Card>
  </Grid>

  </Grid>

 



    


    






   











    


  </CardContent>
</Card>
</Box>

                  </>
    </DrawerRootStyled>   )
  }

  export default ExerciseSharing