import { useState} from 'react'
import {
    Box,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    Divider
} from '@mui/material'

import { LoadingButton } from '@mui/lab';

import { useSnackbar } from 'notistack';

import TagsInput from './TagsInput'

import { styled } from '@mui/material/styles'
import getPlaceHolderByLessonLang from 'src/utils/getPlaceHolderByLessonLang';
const DrawerRootStyled = styled('div')(({theme}) => ({
  [theme.breakpoints.up('xs')]: {
    width: 350
  },
  [theme.breakpoints.up('md')]: {
    width: 600
  }
}))

const ExerciseManuallyForm = (props) => {

    const {
        toggleDrawer,
        mainAction
    } = props
  
    const { enqueueSnackbar } = useSnackbar();

    const [sentence, setSentence] = useState('')
    const [contentType, setContentType] = useState('sentence')
    const [submitting, setSubmitting] = useState(false)
    const [words, setWords] = useState('')
    const [totalWords, setTotalWords] = useState(0)

    
    const handleSubmitt = async () => {
       
      
        const payload = {
          sentence,
          words,
          contentType
        }

        try {
            setSubmitting(true)

            await mainAction(payload)

            setSubmitting(false)

            enqueueSnackbar(contentType === 'sentence' ? `Frase adicionada` : 'Palavras adicionadas');
            toggleDrawer(false)

        } catch (error) {
            enqueueSnackbar(error.message && error.message, { variant: 'error' });
            console.log('error', error)
            setSubmitting(false)
        }
    }

    const handleSetWords = (value) => {

      setWords(value)
        const wordsSlot = value.split(',')
        if (!!wordsSlot[wordsSlot.length - 1].trim()) {
            setTotalWords(wordsSlot.length)
        } else {
            setTotalWords(wordsSlot.length - 1)
        }

    }

    
  
    return (<DrawerRootStyled
    >
  
                  <>
                      <Box m={2}>
                      <Box display='flex' justifyContent='center'>
                                <Box maxWidth='80%' display='flex' textAlign='center'>
                                    <Typography variant='h6'>Adicione frases ou palavras manualmente.</Typography>
                                </Box>
                            </Box>

                            <Box m={2}>
                                  <FormControl fullWidth>
                                    {/* <InputLabel id="demo-simple-select-label">Escolha uma opção</InputLabel> */}
                                    <Select
                                      labelId="demo-simple-select-label"
                                      id="demo-simple-select"
                                      value={contentType}
                                      // label="Tipo de contexto"
                                      // error={level === '0'}
                                      onChange={(e) => setContentType(e.target.value)}
                                    >
                                      <MenuItem value='sentence'>Adicionar uma frase</MenuItem>
                                      <MenuItem value='words'>Adicionar uma lista de palavras</MenuItem>
                                      
                                      
                                    </Select>
                                  </FormControl>
                                </Box>
                      
                      {
                        contentType === 'sentence' && <>
                         <Box m={2}>
                                <TextField
                                fullWidth
                                required
                                multiline
                                rows={3}
                                  label="Digite a frase aqui"
                                  value={sentence}
                                  color="primary"
                                  placeholder={getPlaceHolderByLessonLang(lessonData.learningLanguage, 'phraseExample')}
                                  // helperText="Esta é a frase que o aluno irá ler para assim praticar a pronúncia"
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  onChange={(e) => setSentence(e.target.value)}
                                />
                            </Box>
                        </>
                      }

                      {
                        contentType === 'words' && <>
                          <Box m={2}>
                          <TextField
                                  fullWidth
                                  required
                                  multiline
                                  rows={3}
                                    label="Palavras separadas por virgula"
                                    value={words}
                                    color="primary"
                                    placeholder={getPlaceHolderByLessonLang(lessonData.learningLanguage, 'createPhrasesByWords')}
                                    helperText={`Total de palavras: ${totalWords}`}
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                    onChange={(e) => handleSetWords(e.target.value)}
                                  />
                            </Box>
                        </>
                      }
                     
  
                    </Box>
                    <Box m={2} display='flex' flexDirection='column'>
                                <LoadingButton loading={submitting} variant='contained' disabled={(contentType === 'sentence' && sentence.length === 0) || (contentType === 'words' && words.length === 0)} onClick={() => handleSubmitt()}>{ contentType === 'sentence' ? 'Adicionar frase' : 'Adicionar palavras'}</LoadingButton>
                      <Typography variant="caption">Após adicionar, você poderá gerar áudio para demonstração de pronúncia</Typography>
  
                    </Box>
                      </>  
    </DrawerRootStyled>   )
  }

  export default ExerciseManuallyForm