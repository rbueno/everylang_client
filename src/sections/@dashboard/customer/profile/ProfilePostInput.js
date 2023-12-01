import { useRef, useState } from 'react';
import { useSnackbar } from 'notistack'
// @mui
import { Box, Card, Button, TextField, IconButton, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
// components
import api from '../../../../utils/axios'

// ----------------------------------------------------------------------

export default function ProfilePostInput({ dealId }) {
  const [note, setNote] = useState('')
  const [isSubmittingNote, setIsSubmittingNote] = useState(false)
  const { enqueueSnackbar } = useSnackbar()

  const handleNoteSubmit = async () => {
    try {
      setIsSubmittingNote(true)
      console.log('note: ', { text: note, title: 'new note', dealId })
      await api.post('v1/notes', { text: note, title: 'new note', dealId })

      // updateWorkspaces(workspaceSession)
      setNote('')
      enqueueSnackbar('Nota criada com sucesso');
    } catch(error){
      enqueueSnackbar(error.message && error.message, { variant: 'error' });
      console.error(error);
    } finally {
      setIsSubmittingNote(false)
    }
  }

  return (
    <Card sx={{ p: 3 }}>
      <Box mb={2}>
      <Typography variant='h6'>Criar nota</Typography>
      <Typography variant='caption'>Crie uma anotação livre para melhor acompanhar este cliente</Typography>
      </Box>
      <TextField
        multiline
        fullWidth
        rows={4}
        placeholder="Crie uma nota aqui..."
        name='note'
        sx={{
          '& fieldset': {
            borderWidth: `1px !important`,
            borderColor: (theme) => `${theme.palette.grey[500_32]} !important`,
          },
        }}
        onChange={(e) => setNote(e.target.value)}
        value={note}
      />

      <Box
        sx={{
          mt: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <LoadingButton variant="contained" onClick={() => handleNoteSubmit()} loading={isSubmittingNote} disabled={note === ''}>Criar nova nota</LoadingButton>
      </Box>
    </Card>
  );
}
