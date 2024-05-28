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
import ReactAudioPlayer from 'react-audio-player'
import 'react-h5-audio-player/lib/styles.css';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, 
  Card, 
  Grid, 
  Container, 
  Stack, 
  Switch, 
  Typography, 
  FormControlLabel, 
  TextField, 
  FormGroup, 
  Button, 
  CardHeader, 
  CardContent, 
  Radio,
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
  Select, 
  MenuItem, 
  InputLabel,
  Divider,
  Paper
} from '@mui/material';


import Slider from '@mui/material/Slider';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CreateIcon from '@mui/icons-material/Create';
import AssistantIcon from '@mui/icons-material/Assistant';
import AddIcon from '@mui/icons-material/Add';
import ShareIcon from '@mui/icons-material/Share';
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

import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';



import Drawer from '@mui/material/Drawer';

import List from '@mui/material/List';

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

import ExerciseCopilotForm from './ExerciseCopilotForm'
import ExerciseManuallyForm from './ExerciseManuallyForm'
import ExerciseSharing from './ExerciseSharing'
import EditLesson from '../simpleForms/editLesson'
import LessonShareStepper from '../lessonShareStepper'
import translate from 'src/utils/translate';
// ----------------------------------------------------------------------

// components
import Image from '../../../components/image';
import { IconButtonAnimate } from '../../../components/animate';
import MenuPopover from '../../../components/menu-popover';
import DrawerDefault from 'src/components/drawer-default';

import Joyride, { ACTIONS, EVENTS, ORIGIN, STATUS } from 'react-joyride'

// ----------------------------------------------------------------------


const stepsAccessGuideNewLesson = [
  {
    content: (
      <div>
      <h3>Lição criada!</h3>
      <p>Agora vamos adicionar os exercícios nessa lição de pronúncia</p>
      </div>
    ),
    placement: 'center',
    target: 'body',
  },
  // {
  //   target: '.lesson-step-1',
  //   content: 'Preencha um título para a lição ou clique no botão apra gerar um código aleatório',
  //   disableBeacon: true,
  //   disableOverlayClose: true,
  //   hideCloseButton: true,
  //   // hideFooter: true,
  //   placement: 'bottom',
  //   spotlightClicks: true,
  // },
  {
    target: '.lesson-exercise-step-1',
    content: 'Você poderá criar os exercícios nossa IA ou manualmente',
    disableBeacon: true,
    // disableOverlayClose: true,
    // disableOverlay: true,
    hideCloseButton: true,
    // hideFooter: true,
    placement: 'bottom',
    // spotlightClicks: true,
  },
  {
    target: '.lesson-exercise-step-2',
    content: (
      <div>
      <h3>Vamos criar utilizando IA</h3>
      <p>Clique aqui para aprender como criar os exercícios com IA</p>
      </div>
    ),
    disableBeacon: true,
    disableOverlayClose: true,
    hideCloseButton: true,
    hideFooter: true,
    placement: 'bottom',
    spotlightClicks: true,
  }
];

const stepsAccessGuideExercisesCreated = [
  {
    content: (
      <div>
      <h3>Exercícios criados e adicionados</h3>
      <p>Agora, vamos aprender a adicionar os áudios</p>
      </div>
    ),
    placement: 'center',
    target: 'body',
  },
  {
    target: '.lesson-exercise-created-step-1',
    content: 'Aqui, você confere o total de exercícios já criados',
    disableBeacon: true,
    // disableOverlayClose: true,
    // disableOverlay: true,
    hideCloseButton: true,
    // hideFooter: true,
    placement: 'bottom',
    // spotlightClicks: true,
  },
  {
    target: '.lesson-exercise-created-step-2',
    content: 'Aqui você poderá adicionar mais exercícios a qualquer momento',
    disableBeacon: true,
    disableOverlayClose: true,
    hideCloseButton: true,
    // hideFooter: true,
    placement: 'bottom',
    // spotlightClicks: true,
  },
  {
    target: '.lesson-exercise-created-step-3-index-0',
    content:  (
      <div>
      <h3>Aqui fica a lista de exercícios</h3>
      <p>O primeiro exercício é sempre apenas a palavra que você inseriu.</p>
      </div>
    ),
    disableBeacon: true,
    disableOverlayClose: true,
    hideCloseButton: true,
    // hideFooter: true,
    placement: 'bottom',
    // spotlightClicks: true,
  },
  {
    target: '.lesson-exercise-created-step-3-index-1',
    content: 'Os demais exercícios são as frases geradas pela IA',
    disableBeacon: true,
    disableOverlayClose: true,
    hideCloseButton: true,
    // hideFooter: true,
    placement: 'bottom',
    // spotlightClicks: true,
  },
  {
    target: '.lesson-exercise-created-step-3-generate-button-index-1',
    content:  (
      <div>
      <h3>Vamos gerar o áudio</h3>
      <p>Clique aqui para gerar o áudio demonstração para o aluno</p>
      </div>
    ),
    // disableBeacon: true,
    disableOverlayClose: true,
    hideCloseButton: true,
    hideFooter: true,
    placement: 'bottom',
    spotlightClicks: true,
  }
];

