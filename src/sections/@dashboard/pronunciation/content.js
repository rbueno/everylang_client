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
  Divider
} from '@mui/material';
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
 
  const [openDrawer, setOpenDrawer] = useState(false)
  const [drawerContent, setDrawerContent] = useState(null)
  const [openPopover, setOpenPopover] = useState(null);
  const [currentDrawerForm, setCurrentDrawerForm] = useState(null);

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
    
          console.log('response.data', response.data)
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


  const generateAudio = async ({ lessonExerciseId, positionIdx }) => {
    setIsGeneratingAudioIdx(positionIdx)

    const payload = { lessonExerciseId }
    try {

      const responseProccesCreated = await api.post('v1/everylang/lesson-exercises/pronunciation/generate', payload)
      console.log('responseProccesCreated', responseProccesCreated)
      
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
      // redirect

    
    } catch (error) {
      enqueueSnackbar(error.message && error.message, { variant: 'error' });
      console.error(error);
    }
    // clearInterval(timer)
  
    setIsGeneratingAudioIdx(null)
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
      languageLevel: newAdsGenerated.lesson.languageLevel,
      learningLanguage: newAdsGenerated.lesson.learningLanguage,
      lessonType: newAdsGenerated.lesson.type, 
      internalLessonName: newAdsGenerated.lesson.internalTitle,
      lessonName: newLessonData.title,
      lessonDescription: newLessonData.description,
      lessonCreator: newLessonData.creator
    }
  
    console.log('handleUpdateLesson payload', payload)
    const { data } = await api.put(`v1/everylang/lesson`, payload)
    
  
    newAdsGenerated.lesson = data.lesson
      setNewAdsGenerated(newAdsGenerated) 
      setLesson(data.lesson)
      setUpdateShareStepper(updateShareStepper +1)
     
  
  };

const handleOpenDrawer = (drawerForm) => {

  
  if (drawerForm === 'exerciseCopilot') {
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
    setDrawerContent(<LessonShareStepper lesson={lesson} updateLesson={handleUpdateLesson} />)
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
          
      <Box sx={{ mb: 5 }}>
          <Stack direction="row" alignItems="center">
            <Box sx={{ flexGrow: 1 }} marginTop={4}>
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
                          onClick={() => handleOpenDrawer('exerciseSharing')}
                                        variant="contained"
                                        startIcon={<ShareIcon />}
                                        sx={{ marginBottom: 1 }}
                                      >
                                        Compartilhar
                                      </Button>

                            <Button
                                      variant="contained"
                                      startIcon={<AddIcon />}
                                      onClick={handleOpenPopover}
                                      sx={{ ...(openPopover && {
                                        bgcolor: 'action.selected',
                                      })
                                    }}
                                    >
                                      Adicionar
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
          </Stack>
        </Box>

          {/* <Box marginTop={4}>
            {newAdsGenerated?.lessonExercises?.length > 0 && <Typography variant='h4'>Exercícios dessa lição</Typography>}
          </Box> */}
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
                      <Typography variant="h4">{content.sentence}</Typography>
                        <IconButton disabled={content.audiosIds.length} sx={{ marginLeft: 2, color: '#7635dc'}} onClick={() => handleEditCurrentSentense(content)}><EditIcon fontSize='small'/></IconButton>
                        {
                          content.audiosIds.length > 0 && <Tooltip enterTouchDelay={0} title='Não é possível editar uma frase que já tenha áudio'>
                          <IconButton><InfoIcon fontSize='small'/></IconButton>
                        </Tooltip>
                        }
                      
                  </Box>     
                      <Box>
                        {console.log('content', !!content.audioURL, content)}
                          {
                            !!content.audioURL ? <Box><Typography variant="caption">Àudio demonstração</Typography>
                            <AudioPlayer
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
                            <Box m={2}>
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
                        <Box mb={2}>
                            <LoadingButton
                              loading={isGeneratingAudioIdx === idx}
                              variant='contained' sx={{ marginRight: 2}}
                              onClick={() => generateAudio({ lessonExerciseId: content._id, positionIdx: idx })}
                              >
                                Gerar novo áudio
                              </LoadingButton>
                            <Button variant='contained' onClick={() => handleOpenUploadFile({ lessonExerciseId: content._id })}>Carregar outro áudio</Button>
                        </Box>
                      </Box>
                            </Box> : <Box>
                              <Box>
                        <Typography variant="subtitle1">Adicione um áudio demonstração</Typography>
                        <Typography variant="caption">Isso ajudará o aluno a entender como deve ser a pronúncia desta frase</Typography>
                        <Box mb={2}>
                            <LoadingButton
                              loading={isGeneratingAudioIdx === idx}
                              variant='contained' sx={{ marginRight: 2}}
                              onClick={() => generateAudio({ lessonExerciseId: content._id, positionIdx: idx })}
                              >
                                Gerar áudio
                              </LoadingButton>
                            <Button variant='contained' onClick={() => handleOpenUploadFile({ lessonExerciseId: content._id })}>Carregar áudio</Button>
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
      </Container>
  );
}
