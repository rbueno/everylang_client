import axios from 'axios'
import {Elements, useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

import PropTypes from 'prop-types';
// next
import Head from 'next/head';
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
// @mui
import { Card, Button, Box, Container, Typography, Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

// layouts
import SimpleLayout from '../layouts/simple';

// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import api from '../utils/axios'


const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY);

// ----------------------------------------------------------------------

PricingPage.getLayout = (page) => <SimpleLayout>{page}</SimpleLayout>;

// ----------------------------------------------------------------------

const pricingContent = {
  pt: {
    plan: {
      pricing: {
        monthlyOld: {
          monthly: '74,99',
          totalPeriod: '74,99',
          totalPayment: 'Total a pagar por mês',
          label: 'Mensal',
        },
        monthly: {
          monthly: '29,99',
          totalPeriod: '29,99',
          totalPayment: 'Total a pagar por mês',
          label: 'Mensal',
        },
        quarterly: {
          monthly: '47,99',
          totalPeriod: '143,99',
          percentDiscount: '36',
          save: '80,99',
          totalPayment: 'Total a pagar por trimestre',
          label: 'Trimestral',
        },
        annual: {
          monthly: '32,92',
          totalPeriod: '394,99',
          percentDiscount: '56',
          mostPopular: 'Mais popular',
          save: '503,99',
          totalPayment: 'Total a pagar por ano',
          label: 'Anual',
        },
      },
      // subscription: 'Premium',
      price: '394.99',
      caption: 'Equivalente a R$32,92 por mês',
      lists: [
        { text: 'Customização', isAvailable: true, description: 'As conversas são adaptadas ao seu nível do idioma, facilitando o seu engajamento e acelerando sua evolução'  },
        { text: 'Speaking', isAvailable: true, description: 'Pratique sua fala sem medo de errar ou ser julgado. Envie mensagens de áudio naturalmente, como se estivesse falando com um amigo' },
        { text: 'Listening', isAvailable: true, description: 'Ouça, pause, repita quantas vezes quiser. Quanto mais ouvir as respostas mais irá se acostumar com o idioma.'  },
        { text: 'Writing', isAvailable: true, description: 'Uma ótima maneira para praticar gramática: o Everylang corrigirá e explicará qualquer erro.' },
        { text: 'Reading', isAvailable: true, description: 'Confira as respostas em texto além dos áudios para fixar ainda mais o idioma.'  },
        { text: 'Exercícios de pronúncia', isAvailable: true, description: 'Exercícios de pronúncias customizados para o seu nível e contexto.'  },
        { text: 'Simulações dinâmicos', isAvailable: true, description: 'Simule situações reais do dia a dia como fazer check-in em hotel, pedir comida e etc.'  },
      ],
      cancellationMethods: [
        { icon:  <ChatBubbleOutlineIcon fontSize='small'/>, text: 'Para cancelar durante sua conversa, simplesmente envie a palavra "cancelar" no WhatsApp. Você iniciará o passo a passo para o cancelamento automático.'},
        { icon: <WhatsAppIcon fontSize='small'/>, text: 'Para solicitar o cancelamento a um humano, envie uma mensagem para nosso suporte no WhatsApp.'},
        { icon: <EmailOutlinedIcon fontSize='small' />, text: 'Está sem WhatsApp? Não se preocupe, pode enviar um email para ai@everlang.ai informando que deseja cancelar a sua assinatura.'},  
      ],
      labelAction: 'Escolher plano',
      simbol: 'R$',
      period: 'anual',
      whatsappNumber: 'Número do WhatsApp',
    whatsappNumberExample: 'Example: 5511918486569',
    whatsappNumberHelper: 'Insira o seu número de WhatsApp completo com código de país',
    sessionErrorHelper: (n) => `Número do WhatsApp não localizado. Utilize o número completo como: ${n}`
    },
  text: {
    headline: `Everylang Sem Limites`,
    subtitle: `Prática de idiomas através de conversação via WhatsApp.`,
    description: `Escolha um plano para continuar a utilizar todo o potencial do Everylang sem limites.`,
    choosePlan: 'Escolha um plano',
    save: 'Economize',
  }
},
en: {
  plan: {
    pricing: {
      monthlyOld: {
        monthly: '14,99',
        totalPeriod: '14,99',
        totalPayment: 'Total to pay per month',
        label: 'monthly',
      },
      monthly: {
        monthly: '6,99',
        totalPeriod: '6,99',
        totalPayment: 'Total to pay per month',
        label: 'monthly',
      },
      quarterly: {
        monthly: '9,67',
        totalPeriod: '28,99',
        percentDiscount: '36',
        save: '15,98',
        totalPayment: 'Total to pay per quarter',
        label: 'Quarterly',
      },
      annual: {
        monthly: '6,67',
        totalPeriod: '79,99',
        percentDiscount: '56',
        mostPopular: 'Most popular',
        save: '99,89',
        totalPayment: 'Total to pay per year',
        label: 'Annual',
      },
    },
    // subscription: 'Premium',
    price: '79.99',
    caption: 'Equivalent to $6,67 per month',
    lists: [
      { text: 'Customização', isAvailable: true, description: 'As conversas são adaptadas ao seu nível do idioma, facilitando o seu engajamento e acelerando sua evolução.'  },
      { text: 'Speaking', isAvailable: true, description: 'Pratique sua fala sem medo de errar ou ser julgado. Envie mensagens de áudio naturalmente, como se estivesse falando com um amigo' },
      { text: 'Listening', isAvailable: true, description: 'Ouça, pause, repita quantas vezes quiser. Quanto mais ouvir as respostas mais irá se acostumar com o idioma.'  },
      { text: 'Writing', isAvailable: true, description: 'Uma ótima maneira para praticar gramática: o Everylang corrigirá e explicará qualquer erro.' },
      { text: 'Reading', isAvailable: true, description: 'Confira as respostas em texto além dos áudios para fixar ainda mais o idioma.'  },
      { "text": "Pronunciation Exercises", "isAvailable": true, "description": "Customized pronunciation exercises for your level and context." },
      { "text": "Dynamic Simulations", "isAvailable": true, "description": "Simulate real-life situations such as checking in at a hotel, ordering food, etc." }
    ],
    cancellationMethods: [
      { icon:  <ChatBubbleOutlineIcon fontSize='small'/>, text: 'Para cancelar durante sua conversa, simplesmente envie a palavra "cancelar" no WhatsApp. Você iniciará o passo a passo para o cancelamento automático.'},
      { icon: <WhatsAppIcon fontSize='small'/>, text: 'Para solicitar o cancelamento a um humano, envie uma mensagem para nosso suporte no WhatsApp.'},
      { icon: <EmailOutlinedIcon fontSize='small'/>, text: 'Está sem WhatsApp? Não se preocupe, pode enviar um email para ai@everlang.ai informando que deseja cancelar a sua assinatura.'},  
    ],
    labelAction: 'Choose plan',
    simbol: '$',
    period: 'Annual',
    whatsappNumber: 'WhatsApp Number',
    whatsappNumberExample: 'Example: 5511918486569',
    whatsappNumberHelper: 'Inform your complete WhatsApp number with country code.',
    sessionErrorHelper: (n) => ` WhatsApp number not found. Use the complete number like: ${n}`
  },
text: {
  headline: `Everylang Unlimited`,
  subtitle: 'Language practice through conversation via WhatsApp',
  description: `Choose a plan to continue using the full potential of Everylang without limits.`,
  choosePlan: 'Choose a plan',
  save: 'Save',
}
}
}


function PlanCard() {
  return(
    <Card>
      <p>teste</p>
    </Card>
  )
}
// ----------------------------------------------------------------------

PricingPlanCard.propTypes = {
  sx: PropTypes.object,
  card: PropTypes.object,
  phoneNumber: PropTypes.string
};

function PricingPlanCard({ card, text, phoneNumber, sx, ...other }) {
  const { subscription, price, caption, subtitle, lists, cancellationMethods, labelAction, simbol = '$', period = 'mo', whatsappNumber,
  whatsappNumberExample,
  whatsappNumberHelper, sessionErrorHelper, pricing } = card;
  const [phone, setPhone] = useState(phoneNumber)
  const [sessionError, setSessionError] = useState(false)
  const [loading, setLoading] = useState({
  monthlyEV: false,
  quarterlyEV: false,
  annualEV: false,
  monthlyVL: false
})

    const createCheckOutSession = async (productType) => {
    setLoading({
      ...loading,
      [productType]: true
    });
    setSessionError(false)
    try {
      const stripe = await stripePromise;
      const checkoutSessionPayload = {
        phoneNumber: phone,
        stripeProductType: productType || 'annualEV',
        successUrl: `https://www.everylang.ai/pulse-subscribe?n=${phone}`,
        cancelUrl: `https://www.everylang.ai/pricing?n=${phone}`
      }
    const checkoutSession = await api.post("v1/stripe/session", checkoutSessionPayload);

    if (checkoutSession.status !== 200) {
      console.log('erro', checkoutSession)
      setSessionError(true)
      setLoading({
        ...loading,
        [productType]: false
      });
      return
    }
    console.log('checkoutSession', checkoutSession)
    await axios.post('https://okahub.herokuapp.com/hooks/stripe', { checkoutSession })

    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });
    if (result.error) {
      alert(result.error.message);
    }
    } catch (error) {
      console.log('erro', error)
      setSessionError(true)
      setLoading({
        ...loading,
        [productType]: false
      });
    }
    setLoading({
      ...loading,
      [productType]: false
    });
  };

  return (
    <Card
      sx={{
        p: 4,
        boxShadow: (theme) => theme.customShadows.z24,
      }}
    >
      <Box marginBottom={2}><Typography variant="h6">Benefícios</Typography></Box>

      <Stack component="ul" spacing={2} sx={{ p: 0, my: 0 }}>
        {lists.map((item) => (
          <Stack
            key={item.text}
            component="li"
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{
              typography: 'body2',
              color: item.isAvailable ? 'text.primary' : 'text.disabled',
            }}
          >
            <Iconify
              icon={item.isAvailable ? 'eva:checkmark-fill' : 'eva:close-fill'}
              width={16}
              sx={{
                color: item.isAvailable ? 'primary.main' : 'inherit',
              }}
            />
            <Box>
            <Typography variant="subtitle2">{item.text}</Typography>
            <Typography variant="p">{item.description}</Typography>
            </Box>
          </Stack>
        ))}
      </Stack>
      <Box marginTop={4} marginBottom={2}>
        <Typography variant="h6">Suporte</Typography>
        <Stack
            sx={{
              typography: 'body2',
            }}
          >
          <Typography variant="p">Precisa falar com um humano? Adicione nosso suporte no WhatsApp e entre em contato a qualquer horário que precisar: 55 11 97596-6675</Typography>
            </Stack>
        </Box>
      <Box marginTop={4} marginBottom={2}>
        <Typography variant="h6">Cancelamento</Typography>

        <Stack
            sx={{
              typography: 'body2',
            }}
          >
        <Typography variant="p">Você pode cancelar a sua assinatura a qualquer momento usando qualquer uma dessas opções:</Typography>
            </Stack>
        
        <Stack component="ul" spacing={2} sx={{ p: 0, my: 2 }}>
        {cancellationMethods.map((method, idx) => (
          <Stack
            key={method.text}
            component="li"
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{
              typography: 'body2',
              color: 'text.primary'
            }}
          >
            <Box>

            {method.icon}
            </Box>
            <Box>
            <Typography variant="p">{method.text}</Typography>
            </Box>
          </Stack>
        ))}
      </Stack>
        </Box>

