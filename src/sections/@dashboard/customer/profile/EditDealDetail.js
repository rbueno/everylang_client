import { useState } from 'react'
import PropTypes from 'prop-types'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import LoadingButton from '@mui/lab/LoadingButton'
import EmailIcon from '@mui/icons-material/Email';
import { getMuiColorByStatus } from '../../../../utils/getMuiColorByStatus'
import { Grid, TextField, MenuItem, Stack, Card, Box, Typography, Button, Alert, AlertTitle } from '@mui/material';

const dealStages = [
  'open',
  'processing',
  'lost',
  'won',
  'regular',
  'irregular',
  'churn',
  'concluded',
];

EditDealDetail.propTypes = {
  dealStage: PropTypes.string
}

export default function EditDealDetail({ dealStage }) {
  const [ stage, setStage] = useState(dealStage)

    return (
        <Card sx={{ mt: 0, mb: 2 }}>
          
        <Box sx={{ m: 4 }}>
        <Typography variant='h6'>Deal stage:</Typography>
          <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} >
            <Alert icon={false} severity={getMuiColorByStatus(dealStage || 'info')}>
              <AlertTitle>Stage atual:</AlertTitle>
              <strong>Churn</strong>
            </Alert>
            <TextField
              fullWidth
              select
              label="Mover deal stage para:"
              value={stage}
              onChange={(e) => setStage(e.target.value)}
              SelectProps={{
                MenuProps: {
                  sx: { '& .MuiPaper-root': { maxHeight: 260 } },
                },
              }}
              sx={{
                maxWidth: { sm: 240 },
                textTransform: 'capitalize',
              }}
            >
              {dealStages.map((option) => (
                <MenuItem
                  key={option}
                  value={option}
                  sx={{
                    mx: 1,
                    my: 0.5,
                    borderRadius: 0.75,
                    typography: 'body2',
                    textTransform: 'capitalize',
                  }}
                >
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
          <Box sx={{ mt: 4}}>
            <LoadingButton variant='contained' disabled={dealStage === stage}> Salvar Alteração</LoadingButton>
          </Box>

          </Box>
        
      </Card>
    )
}