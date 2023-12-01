import PropTypes from 'prop-types';
import { useEffect} from 'react'
import Head from 'next/head';

import { useTheme, alpha } from '@mui/material/styles';
import {
    Stack,
    Typography,
    Container,
    Box,
    Button
} from '@mui/material'

import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import AppleIcon from '@mui/icons-material/Apple';
import ShopIcon from '@mui/icons-material/Shop';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import SchoolIcon from '@mui/icons-material/School';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TelegramIcon from '@mui/icons-material/Telegram';
import PhotoCameraFrontIcon from '@mui/icons-material/PhotoCameraFront';

import { useSettingsContext } from '../../components/settings';
import localStorageAvailable from '../../utils/localStorageAvailable';
import { useAuthContext } from '../../auth/useAuthContext';
import { CustomAvatar } from '../../components/custom-avatar'
import Footer from '../../layouts/main/Footer';
import MainLayout from '../../layouts/main';

import MapComponent from './components/mapComponent'
import GetContactComponent from './components/getContactComponent'
import YoutubeCardVideo from './components/youtubeCardVideo'

const templates = [
  {
    templateId: 'black',
    setting: {
      general: {
        color: '#191919'
      },
      pageBackGround: {
        type: 'flatColor',
        color: '#191919'
      },
      text: {
        title: {
          font: '',
          size: '',
          color: '#FFFFFF',
        },
        paragraph: {
          font: '',
          size: '',
          color: '#FFFFFF',
        },
      },
      button: {
        background: {
          type: 'solid',
          color: '#FFFFFF',
        },
        text: {
          font: '',
          size: '',
          color: '#191919'
        }
      }
    }
  },
  {
    templateId: 'white',
    setting: {
      general: {
        color: '#FFFFFF'
      },
      pageBackGround: {
        type: 'flatColor',
        color: '#FFFFFF'
      },
      text: {
        title: {
          font: '',
          size: '',
          color: '#191919',
        },
        paragraph: {
          font: '',
          size: '',
          color: '#191919',
        },
      },
      button: {
        background: {
          type: 'solid',
          color: '#191919',
        },
        text: {
          font: '',
          size: '',
          color: '#FFFFFF'
        }
      }
    }
  }
]

const defaultTheme = templates[1].setting

