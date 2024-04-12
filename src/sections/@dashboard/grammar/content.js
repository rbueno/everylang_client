/* eslint-disable no-unused-expressions */
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { format } from 'date-fns'
import { useSnackbar } from 'notistack';
// next
import { useRouter } from 'next/router';

// import AudioPlayer from 'material-ui-audio-player';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Container, Stack, Switch, Typography, FormControlLabel, TextField, FormGroup, Button, CardHeader, CardContent, Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Tooltip,
  Tabs,
  Tab,
  Select, MenuItem, InputLabel,
  Divider,
DialogContentText,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CreateIcon from '@mui/icons-material/Create';
import HelpIcon from '@mui/icons-material/Help';
import AssistantIcon from '@mui/icons-material/Assistant';
// utils
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
// import { fData } from '../../../utils/formatNumber';
import api from '../../../utils/axios';
import slugify from '../../../utils/slugify';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// _mock
// import { countries } from '../../../_mock';
// components
// import Label from '../../../components/Label';
import FormProvider, { RHFSelect, RHFSwitch, RHFTextField, RHFUploadAvatar } from '../../../components/hook-form';
import { useAuthContext } from '../../../auth/useAuthContext'
import Markdown from '../../../components/markdown'
import useCopyToClipboard from '../../../hooks/useCopyToClipboard'

import { FileNewFolderDialog } from '../file'
// @mui

// components
import Iconify from '../../../components/iconify';
import { Upload } from '../../../components/upload';

// import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';





import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { fontWeight } from '@mui/system';

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

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top


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

export function AccordionUsage() {
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          Accordion 1
        </AccordionSummary>
        <AccordionDetails>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          Accordion 2
        </AccordionSummary>
        <AccordionDetails>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          Accordion Actions
        </AccordionSummary>
        <AccordionDetails>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionDetails>
        <AccordionActions>
          <Button>Cancel</Button>
          <Button>Agree</Button>
        </AccordionActions>
      </Accordion>
    </div>
  );
}

const SCREENS = [
  {
    value: 'copilotCreator',
    label: 'Criar com Copilot',
    icon: <AssistantIcon fontSize='small' />,
    component: <Box>Crie botões com links externos de, por exemplo, uma site de vendas ou redes sociais</Box>,
  },
  {
    value: 'createDefault',
    label: 'Criar manualmente',
    icon: <CreateIcon fontSize='small'/>,
    component: <Box>Crie um texto livre com descrições e detalhes que enriqueçam seu conteúdo.</Box>,
  },
  {
    value: 'help',
    label: 'Ajuda',
    icon: <HelpIcon fontSize='small'/>,
    component: <Box>Como criar os exercícios</Box>,
  }
];

// ----------------------------------------------------------------------

const EditTextField = ({ content, closeDialog, sentence, lessonExerciseId, updateSentenceText, updatingSentence }) => {
 
  const [text, setText] = useState(content.question)

  return (
    <Box>
      <Box sx={{ paddingTop: 1, paddingBottom: 1 }}>
        <TextField
        fullWidth
        multiline
        rows={3}
        value={text}
        onChange={(e) => setText(e.target.value)}
        label='Texto / parágrafo'
        placeholder="Exemplo: Nos siga nas redes sociais, ative as notificações e não perca nenhuma novidade."
        />

      </Box>
      <Stack
      spacing={2}
      direction="row"
      alignItems="flex-end"
    >

      <LoadingButton fullWidth variant='contained' color="success" loading={updatingSentence} onClick={() => updateSentenceText({ lessonExerciseId: content._id, sentence: text, closeDialog })}>Salvar</LoadingButton>

    </Stack>
    </Box>
  )
}

// ----------------------------------------------------------------------

DeleteSentenceDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  lessonExerciseId: PropTypes.string,
};