const stepsGenerateAudioDialog = [
  {
    content: (
      <div>
      <h3>Agora vamos definir como queremos o áudio</h3>
      </div>
    ),
    placement: 'center',
    target: 'body',
  },
  {
    target: '.lesson-exercise-created-audio-dialog-step-1',
    content: (
      <div>
      <h3>Padrão</h3>
      <p>Essa é a forma mais comum de gerar o áudio</p>
      </div>
    ),
    disableBeacon: true,
    disableOverlayClose: true,
    hideCloseButton: true,
    // hideFooter: true,
    placement: 'bottom',
    // spotlightClicks: true,
  },
  {
    target: '.lesson-exercise-created-audio-dialog-step-2',
    content: (
      <div>
      <h3>Pausado</h3>
      <p>Essa é a forma adiciona pausas entre as palavras. Ideal para aluno iniciante</p>
      </div>
    ),
    disableBeacon: true,
    disableOverlayClose: true,
    hideCloseButton: true,
    // hideFooter: true,
    placement: 'bottom',
    // spotlightClicks: true,
  },
  {
    target: '.lesson-exercise-created-audio-dialog-step-3',
    content: 'Clique aqui pra gerar o áudio',
    disableBeacon: true,
    disableOverlayClose: true,
    hideCloseButton: true,
    hideFooter: true,
    placement: 'bottom',
    spotlightClicks: true,
  },
]
const stepsCheckAudios = [
  {
    content: (
      <div>
      <h3>Audio gerado, vamos ouvir como ficou?</h3>
      </div>
    ),
    placement: 'center',
    target: 'body',
  },
  {
    target: '.lesson-exercise-created-audio-check-step-1-index-1',
    content: (
      <div>
      <h3>Clique play para ouvir</h3>
      <p>Aqui você pode ouvir como ficou o áudio.</p>
      </div>
    ),
    disableBeacon: true,
    disableOverlayClose: true,
    hideCloseButton: true,
    // hideFooter: true,
    placement: 'bottom',
    spotlightClicks: true,
  },
  {
    target: '.lesson-exercise-created-audio-check-step-2-index-1',
    content: 'Caso seja preciso, você poderá gerar novos áudios aqui',
    disableBeacon: true,
    disableOverlayClose: true,
    hideCloseButton: true,
    // hideFooter: true,
    placement: 'bottom',
    // spotlightClicks: true,
  },
  {
    target: '.lesson-exercise-created-audio-check-step-3-index-1',
    content: (
      <div>
      <h3>Escolha entre os áudios gerados</h3>
      <p>Caso gere mais de um áudio, poderá escolher aqui qual irá utilizar como demonstração</p>
      </div>
    ),
    disableBeacon: true,
    disableOverlayClose: true,
    hideCloseButton: true,
    // hideFooter: true,
    placement: 'bottom',
    // spotlightClicks: true,
  },
  {
    target: '.lesson-exercise-created-audio-check-step-3',
    content: (
      <div>
      <h3>Enviar exercícios para os alunos</h3>
      <p>Após gerar os áudios de todos os exercícios, você poderá compartilhar esta lição.</p>
      <p>Clique aqui para aprender a compartilhar</p>
      </div>
    ),
    disableBeacon: true,
    disableOverlayClose: true,
    hideCloseButton: true,
    hideFooter: true,
    placement: 'bottom',
    spotlightClicks: true,
  },
]

// ----------------------------------------------------------------------


// ----------------------------------------------------------------------

const EditTextField = ({ content, closeDialog, sentence, lessonExerciseId, updateSentenceText, updatingSentence }) => {
 
  const [text, setText] = useState(content.sentence)

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

  const deleteSentence = async () => {
    setIsDeleting(true)
    try {
      await api.delete(`v1/everylang/lesson-exercises/pronunciation/${lessonExerciseId}`, audioData)
      
      enqueueSnackbar('Frase excluida!');
    } catch (error) {
      enqueueSnackbar('Erro ao excluir frase link', { variant: 'error'})
      console.error(error);
    }

    setIsDeleting(false)
    onClose()

  };

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose}>
      <DialogTitle sx={{ p: (theme) => theme.spacing(3, 3, 2, 3) }}>Excluir frase? </DialogTitle>

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
  updateLessonExercises,
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
  const [isSubmittingAudio, setIsSubmittingAudio] = useState(false);
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
        setFiles([newFile])
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
    setFiles([]);
    setFile(null);
  };

  const submitFileAudio = async () => {
    setIsSubmittingAudio(true)
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
      console.log('audioData', data)
      updateLessonExercises({ lessonExerciseUpdate: data.lessonExercise })
      enqueueSnackbar('Update success!');
    } catch (error) {
      console.error(error);
    }

    setFile(null)
    setFiles([])
    setIsSubmittingAudio(false)
    onClose();
    // setUpdatingAvatarFile(false)

  };

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose} {...other}>
      <DialogTitle sx={{ p: (theme) => theme.spacing(3, 3, 2, 3) }}> {title} </DialogTitle>
      {!files.length && (
      <Box marginBottom={2}>
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
      </Box>)}
      {!!files.length && (
        <Box>
          <Box marginLeft={4} marginRight={4}>
          <Card>
            <Box m={2}>

            <Typography>{file.path}</Typography>
            </Box>
          </Card>

          </Box>
        
      <DialogActions>

     
      <LoadingButton
          loading={isSubmittingAudio}
          variant="contained"
          startIcon={<Iconify icon="eva:cloud-upload-fill" />}
          onClick={submitFileAudio}
        >
          Enviar áudio
        </LoadingButton>
          <Button variant="outlined" color="inherit" onClick={handleRemoveAllFiles}>
            Remover áudio
          </Button>
          
   
      </DialogActions>
      </Box>
         )}
    </Dialog>
  );
}

