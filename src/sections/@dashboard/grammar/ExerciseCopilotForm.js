import { useState, useRef } from 'react'
import {
    Box,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    Divider,
    Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
DialogContentText,
Button,
Stack
} from '@mui/material'

import { LoadingButton } from '@mui/lab';

import { useSnackbar } from 'notistack';

import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

const grammarCategories = [
  { "category": "adjectiveAgreement", "english": "adjective agreement", "title": "concordância de adjetivos" },
  { "category": "adjectivesVsAdverb", "english": "adjectives vs adverb", "title": "adjetivos vs advérbio" },
  { "category": "adverbsOfFrequency", "english": "adverbs of frequency", "title": "advérbios de frequência" },
  { "category": "article", "english": "article", "title": "artigo" },
  { "category": "articlesAAnThe", "english": "articles: a, an, the", "title": "artigos: a, um, o" },
  { "category": "capitalization", "english": "capitalization", "title": "maiúsculas" },
  { "category": "capitalizationAndPunctuation", "english": "capitalization and punctuation", "title": "maiúsculas e pontuação" },
  { "category": "capitalizationRule", "english": "capitalization rule", "title": "regra de maiúsculas" },
  { "category": "comparative", "english": "comparative", "title": "comparativo" },
  { "category": "comparativeAdjective", "english": "comparative adjective", "title": "adjetivo comparativo" },
  { "category": "comparativeAndSuperlativeForm", "english": "comparative and superlative form", "title": "forma comparativa e superlativa" },
  { "category": "comparativesAndSuperlative", "english": "comparatives and superlative", "title": "comparativos e superlativos" },
  { "category": "conditionalMood", "english": "conditional mood", "title": "modo condicional" },
  { "category": "conditionalSentence", "english": "conditional sentence", "title": "frase condicional" },
  { "category": "confusingWord", "english": "confusing word", "title": "palavra confusa" },
  { "category": "conjunction", "english": "conjunction", "title": "conjunção" },
  { "category": "futurePlan", "english": "future plan", "title": "plano futuro" },
  { "category": "futureSimple", "english": "future simple", "title": "futuro simples" },
  { "category": "futureTense", "english": "future tense", "title": "tempo futuro" },
  { "category": "gerundsAndInfinitive", "english": "gerunds and infinitive", "title": "gerúndio e infinitivo" },
  { "category": "gerundsVsInfinitive", "english": "gerunds vs infinitive", "title": "gerúndio vs infinitivo" },
  { "category": "imperative", "english": "imperative", "title": "imperativo" },
  { "category": "incorrectAnswer", "english": "incorrect answer", "title": "resposta incorreta" },
  { "category": "incorrectWordChoice", "english": "incorrect word choice", "title": "escolha de palavra incorreta" },
  { "category": "informalToneAndContraction", "english": "informal tone and contraction", "title": "tom informal e contração" },
  { "category": "language", "english": "language", "title": "idioma" },
  { "category": "listeningComprehension", "english": "listening comprehension", "title": "compreensão oral" },
  { "category": "missingAnswer", "english": "missing answer", "title": "resposta ausente" },
  { "category": "missingInformation", "english": "missing information", "title": "informação ausente" },
  { "category": "missingWord", "english": "missing word", "title": "palavra ausente" },
  { "category": "modalVerb", "english": "modal verb", "title": "verbo modal" },
  { "category": "modalVerbsCanCouldMayMight", "english": "modal verbs: can, could, may, might", "title": "verbos modais: can, could, may, might" },
  { "category": "modalVerbsForAdvice", "english": "modal verbs for advice", "title": "verbos modais para conselhos" },
  { "category": "n/a", "english": "n/a", "title": "n/a" },
  { "category": "negation", "english": "negation", "title": "negação" },
  { "category": "noun", "english": "noun", "title": "substantivo" },
  { "category": "passiveVoice", "english": "passive voice", "title": "voz passiva" },
  { "category": "pastPerfectTense", "english": "past perfect tense", "title": "pretérito mais-que-perfeito" },
  { "category": "pastSimple", "english": "past simple", "title": "passado simples" },
  { "category": "pastSimpleVsPastParticiple", "english": "past simple vs. past participle", "title": "passado simples vs. particípio passado" },
  { "category": "pastTense", "english": "past tense", "title": "tempo passado" },
  { "category": "phrasalVerb", "english": "phrasal verb", "title": "verbo frasal" },
  { "category": "pluralForm", "english": "plural form", "title": "forma plural" },
  { "category": "pluralNoun", "english": "plural noun", "title": "substantivo plural" },
  { "category": "possessiveNounUsage", "english": "possessive noun usage", "title": "uso de substantivo possessivo" },
  { "category": "possessivePronoun", "english": "possessive pronoun", "title": "pronome possessivo" },
  { "category": "preposition", "english": "preposition", "title": "preposição" },
  { "category": "prepositionsInOnAt", "english": "prepositions: in, on, at", "title": "preposições: em, no, a" },
  { "category": "prepositionsOfTime", "english": "prepositions of time", "title": "preposições de tempo" },
  { "category": "presentContinuous", "english": "present continuou", "title": "presente contínuo" },
  { "category": "presentPerfect", "english": "present perfect", "title": "pretérito perfeito" },
  { "category": "presentSimpleVsPresentContinuous", "english": "present simple vs present continuou", "title": "presente simples vs. presente contínuo" },
  { "category": "pronoun", "english": "pronoun", "title": "pronome" },
  { "category": "properNounCapitalization", "english": "proper noun capitalization", "title": "maiúsculas em nomes próprios" },
  { "category": "punctuation", "english": "punctuation", "title": "pontuação" },
  { "category": "punctuationComma", "english": "punctuation: comma", "title": "pontuação: vírgula" },
  { "category": "punctuationAndWordOrder", "english": "punctuation and word order", "title": "pontuação e ordem das palavras" },
  { "category": "questionForm", "english": "question form", "title": "forma de pergunta" },
  { "category": "questionFormat", "english": "question format", "title": "formato de pergunta" },
  { "category": "questionStructure", "english": "question structure", "title": "estrutura de pergunta" },
  { "category": "questionTag", "english": "question tag", "title": "tag de pergunta" },
  { "category": "relativeClause", "english": "relative clause", "title": "cláusula relativa" },
  { "category": "repeatedWord", "english": "repeated word", "title": "palavra repetida" },
  { "category": "sentenceStructure", "english": "sentence structure", "title": "estrutura de frase" },
  { "category": "spelling", "english": "spelling", "title": "ortografia" },
  { "category": "spellingPunctuation", "english": "spelling/punctuation", "title": "ortografia/pontuação" },
  { "category": "spellingAndCapitalization", "english": "spelling and capitalization", "title": "ortografia e maiúsculas" },
  { "category": "spellingAndPunctuation", "english": "spelling and punctuation", "title": "ortografia e pontuação" },
  { "category": "subjectVerbAgreement", "english": "subject verb agreement", "title": "concordância entre sujeito e verbo" },
  { "category": "tagQuestion", "english": "tag question", "title": "pergunta de confirmação" },
  { "category": "thirdConditional", "english": "third conditional", "title": "terceira condicional" },
  { "category": "verbAgreement", "english": "verb agreement", "title": "concordância verbal" },
  { "category": "verbConjugation", "english": "verb conjugation", "title": "conjugação verbal" },
  { "category": "verbForm", "english": "verb form", "title": "forma verbal" },
  { "category": "verbTense", "english": "verb tense", "title": "tempo verbal" },
  { "category": "verbTenseFormUsage", "english": "verb tense/form usage", "title": "uso do tempo verbal/forma verbal" },
  { "category": "verbTenseAgreement", "english": "verb tense agreement", "title": "concordância de tempo verbal" },
  { "category": "verbTenseAndWordUsage", "english": "verb tense and word usage", "title": "uso do tempo verbal e da palavra" },
  { "category": "verbUsage", "english": "verb usage", "title": "uso do verbo" },
  { "category": "vocabulary", "english": "vocabulary", "title": "vocabulário" },
  { "category": "wordChoice", "english": "word choice", "title": "escolha de palavras" },
  { "category": "wordChoiceUsage", "english": "word choice/usage", "title": "escolha/uso de palavras" },
  { "category": "wordForm", "english": "word form", "title": "forma da palavra" },
  { "category": "wordOrder", "english": "word order", "title": "ordem das palavras" },
  { "category": "wordUsage", "english": "word usage", "title": "uso da palavra" }
]