export function DeleteSentenceDialog({
  open,
  onClose,
  lessonExerciseId,
  deleteExercise
}) {

  const [isDeleting, setIsDeleting] = useState(false)
  const { enqueueSnackbar } = useSnackbar();

  // const deleteSentence = async () => {
  //   setIsDeleting(true)
  //   try {
  //     await api.delete(`v1/everylang/lesson-exercises/pronunciation/${lessonExerciseId}`, audioData)
      
  //     enqueueSnackbar('Frase excluida!');
  //   } catch (error) {
  //     enqueueSnackbar('Erro ao excluir frase link', { variant: 'error'})
  //     console.error(error);
  //   }

  //   setIsDeleting(false)
  //   onClose()

  // };

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose}>
      <DialogTitle sx={{ p: (theme) => theme.spacing(3, 3, 2, 3) }}>Excluir exercício? </DialogTitle>

      <DialogContent dividers sx={{ pt: 1, pb: 0, border: 'none' }}>
        <Typography>Essa ação não poderá ser desfeita</Typography>
      </DialogContent>

      <DialogActions>
        <LoadingButton
         loading={isDeleting}
          variant="contained"
          startIcon={<DeleteForeverIcon />}
          onClick={() => deleteExercise({ lessonExerciseId, onClose, setIsDeleting })}
        >
          Excluir
        </LoadingButton>


          <Stack direction="row" justifyContent="flex-end" flexGrow={1}>
            <Button variant="soft" onClick={onClose}>
              cancelar
            </Button>
          </Stack>
      </DialogActions>
    </Dialog>
  );
}
export function UpdateSentenceTextDialog({
  open,
  onClose,
  dialogContent
}) {

  const [isDeleting, setIsDeleting] = useState(false)

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose}>
      <DialogTitle sx={{ p: (theme) => theme.spacing(3, 3, 2, 3) }}>Excluir frase? </DialogTitle>

      <DialogContent dividers sx={{ pt: 1, pb: 0, border: 'none' }}>
       {dialogContent}
      </DialogContent>

      <DialogActions>
          <Stack direction="row" justifyContent="flex-end" flexGrow={1}>
            <Button variant="soft" onClick={onClose}>
              cancelar
            </Button>
          </Stack>
      </DialogActions>
    </Dialog>
  );
}
export function UploadAudioFileDialog({
  title = 'Carregar áudio',
  open,
  onClose,
  //
  onCreate,
  onUpdate,
  //
  folderName,
  onChangeFolderName,
  lessonExerciseId,
  ...other
}) {
  const [files, setFiles] = useState([]);
  const [file, setFile] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (!open) {
      setFile(null)
    }
  }, [open])

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        console.log('newFile', newFile)
        setFile(newFile)
      }
    },
    [setFile]
  )

  const handleUpload = () => {
    // onClose();
    console.log('ON UPLOAD');
  };

  const handleRemoveFile = (inputFile) => {
    setFile(null);
  };

  const handleRemoveAllFiles = () => {
    setFile();
  };

  const submitFileAudio = async () => {
    // setUpdatingAvatarFile(true)
    // const imageFile = avatarFile
    // console.log('imageFile', imageFile)

    // const { _id: myPageId, s3BucketDir} = myPage

    const audioData = new FormData();
    audioData.append('audiofile', file);

    try {
      const { data } = await api.post(`v1/everylang/lesson-exercises/pronunciation/upload/${lessonExerciseId}`, audioData)
      // console.log('avatar update', data)
      // updateWorkspaces(data.workspaceSession)
console.log('audioData', audioData)
      enqueueSnackbar('Update success!');
    } catch (error) {
      console.error(error);
    }

    setFile(null)
    // setUpdatingAvatarFile(false)

  };

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose} {...other}>
      <DialogTitle sx={{ p: (theme) => theme.spacing(3, 3, 2, 3) }}> {title} </DialogTitle>

      <DialogContent dividers sx={{ pt: 1, pb: 0, border: 'none' }}>
        {(onCreate || onUpdate) && (
          <TextField
            fullWidth
            label="Folder name"
            value={folderName}
            onChange={onChangeFolderName}
            sx={{ mb: 3 }}
          />
        )}

        <Upload
          files={files} 
          onDrop={handleDrop} 
          onRemove={handleRemoveFile} 
          accept={{ 
            'audio/aac': [],
            'audio/mp4': [],
            'audio/mpeg': [],
            'audio/amr': [],
            'audio/ogg': [],
            'audio/opus': []
            }} />
      </DialogContent>

      <DialogActions>
        <Button
          variant="contained"
          startIcon={<Iconify icon="eva:cloud-upload-fill" />}
          onClick={submitFileAudio}
        >
          Upload
        </Button>

        {!!files.length && (
          <Button variant="outlined" color="inherit" onClick={handleRemoveAllFiles}>
            Remove all
          </Button>
        )}

        {(onCreate || onUpdate) && (
          <Stack direction="row" justifyContent="flex-end" flexGrow={1}>
            <Button variant="soft" onClick={onCreate || onUpdate}>
              {onUpdate ? 'Save' : 'Create'}
            </Button>
          </Stack>
        )}
      </DialogActions>
    </Dialog>
  );
}


