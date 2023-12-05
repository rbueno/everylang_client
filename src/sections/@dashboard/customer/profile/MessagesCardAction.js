import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import EmailIcon from '@mui/icons-material/Email';
import { Grid, Stack, Card, Box, Typography, Button, Alert, AlertTitle } from '@mui/material';
export default function MessagesCardAction() {
    return (
        <Card sx={{ mt: 0, mb: 2 }}>
          {/* <Alert severity="error">This is an error alert — check it out!</Alert> */}
          
        <Box padding={4}>
        <Alert severity='error' sx={{ width: '90%' }}>
        <AlertTitle>Integração com WhatsApp Não encontrada</AlertTitle>
        Você não possui mensagens automazadas por WhatsApp pois não possui uma conta do WhatsApp Integrada.
      </Alert>

          </Box>
        <Box sx={{ ml: 4 }}>
          <Typography variant='h6'>Benefícios de Integração com WhatsApp</Typography>
          <Typography>- Envie mensagens com base em status, por exemplo: Lembrete de pagamento</Typography>
          <Typography>- Gerencie o atendimento via WhatsApp entre seus clientes via Everylang</Typography>
          </Box>
        <Box
          sx={{
            display: 'flex',
            alignItem: 'center',
            justifyContent: 'space-between',
            p: 2
          }}
        >
         <Box sx={{ display: 'flex'}}>
              <Box padding={2}>
                    <Button
                      // startIcon={<WhatsAppIcon />}
                      // variant="contained"
                      // sx={{
                      //   backgroundColor: '#075e54'
                      // }}
                      disabled={false}
                      // disabled={props?.data?.Celular ? false : true}
                      // onClick={() => handleWhatsAppClick(props.data.Celular)} disableRipple
                    >
                      Abrir WhatsApp Web
                    </Button>
              </Box>
          <Box padding={2}>
              <Button
                startIcon={<WhatsAppIcon />}
                variant="contained"
                sx={{
                  backgroundColor: '#075e54'
                }}
                disabled={false}
                // disabled={props?.data?.Celular ? false : true}
                // onClick={() => handleWhatsAppClick(props.data.Celular)} disableRipple
              >
                Criar Integração com WhatsApp
              </Button>
            </Box>
         </Box>
        </Box>
      </Card>
    )
}