function DiscreteSlider({ valuetext }) {
  return (
    <Box sx={{ width: '100%' }}>
      <Slider
        aria-label="Temperature"
        defaultValue={1}
        getAriaValueText={valuetext}
        valueLabelDisplay="auto"
        shiftStep={1}
        step={0.25}
        marks
        min={0.25}
        max={1.75}
      />
    </Box>
  );
}

function AudioSpeedModeControll({ audioSpeedMode, setAudioSpeedMode}) {
  
  return (
    <FormControl>
      {/* <FormLabel id="demo-controlled-radio-buttons-group">Escolha a velocidade da fala</FormLabel> */}
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={audioSpeedMode}
        onChange={(e) => setAudioSpeedMode(e.target.value)}
      >
        <Box className='lesson-exercise-created-audio-dialog-step-1' m={1} display='flex' flexDirection='column'>
          <FormControlLabel value="default" control={<Radio />} label="Padrão" />
          <Typography variant='caption'>Áudio com fala regular</Typography>
        </Box>

        <Box className='lesson-exercise-created-audio-dialog-step-2' m={1} display='flex' flexDirection='column'>
          <FormControlLabel value="drawl" control={<Radio />} label="Falar pausadamente" />
          <Typography variant='caption'>Áudio com um intervalo maior entre as palavras</Typography>
        </Box>
      </RadioGroup>
    </FormControl>
  );
}

export function GenerateAudioDialog({
  open,
  onClose,
  dialogContent,
  audioData,
  action,
  displayOnboarding
}) {

  const [audioSpeedValue, setAudioSpeedValue] = useState(false)
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false)
  const [audioSpeedMode, setAudioSpeedMode] = useState('default')
  const [run, setRun] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const handleJoyrideCallback = (data) => {
    const { action, index, origin, status, type } = data;

    console.log('data ==> GenerateAudioDialog', data)

    if (action === ACTIONS.CLOSE && origin === ORIGIN.KEYBOARD) {
      // do something
    }

    if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type)) {
      // Update state to advance the tour
      setStepIndex(index + (action === ACTIONS.PREV ? -1 : 1));
    } else if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      // You need to set our running state to false, so we can restart if we click start again.
      setRun(false);
      setStepIndex(0)
    }

    console.groupCollapsed(type);
    console.log(data); //eslint-disable-line no-console
    console.groupEnd();
  };

  function valuetext(value) {
    console.log('valuetext =>', value)
    setAudioSpeedValue(value)
    return `${value}°C`;
  }

  const handleGenerate = async () => {
    setRun(false)
    setStepIndex(0)
    setIsGeneratingAudio(true)
    await action({lessonExerciseId: audioData.lessonExerciseId, positionIdx: audioData.positionIdx, audioSpeedMode })
    setIsGeneratingAudio(false)
    onClose(false)
  }

  useEffect(() => {
    console.log('effect GenerateAudioDialog')
    setStepIndex(0)
  setRun(true)
      },[])

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={()=> onClose(false)}>
      <DialogTitle sx={{ p: (theme) => theme.spacing(3, 3, 2, 3) }}>Escolha o ritmo da fala</DialogTitle>

      <DialogContent sx={{ pt: 0, pb: 0, border: 'none' }}>
      <Box >
          <Box>
                <AudioSpeedModeControll audioSpeedMode={audioSpeedMode} setAudioSpeedMode={setAudioSpeedMode} />
          </Box>

          <Box marginTop={2}>
            <LoadingButton className='lesson-exercise-created-audio-dialog-step-3' variant='contained' loading={isGeneratingAudio} onClick={() => handleGenerate()}>Gerar áudio</LoadingButton>
          </Box>
      </Box>
      </DialogContent>

      <DialogActions>
          <Stack direction="row" justifyContent="flex-end" flexGrow={1}>
            <Button variant="outlined" onClick={()=> onClose(false)}>
              cancelar
            </Button>
          </Stack>
      </DialogActions>