export function ControlledRadioButtonsGroup(props) {
  const { audios, activeAudioId, lessonExerciseId, switchActiveAudio, isSwitchingAudioId } = props
  const [value, setValue] = useState(activeAudioId);

  const handleChange = (event) => {
    setValue(event.target.value);
    switchActiveAudio({ lessonExerciseId, audioId: event.target.value })
  };

  useEffect(() => {
    setValue(activeAudioId)
  },[activeAudioId])

  return (
    <>
        <FormControl>
      <FormLabel id="demo-controlled-radio-buttons-group">Escolha o áudio a ser disponibilizado para o aluno</FormLabel>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={handleChange}
      >
    {
      audios?.length > 0 && audios.map((audio, idx) => <Box key={audio._id}>
        <Box>
          {/* {console.log('audio', audio)} */}
        <FormControlLabel value={audio._id} control={<Radio />} label={`${audio.creator === 'everylang' ? 'Gerado por Everylang' : 'Enviado pelo usuário'} - ${audio.createdAt && format(new Date(audio.createdAt), 'dd/MM/yyyy HH:mm:ss')}`} />
        {isSwitchingAudioId === audio._id && <Box sx={{ width: '100%' }}>
      <LinearProgress />
    </Box>}
        </Box>
      </Box>)
    }
    </RadioGroup>
    </FormControl>
    </>
  );
}

// ----------------------------------------------------------------------

export function GrammarExerciseComponent(props) {
const {
  initialValue,
  submitting,
  onClickAction,
  onClickActionTitle
} = props
const [grammarExerciseCategory, setGrammarExerciseCategory] = useState('artigo')
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
  await onClickAction(payload)
  setGrammarExerciseCategory(null)
  setGrammarExerciseType('')
  setGrammarExerciseQuestionExample('')
  setGrammarExerciseAnswerExample('')
  setGrammarExerciseQuestion('')
  setGrammarExerciseAnswer('')
 }
  return (
    <>
            
           
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

  </>)
}
// ----------------------------------------------------------------------

BusinessEdit.propTypes = {
  adId: PropTypes.string,
};

