/* eslint-disable no-unused-expressions */
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
// next
import { useRouter } from 'next/router';
// form

// @mui
import { LoadingButton } from '@mui/lab';
import { Select, FormControl, MenuItem, InputLabel, Box, Card, CardHeader, CardContent, Container, Stack, Typography, TextField} from '@mui/material';
// utils



// import { fData } from '../../../utils/formatNumber';



// ----------------------------------------------------------------------

LessonUpdateForm.propTypes = {
    initialDataValue: PropTypes.object,
  lessonType: PropTypes.string,
  lessonForm: PropTypes.string,
  mainAction: PropTypes.func,
};

export default function LessonUpdateForm({ initialDataValue, lessonType, lessonForm, mainAction }) {
  const { push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const [data, setData] = useState({ 
    title: initialDataValue.title, 
    description: initialDataValue.description, 
    creator: initialDataValue.creator
  });

  const [submitting, setSubmitting] = useState(false);

  const [shouldUpdate, setShouldUpdate] = useState(false)

useEffect(() => {
  console.log('========')
  console.log('use effect LessonUpdateForm', { 
    title: initialDataValue.title, 
    description: initialDataValue.description, 
    creator: initialDataValue.creator
  })
  console.log('========')
  setData({ 
    title: initialDataValue.title, 
    description: initialDataValue.description, 
    creator: initialDataValue.creator
  })
}, [initialDataValue])

  // const handleChangeLevel = (event) => {
  //   setLevel(event.target.value);
  // };
  // const handleChangeLanguage = (event) => {
  //   setLanguage(event.target.value);
  // };


  // useEffect(() => {
  //   async function fetData() {
  //     const initialValue = { 
  //         internalLessonName: initialDataValue.internalTitle, 
  //         lessonName: initialDataValue.title, 
  //         lessonDescription: initialDataValue.description, 
  //         lessonCreator: initialDataValue.creator, 
  //         languageLevel: initialDataValue.languageLevel, 
  //         learningLanguage: initialDataValue.learningLanguage, 
  //         lessonType: initialDataValue.type 
  //       }
        
  
  //       setData(initialValue)
  //       setLevel(initialDataValue.languageLevel)
  //       setLanguage(initialDataValue.learningLanguage)
  
  //       // eslint-disable-next-line consistent-return
  //       // enqueueSnackbar(`lição criada`);
  //       setSubmitting(false)
  //   }
  //   fetData()
    
  // }, []);

  useEffect(() => {

    if ((data.creator !== initialDataValue.creator) || (data.title !== initialDataValue.title) || (data.description !== initialDataValue.description)) {
      setShouldUpdate(true)
    } else {
      setShouldUpdate(false)
    }
  }, [data.creator, data.title, data.description])


  const handleUpdateLesson = async () => {
    setSubmitting(true)

    try {

      await mainAction({params: data, shouldUpdate})
      
      
      

      // eslint-disable-next-line consistent-return
      shouldUpdate && enqueueSnackbar(`lição atualizada`);
      
      // redirect

      
      // push(PATH_DASHBOARD.lessonPronunciation.content(lessonId));
    } catch (error) {
      enqueueSnackbar(error.message && error.message, { variant: 'error' });
      console.error(error);
    }
    // clearInterval(timer)
  
    setSubmitting(false)
  };

  const onChangeAdLabel = ({ field, value }) => {
    // if (adLabel.length > 60) return;
    setData({
      ...data,
      [field]: value
    })
  };


  return (

      <
    //   disableGutters
    //   maxWidth='sm'
      >
        <Card >
            <CardHeader title='Informações públicas' subheader='Estas informações ficarão visíveis para o aluno que tiver acesso a esta lição' />
            <CardContent>

            <Box marginBottom={4}>
                  <TextField
                  fullWidth
                  required
                        label="Criado por (obrigatório)"
                        value={data.creator}
                        color="primary"
                        placeholder="Ex.: Professor Alexandre, Escola Smart Learning"
                        helperText="O nome do autor dessa lição."
                        // error={newBusinessNameError !== null}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={(e) => onChangeAdLabel({ field: 'creator', value: e.target.value })}
                      />
                  </Box>


            <Box marginBottom={4}>
                  <TextField
                  fullWidth
                        label="Título da lição (opcional)"
                        value={data.title}
                        color="primary"
                        placeholder="Ex.: Domine a pronúncia de palavras com TH"
                        // helperText="Seja específico. Insira apenas o nome do seu produto ou serviço."
                        // error={newBusinessNameError !== null}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={(e) => onChangeAdLabel({ field: 'title', value: e.target.value })}
                      />
                  </Box>

            <Box marginBottom={4}>
                      <TextField
                      fullWidth
                      multiline
                      rows={2}
                        label="Descrição da lição (opcional)"
                        value={data.description}
                        color="primary"
                        placeholder="Ex.: Com estes exercícios você nunca mais irá errar a pronúncia de palavras com TH"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={(e) => onChangeAdLabel({ field: 'description', value: e.target.value })}
                      />
                  </Box>

            </CardContent>
          
          </Card>



        

          

<Box m={4}>

          <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton onClick={() => handleUpdateLesson()} variant="contained" loading={submitting}>
                {shouldUpdate ? 'Atualizar e avançar' : 'Avançar'}
              </LoadingButton>
            </Stack>
</Box>
        
      </>
  );
}
