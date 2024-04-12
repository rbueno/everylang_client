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
  Divider
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CreateIcon from '@mui/icons-material/Create';
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

import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
  }
];

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
  const [sentence, setSentence] = useState('')
  const [openUploadFile, setOpenUploadFile] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentLessonExerciseId, setCurrentLessonExerciseId] = useState('')
  const [currentSentence, setCurrentSentence] = useState({})
  const [updatingSentence, setUpdatingSentence] = useState(false)
  const [openUpdateSentenceTextDialog, setOpenUpdateSentenceTextDialog] = useState(false)
  const [currentTab, setCurrentTab] = useState('copilotCreator')
  const [sentenceQuantity, setSentenceQuantity] = useState(5)
  const [attributes, setAttributes] = useState('')
  const [contextType, setContextType] = useState('noContext')
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
  const addSentence = async () => {
    setSubmitting(true)

    const payload = { sentence, lessonId: newAdsGenerated.lesson._id }
    try {


      console.log('payload', payload)
      const responseProccesCreated = await api.post('v1/everylang/lesson-exercises', payload)
      console.log('responseProccesCreated', responseProccesCreated)
      
      setNewAdsGenerated(responseProccesCreated.data) 
      setSentence('')
      // eslint-disable-next-line consistent-return
      enqueueSnackbar(`Frase adicionada`);
      setSubmitting(false)
      // redirect

    
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
      attributes,
      contextType,
      context: contextType !== 'noContext' ? context : ''
    }

    try {


      console.log('payload', payload)
      const responseProccesCreated = await api.post('v1/everylang/lesson-exercises/generate-pronunciation', payload)
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

  const onChangeSentence = ({ value }) => {
    // if (adLabel.length > 60) return;
    setSentence(value)
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

  const messageShare = `EVERYLANG - Exercícios de pronúncia\n\nCriado por: ${newAdsGenerated?.lesson?.creator}\n\nLição: ${newAdsGenerated?.lesson?.title}\n\nDetalhes: ${newAdsGenerated?.lesson?.description}\n\nAcesse esta lição enviando o código "refl${newAdsGenerated?.lesson?.sharingId}" na conta de WhatsApp do Everylang.\n\nPara facilitar, clique no link para ser direcionado para a conta do Everylang já com o código na mensagem:\n\nhttps://wa.me/5511999284097?text=refl${newAdsGenerated?.lesson?.sharingId}`

const handleEditCurrentSentense = (content) => {
  setCurrentSentence(content)
  setOpenUpdateSentenceTextDialog(true)
}

const editLesson = (lessonId) => {
  push(PATH_DASHBOARD.lessonPronunciation.edit(lessonId));
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
            currentTab === 'createDefault' && <>
            <Box m={2}>
            <Typography variant="caption">Adicionar frase à lição</Typography>
            <Box m={2}>
                      <TextField
                      fullWidth
                      required
                      multiline
                      rows={2}
                        label="Digite a frase aqui"
                        value={sentence}
                        color="primary"
                        placeholder="Ex.: Who Let the Dogs Out"
                        helperText="Esta é a frase que o aluno irá ler para assim praticar a pronúncia"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={(e) => onChangeSentence({ value: e.target.value })}
                      />
                  </Box>

          </Box>
          <Box m={2} display='flex' flexDirection='column'>
                      <LoadingButton loading={submitting} variant='contained' disabled={sentence.length === 0} onClick={() => addSentence()}>Criar frase</LoadingButton>
            <Typography variant="caption">Após criar, você poderá enviar o áudio demonstração da frase</Typography>

          </Box>
            </>              
            }

            {
              currentTab === 'copilotCreator' && <>
              <Box m={2}>
              <Box m={2}>
              <Typography variant='subtitle1'>Gere frases automaticamente com ajuda do Everylang Copilot criado com ChatGPT.</Typography>
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
                      <LoadingButton loading={submitting} variant='contained' onClick={() => generateSentence()}>Criar frases</LoadingButton>
            <Typography variant="caption">Após criar, você poderá enviar o áudio demonstração da frase</Typography>

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
                      <Typography variant="subtitle1">{content.sentence}</Typography>
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
                            <Button variant='contained' onClick={() => handleOpenUploadFile({ lessonExerciseId: content._id })}>Carregar outro áudio</Button>
                            <LoadingButton
                              loading={isGeneratingAudioIdx === idx}
                              variant='contained' sx={{ marginLeft: 2}}
                              onClick={() => generateAudio({ lessonExerciseId: content._id, positionIdx: idx })}
                              >
                                Gerar novo áudio
                              </LoadingButton>
                        </Box>
                      </Box>
                            </Box> : <Box>
                              <Box>
                        <Typography variant="subtitle1">Adicione um áudio demonstração</Typography>
                        <Typography variant="caption">Isso ajudará o aluno a entender como deve ser a pronúncia desta frase</Typography>
                        <Box mb={2}>
                            <Button variant='contained' onClick={() => handleOpenUploadFile({ lessonExerciseId: content._id })}>Carregar áudio</Button>
                            <LoadingButton
                              loading={isGeneratingAudioIdx === idx}
                              variant='contained' sx={{ marginLeft: 2}}
                              onClick={() => generateAudio({ lessonExerciseId: content._id, positionIdx: idx })}
                              >
                                Gerar áudio
                              </LoadingButton>
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
      </Container>
  );
}
