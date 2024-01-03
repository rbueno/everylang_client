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
      // subscription: 'Premium',
      price: '29.99',
      caption: 'Everylang premium | sem limites',
      lists: [
        { text: 'Speaking', isAvailable: true, description: 'Pratique sua fala sem medo de errar ou ser julgado. Envie mensagens de áudio naturalmente, como se estivesse falando com um amigo' },
        { text: 'Listening', isAvailable: true, description: 'Ouça, pause, repita quantas vezes quiser. Quanto mais ouvir as respostas mais irá acostumar com o idioma'  },
        { text: 'Writing', isAvailable: true, description: 'Uma ótima manteira para praticar gramática, não se preocupe, o Everylang corrigirá e explicará qualquer erro.' },
        { text: 'Reading', isAvailable: true, description: 'Confirá as respostas em texto além dos áudio, assim irá fixar o idioma ainda mais'  },
        { text: 'Customização', isAvailable: true, description: 'As conversas são adaptadas ao seu nível do idioma. Assim, melhorando o seu engajamento e evolução'  },
      ],
      cancellationMethods: [
        { text: 'Para cancelar durante sua conversa, simplesmente envie a palavra "cancelar" no WhatsApp. Você iniciará o passo a passo para cancelamento automático.'},
        { text: 'Para solicitar o cancelar a um humano, envie uma mensagem para nosso suporte no WhatsApp.'},
        { text: 'Ou por fim, nos envie um email para ai@everlang.ai informando que deseja cancelar a sua assinatura.'},  
      ],
      labelAction: 'Avançar',
      simbol: 'R$',
      period: 'mês',
      whatsappNumber: 'Número do WhatsApp',
    whatsappNumberExample: 'Example: 5511918486569',
    whatsappNumberHelper: 'Insira o seu número de WhatsApp completo com código de país',
    sessionErrorHelper: (n) => `Número do WhatsApp não localizado. Utilize o número completo como: ${n}`
    },
  text: {
    headline: ` Everylang | Domine o inglês com WhatsApp Chathub Premium.`,
    description: `Continue a utilizar todo o potencial do Everylang e caminhe rumo a fluência em inglês.`,
  }
},
en: {
  plan: {
    // subscription: 'Premium',
    price: '6.99',
    caption: 'Everylang premium | no limits',
    lists: [
      { text: 'Speaking', isAvailable: true, description: 'Pratique sua fala sem medo de errar ou ser julgado. Envie mensagens de áudio naturalmente, como se estivesse falando com um amigo' },
      { text: 'Listening', isAvailable: true, description: 'Ouça, pause, repita quantas vezes quiser. Quanto mais ouvir as respostas mais irá acostumar com o idioma'  },
      { text: 'Writing', isAvailable: true, description: 'Uma ótima manteira para praticar gramática, não se preocupe, o Everylang corrigirá e explicará qualquer erro.' },
      { text: 'Reading', isAvailable: true, description: 'Confirá as respostas em texto além dos áudio, assim irá fixar o idioma ainda mais'  },
      { text: 'Customização', isAvailable: true, description: 'As conversas são adaptadas ao seu nível do idioma. Assim, melhorando o seu engajamento e evolução'  },
      
    ],
    cancellationMethods: [
      { text: 'Para cancelar durante sua conversa, simplesmente envie a palavra "cancelar" no WhatsApp. Você iniciará o passo a passo para cancelamento automático.'},
      { text: 'Para solicitar o cancelar a um humano, envie uma mensagem para nosso suporte no WhatsApp.'},
      { text: 'Ou por fim, nos envie um email para ai@everlang.ai informando que deseja cancelar a sua assinatura.'},  
    ],
    labelAction: 'Next',
    simbol: '$',
    period: 'mo',
    whatsappNumber: 'WhatsApp Number',
    whatsappNumberExample: 'Example: 5511918486569',
    whatsappNumberHelper: 'Inform your complete WhatsApp number with country code.',
    sessionErrorHelper: (n) => ` WhatsApp number not found. Use the complete number like: ${n}`
  },
text: {
  headline: `Everylang | Master English with WhatsApp Chathub Premium.`,
  description: `Continue to harness the full potential of Everylang and move towards fluency in English.`
}
}
}



// ----------------------------------------------------------------------

PricingPlanCard.propTypes = {
  sx: PropTypes.object,
  card: PropTypes.object,
  phoneNumber: PropTypes.string
};

function PricingPlanCard({ card, phoneNumber, sx, ...other }) {
  const { subscription, price, caption, lists, cancellationMethods, labelAction, simbol = '$', period = 'mo', whatsappNumber,
  whatsappNumberExample,
  whatsappNumberHelper, sessionErrorHelper } = card;
  const [phone, setPhone] = useState(phoneNumber)
  const [sessionError, setSessionError] = useState(false)
  const [loading, setLoading] = useState(false)

    const createCheckOutSession = async () => {
    setLoading(true);
    setSessionError(false)
    try {
      const stripe = await stripePromise;
    const checkoutSession = await api.post("v1/stripe/session", { phoneNumber: phone });

    if (checkoutSession.status !== 200) {
      console.log('erro', checkoutSession)
      setSessionError(true)
      setLoading(false);
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
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <Card
      sx={{
        p: 5,
        boxShadow: (theme) => theme.customShadows.z24,
      }}
    >
      <Label color="info" sx={{ top: 16, right: 16, position: 'absolute' }}>
          PREMIUM
        </Label>

      {/* <Typography variant="overline" sx={{ color: 'text.secondary' }}>
        {subscription}
      </Typography> */}

      <Stack spacing={1} direction="row" sx={{ my: 2 }}>
      <Typography variant="h5">{simbol}</Typography>

        <Typography variant="h2">{price === 0 ? 'Free' : price}</Typography>

        <Typography component="span" sx={{ alignSelf: 'center', color: 'text.secondary' }}>
            /{period}
          </Typography>
      </Stack>

      <Typography
        variant="caption"
        sx={{
          color: 'primary.main',
          textTransform: 'capitalize',
        }}
      >
        {caption}
      </Typography>
      <Box marginTop={4} marginBottom={2}><Typography variant="h6">Benefícios</Typography></Box>

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
          <Typography variant="p">Precisa falar com um humano? Adicione nosso suporte no WhatsApp e entre em contato a qualquer horário que precisar. 55 11 97596-6675</Typography>
            </Stack>
        </Box>
      <Box marginTop={4} marginBottom={2}>
        <Typography variant="h6">Cancelamento</Typography>

        <Stack
            sx={{
              typography: 'body2',
            }}
          >
        <Typography variant="p">Você pode cancelar a sua assinatura a qualquer momento e facilmente. Poderá cancelar através de qualquer uma dessas opções:</Typography>
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
            <Typography variant="p">{idx + 1}</Typography>
            <Box>
            <Typography variant="p">{method.text}</Typography>
            </Box>
          </Stack>
        ))}
      </Stack>
        </Box>

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
      <Box display='flex' flexDirection='column' m={2}>
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
      </Box>
      
      <LoadingButton loading={loading} fullWidth size="large" variant="contained" disabled={!phone} onClick={() => createCheckOutSession()}>
      {labelAction}
      </LoadingButton>
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
                {pricingContent[locale].text.description}
        </Typography>


        <Box maxWidth={550} mt={4} display='flex' alignItems='center' alignContent='center' justifyContent='center'>          
            <PricingPlanCard key={pricingContent[locale].plan.subscription} phoneNumber={phoneNumber} card={pricingContent[locale].plan} index={1} />
        </Box>
        </Box>
      </Container>
    </>
  );
}