{
  displayOnboarding && <Joyride
  steps={stepsGenerateAudioDialog}
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
        <FormControlLabel
        className={`lesson-exercise-created-audio-check-step-3-index-${idx + 1}`}
         value={audio._id} control={<Radio />} label={`${audio.creator === 'everylang' ? 'Gerado por Everylang' : 'Enviado pelo usuário'} - ${audio.createdAt && format(new Date(audio.createdAt), 'dd/MM/yyyy HH:mm:ss')}`} />
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

BusinessEdit.propTypes = {
  adId: PropTypes.string,
};

export default function BusinessEdit({ adId }) {
  const { push } = useRouter();
  const { user } = useAuthContext()
  const { enqueueSnackbar } = useSnackbar();
  const { copy } = useCopyToClipboard();

  const [lesson, setLesson] = useState(null)

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
  const [sentence, setSentence] = useState('')
  const [openUploadFile, setOpenUploadFile] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentLessonExerciseId, setCurrentLessonExerciseId] = useState('')
  const [currentSentence, setCurrentSentence] = useState({})
  const [updatingSentence, setUpdatingSentence] = useState(false)
  const [openUpdateSentenceTextDialog, setOpenUpdateSentenceTextDialog] = useState(false)
  const [currentTab, setCurrentTab] = useState('exerciseSection')
  const [openGenerateAudioDialog, setOpenGenerateAudioDialog] = useState(false)
 
  const [displayStepsCheckAudios, setDisplayStepsCheckAudios] = useState(false)
  const [openDrawer, setOpenDrawer] = useState(false)
  const [drawerContent, setDrawerContent] = useState(null)
  const [openPopover, setOpenPopover] = useState(null);
  const [currentDrawerForm, setCurrentDrawerForm] = useState(null);
  const [joyrideSteps, setJoyrideSteps] = useState([])

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
      setStepIndex(0)
      setRun(false);
    }

    console.groupCollapsed(type);
    console.log(data); //eslint-disable-line no-console
    console.groupEnd();
  };

  // useEffect(() => {
  //   setJoyrideSteps()
  //   setStepIndex(0)
  //   setRun(true)
  // }, [])

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const handleChangeLang = (addType) => {
    handleClosePopover();
    handleOpenDrawer(addType)
  };

