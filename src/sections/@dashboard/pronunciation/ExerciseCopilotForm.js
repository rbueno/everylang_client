import { useState, useEffect } from 'react'
import {
    Box,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    Divider,
    Card,
    CardContent
} from '@mui/material'

import Label from '../../../components/label';
import Markdown from '../../../components/markdown';
import { LoadingButton } from '@mui/lab';

import { useSnackbar } from 'notistack';

import TagsInput from './TagsInput'


import Joyride, { ACTIONS, EVENTS, ORIGIN, STATUS } from 'react-joyride'

// ----------------------------------------------------------------------


const stepsAccessGuideNewLesson = [
  {
    content: (
      <div>
      <h3>Forma mais comum de criar exercícios com IA.</h3>
      <p>Existem diversas maneiras de utilizar nossa IA, aprenderemos aqui o maneira mais comum de criar exercícios.</p>
      </div>
    ),
    placement: 'center',
    target: 'body',
  },
  {
    target: '.lesson-exercise-add-step-1',
    content: (
      <div>
      <h3>Insira uma palavra aqui</h3>
      <p>Insira aqui uma palavra que normalmente seus alunos tem dificuldade em pronúnciar.</p>
      <p>Após inserir a palavra, clique em "avançar"</p>
      </div>
    ),
    disableBeacon: true,
    // disableOverlayClose: true,
    // disableOverlay: true,
    hideCloseButton: true,
    // hideFooter: true,
    placement: 'bottom',
    spotlightClicks: true,
  },
  {
    target: '.lesson-exercise-add-step-2',
    content: (
      <div>
      <h3>Clique em "criar frases"</h3>
      <p>Nossa IA irá criar algumas frases utilizando a palavra que você informou.</p>
      </div>
    ),
    disableBeacon: true,
    // disableOverlayClose: true,
    hideCloseButton: true,
    hideFooter: true,
    placement: 'top',
    spotlightClicks: true,
  }
];


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

export const wordsCount = ({ words }) => {
  let contagem = {};

  // Contando cada palavra no array
  words.forEach(palavra => {
      if (contagem[palavra]) {
          contagem[palavra]++;
      } else {
          contagem[palavra] = 1;
      }
  });

  // Transformando o objeto de contagem em um array de strings formatadas
  let resultado = '';
  for (let palavra in contagem) {
      let indication = contagem[palavra] > 1 ? `- ${contagem[palavra]} frases utilizando a palavra: "${palavra}"` : `- ${contagem[palavra]} frase utilizando a palavra: "${palavra}"`;
      resultado += `${indication}\n`
  }

  return resultado
}

export const wordsDistribute = ({ words, slots }) => {
  console.log('words', words)
  if (words.length > slots) {
    throw new Error("O número de palavras não pode ser maior que o número de frases a ser geradas. Reduza a quantidade de palavras ou aumente a quantidade de frases a serem geradas.");
}

  let resultado = new Array(slots);
  let totalPalavras = words.length;
  let posicao = 0;

  

  // Determinando quantas vezes cada palavra deve aparecer, tentando distribuir uniformemente
  for (let i = 0; i < totalPalavras; i++) {
      // Cálculo de quantas vezes essa palavra deve aparecer no array
      let count = Math.floor(slots / totalPalavras) + (i < slots % totalPalavras ? 1 : 0);

      // Preenchendo as posições do array com a palavra atual
      for (let j = 0; j < count; j++) {
          resultado[posicao++] = words[i].trim();
      }
  }

  return resultado;
}

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
      mainAction,
      lessonData
    } = props
  
    const { enqueueSnackbar } = useSnackbar();

    const [attributes, setAttributes] = useState('')
    const [specification, setSpecification] = useState('')
    const [sentenceQuantity, setSentenceQuantity] = useState(2)
    const [contextType, setContextType] = useState('noContext')
    const [comprehensiveContext, setComprehensiveContext] = useState('')
    const [targetedContext, setTargetedContext] = useState('')
    const [submitting, setSubmitting] = useState(false);
    const [wordsAttributes, setWordsAttributes] = useState('specificsWords')
    const [totalWords, setTotalWords] = useState(0)
    const [wordsToUseReview, setWordsToUseReview] = useState('')
    const [wordsToUseReviewError, setWordsToUseReviewError] = useState(null)

    const [run, setRun] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const handleJoyrideCallback = (data) => {
    const { action, index, origin, status, type } = data;

    console.log('data ==>', data)

    if (action === ACTIONS.CLOSE && origin === ORIGIN.KEYBOARD) {
      // do something
    }

    if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type)) {
      // Update state to advance the tour
      setStepIndex(index + (action === ACTIONS.PREV ? -1 : 1));
    } else if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      // You need to set our running state to false, so we can restart if we click start again.
      setRun(false);
    }

    console.groupCollapsed(type);
    console.log(data); //eslint-disable-line no-console
    console.groupEnd();
  };

  useEffect(() => {
    setRun(true)
  }, [])
  

    const onChangeContextType = (event) => {
        setContextType(event.target.value)
      }

    const onChangeSentenceQuantity = (event) => {
       setSentenceQuantity(event.target.value)

       if(wordsAttributes === 'specificsWords') {

        try {
          setWordsToUseReviewError(null)
          const words = wordsDistribute({ words: specification.split(','), slots: event.target.value })
          const wordsResult = wordsCount({ words })
          const phrasesToCreate = `Serão criadas:\n${wordsResult}`
          console.log('phrasesToCreate', phrasesToCreate)
          setWordsToUseReview(wordsResult)
  
        } catch (error) {
          setWordsToUseReviewError(error.message)
  
        }
    }
      

     }
  
   const onChangeAttributes = (event) => {
      setAttributes(event.target.value)
    }

    const handleSubmitt = async () => {
      setRun(false)
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
            setSubmitting(false)
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

       

        try {
          setWordsToUseReviewError(null)
          const words = wordsDistribute({ words: wordsSlot, slots: sentenceQuantity })
          const wordsResult = wordsCount({ words })
          const phrasesToCreate = `Serão criadas:\n${wordsResult}`
          console.log('phrasesToCreate', phrasesToCreate)
          setWordsToUseReview(wordsResult)

        } catch (error) {
          setWordsToUseReviewError(error.message)

        }
       
    }

    const [displayOnboarding, setDisplayOnboarding] = useState(false)
