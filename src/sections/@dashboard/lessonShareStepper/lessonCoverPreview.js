import {
    Box,
    Card,
    CardHeader,
    CardContent,
    Typography
} from '@mui/material'


const LessonCoverPreview = ({ lesson }) => {

  
    return (<Card>
    <CardHeader title='Revisar informações da lição' subheader="Informações da lição visíveis para o aluno antes de iniciar os exerícios"/>
              <CardContent>

              
              <Box m={2} sx={{ backgroundColor: '#fff4f1', p: 2}} >
                        <Box marginBottom={2}>
                          <Typography variant="subtitle2">EVERYLANG - Exercícios de pronúncia</Typography>
                        </Box>
                
                        <Box marginBottom={2}>
                          <Typography display='inline' variant="subtitle2">Criado por:</Typography>
                          <Typography display='inline' sx={{ marginLeft: 1}} variant="caption">{lesson?.creator}</Typography>
                        </Box>

                        {
                          lesson?.title && <Box marginBottom={2}>
                          <Typography display='inline' variant="subtitle2">Lição:</Typography>
                          <Typography display='inline' sx={{ marginLeft: 1}} variant="caption">{lesson?.title}</Typography>
                        </Box>
                        }
                        

                        {
                          lesson?.description && <Box marginBottom={2}>
                          <Typography display='inline' variant="subtitle2">Detalhes:</Typography>
                          <Typography display='inline' sx={{ marginLeft: 1}} variant="caption">{lesson?.description}</Typography>
                        </Box>
                        }

                        
              </Box>        
              <Box display='flex' flexDirection='column'>
            
             </Box>
             </CardContent> 
              </Card>
  )
  }

  export default LessonCoverPreview