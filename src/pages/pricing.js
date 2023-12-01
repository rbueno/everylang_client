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
      price: '29.90',
      caption: 'Uma super IA com a particidade de um chat',
      lists: [
        { text: 'ChatGPT Plus', isAvailable: true },
        { text: 'Integração com WhatsApp', isAvailable: true },
        { text: 'Mensagens Ilimitadas', isAvailable: true },
        { text: 'Crie posts, anúncios, redações, resumos de textos e relatórios... tire dúvidas sobre assuntos gerais e muitos mais!', isAvailable: true },
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
    headline: ` O poder do ChatGPT, e outras IAs, diretamente em seu WhatsApp`,
    description: `Utilize o ChatGPT plus, entre outras IAs, diretamente em seu WhatsApp com acesso ilimitado.`,
  }
},
en: {
  plan: {
    // subscription: 'Premium',
    price: '4.99',
    caption: 'A super AI with the practicality of a chat',
    lists: [
      { text: 'ChatGPT Plus', isAvailable: true },
      { text: 'WhatsApp Integration', isAvailable: true },
      { text: 'Unlimited Messages', isAvailable: true },
      { text: 'Create posts, ads, essays, summaries of texts and reports... ask questions about general topics and much more!', isAvailable: true },
      
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
  headline: ` The power of ChatGPT, and other AIs, directly on your WhatsApp.`,
  description: `Use ChatGPT plus, among other AIs, directly on your WhatsApp with unlimited access.`
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
  const { subscription, price, caption, lists, labelAction, simbol = '$', period = 'mo', whatsappNumber,
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

      <Typography variant="overline" sx={{ color: 'text.secondary' }}>
        {subscription}
      </Typography>

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

      <Stack component="ul" spacing={2} sx={{ p: 0, my: 5 }}>
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
            <Typography variant="body2">{item.text}</Typography>
          </Stack>
        ))}
      </Stack>

      <Box m={2}>
           <TextField
              fullWidth
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              label={whatsappNumber}
              placeholder={whatsappNumberExample}
              error={sessionError}
              helperText={sessionError ? sessionErrorHelper(phoneNumber) : whatsappNumberHelper}
              />
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
        <title> Pricing | Okahub Pulse</title>
      </Head>
      <Container
        sx={{
          pt: 15,
          pb: 10,
          minHeight: 1,
        }}
      >
         <Box display='flex' alignItems='center' alignContent='center' justifyContent='center'>
            <Box maxWidth={550}>

        <Typography variant="h3" align="center" paragraph>
         {pricingContent[locale].text.headline}
        </Typography>
            </Box>
        </Box>

        <Typography align="center" sx={{ color: 'text.secondary' }}>
        {pricingContent[locale].text.description}
        </Typography>

        <Box mt={4} display='flex' alignItems='center' alignContent='center' justifyContent='center'>          
            <PricingPlanCard key={pricingContent[locale].plan.subscription} phoneNumber={phoneNumber} card={pricingContent[locale].plan} index={1} />
        </Box>
      </Container>
    </>
  );
}