const toggleDrawer = (open) => (event) => {
  if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
    return;
  }

  setOpenDrawer(open)
};

  
 

 
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

  const updateLessonExercises = ({ lessonExerciseUpdate }) => {
   
    const lessonExercisesUpdated = newAdsGenerated.lessonExercises.map((item, idx) => {
      if (lessonExerciseUpdate._id === item._id) {
        return {
          ...lessonExerciseUpdate
        }
      }
      return item
    })
    newAdsGenerated.lessonExercises = lessonExercisesUpdated
    setNewAdsGenerated(newAdsGenerated) 

  }
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
    
          // console.log('response.data', response.data.lessonExercises.filter((item, idx) => idx !== 1))

          setNewAdsGenerated(response.data) 
          setLesson(response.data.lesson)
          if (!response.data.ad) setDataError({ ...dataError, loadingError: 'Lição não encontrada. Tente novamente!' })

        } catch (error) {
          setDataError({ ...dataError, loadingError: 'Lição não encontrada. Tente novamente!' })
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
  const addSentence = async (payload) => {

    payload.lessonId = newAdsGenerated.lesson._id
    const { data } = await api.post('v1/everylang/lesson-exercises', payload)
    setNewAdsGenerated(data) 
  
  };

  const generateSentence = async (payload) => {
   
    payload.lessonId = newAdsGenerated.lesson._id
    const { data } = await api.post('v1/everylang/lesson-exercises/generate-pronunciation', payload)
    setNewAdsGenerated(data) 
    
  };

  const [generateAudioData, setGenerateAudioData] = useState({})


  const generateAudio = async ({ lessonExerciseId, positionIdx, audioSpeedMode }) => {
    
    setIsGeneratingAudioIdx(positionIdx)
    
    const payload = { lessonExerciseId, audioSpeedMode }
    console.log('generateAudio payload', payload, positionIdx)

    try {

      const responseProccesCreated = await api.post('v1/everylang/lesson-exercises/pronunciation/generate', payload)
      // console.log('responseProccesCreated', responseProccesCreated)
      
      const lessonExercisesUpdated = newAdsGenerated.lessonExercises.map((item, idx) => {
        if (idx === positionIdx) {
          return {
            ...responseProccesCreated.data.lessonExercises
          }
        }
        return item
      })
      newAdsGenerated.lessonExercises = lessonExercisesUpdated
      setNewAdsGenerated(newAdsGenerated) 
      // eslint-disable-next-line consistent-return
      enqueueSnackbar(`Áudio gerado`);
      setIsGeneratingAudioIdx(null)
      setDisplayStepsCheckAudios(true)
      // redirect

    
    } catch (error) {
      enqueueSnackbar(error.message && error.message, { variant: 'error' });
      console.error(error);
    }
    // clearInterval(timer)
  
    setIsGeneratingAudioIdx(null)
  }

  const handleGenerateAudio = ({ lessonExerciseId, positionIdx}) => {
    console.log('entrou aqui handleGenerateAudio')
    setStepIndex(0)
    setRun(false)
    setGenerateAudioData({ lessonExerciseId, positionIdx})
    setOpenGenerateAudioDialog(true)
  }

  const switchActiveAudio = async ({ lessonExerciseId, audioId }) => {
    setIsSwitchingAudioId(audioId)

    const payload = { lessonExerciseId, audioId }
    try {

      const responseProccesCreated = await api.patch('v1/everylang/lesson-exercises/pronunciation/generate', payload)
      console.log('responseProccesCreated', responseProccesCreated)
      
      const lessonExercisesUpdated = newAdsGenerated.lessonExercises.map((item) => {
        if (item._id === lessonExerciseId) {
          return {
            ...item,
            activeAudioId: audioId,
            audioURL: responseProccesCreated.data.lessonExercises.audioURL
          }
        }
        return item
      })
      newAdsGenerated.lessonExercises = lessonExercisesUpdated
      setNewAdsGenerated(newAdsGenerated) 
      // eslint-disable-next-line consistent-return
      enqueueSnackbar(`Áudio atualizado`);
      setIsSwitchingAudioId(null)
      // redirect

    
    } catch (error) {
      enqueueSnackbar(error.message && error.message, { variant: 'error' });
      console.error(error);
    }
    // clearInterval(timer)
  
    setIsSwitchingAudioId(null)
  }
  const updateSentenceText = async ({ lessonExerciseId, sentence, closeDialog }) => {
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
      await api.delete(`v1/everylang/lesson-exercises/pronunciation/${lessonExerciseId}`)
      
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

  

const handleEditCurrentSentense = (content) => {
  setCurrentSentence(content)
  setOpenUpdateSentenceTextDialog(true)
}

const editLesson = (lessonId) => {
  push(PATH_DASHBOARD.lessonPronunciation.edit(lessonId));
}

const userFullName = `${user?.firstName} ${user?.lastName}`
  const lessonTitle = newAdsGenerated?.lesson?.title ? `\n\nLição: ${newAdsGenerated?.lesson?.title}` : ''
  const lessonDetails = newAdsGenerated?.lesson?.description ? `\n\nDetalhes: ${newAdsGenerated?.lesson?.description}` : ''

  const messagePreview = `EVERYLANG - Exercícios de pronúncia\n\nCriado por: ${newAdsGenerated?.lesson?.creator || userFullName}${lessonTitle}${lessonDetails}`
  const messageShare = `https://www.everylang.ai/lesson-cover/${newAdsGenerated?.lesson?.sharingId}`

  const [updateShareStepper, setUpdateShareStepper] = useState(0)
 
  const handleUpdateLesson = async (newLessonData) => {
    console.log('newLessonData', newLessonData)
    const payload = {
      lessonId: newAdsGenerated.lesson._id,
      lessonType: newAdsGenerated.lesson.type, 
      languageLevel: newLessonData.languageLevel || newAdsGenerated.lesson.languageLevel,
      learningLanguage: newLessonData.learningLanguage || newAdsGenerated.lesson.learningLanguage,
      internalLessonName: newLessonData.internalLessonName || newAdsGenerated.lesson.internalTitle,
      lessonName: newLessonData.title || newAdsGenerated.lesson.title,
      lessonDescription: newLessonData.description || newAdsGenerated.lesson.description,
      lessonCreator: newLessonData.creator || newAdsGenerated.lesson.creator
    }
  
    console.log('handleUpdateLesson payload', payload)
    const { data } = await api.put(`v1/everylang/lesson`, payload)
    
  
    newAdsGenerated.lesson = data.lesson
      setNewAdsGenerated(newAdsGenerated) 
      setLesson(data.lesson)
      setUpdateShareStepper(updateShareStepper +1)
     
  
  };

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

const handleOpenDrawer = (drawerForm) => {

  
  if (drawerForm === 'exerciseCopilot') {
    setRun(false)
    setStepIndex(0)
    setDrawerContent(<ExerciseCopilotForm
      mainAction={generateSentence}
      toggleDrawer={setOpenDrawer}
      />)
  }

  if (drawerForm === 'exerciseManually') {
    setDrawerContent(<ExerciseManuallyForm
      mainAction={addSentence}
      toggleDrawer={setOpenDrawer}
      />
    )
  }

  if (drawerForm === 'lessonInternalForm') {
    setDrawerContent(<EditLesson
      initialDataValue={newAdsGenerated?.lesson}
      lessonType={newAdsGenerated?.lesson?.type}
      lessonForm='internal'
      toggleDrawer={setOpenDrawer}
      mainAction={handleUpdateLesson}
      />
    )
  }
  if (drawerForm === 'lessonPublicForm') {
    setDrawerContent(<EditLesson
      initialDataValue={newAdsGenerated?.lesson}
      lessonType={newAdsGenerated?.lesson?.type}
      lessonForm='public'
      toggleDrawer={setOpenDrawer}
      mainAction={handleUpdateLesson}
      />
    )
  }
  if (drawerForm === 'exerciseSharing') {
    setRun(false)
    setStepIndex(0)
    setDrawerContent(<LessonShareStepper initialStep={displayOnboarding ? 2 : 0} lesson={lesson} updateLesson={handleUpdateLesson} />)
  }
  
  // setCurrentDrawerForm(drawerForm)
  setOpenDrawer(true)
}

// useEffect(() => {
//   if (currentDrawerForm === 'exerciseSharing') {
//   setDrawerContent(<LessonShareStepper lesson={lesson} updateLesson={handleUpdateLesson} />)
// }
// }, [drawerContent])

useEffect(() => {
  setDrawerContent(<LessonShareStepper lesson={lesson} updateLesson={handleUpdateLesson} />)
}, [updateShareStepper])

useEffect(() => {
  setStepIndex(0)
          setRun(true)
},[newAdsGenerated, displayStepsCheckAudios])



  return (
      <Container
      // disableGutters
      maxWidth='xl'
      >
        <Box >
     

                    <Box mb={2} display='flex' alignItems='center'>
                      <Typography variant="h4">Lição de pronúncia</Typography>
                        <IconButton  sx={{ marginLeft: 2, color: '#7635dc'}} onClick={() => handleOpenDrawer('lessonInternalForm')}><EditIcon fontSize='small'/></IconButton>
                          {/* <Tooltip enterTouchDelay={0} title='Editar lição de pronúncia'>
                          <IconButton><InfoIcon fontSize='small'/></IconButton>
                        </Tooltip> */}
                    </Box>     


                      <Box display='flex' flexDirection='row' alignItems='center'>
                          <Typography variant="subtitle2">- Título interno:</Typography>
                          <Typography sx={{ marginLeft: 1}} variant="caption">{newAdsGenerated?.lesson?.internalTitle}</Typography>
                        </Box>
                        {/* <Divider /> */}

                        <Box display='flex' flexDirection='row' alignItems='center'>
                          <Typography variant="subtitle2">- Idioma:</Typography>
                          <Typography sx={{ marginLeft: 1}} variant="caption">{translate('learningLanguage', newAdsGenerated?.lesson?.learningLanguage)}</Typography>
                        </Box>

                        <Box display='flex' flexDirection='row' alignItems='center'>
                          <Typography variant="subtitle2">- Proficiência:</Typography>
                          <Typography sx={{ marginLeft: 1}} variant="caption">{translate('languageLevel', newAdsGenerated?.lesson?.languageLevel)}</Typography>
                        </Box>

                        <Box display='flex' flexDirection='column'>
                    

                 
                    
                     </Box>
                     <Box mb={2} mt={2}>

<Divider />
</Box>

            </Box>







        {
          !newAdsGenerated ? <>
          {
            dataError?.loadingError ? <Typography>{dataError?.loadingError}</Typography> : <Typography>Carregando</Typography>
          }

           </> : <>
           {/* <Box>
        <Tabs variant="fullWidth" value={currentTab} onChange={(event, newValue) => setCurrentTab(newValue)}>
            {SECTIONS.map((tab) => (
              <Tab key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />
            ))}
          </Tabs>
    </Box> */}


    



    {
      currentTab === 'exerciseSection' && <>
      {/* <Box textAlign='center'>

      <Card>
        <CardHeader title="Criar exercícios" subheader='Crie e gerencie os exercícios dessa lição' />

        <Box textAlign='center' m={4}>
          <Button variant='outlined' onClick={() => handleOpenDrawer('exerciseCopilot')} startIcon={<AssistantIcon fontSize='small' />}>Criar com IA</Button>
          <Button variant='outlined' sx={{ marginLeft: 2 }} onClick={() => handleOpenDrawer('exerciseManually')} startIcon={<CreateIcon fontSize='small' />}>Criar manualmente</Button>
        </Box>
            </Card>
      </Box> */}


          {
            newAdsGenerated?.lessonExercises?.length > 0 && <Box sx={{ mb: 5 }}>
            <Box display='flex' direction="row" >
              <Box className='lesson-exercise-created-step-1' sx={{ flexGrow: 1 }} >
              <Typography variant="h4" gutterBottom>
                    Exercícios
                  </Typography>
              <Typography variant="subtitle1" gutterBottom>
                    Total: {newAdsGenerated?.lessonExercises?.length}
                  </Typography>
              </Box>

 
              <Box sx={{ flexShrink: 0 }}> 
                          <Box display='flex' flexDirection='column'>
                            <Button
                            className='lesson-exercise-created-audio-check-step-3'
                            disabled={newAdsGenerated?.lessonExercises?.length === 0 }
                            onClick={() => handleOpenDrawer('exerciseSharing')}
                                          variant="contained"
                                          startIcon={<ShareIcon />}
                                          sx={{ marginBottom: 1 }}
                                        >
                                          Compartilhar
                                        </Button>
  
                              <Button
                                className='lesson-exercise-created-step-2'
                                        variant="contained"
                                        startIcon={<AddIcon />}
                                        onClick={handleOpenPopover}
                                        sx={{ ...(openPopover && {
                                          bgcolor: 'action.selected',
                                        })
                                      }}
                                      >
                                        Adicionar exercícios
                                      </Button>
                                      <MenuPopover open={openPopover} onClose={handleClosePopover} sx={{ width: 180 }}>
                              <Stack spacing={0.75}>
                              <MenuItem
                                    onClick={() => handleChangeLang('exerciseCopilot')}
                                  >
                                    <AssistantIcon fontSize='small' />
                                    Criar com IA
                                  </MenuItem>
  
                              <MenuItem
                                    onClick={() => handleChangeLang('exerciseManually')}
                                  >
                                    <CreateIcon fontSize='small' />
  
                                    Criar manualmente
                                  </MenuItem>
                              </Stack>
                            </MenuPopover>
  
                           
                          </Box>
              </Box>
            </Box>
          </Box>
          }
      

          
            {newAdsGenerated?.lessonExercises?.length === 0 && <Box textAlign='center'>

            <Paper variant='outlined'>
              {/* <CardHeader title="Você ainda não tem exercícios essa lição" subheader='Adicione novos exercícios com IA ou manualmente' /> */}
      
              <Box className='lesson-exercise-step-1' textAlign='center' m={4}>
                <Box marginTop={3} marginBottom={3}>
                <Typography variant='h4'>Esta lição não tem exercícios!</Typography>
                

                </Box>
                <Box marginTop={3} marginBottom={3}>
                
                <Typography variant='h6'>Adicione novos exercícios utilizando uma das opções abaixo.</Typography>

                </Box>

                <Button className='lesson-exercise-step-2' variant='outlined' sx={{ margin: 1 }} onClick={() => handleOpenDrawer('exerciseCopilot')} startIcon={<AssistantIcon fontSize='small' />}>Adicionar com IA</Button>
                <Button variant='outlined' sx={{ margin: 1 }} onClick={() => handleOpenDrawer('exerciseManually')} startIcon={<CreateIcon fontSize='small' />}>Adicionar manualmente</Button>
              </Box>
                  </Paper>
            </Box>
            }
          

{

}



            {
          newAdsGenerated?.lessonExercises?.map((content, idx) => <Box key={content._id} mb={2}>
            <Card className={`lesson-exercise-created-step-3-index-${idx}`} sx={{ p: 3 }}>
                <Box>
                  <Box display='flex' justifyContent='flex-end'>
                    <Tooltip enterTouchDelay={0} title="Excluir">
                      <IconButton sx={{ color: 'red'}} onClick={() => handleOpenDialog({ lessonExerciseId: content._id})}><DeleteForeverIcon fontSize='small'/></IconButton>
                    </Tooltip>
                  </Box>
                  <Box mb={2} display='flex' alignItems='center'>
                      <Typography variant="h4">{content.sentence}</Typography>
                        <IconButton disabled={content.audiosIds.length} sx={{ marginLeft: 2, color: '#7635dc'}} onClick={() => handleEditCurrentSentense(content)}><EditIcon fontSize='small'/></IconButton>
                        {
                          content.audiosIds.length > 0 && <Tooltip enterTouchDelay={0} title='Não é possível editar uma frase que já tenha áudio. Exclua essa frase e crie uma nova!'>
                          <IconButton><InfoIcon fontSize='small'/></IconButton>
                        </Tooltip>
                        }
                      
                  </Box>     
                      <Box>
    

 

                          {
                            !!content.audioURL ? <Box><Typography variant="caption">Àudio demonstração</Typography>
                            <AudioPlayer
                              className={`lesson-exercise-created-audio-check-step-1-index-${idx}`}
                              defaultDuration=''
                              showJumpControls={false}
                              autoPlayAfterSrcChange={false}
                              showDownloadProgress={false}
                              showFilledProgress={false}
                              src={content.audioURL}
                              onPlay={e => console.log(`onPlay ${content.audioURL}`)}
                            />
          
                            {/* <ReactAudioPlayer
                              src={content.audioURL}
                              controls
                            /> */}
                            <Box  m={2}>
                              <ControlledRadioButtonsGroup audios={content.audiosIds} activeAudioId={content.activeAudioId} lessonExerciseId={content._id} isSwitchingAudioId={isSwitchingAudioId} switchActiveAudio={switchActiveAudio}/>
                            </Box>

                            {/* {
                              content.audiosIds.map((audio, idx) => <Box key={audio._id}>
                                <ControlledRadioButtonsGroup audios={content.audiosIds} />
                              </Box>)
                            } */}
                            <Box mt={2}>
                        {/* <Typography variant="subtitle1">Substituir áudio</Typography> */}
                        {/* <Typography variant="caption">Isso ajudará o aluno a entender como deve ser a pronúncia desta frase</Typography> */}
                        <Box mb={2} display='flex' flexDirection='row'>
                            <Box mb={2} >

                            <LoadingButton
                              className={`lesson-exercise-created-audio-check-step-2-index-${idx}`}
                              loading={isGeneratingAudioIdx === idx}
                              variant='contained' sx={{ marginRight: 2}}
                              onClick={() => handleGenerateAudio({ lessonExerciseId: content._id, positionIdx: idx })}
                              >
                                Gerar outro áudio
                              </LoadingButton>
                            </Box>

                            <Box mb={2} >
                            <Button variant='contained' onClick={() => handleOpenUploadFile({ lessonExerciseId: content._id })}>Carregar outro áudio</Button>
                            </Box>
                        </Box>
                      </Box>
                            </Box> : <Box>
                              <Box>
                        <Typography variant="subtitle1">Adicione um áudio demonstração</Typography>
                        <Typography variant="caption">Isso ajudará o aluno a entender como deve ser a pronúncia desta frase</Typography>
                        <Box mb={2} display='flex' flexDirection='row'>
                        <Box mb={2}>
                            <LoadingButton
                            className={`lesson-exercise-created-step-3-generate-button-index-${idx}`}
                              loading={isGeneratingAudioIdx === idx}
                              variant='contained' sx={{ marginRight: 2}}
                              onClick={() => handleGenerateAudio({ lessonExerciseId: content._id, positionIdx: idx })}
                              >
                                Gerar áudio
                              </LoadingButton>
                        </Box>

                        <Box mb={2} >
                            <Button variant='contained' onClick={() => handleOpenUploadFile({ lessonExerciseId: content._id })}>Carregar áudio</Button>
                            </Box>
                        </Box>
                      </Box>
                            </Box>
                          }
                      </Box>
                      
                      
                      {/* <Box mt={2}>
                        <Button
                          // onClick={() => handleCopyLink(`Ideia de design: ${content.image}\n\nTítulo: ${content.title}\n\nTexto principal: ${content.text}`)}
                          variant='contained'
                          startIcon={<ContentCopyIcon />}
                        >
                          Excluir frase
                        </Button>
                      </Box> */}
                  </Box>
            </Card>
          </Box>)
        }
      </>
    }

















                {
                  currentTab === 'shareSection' && <>
           
     
        
           <Box>


           


<Card>
  {/* <CardHeader title='Preview' subheader="Informações que o aluno visualizará antes de iniciar os exerícios"/> */}
    
    
                
  <CardContent>





  <Grid container spacing={3}>
  




  <Grid item xs={12} md={6}>
  <Card>
    <CardHeader title='Informação de capa dessa lição' subheader="Como o aluno visualizará as informações de capa dessa lição antes de iniciar os exerícios"/>
              <Box m={2} sx={{ backgroundColor: '#fff4f1', p: 2}} >
                <Markdown
                  children={messagePreview}
                  // sx={{
                     // px: { md: 5 },
                  // }}
                />
              </Box>        
              <Box display='flex' flexDirection='column'>
            

         
            <Stack m={2}>

               <Button variant='outlined' onClick={() => handleOpenDrawer('lessonPublicForm')}>Editar</Button>
            </Stack>
             </Box>
               
              </Card>
  </Grid>

  <Grid item xs={12} md={6}>
  <Card>
                <CardHeader 
                title='Copiar o link dessa lição'
                subheader='Para comparitlhar essa lição, copie o link abaixo e envie para um ou mais alunos.'
                />
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
                    Copiar link
                  </Button>
              </Stack>
              </Card>
  </Grid>

  </Grid>

 



    


    






   











    


  </CardContent>
</Card>
</Box>

                  </>
                }

















           <Grid container spacing={3}>
      

      <Grid item xs={12} md={8}>
        <Stack spacing={3}>
        

        </Stack>
      </Grid>

      <Grid item xs={12} md={4}>
        <Stack spacing={3}>

        
      


          
        </Stack>
      </Grid>
    </Grid>
            
          </>
        }
        <UploadAudioFileDialog
          accept={{
              'audio/*': [],
            }}
          open={openUploadFile} onClose={handleCloseUploadFile} updateLessonExercises={updateLessonExercises} lessonExerciseId={currentLessonExerciseId} />
        <DeleteSentenceDialog open={openDialog} onClose={handleCloseDialog} lessonExerciseId={currentLessonExerciseId} deleteExercise={deleteExercise} />
        <UpdateSentenceTextDialog dialogContent={<EditTextField content={currentSentence} updateSentenceText={updateSentenceText} updatingSentence={updatingSentence} closeDialog={closeUpdateSentenceTextDialog} />} open={openUpdateSentenceTextDialog} onClose={closeUpdateSentenceTextDialog} />
        <GenerateAudioDialog displayOnboarding={displayOnboarding} open={openGenerateAudioDialog} onClose={setOpenGenerateAudioDialog} audioData={generateAudioData} action={generateAudio} />
        {/* <Drawer
            anchor='right'
            open={openDrawer}
            onClose={toggleDrawer(false)}
          >
            {drawerContent}
          </Drawer> */}

          <DrawerDefault
              anchor='right'
              open={openDrawer}
              onClose={setOpenDrawer}
              displayCloseOption='top'
              drawerContent={drawerContent}
          />


{
  displayOnboarding && newAdsGenerated?.lessonExercises?.length === 0 && <Joyride
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

{
  displayOnboarding && newAdsGenerated?.lessonExercises?.length > 0 && newAdsGenerated?.lessonExercises[1].audiosIds?.length === 0 && <Joyride
  steps={stepsAccessGuideExercisesCreated}
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

{
  displayOnboarding && newAdsGenerated?.lessonExercises?.length > 0 && newAdsGenerated?.lessonExercises[1].audiosIds?.length > 0 && <Joyride
  steps={stepsCheckAudios}
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


      </Container>
  );
}
