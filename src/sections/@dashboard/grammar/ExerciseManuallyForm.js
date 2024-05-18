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
    Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
DialogContentText,
Button
} from '@mui/material'

import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

import { LoadingButton } from '@mui/lab';

import { useSnackbar } from 'notistack';

import { styled } from '@mui/material/styles'
const DrawerRootStyled = styled('div')(({theme}) => ({
  [theme.breakpoints.up('xs')]: {
    width: 350
  },
  [theme.breakpoints.up('md')]: {
    width: 600
  }
}))

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

const filter = createFilterOptions();

const ExerciseManuallyForm = (props) => {
  const {
    toggleDrawer,
    initialValue,
    onClickAction,
    onClickActionTitle
  } = props
  
    const { enqueueSnackbar } = useSnackbar();

    const [submitting, setSubmitting] = useState(false)


    const [grammarExerciseCategory, setGrammarExerciseCategory] = useState({
      category: "article",
      english: "article",
      title: "artigo"
    })

    const [grammarExerciseType, setGrammarExerciseType] = useState('multipleChoice')
    const [grammarExerciseQuestion, setGrammarExerciseQuestion] = useState()
    const [grammarExerciseQuestionExample, setGrammarExerciseQuestionExample] = useState()
    const [grammarExerciseAnswer, setGrammarExerciseAnswer] = useState()
    const [grammarExerciseAnswerExample, setGrammarExerciseAnswerExample] = useState()
    
    useEffect(() => {
      if (initialValue) {
        console.log('initialValue', initialValue)
        setGrammarExerciseCategory(initialValue.category)
        setGrammarExerciseType(initialValue.type)
        setGrammarExerciseQuestion(initialValue.question)
        setGrammarExerciseAnswer(initialValue.answer)
        onChangeGrammarExerciseType(initialValue.type)
      }
    },[initialValue])
    const onChangeGrammarExerciseType = (typeEvent) => {
      const examples = { 
       multipleChoice: { 
         question: `Ex.: Question forms are essential for engaging in conversations. Let's see how well you can form questions with a multiple-choice question.
    
    Which of the following is a correct question form?
                                                   
    A. You have dinner yesterday?
                                                   
    B. Did you have dinner yesterday?
                                                   
    C. Have you dinner yesterday?`, 
       answer: `Ex.: B) Did you have dinner yesterday?`
     },
       fillInIheBlank: { question: `Understanding when to use a gerund or infinitive can be tricky. Let's test your knowledge with a fill-in-the-blank question.\n\nShe enjoys ___ (swim) in the sea.`, answer: 'swimming'},
       shortAnswer: { question: `Nouns are naming words that identify people, places, and things. Let's test your knowledge with a short answer question.\n\nGive an example of a proper noun.`, answer: 'And'}
         }
    
         
    
    console.log('typeEvent', typeEvent)
    console.log('grammarExerciseType', grammarExerciseType)
    setGrammarExerciseType(typeEvent)
    setGrammarExerciseQuestionExample(examples[typeEvent].question)
    setGrammarExerciseAnswerExample(examples[typeEvent].answer)
    
    
     }
    
     const handleOnClick = async () => {
      const payload = {
        lessonExerciseId: initialValue ? initialValue._id : null,
        grammarExerciseCategory: grammarExerciseCategory,
        grammarExerciseType,
        grammarExerciseQuestion,
        grammarExerciseAnswer,
      }
    
      console.log('on click payload', payload)
    
     
     
    
    
      try {
        setSubmitting(true)

        await onClickAction(payload)

        setSubmitting(false)
        setGrammarExerciseCategory(null)
        setGrammarExerciseType('')
        setGrammarExerciseQuestionExample('')
        setGrammarExerciseAnswerExample('')
        setGrammarExerciseQuestion('')
        setGrammarExerciseAnswer('')

        enqueueSnackbar('Exercício criado');
        toggleDrawer(false)

    } catch (error) {
        enqueueSnackbar(error.message && error.message, { variant: 'error' });
        console.log('error', error)
        setSubmitting(false)
    }

    }
      return (
        <DrawerRootStyled>
                <Box marginTop={2}>
                <Box display='flex' justifyContent='center'>
                                <Box maxWidth='80%' display='flex' textAlign='center'>
                                <Typography variant='subtitle1'>Criar questões manualmente</Typography>
                                </Box>
                            </Box>
                                 <Box m={2}>
                                      <FreeSoloCreateOptionDialog value={grammarExerciseCategory} setValue={setGrammarExerciseCategory} />
                                 </Box>
                
                                <Box m={2}>
                                    <FormControl fullWidth>
                                      <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
                                      <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={grammarExerciseType}
                                        label="Tipo"
                                        // error={level === '0'}
                                        onChange={(e) => onChangeGrammarExerciseType(e.target.value)}
                                      >
                                        <MenuItem value='multipleChoice'>Multipla escolha</MenuItem>
                                        <MenuItem value='fillInIheBlank'>Preencher espaço em branco</MenuItem>
                                        <MenuItem value='shortAnswer'>Respostas curtas</MenuItem>
                                      </Select>
                                    </FormControl>
                                </Box>
    
                                {
                                  grammarExerciseType && <>
                                  <Box m={2}>
                                    <TextField
                                    fullWidth
                                    required
                                    multiline
                                    rows={12}
                                      label="Digite o exercício aqui"
                                      value={grammarExerciseQuestion}
                                      color="primary"
                                      placeholder={grammarExerciseQuestionExample}
                                      // helperText="Esta é a frase que o aluno irá ler para assim praticar a pronúncia"
                                      InputLabelProps={{
                                        shrink: true,
                                      }}
                                      onChange={(e) => setGrammarExerciseQuestion(e.target.value)}
                                    />
                                </Box>
    
               
    
                            <Box m={2}>
                              <TextField
                              fullWidth
                              required
                              multiline
                              rows={1}
                                label="Resposta correta do exercício"
                                value={grammarExerciseAnswer}
                                color="primary"
                                placeholder={grammarExerciseAnswerExample}
                                helperText="A resposta não irá aparecer para o aluno. Servirá apenas para guiar nossa inteligência aritifical na correção do exercício."
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                onChange={(e) => setGrammarExerciseAnswer(e.target.value)}
                              />
                            </Box>
    
              <Box m={2} display='flex' flexDirection='column'>
                          <LoadingButton loading={submitting} variant='contained' onClick={() => handleOnClick()}>{onClickActionTitle}</LoadingButton>
    
              </Box>
                                  </>
                          }
                          </Box>
    
      </DrawerRootStyled>)
  }

  export default ExerciseManuallyForm