const filter = createFilterOptions();

export function FreeSoloCreateOptionDialog({ value, setValue }) {
  const [open, toggleOpen] = useState(false);

  const handleClose = () => {
    setDialogValue({
      title: '',
      
    });
    toggleOpen(false);
  };

  const [dialogValue, setDialogValue] = useState({
    title: '',
    
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setValue({
      title: dialogValue.title,

    });
    handleClose();
  };

  return (
    <>
      <Autocomplete
      // fullWidth
        value={value}
        onChange={(event, newValue) => {
          if (typeof newValue === 'string') {
            // timeout to avoid instant validation of the dialog's form.
            setTimeout(() => {
              toggleOpen(true);
              setDialogValue({
                title: newValue,

              });
            });
          } else if (newValue && newValue.inputValue) {
            toggleOpen(true);
            setDialogValue({
              title: newValue.inputValue,

            });
          } else {
            setValue(newValue);
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          if (params.inputValue !== '') {
            filtered.push({
              inputValue: params.inputValue,
              title: `Add "${params.inputValue}"`,
            });
          }

          return filtered;
        }}
        id="free-solo-dialog-demo"
        options={grammarCategories}
        getOptionLabel={(option) => {
          // for example value selected with enter, right from the input
          if (typeof option === 'string') {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.title;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        renderOption={(props, option) => <li {...props}>{option.title}</li>}
        // sx={{ width: 300 }}
        freeSolo
        renderInput={(params) => <TextField {...params} label="Categoria" placeholder='Ex.: Tempo verbal'  InputLabelProps={{
          shrink: true,
        }} />}
      />
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Adicionar nova categoria</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Não encontrou uma categoria adequada? Por favor, adicione uma nova!
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              value={dialogValue.title}
              onChange={(event) =>
                setDialogValue({
                  ...dialogValue,
                  title: event.target.value,
                })
              }
              label="categoria"
              type="text"
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button type="submit">Adicionar</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
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
    const [sentenceQuantity, setSentenceQuantity] = useState(4)
    const [contextType, setContextType] = useState('noContext')
    const [comprehensiveContext, setComprehensiveContext] = useState('')
    const [targetedContext, setTargetedContext] = useState('')
    const [submitting, setSubmitting] = useState(false);
    const [wordsAttributes, setWordsAttributes] = useState('noSpecification')
    const [totalWords, setTotalWords] = useState(0)







    const [grammarCategoryGenerate, setGrammarCategoryGenerate] = useState(null)
    const [grammarExerciseTypeGenerate, setGrammarExerciseTypeGenerate] = useState('')
  
    const [openUploadFile, setOpenUploadFile] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [currentLessonExerciseId, setCurrentLessonExerciseId] = useState('')
    const [GrammarExerciseComponentInitialValue, setGrammarExerciseComponentInitialValue] = useState(null)
    const [updatingSentence, setUpdatingSentence] = useState(false)
    const [openUpdateSentenceTextDialog, setOpenUpdateSentenceTextDialog] = useState(false)
  
    const [openDrawer, setOpenDrawer] = useState(false)
    const [drawerContent, setDrawerContent] = useState(null)


  const [seconds, setSeconds] = useState(0);
  const [secRunning, setSecRunning] = useState(false);
  const intervalRef = useRef(null);

  function startSec() {
    if (!secRunning) {
      setSecRunning(true);
      intervalRef.current = setInterval(() => {
        setSeconds((sec) => sec + 1);
      }, 1000);
    }
  }

  function resetSec() {
    setSeconds(0);
  }

  function stopSec() {
    setSecRunning(false);
      resetSec()
      clearInterval(intervalRef.current);
  }


  

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

    

    const generateSentence = async () => {
      setSubmitting(true)
      startSec()
  
      let context = ''
  
      if(contextType === 'comprehensiveContext') {
        context = comprehensiveContext
      }
      if(contextType === 'targetedContext') {
        context = targetedContext
      }
  
      const payload = {
        sentenceQuantity,
        category: grammarCategoryGenerate,
        type: grammarExerciseTypeGenerate,
        contextType,
        context: contextType !== 'noContext' ? context : ''
      }
  
      try {
  
  
        console.log('grammar payload', payload)
      
        // setSentence('')
        // eslint-disable-next-line consistent-return
     
        // redirect

        setSubmitting(true)

        await mainAction(payload)

        setSubmitting(false)

        enqueueSnackbar(`Exercício criado`);
        stopSec()
        toggleDrawer(false)
  
      
      } catch (error) {
        enqueueSnackbar(error.message && error.message, { variant: 'error' });
        console.error(error);
      }
      // clearInterval(timer)
    
      setSubmitting(false)
    };
  
    return (<Box
      sx={{ width: 600 }}
    >
    <>

              <>
              <Box m={2}>
              <Box m={2}>
              
              <Box display='flex' justifyContent='center'>
                                <Box maxWidth='80%' display='flex' textAlign='center'>
                                <Typography variant='subtitle1'>Criar questões automaticamente com a nossa inteligência artificial.</Typography>
                                </Box>
                            </Box>
              <Box marginTop={2}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Quantidade de questões</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={sentenceQuantity}
                          label="Quantidade de questões"
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
                    <Box marginTop={2}>
                    

                    <Box marginTop={2}>
                                  <FreeSoloCreateOptionDialog value={grammarCategoryGenerate} setValue={setGrammarCategoryGenerate} />
                             </Box>
            
                            <Box marginTop={2}>
                                <FormControl fullWidth>
                                  <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
                                  <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={grammarExerciseTypeGenerate}
                                    label="Tipo"
                                    // error={level === '0'}
                                    onChange={(e) => setGrammarExerciseTypeGenerate(e.target.value)}
                                  >
                                    <MenuItem value='multipleChoice'>Multipla escolha</MenuItem>
                                    <MenuItem value='fillInIheBlank'>Preencher espaço em branco</MenuItem>
                                    <MenuItem value='shortAnswer'>Respostas curtas</MenuItem>
                                  </Select>
                                </FormControl>
                            </Box>
                  </Box>
                  <Box marginTop={2}>
        <Box marginTop={2}>
        <Typography variant='subtitle1'>Escolha um contexto para as frases</Typography>
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
                        label="Contexto simples"
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
                        label="Contexto direcionado"
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
              <Box m={4}>

              {
              submitting && <Stack  alignItems="flex-start">
              <Typography variant='subtitle1'>Aguarde</Typography>
              <Typography>
                {seconds}
                {' '}
                 segundos ...
                </Typography>
              <Typography variant='caption'>Isso pode demorar 60 segundas</Typography>
              </Stack>
              }
              </Box>
              <Box m={2} display='flex' flexDirection='column'>
                      <LoadingButton loading={submitting} variant='contained' onClick={() => generateSentence()}>Criar exercícios</LoadingButton>

          </Box>
              </>
    </>
    </Box>)
  }

  export default ExerciseCopilotForm