const availableThemeColorPresets = {
    default: 'default',
    cyan: 'cyan',
    purple: 'purple',
    blue: 'blue',
    orange: 'orange',
    red: 'red'
  }

  const availableIcons = [
    {
      iconId: 'googlePlayStore',
      iconComponent: <ShopIcon />
    },
    {
      iconId: 'appleStore',
      iconComponent: <AppleIcon />
    },
    {
      iconId: 'whatsapp',
      iconComponent: <WhatsAppIcon />
    },
    {
      iconId: 'facebook',
      iconComponent: <FacebookIcon />
    },
    {
      iconId: 'instagram',
      iconComponent: <InstagramIcon />
    },
    {
      iconId: 'email',
      iconComponent: <EmailIcon />
    },
    {
      iconId: 'school',
      iconComponent: <SchoolIcon />
    },
    {
      iconId: 'youtube',
      iconComponent: <YouTubeIcon />
    },
    {
      iconId: 'telegram',
      iconComponent: <TelegramIcon />
    },
    {
      iconId: 'camera',
      iconComponent: <PhotoCameraFrontIcon />
    },
  
  ]

  const eventEntry = ({ component, eventType, data }) => {


    const payload = {
      createdAt: new Date,
      context: { userAgent: '' },
      data: component,
      eventType,
      bid: data.businessId,
      pid: data._id,
      componentId: component?.componentId
    }
    
    fetch('/api/evententry', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
  }

  const buildComponent = ({ component, theme, businessSlug, businessId, data, loadedTheme }) => {
    const iconComponent = component.props?.icon?.id && availableIcons.find(item => item.iconId === component.props.icon.id)
  
    // <Button component={NextLink} href="/" size="large" variant="contained">
    //         Go to Home
    //       </Button>
  
  // eslint-disable-next-line react/jsx-no-useless-fragment
  if (!component?.props) return <></>
    if (component.type === 'linkButton' && component.props.link && component.props.text) {
      
      let buttonHeight = ''
      const buttonText = component.props?.text || ''

      const lines = (buttonText.length || 40) / 40
      console.log('lines', lines)
      console.log('buttonText.legnth || 40', buttonText.length || 40)
      console.log('buttonText.legnth / 40', (buttonText.length || 40) / 40)
      if (lines >= 0 && lines < 1) buttonHeight = '55px'
      if (lines >= 1 && lines < 2) buttonHeight = '90px'
      if (lines >= 2 && lines < 3) buttonHeight = '115px'
      if (lines >= 3 && lines < 4) buttonHeight = '145px'
      if (lines >= 4 && lines < 5) buttonHeight = '200px'
      console.log('buttonHeight', buttonHeight, component.props?.text)
      return (
        <Button
        {...(iconComponent ? { startIcon: iconComponent.iconComponent } : {})}
        //  startIcon={iconComponent.iconComponent}
            size="large"
            variant="contained"
            sx={{
              backgroundColor: alpha(loadedTheme.button.background.color, 0.90),
              "& .MuiButton-endIcon": {
                position: "absolute",
                right: "1rem",
            },
            color: loadedTheme.button.text.color,
            "& .MuiButton-startIcon": {
                position: "absolute",
                left: "1rem",
            },
            "&:hover": {
              transition:'cubic-bezier(.07, 1.41, .82, 1.41) 0.2s',
              transform: 'scale(1.02)',
              backgroundColor: alpha(loadedTheme.button.background.color, 0.80),
          },
          height: buttonHeight
            }}
            // component={NextLink}
            href={component.props.link}
            // href={PATH_DOCS.root} 
            target="_blank"
            rel="noopener" 
            // disabled={false}
            onClick={() => eventEntry({ component, eventType: 'click', data })}
            // disabled={props?.data?.Celular ? false : true}
            // onClick={() => handleWhatsAppClick(props.data.Celular)} disableRipple
            disableRipple
          >
            <Box paddingLeft={2} paddingRight={2} display='flex' textAlign='center'>
              <Typography>{buttonText}</Typography>
            </Box>
        </Button>
      )
    }
    if (component.type === 'paragraph' && component.props.text) {
      return (
        <Typography
          textAlign="center"
          variant="body2"
          sx={{
            color: loadedTheme.text.paragraph.color
          }}
          >
            {component.props.text}</Typography>
      )
    }
  
    if (component.type === 'googlemaps' && component.props.iframeSRC) {
      return (
        <MapComponent
          lat={component.props.lat}
          lng={component.props.lng}
          url={component.props.url}
          placeTitle={component.props.name}
          placeAddress={component.props.formattedAddress}
          component={component}
          businessSlug={businessSlug}
          businessId={data.businessId}
          pageId={data._id}
          eventEntry={eventEntry}
          iframeSRC={component.props.iframeSRC}
        />
      )
    }
  
    if (component.type === 'getContacts') {
      return (
        <GetContactComponent
        price="$50"
        title={component.props.title}
        description={component.props.description}
        businessSlug={businessSlug}
        businessId={data.businessId}
        pageId={data._id}
        component={component}
        eventEntry={eventEntry}
        />
      )
    }
    if (component.type === 'youtubeCardVideo' && component.props?.videoId) {
      return (
        <YoutubeCardVideo
          title={component.props?.title}
          videoId={component.props?.videoId}
          subscriptionLink={component.subscriptionLink}
          subscriptionLinkLabel={component.subscriptionLinkLabel}
          businessSlug={businessSlug}
          businessId={data.businessId}
          pageId={data._id}
          component={component}
          eventEntry={eventEntry}
        />
      )
    }
  
    return <></>
  }

// MyPage.getLayout = (page) => <> {page} </>;
// MyPage.getLayout = (page) => <MainLayout>{page}</MainLayout>;

MyPage.propTypes = {
    business: PropTypes.object
  };

export function MyPage({ business }) {
    // const { onChangeColorPresets } = useSettingsContext();
    const storageAvailable = localStorageAvailable();
    const data = business
    const loadedTheme = data.theme?.setting || defaultTheme
    // eslint-disable-next-line no-prototype-builtins
    // const colorPreset = data?.themeColor && availableThemeColorPresets.hasOwnProperty(data?.themeColor) ? data?.themeColor : 'default'
    useEffect(() => {
      if (storageAvailable) {
        // onChangeColorPresets({ target: { value:  colorPreset }})
        localStorage.setItem('businessSlug', data.businessSlug)
      }
      eventEntry({ component: {}, eventType: 'view', data })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
      storageAvailable, 
      // onChangeColorPresets, 
      // colorPreset, 
      data.businessSlug]);
  
    // const { user } = useAuthContext();
    const theme = useTheme();
  
    const components = data.sections.map((section) => (
      <Stack
          key={section.sectionId}
          spacing={2}
          direction="column"
          sx={{
            p: theme.spacing(3, 0, 3, 0),
          }}
        >
            { section.title && <Typography
              textAlign="center"
              variant="h6"
              sx={{
                color: loadedTheme.text.title.color
              }}
              >{section.title}</Typography>  }
              
            {
              section.components && section.components.map(comp => buildComponent({ component: comp, theme, businessSlug: data.pageSlug, businessId: data.businessId, data, loadedTheme }))
            }
  
        </Stack>
     ))
  
    return (
      <Box
      sx={{
        backgroundColor: loadedTheme.pageBackGround.color
      }}
      >
        <Head>
          <title>{data.meta?.headTag?.title}</title>
          <meta name="description" content={data.meta?.headTag?.description} />
          <link href={data.meta?.headTag?.websiteURL} rel="canonical" />
      
          <meta name="theme-color" content={loadedTheme.general.color} />
          <meta property="og:title" content={data.meta?.headTag?.ogTitle} />
          <meta property="og:url" content={data.meta?.headTag?.websiteURL} />
          <meta property="og:description" content={data.meta?.headTag?.description} />
          <meta property="og:image" content={data.meta?.headTag?.image} />
        </Head>
  
          
        <Container 
          maxWidth='sm'
          // sx={{
          //   backgroundColor: '#191919'
          // }}
        >
        <Box pt={5}>
        <CustomAvatar
            src={data.avatarURL}
            alt={data.name}
            name={data.name}
            sx={{
              mx: 'auto',
              borderWidth: 2,
              borderStyle: 'solid',
              borderColor: 'common.white',
              width: { xs: 80, md: 80 },
              height: { xs: 80, md: 80 },
            }}
          />
        </Box>
  
          <Box
            sx={{
              ml: { xs: 1, md: 1 },
              mt: { xs: 1, md: 1 },
          //    color: 'common.white',
              textAlign: { xs: 'center', md: 'center' },
            }}
          >
            <Typography
              variant="h4"
              sx={{
                color: loadedTheme.text.title.color
              }}
              >
                {data.name}
            </Typography>
          </Box>
          {
            data.description && <Box sx={{
              ml: { xs: 1, md: 1 },
              mt: { xs: 1, md: 1 },
              // color: 'common.white',
              textAlign: { xs: 'center', md: 'center' },
            }}>
          <Typography
            textAlign="center"
            variant="body2"
            sx={{
              color: loadedTheme.text.paragraph.color
            }}
          >{data.description}</Typography>
          </Box>
          }
          
          {
            components.map(item => item)
          }
  
          
        
        </Container>
        <Footer loadedTheme={loadedTheme}/>
      </Box>
    );
  }