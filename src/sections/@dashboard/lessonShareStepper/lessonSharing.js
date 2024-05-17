import {
    Box,
    Card,
    CardHeader,
    CardContent,
    Stack,
    Button
} from '@mui/material'


import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import { useSnackbar } from 'notistack';


import useCopyToClipboard from '../../../hooks/useCopyToClipboard'



const LessonSharing = ({ lesson, mainAction }) => {
    const { enqueueSnackbar } = useSnackbar();
  const { copy } = useCopyToClipboard();


    const sharingLink = `https://www.everylang.ai/lesson-cover/${lesson?.sharingId}`

    const handleCopyLink = (adString) => {
      const hasCopied = copy(adString)
      if (hasCopied) {
        enqueueSnackbar('Link copiado')
        mainAction()
      }
      if (!hasCopied) {
        enqueueSnackbar('Erro ao copiar link', { variant: 'error'})
      }
    }
    
  
    return (<>
  <Card>
                <CardHeader 
                title='Copiar o link dessa lição'
                subheader='Para comparitlhar essa lição, copie o link abaixo e envie para um ou mais alunos.'
                />
                <CardContent>

                
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
              </CardContent>
              </Card>
  
    </>   )
  }

  export default LessonSharing