<Box marginTop={4} marginBottom={2}>
  <Typography variant="h6">{text.choosePlan}:</Typography>
  <Typography variant="caption">{text.description}</Typography>
</Box>

{/* <Box display='flex' flexDirection='column' m={2}>
      <Typography
        variant="caption"
        sx={{
          color: 'primary.main',
          textTransform: 'capitalize',
        }}
      >
        {whatsappNumber}
      </Typography>
      
      <Label color="info" sx={{ top: 16, right: 16 }}>
             {phone}
        </Label>
      </Box> */}

<Box marginTop={2}>
<Card>
              {/* 
              desconto porcentagem
              economia em dinheiro
              equivalente por mês
              frequência de pagamento
              total a pagar
              */}
        
            {/* <Label color="info" sx={{ top: 16, right: 16 }}>
            
              </Label> */}
            <Label color="info" sx={{ top: 22, right: 2, position: 'absolute' }}>
            {pricing.monthly.label}
              </Label>

            {/* <Typography variant="overline" sx={{ color: 'text.secondary' }}>
              {subscription}
            </Typography> */}

            <Box m={2}>
            <Stack spacing={1} direction="row">
            {/* <Typography variant="h3">{simbol}</Typography> */}
            <Typography component="span" sx={{ alignSelf: 'center', color: 'text.secondary' }}>
            {simbol}
                </Typography>

              <Typography variant="h4">{pricing.monthly.monthly}</Typography>

              <Typography component="span" sx={{ alignSelf: 'center', color: 'text.secondary' }}>
              / {pricing.monthly.label.toLowerCase()}
                </Typography>
            </Stack>

            <Typography
              variant="caption"
              sx={{
                color: 'primary.main',
              }}
            >
              {pricing.monthly.totalPayment}: {simbol}{pricing.monthly.totalPeriod}
            </Typography>
            </Box>
            <Box m={2} marginLeft={8} marginRight={8} maxWidth={550} display='flex' alignItems='center' alignContent='center' justifyContent='center'> 
             <LoadingButton loading={loading.monthlyEV} fullWidth size="large" variant="outlined" disabled={!phone} onClick={() => createCheckOutSession('monthlyEV')}>
      {labelAction}
      </LoadingButton>
            </Box>
      </Card>