export default function BusinessEdit({ adId }) {
  const { push } = useRouter();
  const { updateWorkspaces, switchWorkspace } = useAuthContext()
  const { enqueueSnackbar } = useSnackbar();
  const { copy } = useCopyToClipboard();

  const [newBusinessName, setNewBusinessName] = useState('');
  const [newBusinessNameError, setNewBusinessNameError] = useState(null);

  const [displayName, setDisplayName] = useState('');
  const [displayNameError, setDisplayNameError] = useState(null);

  // const [description, setDescription] = useState('');
  // const [descriptionError, setDescriptionError] = useState(null);

  const [data, setData] = useState({ adLabel: '', productServiceName: '', productServiceDescription: '', adOccasion: '', adPromotion: '' });
  const [dataError, setDataError] = useState({ name: null, slug: null, description: null, loadingError: null });
  const [submitting, setSubmitting] = useState(false);
  const [isGeneratingAudioIdx, setIsGeneratingAudioIdx] = useState(null);
  const [isSwitchingAudioId, setIsSwitchingAudioId] = useState(null);
  const [newAdsGenerated, setNewAdsGenerated] = useState(null)

  const [grammarCategoryGenerate, setGrammarCategoryGenerate] = useState(null)
  const [grammarExerciseTypeGenerate, setGrammarExerciseTypeGenerate] = useState('')

  const [openUploadFile, setOpenUploadFile] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentLessonExerciseId, setCurrentLessonExerciseId] = useState('')
  const [GrammarExerciseComponentInitialValue, setGrammarExerciseComponentInitialValue] = useState(null)
  const [updatingSentence, setUpdatingSentence] = useState(false)
  const [openUpdateSentenceTextDialog, setOpenUpdateSentenceTextDialog] = useState(false)
  const [currentTab, setCurrentTab] = useState('copilotCreator')
  const [sentenceQuantity, setSentenceQuantity] = useState(5)
  const [attributes, setAttributes] = useState('')
  const [contextType, setContextType] = useState('multipleChoice')
  
  const [comprehensiveContext, setComprehensiveContext] = useState('')
  const [targetedContext, setTargetedContext] = useState('')

 
  const onChangeContextType = (event) => {
    setContextType(event.target.value)
  }
  
  const onChangeAttributes = (event) => {
    setAttributes(event.target.value)
  }

  const onChangeSentenceQuantity = (event) => {
    setSentenceQuantity(event.target.value)
  }
  const handleOpenUploadFile = ({ lessonExerciseId }) => {
    setCurrentLessonExerciseId(lessonExerciseId)
    setOpenUploadFile(true);
  };
  const handleOpenDialog = ({ lessonExerciseId }) => {
    setCurrentLessonExerciseId(lessonExerciseId)
    setOpenDialog(true);
  };

  const handleCloseUploadFile = () => {
    setOpenUploadFile(false);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const closeUpdateSentenceTextDialog = () => {
    setOpenUpdateSentenceTextDialog(false)
  }

  useEffect(() => {
    async function fetchData() {
      if (adId) {
        try {
          const response = await api.get(`/v1/everylang/lesson-exercises?lessonId=${adId}`)
          // const { workspaceSession } = response.data
    
          // updateWorkspaces(workspaceSession)
          // updateWorkspaces(workspaceSession)
    
          console.log('response.data', response.data)
          setNewAdsGenerated(response.data) 
          if (!response.data.ad) setDataError({ ...dataError, loadingError: 'Anúncio não encontrado. Tente novamente!' })
        } catch (error) {
          setDataError({ ...dataError, loadingError: 'Anúncio não encontrado. Tente novamente!' })
          console.error(error);
        }
      }
    }
    fetchData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adId]);


  const handleCopyLink = (adString) => {
    const hasCopied = copy(adString)
    if (hasCopied) {
      enqueueSnackbar('Mensagem copiada')
    }
    if (!hasCopied) {
      enqueueSnackbar('Erro ao copiar link', { variant: 'error'})
    }
  }
  const addSentence = async ({ grammarExerciseQuestion,
    grammarExerciseAnswer,
    grammarExerciseType,
    grammarExerciseCategory }) => {
    setSubmitting(true)

    const payload = { 
      grammarExerciseQuestion, 
      grammarExerciseAnswer, 
      grammarExerciseType, 
      grammarExerciseCategory: grammarExerciseCategory.title, 
      lessonId: newAdsGenerated.lesson._id
    }

    try {

      console.log('payload', payload)
      const responseProccesCreated = await api.post('v1/everylang/lesson-exercises/grammar', payload)
      console.log('responseProccesCreated', responseProccesCreated)
      
      setNewAdsGenerated(responseProccesCreated.data) 

      enqueueSnackbar(`Exercício criado`);
      setSubmitting(false)

     
      setOpenUpdateSentenceTextDialog(false)
    } catch (error) {
      enqueueSnackbar(error.message && error.message, { variant: 'error' });
      console.error(error);
    }
    // clearInterval(timer)
  
    setSubmitting(false)
  };
  const updateLessonExercise = async ({ 
    grammarExerciseQuestion,
    grammarExerciseAnswer,
    grammarExerciseType,
    grammarExerciseCategory,
    lessonExerciseId
   }) => {
    setSubmitting(true)

    const payload = { 
      grammarExerciseQuestion, 
      grammarExerciseAnswer, 
      grammarExerciseType, 
      grammarExerciseCategory, 
      lessonId: newAdsGenerated.lesson._id,
      lessonExerciseId
    }

    try {

      console.log('payload', payload)
      const responseProccesCreated = await api.patch('v1/everylang/lesson-exercises/grammar', payload)
      console.log('responseProccesCreated', responseProccesCreated)
      
      const lessonExercisesUpdated = newAdsGenerated.lessonExercises.map((item) => {
        if (item._id === lessonExerciseId) {
          return {
            ...responseProccesCreated.data.lessonExercise
          }
        }
        return item
      })
      newAdsGenerated.lessonExercises = lessonExercisesUpdated
      setNewAdsGenerated(newAdsGenerated) 





      enqueueSnackbar(`Exercício atualizado`);
      setSubmitting(false)

     
      setOpenUpdateSentenceTextDialog(false)
    } catch (error) {
      enqueueSnackbar(error.message && error.message, { variant: 'error' });
      console.error(error);
    }
    // clearInterval(timer)
  
    setSubmitting(false)
  };
  const generateSentence = async () => {
    setSubmitting(true)

    let context = ''

    if(contextType === 'comprehensiveContext') {
      context = comprehensiveContext
    }
    if(contextType === 'targetedContext') {
      context = targetedContext
    }

    const payload = {
      lessonId: newAdsGenerated.lesson._id,
      sentenceQuantity,
      category: grammarCategoryGenerate,
      type: grammarExerciseTypeGenerate,
      contextType,
      context: contextType !== 'noContext' ? context : ''
    }

    try {


      console.log('payload', payload)
      const responseProccesCreated = await api.post('v1/everylang/lesson-exercises/generate-grammar', payload)
      console.log('responseProccesCreated', responseProccesCreated)
      
      setNewAdsGenerated(responseProccesCreated.data) 
      // setSentence('')
      // eslint-disable-next-line consistent-return
      enqueueSnackbar(`Frases geradas`);
      setSubmitting(false)
      // redirect

    
    } catch (error) {
      enqueueSnackbar(error.message && error.message, { variant: 'error' });
      console.error(error);
    }
    // clearInterval(timer)
  
    setSubmitting(false)
  };

  const onChangeGrammarExerciseQuestion = ({ value }) => {
    // if (adLabel.length > 60) return;
    setSentence(value)
  };



  const updateSentenceText = async ({ lessonExerciseId, closeDialog }) => {
    setUpdatingSentence(true)

    const payload = { lessonExerciseId, sentence }
    try {

      const responseProccesCreated = await api.patch('v1/everylang/lesson-exercises/pronunciation', payload)
      console.log('responseProccesCreated', responseProccesCreated)
      
      const lessonExercisesUpdated = newAdsGenerated.lessonExercises.map((item) => {
        if (item._id === lessonExerciseId) {
          return {
            ...item,
            sentence: responseProccesCreated.data.lessonExercises.sentence
          }
        }
        return item
      })
      newAdsGenerated.lessonExercises = lessonExercisesUpdated
      setNewAdsGenerated(newAdsGenerated) 
      // eslint-disable-next-line consistent-return
      enqueueSnackbar(`sentence atualizado`);
      setUpdatingSentence(false)

    
    } catch (error) {
      enqueueSnackbar(error.message && error.message, { variant: 'error' });
      console.error(error);
    }
    // clearInterval(timer)
    closeDialog()
    setUpdatingSentence(false)
  }
  const deleteExercise = async ({ lessonExerciseId, setIsDeleting, onClose }) => {

    setIsDeleting(true)
    try {
      await api.delete(`v1/everylang/lesson-exercises/grammar/${lessonExerciseId}`)
      
      const lessonExercisesUpdated = newAdsGenerated.lessonExercises.filter((item) => item._id !== lessonExerciseId)
      newAdsGenerated.lessonExercises = lessonExercisesUpdated
      setNewAdsGenerated(newAdsGenerated) 
      enqueueSnackbar('Frase excluida!');
    } catch (error) {
      enqueueSnackbar(error.message && error.message, { variant: 'error' });
      console.error(error);
    }

    setIsDeleting(false)
    onClose()

  }

  const messageShare = `EVERYLANG - Exercícios de gramática\n\nCriado por: ${newAdsGenerated?.lesson?.creator}\n\nLição: ${newAdsGenerated?.lesson?.title}\n\nDetalhes: ${newAdsGenerated?.lesson?.description}\n\nAcesse esta lição enviando o código "refl${newAdsGenerated?.lesson?.sharingId}" na conta de WhatsApp do Everylang.\n\nPara facilitar, clique no link para ser direcionado para a conta do Everylang já com o código na mensagem:\n\nhttps://wa.me/5511999284097?text=refl${newAdsGenerated?.lesson?.sharingId}`

const handleEditCurrentSentense = (content) => {
  setGrammarExerciseComponentInitialValue(content)
  setOpenUpdateSentenceTextDialog(true)
}

const editLesson = (lessonId) => {
  push(PATH_DASHBOARD.lessonGrammar.edit(lessonId));
}
  return (
      <Container
      disableGutters
      maxWidth='lg'
      >
        {
          !newAdsGenerated ? <>
          {
            dataError?.loadingError ? <Typography>{dataError?.loadingError}</Typography> : <Typography>Carregando</Typography>
          }

           </> : <>
           <Grid container spacing={3}>
           <Grid item xs={12} md={8}>
        <Stack spacing={3}>
        <Card>
        <CardHeader title="Criar exercícios" />

            <Box>
            <Tabs variant="fullWidth" value={currentTab} onChange={(event, newValue) => setCurrentTab(newValue)}>
                {SCREENS.map((tab) => (
                  <Tab key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />
                ))}
              </Tabs>
            </Box>

            {
              currentTab === 'help' && <>
              <Box m={2}>
              <Typography variant='h4'>Como criar os exercícios</Typography>
              <Typography variant='body2'>Os exercícios são textos livres que serão interpretados por nossa inteligência artificial. Para garantir um bom desempenho e entendimento pelo aluno, recomendamos o seguinte formato:</Typography>
              
              <Box m={2}>
              <Typography variant='subtitle1'>Crie uma pequena introdução</Typography>
              <Typography variant='caption'>Explique do que se trata a questão</Typography>
              </Box>
              
              <Box m={2}>
              <Typography variant='subtitle1'>Crie um enunciado simples</Typography>
              <Typography variant='caption'>Explique o que será feito no exercício</Typography>
              </Box>

              <Box m={2}>
              <Typography variant='subtitle1'>Crie a pergunta em si</Typography>
              <Typography variant='caption'>Por fim, adicione a questão</Typography>
              </Box>
              

              <Typography variant='h4'>Exemplos:</Typography>
              
              <Box m={2}>
              <Typography variant='subtitle1'>Exercício do tipo preencher espaços em branco</Typography>
              <Box m={2} sx={{ backgroundColor: '#fff4f1', p: 2}} >
                        <Markdown
                          children={`Understanding when to use a gerund or infinitive can be tricky. Let's test your knowledge with a fill-in-the-blank question.\n\nShe enjoys ___ (swim) in the sea.`}
                          // sx={{
                          //   px: { md: 5 },
                          // }}
                        />
                      </Box> 
              </Box>
           
              <Box m={2}>
              <Typography variant='subtitle1'>Exercício do tipo multipla escolha</Typography>
              <Box m={2} sx={{ backgroundColor: '#fff4f1', p: 2}} >
                        <Markdown
                          children={`Question forms are essential for engaging in conversations. Let's see how well you can form questions with a multiple-choice question.\n\nWhich of the following is a correct question form?\n\nA. You have dinner yesterday?\n\nB. Do you have dinner yesterday?\n\nC. Have you dinner yesterday?`}
                          // sx={{
                          //   px: { md: 5 },
                          // }}
                        />
                      </Box> 
              </Box>
           
              <Box m={2}>
              <Typography variant='subtitle1'>Exercício do tipo resposta curta</Typography>
              <Box m={2} sx={{ backgroundColor: '#fff4f1', p: 2}} >
                        <Markdown
                          children={`Nouns are naming words that identify people, places, and things. Let's test your knowledge with a short answer question.\n\nGive an example of a proper noun.`}
                          // sx={{
                          //   px: { md: 5 },
                          // }}
                        />
                      </Box> 
              </Box>

            </Box>
              </>
            }
            {
            currentTab === 'createDefault' && <>
                             <GrammarExerciseComponent
                                // grammarTypeOptions={grammarTypeOptions}
                                onClickAction={addSentence}
                                onClickActionTitle='Criar exercício'
                                submitting={submitting}
                             />
                            
            </>              
            }

            {
              currentTab === 'copilotCreator' && <>
              <Box m={2}>
              <Box m={2}>
              <Typography variant='subtitle1'>Gere frases automaticamente com ajuda do Everylang Copilot criado com ChatGPT.</Typography>
              <Box marginTop={2}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Quantidade de exercícios</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={sentenceQuantity}
                          label="Quantidade de exercícios"
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
                          <MenuItem value='comprehensiveContext'>Contexto abrangente</MenuItem>
                          <MenuItem value='targetedContext'>Contexto direcionado</MenuItem>
                          
                          
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
              <Box m={2} display='flex' flexDirection='column'>
                      <LoadingButton loading={submitting} variant='contained' onClick={() => generateSentence()}>Gerar exercícios</LoadingButton>

          </Box>
              </>
            }
          
         
            </Card>
          
          <Box>
            {newAdsGenerated?.lessonExercises?.length > 0 && <Typography variant='h4'>Exercícios</Typography>}
          </Box>
            {
          newAdsGenerated?.lessonExercises?.map((content, idx) => <Box key={content._id} mb={2}>
            <Card sx={{ p: 3 }}>
                <Box>
                  <Box display='flex' justifyContent='flex-end'>
                    <Tooltip enterTouchDelay={0} title="Excluir">
                      <IconButton sx={{ color: 'red'}} onClick={() => handleOpenDialog({ lessonExerciseId: content._id})}><DeleteForeverIcon fontSize='small'/></IconButton>
                    </Tooltip>
                  </Box>
                  <Box mb={2} display='flex' alignItems='center'>
                   

                      <Box display='flex' flexDirection='column'>

                        <Box >
                            <Typography variant="h5">Informação interna:</Typography>
                          <Box display='flex' flexDirection='row' alignItems='center'>
                            <Typography variant="subtitle2">- Tipo:</Typography>
                            <Typography sx={{ marginLeft: 1}} variant="caption">{content?.type}</Typography>
                          </Box>
                          <Box display='flex' flexDirection='row' alignItems='center'>
                            <Typography variant="subtitle2">- Categoria:</Typography>
                            <Typography sx={{ marginLeft: 1}} variant="caption">{content?.category}</Typography>
                          </Box>
                          <Box display='flex' flexDirection='row' alignItems='center'>
                            <Typography variant="subtitle2">- Resposta:</Typography>
                            <Typography sx={{ marginLeft: 1}} variant="caption">{content?.answer}</Typography>
                          </Box>
                          </Box>
                          
                          <Box marginTop={2}>
                          <Typography variant="h6">Questão que o aluno terá acesso:</Typography>
                          <Box m={2} sx={{ backgroundColor: '#fff4f1', p: 2}} >
                            {/* <Typography variant="subtitle2">- Questão:</Typography> */}
                            {/* <Typography sx={{ marginLeft: 1}} variant="caption">{content?.question}</Typography> */}
                            <Markdown
                                children={content?.question}
                          // sx={{
                          //   px: { md: 5 },
                          // }}
                        />
                          </Box>
                          </Box>
                        </Box>
                       
                  </Box>     
         
                  </Box>
                  {/* <IconButton sx={{ marginLeft: 2, color: '#7635dc'}} onClick={() => handleEditCurrentSentense(content)}><EditIcon fontSize='small'/></IconButton> */}
                  <Stack>
                  <Button startIcon={<EditIcon fontSize='small'/>} variant='outlined' onClick={() => handleEditCurrentSentense(content)}>Editar</Button>

                  </Stack>
            </Card>
          </Box>)
        }

        </Stack>
      </Grid>


      <Grid item xs={12} md={4}>
        <Stack spacing={3}>
        <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography variant='subtitle1'>Sobre a lição</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Box display='flex' flexDirection='column'>
                    <Box display='flex' flexDirection='row' alignItems='center'>
                      <Typography variant="subtitle2">- Título interno:</Typography>
                      <Typography sx={{ marginLeft: 1}} variant="caption">{newAdsGenerated?.lesson?.internalTitle}</Typography>
                    </Box>
                    <Box display='flex' flexDirection='row' alignItems='center'>
                      <Typography variant="subtitle2">- Idioma:</Typography>
                      <Typography sx={{ marginLeft: 1}} variant="caption">{newAdsGenerated?.lesson?.learningLanguage}</Typography>
                    </Box>
                    <Box display='flex' flexDirection='row' alignItems='center'>
                      <Typography variant="subtitle2">- Proficiência:</Typography>
                      <Typography sx={{ marginLeft: 1}} variant="caption">{newAdsGenerated?.lesson?.languageLevel}</Typography>
                    </Box>
                    <Divider sx={{ margin: 2 }} />
                    <Box display='flex' flexDirection='row' alignItems='center'>
                      <Typography variant="subtitle2">- Título público:</Typography>
                      <Typography sx={{ marginLeft: 1}} variant="caption">{newAdsGenerated?.lesson?.title}</Typography>
                    </Box>
                    <Box display='flex' flexDirection='row' alignItems='center'>
                      <Typography variant="subtitle2">- Criado por:</Typography>
                      <Typography sx={{ marginLeft: 1}} variant="caption">{newAdsGenerated?.lesson?.creator}</Typography>
                    </Box>
                    <Box display='flex' flexDirection='row' alignItems='center'>
                      <Typography variant="subtitle2">- Descrição:</Typography>
                      <Typography sx={{ marginLeft: 1}} variant="caption">{newAdsGenerated?.lesson?.description}</Typography>
                    </Box>
                    <Box display='flex' flexDirection='row' alignItems='center'>
                      <Typography variant="subtitle2">- Total de exercícios:</Typography>
                      <Typography sx={{ marginLeft: 1}} variant="caption">{newAdsGenerated?.lesson?.totalExercises}</Typography>
                    </Box>
                 
                 <Stack m={2}>

                    <Button variant='outlined' onClick={() => editLesson(newAdsGenerated?.lesson?._id)}>Editar</Button>
                 </Stack>
                  </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography variant='subtitle1'>Como compartilhar esta lição com um estudante</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Typography variant="body2">Copie e envie a mensagem abaixo para um ou mais estudantes. Assim, bastará o estudante seguir a instrução na mensagem para receber esta lição.</Typography>
                    <Box m={2}>
                      <Card>
                      <Box m={2} sx={{ backgroundColor: '#fff4f1', p: 2}} >
                        <Markdown
                          children={messageShare}
                          // sx={{
                             // px: { md: 5 },
                          // }}
                        />
                      </Box>        
                        <Stack m={2}>
                          <Button
                            onClick={() => handleCopyLink(messageShare)}
                            variant='contained'
                            startIcon={<ContentCopyIcon />}
                          >
                            Copiar mensagem
                          </Button>
                      </Stack>
                      </Card>
                    </Box>
        </AccordionDetails>
      </Accordion>
          
          {/* <Card>
          <CardHeader title="Sobre a lição" />
                  <CardContent>

                  <Box display='flex' flexDirection='column'>
                    <Box display='flex' flexDirection='row' alignItems='center'>
                      <Typography variant="subtitle2">- Título interno:</Typography>
                      <Typography sx={{ marginLeft: 1}} variant="caption">{newAdsGenerated?.lesson?.internalTitle}</Typography>
                    </Box>
                    <Box display='flex' flexDirection='row' alignItems='center'>
                      <Typography variant="subtitle2">- Idioma:</Typography>
                      <Typography sx={{ marginLeft: 1}} variant="caption">{newAdsGenerated?.lesson?.learningLanguage}</Typography>
                    </Box>
                    <Box display='flex' flexDirection='row' alignItems='center'>
                      <Typography variant="subtitle2">- Proficiência:</Typography>
                      <Typography sx={{ marginLeft: 1}} variant="caption">{newAdsGenerated?.lesson?.languageLevel}</Typography>
                    </Box>
                    <Divider sx={{ margin: 2 }} />
                    <Box display='flex' flexDirection='row' alignItems='center'>
                      <Typography variant="subtitle2">- Título público:</Typography>
                      <Typography sx={{ marginLeft: 1}} variant="caption">{newAdsGenerated?.lesson?.title}</Typography>
                    </Box>
                    <Box display='flex' flexDirection='row' alignItems='center'>
                      <Typography variant="subtitle2">- Criado por:</Typography>
                      <Typography sx={{ marginLeft: 1}} variant="caption">{newAdsGenerated?.lesson?.creator}</Typography>
                    </Box>
                    <Box display='flex' flexDirection='row' alignItems='center'>
                      <Typography variant="subtitle2">- Descrição:</Typography>
                      <Typography sx={{ marginLeft: 1}} variant="caption">{newAdsGenerated?.lesson?.description}</Typography>
                    </Box>
                    <Box display='flex' flexDirection='row' alignItems='center'>
                      <Typography variant="subtitle2">- Total de exercícios:</Typography>
                      <Typography sx={{ marginLeft: 1}} variant="caption">{newAdsGenerated?.lesson?.totalExercises}</Typography>
                    </Box>
                 
                 <Stack m={2}>

                    <Button variant='outlined' onClick={() => editLesson(newAdsGenerated?.lesson?._id)}>Editar</Button>
                 </Stack>
                  </Box>
                  </CardContent>
          </Card>
          <Card>
          <CardHeader title="Como compartilhar esta lição com um estudante" />
            
                   
          <CardContent>
                    <Typography variant="body2">Copie e envie a mensagem abaixo para um ou mais estudantes. Assim, bastará o estudante seguir a instrução na mensagem para receber esta lição.</Typography>
                    <Box m={2}>
                      <Card>
                      <Box m={2} sx={{ backgroundColor: '#fff4f1', p: 2}} >
                        <Markdown
                          children={messageShare}
                          // sx={{
                          //   px: { md: 5 },
                          // }}
                        />
                      </Box>        
                        <Stack m={2}>
                          <Button
                            onClick={() => handleCopyLink(messageShare)}
                            variant='contained'
                            startIcon={<ContentCopyIcon />}
                          >
                            Copiar mensagem
                          </Button>
                      </Stack>
                      </Card>
                    </Box>
                  </CardContent>
                  </Card> */}
        </Stack>
      </Grid>

      
    </Grid>
            
          </>
        }
        <UploadAudioFileDialog
          accept={{
              'audio/*': [],
            }}
          open={openUploadFile} onClose={handleCloseUploadFile} lessonExerciseId={currentLessonExerciseId} />
        <DeleteSentenceDialog open={openDialog} onClose={handleCloseDialog} lessonExerciseId={currentLessonExerciseId} deleteExercise={deleteExercise} />
        <UpdateSentenceTextDialog 
          dialogContent={
            <GrammarExerciseComponent 
              initialValue={GrammarExerciseComponentInitialValue}
              onClickAction={updateLessonExercise}
              onClickActionTitle='Atualizar exercício'
              closeDialog={closeUpdateSentenceTextDialog}
              submitting={submitting}
            />}
          open={openUpdateSentenceTextDialog} onClose={closeUpdateSentenceTextDialog}
        />
        {/* <UpdateSentenceTextDialog dialogContent={<EditTextField content={currentSentence} updateSentenceText={updateSentenceText} updatingSentence={updatingSentence}  />} open={openUpdateSentenceTextDialog} onClose={closeUpdateSentenceTextDialog} /> */}
      </Container>
  );
}
