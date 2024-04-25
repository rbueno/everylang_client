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

function InputFieldWithChip() {
  function handleSelecetedTags(items) {
    console.log(items);
  }
  return (
    <div className="App">
      <TagsInput
        selectedTags={handleSelecetedTags}
        fullWidth
        variant="outlined"
        id="tags"
        name="tags"
        placeholder="add Tags"
        label="tags"
      />
    </div>
  );
}

const ExerciseCopilotForm = (props) => {

    const {
        toggleDrawer,
      mainAction
    } = props
  
    const { enqueueSnackbar } = useSnackbar();

    const [attributes, setAttributes] = useState('')
    const [specification, setSpecification] = useState('')
    const [sentenceQuantity, setSentenceQuantity] = useState(5)
    const [contextType, setContextType] = useState('noContext')
    const [comprehensiveContext, setComprehensiveContext] = useState('')
    const [targetedContext, setTargetedContext] = useState('')
    const [submitting, setSubmitting] = useState(false);
    const [wordsAttributes, setWordsAttributes] = useState('noSpecification')
    const [totalWords, setTotalWords] = useState(0)
  

    const onChangeContextType = (event) => {
        setContextType(event.target.value)
      }

    const onChangeSentenceQuantity = (event) => {
       setSentenceQuantity(event.target.value)
     }
  
   const onChangeAttributes = (event) => {
      setAttributes(event.target.value)
    }

    const handleSubmitt = async () => {
        let context = ''

        if(contextType === 'comprehensiveContext') {
          context = comprehensiveContext
        }
        if(contextType === 'targetedContext') {
          context = targetedContext
        }
      
        


        let specificationWords = ''
        if(wordsAttributes === 'specificsWords') {
            specificationWords = specification
        }
        if(wordsAttributes === 'attributes') {
            specificationWords = attributes
        }
        const payload = {
          sentenceQuantity,
          contextType,
          context: contextType !== 'noContext' ? context : '',
          speficiationType: wordsAttributes,
          specification: specificationWords,
        }

        try {
            setSubmitting(true)

            await mainAction(payload)

            setSubmitting(false)

            enqueueSnackbar(`Frases geradas`);
            toggleDrawer(false)

        } catch (error) {
            enqueueSnackbar(error.message && error.message, { variant: 'error' });
            console.log('error', error)
        }
    }

    const handleSetWords = (value) => {

        setSpecification(value)
        const wordsSlot = value.split(',')
        if (!!wordsSlot[wordsSlot.length - 1].trim()) {
            setTotalWords(wordsSlot.length)
        } else {
            setTotalWords(wordsSlot.length - 1)
        }

    }
  
    return (<Box
      sx={{ width: 600 }}
    >
                    <>
                          <Box m={2}>
                          <Box m={2}>
                            <Box display='flex' justifyContent='center'>
                                <Box maxWidth='80%' display='flex' textAlign='center'>
                                    <Typography variant='h6'>Gerar frases automaticamente com a nossa inteligência artificial.</Typography>
                                </Box>
                            </Box>
                          <Box marginTop={6} > <Divider><Typography variant='subtitle1'>Quantidade de frases a serem geradas</Typography></Divider> </Box>
                          <Box marginTop={2}>
                                  <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Quantidade de frases</InputLabel>
                                    <Select
                                      labelId="demo-simple-select-label"
                                      id="demo-simple-select"
                                      value={sentenceQuantity}
                                      label="Quantidade de frases"
                                      // error={level === '0'}
                                      onChange={onChangeSentenceQuantity}
                                    >
                                      <MenuItem value={5}>5</MenuItem>
                                      <MenuItem value={10}>10</MenuItem>
                                      <MenuItem value={11}>11</MenuItem>
                                      <MenuItem value={12}>12</MenuItem>
                                      <MenuItem value={13}>13</MenuItem>
                                      <MenuItem value={14}>14</MenuItem>
                                      <MenuItem value={15}>15</MenuItem>
                                      
                                    </Select>
                                  </FormControl>
                                </Box>
                              



                                <Box marginTop={6} > <Divider><Typography variant='subtitle1'>Escolha uma especificação</Typography></Divider> </Box>

                              <Box marginTop={2}>
                      <Box marginTop={2}>
                        
                      
                      <Box marginTop={2}>
                                  <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Especificação</InputLabel>
                                    <Select
                                      labelId="demo-simple-select-label"
                                      id="demo-simple-select"
                                      value={wordsAttributes}
                                      label="Especificação"
                                      // error={level === '0'}
                                      onChange={(e) => setWordsAttributes(e.target.value)}
                                    >
                                      <MenuItem value='noSpecification'>Gerar frases sem especficiações</MenuItem>
                                      <MenuItem value='specificsWords'>Gerar frases utilizando determinadas palavras</MenuItem>
                                      <MenuItem value='attributes'>Gerar frases utilizando atributos gerais</MenuItem>
                                      
                                      
                                    </Select>
                                  </FormControl>
                                </Box>
                      </Box>
                      {console.log('contextType', contextType)}
                      {wordsAttributes === 'specificsWords' && <>
                      <Box marginTop={2}>
                      <Typography variant='caption'>Informe as palavras que deseja incluir nas frases geradas pela inteligência artificial. Normalmente são utilzadas palavras que os alunos tem mais dificuldade na pronúncia.</Typography>
                                  <Box marginTop={2}>

                                  <TextField
                                  fullWidth
                                  required
                                  multiline
                                  rows={3}
                                    label="Palavras separadas por virgula"
                                    value={specification}
                                    color="primary"
                                    placeholder="Ex.: Though, Tough, Thought, Clothes, Schedule, February, Beach, Entrepreneurship, Horror, Sixth, eighth..."
                                    helperText={`Total de palavras: ${totalWords}`}
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                    onChange={(e) => handleSetWords(e.target.value)}
                                  />
                                  </Box>
                              </Box>
                      </>}
                      {wordsAttributes === 'attributes' && <>
                      <Box marginTop={2}>
                              <TextField
                              fullWidth
                              // required
                                    label="Atributos (separe por vírgula)"
                                    value={attributes}
                                    color="primary"
                                    placeholder="Ex.: palavras com TH; consoantes silenciosas; trava-línguas..."
                                    // helperText="Seja específico. Insira apenas o nome do seu produto ou serviço."
                                    // error={newBusinessNameError !== null}
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                    onChange={(e) => onChangeAttributes(e)}
                                  />
                              </Box>
                      </>}
                              </Box>
                              









                              
<Box marginTop={6} > <Divider><Typography variant='subtitle1'>Escolha um contexto para as frases</Typography></Divider> </Box>
                              <Box marginTop={2}>
                      <Box marginTop={2}>
                      <Box marginTop={2}>
                                  <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Tipo de contexto</InputLabel>
                                    <Select
                                      labelId="demo-simple-select-label"
                                      id="demo-simple-select"
                                      value={contextType}
                                      label="Tipo de contexto"
                                      // error={level === '0'}
                                      onChange={onChangeContextType}
                                    >
                                      <MenuItem value='noContext'>Sem contexto</MenuItem>
                                      <MenuItem value='comprehensiveContext'>Contexto por tópico</MenuItem>
                                      <MenuItem value='targetedContext'>Contexto por conteúdo extenso</MenuItem>
                                      
                                      
                                    </Select>
                                  </FormControl>
                                </Box>
                      </Box>
                      {console.log('contextType', contextType)}
                      {contextType === 'comprehensiveContext' && <>
                      <Box marginTop={2}>
                      <Typography>Contextualize as frases de forma simples e abrangente.</Typography>
                                  <Box marginTop={2}>
                                  <TextField
                                  fullWidth
                                  required
                                    label="Tópicos"
                                    value={comprehensiveContext}
                                    color="primary"
                                    placeholder="Ex.: football; viagem; comida; games; frases de Alice no país das maravilhas..."
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                    onChange={(e) => setComprehensiveContext(e.target.value)}
                                  />
                                  </Box>
                              </Box>
                      </>}
                      {contextType === 'targetedContext' && <>
                      <Box marginTop={2}>
                      <Typography>Copie um texto completo como um artigo ou unidade de uma lição. As frases serão geradas com base no conteúdo informado.</Typography>
                      <Box marginTop={2}>
                                  <TextField
                                  fullWidth
                                  required
                                  multiline
                                  rows={6}
                                    label="Conteúdo"
                                    value={targetedContext}
                                    color="primary"
                                    placeholder="Copie um texto aqui"
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                    onChange={(e) => setTargetedContext(e.target.value)}
                                  />
                                  </Box>
                              </Box>
                      </>}
                              </Box>
                              
                          </Box>
                          </Box>
                          <Box m={2} display='flex' flexDirection='column'>
                                  <LoadingButton loading={submitting} variant='contained' onClick={() => handleSubmitt()}>Criar frases</LoadingButton>
                        <Typography variant="caption">Após criar, você poderá enviar o áudio demonstração da frase</Typography>
  
                      </Box>
                          </>
    </Box>)
  }

  export default ExerciseCopilotForm