useEffect(() => {
  const onboardinStatus = window.localStorage.getItem('onboarding_status');
  if(onboardinStatus !== 'done') {
    window.localStorage.setItem('onboarding_status', 'pending');
    setDisplayOnboarding(true)
  } else {
    setDisplayOnboarding(false)
  }
})
  
    return (<DrawerRootStyled
      // sx={{ width: 350 }}
      // maxWidth='asdasd'
      // fullWidth
    >
                    <>
                          <Box m={2}>
                          <Box m={2}>
                            <Box display='flex' justifyContent='center'>
                                <Box maxWidth='80%' display='flex' textAlign='center'>
                                    <Typography variant='h6'>Criar frases automaticamente com a nossa inteligência artificial.</Typography>
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
                                      <MenuItem value={2}>2</MenuItem>
                                      <MenuItem value={4}>4</MenuItem>
                                      <MenuItem value={6}>6</MenuItem>
                                      <MenuItem value={8}>8</MenuItem>
                                      <MenuItem value={10}>10</MenuItem>
                                      <MenuItem value={12}>12</MenuItem>
                                      <MenuItem value={14}>14</MenuItem>
                                      
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
                                      <MenuItem value='noSpecification'>Sem especificação</MenuItem>
                                      <MenuItem value='specificsWords'>Criar frases utilizando determinadas palavras</MenuItem>
                                      <MenuItem value='attributes'>Criar frases utilizando atributos gerais</MenuItem>
                                      
                                      
                                    </Select>
                                  </FormControl>
                                </Box>
                      </Box>
                      {console.log('contextType', contextType)}
                      {wordsAttributes === 'specificsWords' && <>
                      <Box className='lesson-exercise-add-step-1' marginTop={2}>
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
                                    placeholder={getPlaceHolderByLessonLang(lessonData.learningLanguage, 'createPhrasesByWords')}
                                    // helperText={`Total de palavras: ${totalWords}`}
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                    onChange={(e) => handleSetWords(e.target.value)}
                                  />
                                  {
                                    wordsToUseReviewError ? <>
                                    <Card  sx={{ marginTop: 1, border: 'solid 1px red'}}>
                                      <CardContent>
                                    <Label color='error'>ATENÇÃO</Label>
                                    <Typography>{wordsToUseReviewError}</Typography>  

                                      </CardContent>
                                    </Card>
                                    </> : <>
                                    {
                                      totalWords > 0 && <>
                                      <Typography>Serão geradas:</Typography>
                                  <Markdown 
                                    children={wordsToUseReview}
                                  />
                                      </>
                                    }
                                    
                                    </>
                                  }
                                  
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
                                    placeholder={getPlaceHolderByLessonLang(lessonData.learningLanguage, 'createPhrasesByAttributes')}
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

                          <DialogActions style={{ position: 'sticky', bottom: 0, backgroundColor: '#fff', zIndex: 1000 }}>
                          <Button onClick={onClose} color="primary">
                            Close
                          </Button>
                          <Button onClick={() => alert('Action')} color="primary">
                            Action
                          </Button>
                        </DialogActions>

                          <Box m={2} display='flex' flexDirection='column' style={{ position: 'sticky', bottom: 0, backgroundColor: '#fff', zIndex: 1000 }}>
                                  <LoadingButton className='lesson-exercise-add-step-2' disabled={!!wordsToUseReviewError} loading={submitting} variant='contained' onClick={() => handleSubmitt()}>Criar frases</LoadingButton>
                        <Typography variant="caption">Após criar, você poderá enviar o áudio demonstração da frase</Typography>
  
                      </Box>
                      {
                        displayOnboarding && <Joyride
                        steps={stepsAccessGuideNewLesson}
                        continuous={true}
                        // locale={{ next: 'Avançar'}}
                        callback={handleJoyrideCallback}
                        run={run}
                        stepIndex={stepIndex}
                        locale={{ next: 'Avançar', back: 'voltar', 'last': 'fechar'}}
                        scrollToFirstStep
                        showProgress
                        disableCloseOnEsc
                        disableOverlayClose
                        hideCloseButton
                        styles={{
                          // overlay: { height: '100vh' },
                          options: {
                            zIndex: 10000,
                            // overlay: { height: '100vh' },
                          },
                        }}
                        />
                      }
                      
                          </>
    </DrawerRootStyled>)
  }

  export default ExerciseCopilotForm