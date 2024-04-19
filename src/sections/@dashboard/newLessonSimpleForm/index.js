/* eslint-disable no-unused-expressions */
import { useState } from 'react';
import { useSnackbar } from 'notistack';
// next
import { useRouter } from 'next/router';
// form

// @mui
import { LoadingButton } from '@mui/lab';
import { CardHeader, CardContent, Select, FormControl, MenuItem, InputLabel, Box, Card, Container, Stack } from '@mui/material';
// utils

import api from '../../../utils/axios';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';


// ----------------------------------------------------------------------


function NewLessonSimpleForm(props) {
  const { lessonType } = props

  const { push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const [submitting, setSubmitting] = useState(false);

  const [level, setLevel] = useState('0');
  const [language, setLanguage] = useState('0');
  
  const handleChangeLevel = (event) => {
    setLevel(event.target.value);
  };
  const handleChangeLanguage = (event) => {
    setLanguage(event.target.value);
  };


  const handleAdGenerator = async () => {
    setSubmitting(true)

    const payload = { languageLevel: level, learningLanguage: language, lessonType }
    try {


      console.log('payload', payload)
      const { data } = await api.post('v1/everylang/lesson', payload)
      

      // eslint-disable-next-line consistent-return
      enqueueSnackbar(`lição criada`);
      setSubmitting(false)
      // redirect
      if (lessonType === 'grammar') push(PATH_DASHBOARD.lessonGrammar.content(data.lesson._id));
      if (lessonType === 'pronunciation') push(PATH_DASHBOARD.lessonGrammar.content(data.lesson._id));
    
    } catch (error) {
      enqueueSnackbar(error.message && error.message, { variant: 'error' });
      console.error(error);
    }
    // clearInterval(timer)
  
    setSubmitting(false)
  };
  

  return (

      <Container
      disableGutters
      maxWidth='sm'
      >
       
       <Card>
          <CardHeader title='Idioma e nível da lição' subheader='Estas informações são visíveis apenas para você. O aluno não terá acesso à esses dados'/>
          <CardContent>
          <Box>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Nível (obrigatório)</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={level}
                          label="Nível (obrigatório)"
                          onChange={handleChangeLevel}
                        >
                          <MenuItem value='beginner'>Iniciante</MenuItem>
                          <MenuItem value='elementary'>Básico</MenuItem>
                          <MenuItem value='intermediate'>Intermediário</MenuItem>
                          <MenuItem value='advanced'>Avançado</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>


                    <Box marginTop={2}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Idioma (obrigatório)</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={language}
                          label="Idioma (obrigatório)"
                          onChange={handleChangeLanguage}
                        >
                          <MenuItem value='english'>Inglês</MenuItem>
                          <MenuItem value='french'>Francês</MenuItem>
                          <MenuItem value='german'>Alemão</MenuItem>
                          <MenuItem value='spanish'>Espanhol</MenuItem>
                          <MenuItem value='korean'>Coreano</MenuItem>
                          <MenuItem value='mandarin'>Chinês (Mandarim)</MenuItem>
                          <MenuItem value='japonese'>Japonês</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>

                      <Stack  alignItems="flex-end" sx={{ mt: 3 }}>
                        <LoadingButton disabled={language === '0' || level === '0'} onClick={() => handleAdGenerator()} variant="contained" loading={submitting}>
                          Avançar para exercícios
                        </LoadingButton>
                      </Stack>

          </CardContent>
          </Card>

          
        
      </Container>
  );
}

export { NewLessonSimpleForm }