</Box>
      <Box marginTop={2}>
   

      <Card>
       
            <Box maxWidth={550} display='flex' alignItems='center' alignContent='center' justifyContent='center' sx={{ backgroundColor: 'primary.main'}}> 


            <Typography variant='caption' sx={{ color: 'white'}}>⭐️ {pricing.annual.mostPopular}</Typography>

            </Box>
            <Stack>
            <Label color="info" >
            {pricing.annual.percentDiscount}% off - {text.save} {simbol} {pricing.annual.save}
              </Label>
            </Stack>
            <Label color="info" sx={{ top: 64, right: 2, position: 'absolute' }}>
            {pricing.annual.label}
              </Label>

            <Box m={2}>
            <Stack spacing={1} direction="row">
            <Typography component="span" sx={{ alignSelf: 'center', color: 'text.secondary' }}>
            {simbol}
                </Typography>

              <Typography variant="h4">{pricing.annual.monthly}</Typography>

              <Typography component="span" sx={{ alignSelf: 'center', color: 'text.secondary' }}>
                  / equivalente por {pricing.monthly.label.toLowerCase()}
                </Typography>
            </Stack>

            <Typography
              variant="caption"
              sx={{
                color: 'primary.main',
              }}
            >
              {pricing.annual.totalPayment}: {simbol} {pricing.annual.totalPeriod}
            </Typography>
            </Box>
            <Box m={2} marginLeft={8} marginRight={8} maxWidth={550} display='flex' alignItems='center' alignContent='center' justifyContent='center'> 
            <LoadingButton loading={loading.annualEV} fullWidth size="large" variant="outlined" disabled={!phone} onClick={() => createCheckOutSession('annualEV')}>
      {labelAction}
      </LoadingButton>
      </Box>
      </Card>
      </Box>

      <Box marginTop={2}>
        {/* <Box m={2}>
           <TextField
              fullWidth
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              label={whatsappNumber}
              placeholder={whatsappNumberExample}
              error={sessionError}
              helperText={sessionError ? sessionErrorHelper(phoneNumber) : whatsappNumberHelper}
              />
      </Box> */}

      <Card>
              {/* 
              desconto porcentagem
              economia em dinheiro
              equivalente por mês
              frequência de pagamento
              total a pagar
              */}
            <Stack>
            <Label color="info" >
            {pricing.quarterly.percentDiscount}$ Off - {text.save} {simbol} {pricing.quarterly.save}
              </Label>
            </Stack>
            {/* <Label color="info" sx={{ top: 16, right: 16 }}>
            
              </Label> */}
            <Label color="info" sx={{ top: 44, right: 2, position: 'absolute' }}>
            {pricing.quarterly.label}
              </Label>

            {/* <Typography variant="overline" sx={{ color: 'text.secondary' }}>
              {subscription}
            </Typography> */}

            <Box m={2}>
            <Stack spacing={1} direction="row">
            {/* <Typography variant="h4">{simbol}</Typography> */}
            <Typography component="span" sx={{ alignSelf: 'center', color: 'text.secondary' }}>
            {simbol}
                </Typography>

              <Typography variant="h4">{pricing.quarterly.monthly}</Typography>

              <Typography component="span" sx={{ alignSelf: 'center', color: 'text.secondary' }}>
                  / {pricing.monthly.label.toLowerCase()}
                </Typography>
            </Stack>

            <Typography
              variant="caption"
              sx={{
                color: 'primary.main',
              }}
            >
              {pricing.quarterly.totalPayment}: {simbol} {pricing.quarterly.totalPeriod}
            </Typography>
            </Box>
            <Box m={2} marginLeft={8} marginRight={8} maxWidth={550} display='flex' alignItems='center' alignContent='center' justifyContent='center'> 
            <LoadingButton loading={loading.quarterlyEV} fullWidth size="large" variant="outlined" disabled={!phone} onClick={() => createCheckOutSession('quarterlyEV')}>
      {labelAction}
      </LoadingButton>
      </Box>
      </Card>
      </Box>
     
      
      
     
    </Card>
  );
}

