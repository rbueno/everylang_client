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
import api from '../../../../utils/axios';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';


// ----------------------------------------------------------------------

EditLesson.propTypes = {
  data: PropTypes.object,
  lessonType: PropTypes.string,
  lessonForm: PropTypes.string,
  toggleDrawer: PropTypes.func,
  mainAction: PropTypes.func,
};

export default function EditLesson({ initialDataValue, lessonType, lessonForm, toggleDrawer, mainAction }) {
  const { push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();
 console.log('initialDataValue', initialDataValue)
  const [data, setData] = useState({ internalLessonName: '', lessonName: '', lessonDescription: '', lessonCreator: '', languageLevel: '0', learningLanguage: '0', lessonType });

  const [submitting, setSubmitting] = useState(false);

  const [level, setLevel] = useState('0');
  const [language, setLanguage] = useState('0');

  const handleChangeLevel = (event) => {
    setLevel(event.target.value);
  };
  const handleChangeLanguage = (event) => {
    setLanguage(event.target.value);
  };


  useEffect(() => {
    async function fetData() {
      const initialValue = { 
          internalLessonName: initialDataValue.internalTitle, 
          lessonName: initialDataValue.title, 
          lessonDescription: initialDataValue.description, 
          lessonCreator: initialDataValue.creator, 
          languageLevel: initialDataValue.languageLevel, 
          learningLanguage: initialDataValue.learningLanguage, 
          lessonType: initialDataValue.type 
        }
        
  
        setData(initialValue)
        setLevel(initialDataValue.languageLevel)
        setLanguage(initialDataValue.learningLanguage)
  
        // eslint-disable-next-line consistent-return
        // enqueueSnackbar(`lição criada`);
        setSubmitting(false)
    }
    fetData()
    
  }, []);


  const handleUpdateLesson = async () => {
    setSubmitting(true)

    const payload = {...data, lessonId: initialDataValue._id, languageLevel: level, learningLanguage: language, lessonType}
    try {


      console.log('payload', payload)
      await mainAction(payload)
      
      
      

      // eslint-disable-next-line consistent-return
      enqueueSnackbar(`lição criada`);
      
      // redirect

      
      // push(PATH_DASHBOARD.lessonPronunciation.content(lessonId));
    } catch (error) {
      enqueueSnackbar(error.message && error.message, { variant: 'error' });
      console.error(error);
    }
    // clearInterval(timer)
  
    toggleDrawer(false)
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

      <Container
      disableGutters
      maxWidth='sm'
      >
        <Box m={4}>
          <Typography variant='h5'>Editar lição</Typography>
          
        </Box>



        {
          lessonForm === 'internal' && <>
          <Box m={4}>
          

          <Card>
            


          <CardHeader title='Informações internas' subheader='Essas informações são visíveis apenas para você. O Aluno não visualizará esses dados'/>
          

            
            <CardContent>
            <Box marginBottom={4}>
              <TextField
                fullWidth
                label="Título da lição"
                value={data.internalLessonName}
                color="primary"
                placeholder="Ex.: Palavras com th"
                // error={newBusinessNameError !== null}
                helperText="O Aluno não visualizará este título, ficará visível apenas internamente para a sua organziação. Caso você não informe nenhum título, iremos escolher um código aleatório."
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => onChangeAdLabel({ field: 'internalLessonName', value: e.target.value })}
              />
          </Box>

      <Box marginBottom={4}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Escolha o nível</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={level}
              label="Escolha o nível"
              error={level === '0'}
              onChange={handleChangeLevel}
            >
              <MenuItem value='beginner'>Iniciante</MenuItem>
              <MenuItem value='elementary'>Básico</MenuItem>
              <MenuItem value='intermediate'>Intermediário</MenuItem>
              <MenuItem value='advanced'>Avançado</MenuItem>
            </Select>
          </FormControl>
        </Box>

      <Box marginBottom={4}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Escolha o idioma</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={language}
              error={language === '0'}
              label="Escolha o idioma"
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

            </CardContent>
          

          </Card>


          </Box>
          </>
        }

        {
          lessonForm === 'public' && <>
          <Box m={4}>
          <Card >
            <CardHeader title='Informações públicas' subheader='Estas informações ficarão visíveis para o aluno que tiver acesso a esta lição' />
            <CardContent>

            <Box marginBottom={4}>
                  <TextField
                  fullWidth
                  required
                        label="Criado por"
                        value={data.lessonCreator}
                        color="primary"
                        placeholder="Ex.: Professor Alexandre, Escola Smart Learning"
                        helperText="O nome do autor dessa lição."
                        // error={newBusinessNameError !== null}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={(e) => onChangeAdLabel({ field: 'lessonCreator', value: e.target.value })}
                      />
                  </Box>


            <Box marginBottom={4}>
                  <TextField
                  fullWidth
                  required
                        label="Título da lição"
                        value={data.lessonName}
                        color="primary"
                        placeholder="Ex.: Domine a pronúncia de palavras com TH"
                        // helperText="Seja específico. Insira apenas o nome do seu produto ou serviço."
                        // error={newBusinessNameError !== null}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={(e) => onChangeAdLabel({ field: 'lessonName', value: e.target.value })}
                      />
                  </Box>

            <Box marginBottom={4}>
                      <TextField
                      fullWidth
                      required
                      multiline
                      rows={6}
                        label="Descrição da lição"
                        value={data.lessonDescription}
                        color="primary"
                        placeholder="Ex.: Com estes exercícios você nunca mais irá errar a pronúncia de palavras com TH"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={(e) => onChangeAdLabel({ field: 'lessonDescription', value: e.target.value })}
                      />
                  </Box>

            </CardContent>
          
          </Card>
          </Box>
          </>
        }



        

          

<Box m={4}>

          <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton onClick={() => handleUpdateLesson()} variant="contained" loading={submitting}>
                Atualizar lição
              </LoadingButton>
            </Stack>
</Box>
        
      </Container>
  );
}