export default function PricingPage() {
  const { query } = useRouter()

  const [phoneNumber, setPhoneNumber] = useState(null)
  const [locale, setLocale] = useState('en')

  useEffect(()=> {
    if (query?.n) setPhoneNumber(query.n)
    if (query?.n && query?.n.startsWith('55')) setLocale('pt')
  }, [query])

  if (!phoneNumber) return <Box>Loading</Box>
  return (
    <>
      <Head>
        <title> Pricing | Everylang</title>
      </Head>
      <Container
        sx={{
          pt: 15,
          pb: 10,
          minHeight: 1,
        }}
      >
         <Box display='flex' flexDirection='column' alignItems='center' alignContent='center' justifyContent='center'>
            <Box maxWidth={550}>

                <Typography variant="h3" align="center" paragraph>
                {pricingContent[locale].text.headline}
                </Typography>
            </Box>
        


        <Typography align="center" sx={{ color: 'text.secondary' }}>
                {pricingContent[locale].text.subtitle}
        </Typography>


        <Box maxWidth={550} minWidth={350} mt={4} display='flex' alignItems='center' alignContent='center' justifyContent='center'> 
                 
            <PricingPlanCard key={pricingContent[locale].plan.subscription} phoneNumber={phoneNumber} card={pricingContent[locale].plan} text={pricingContent[locale].text} index={1} />
        </Box>
        </Box>
      </Container>
    </>
  );
}
