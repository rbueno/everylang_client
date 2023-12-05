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

// layouts
import SimpleLayout from '../layouts/simple';

// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import api from '../utils/axios'

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_JIGpkjVW2BuMNnpJYCXlBHbY');


// const CheckoutForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();

//   const handleSubmit = async (event) => {
//     // We don't want to let default form submission happen here,
//     // which would refresh the page.
//     event.preventDefault();

//     if (!stripe || !elements) {
//       // Stripe.js has not yet loaded.
//       // Make sure to disable form submission until Stripe.js has loaded.
//       return;
//     }

//     const result = await stripe.confirmPayment({
//       //`Elements` instance that was used to create the Payment Element
//       elements,
//       confirmParams: {
//         return_url: "https://example.com/order/123/complete",
//       },
//     });

//     if (result.error) {
//       // Show error to your customer (for example, payment details incomplete)
//       console.log(result.error.message);
//     } else {
//       // Your customer will be redirected to your `return_url`. For some payment
//       // methods like iDEAL, your customer will be redirected to an intermediate
//       // site first to authorize the payment, then redirected to the `return_url`.
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <PaymentElement />
//       <Button type='submit' disabled={!stripe}>Submit</Button>
//     </form>
//   )
// };

// function StripePayment() {
//   const options = {
//     // passing the client secret obtained from the server
//     clientSecret: `pk_test_JIGpkjVW2BuMNnpJYCXlBHbY_secret_'sk_test_cr2Rk8YQimJzRtBlVpUJ6ynu'`,
//   };

  
// useEffect(() => {
// console.log('stripePromise', stripePromise.client_secret)
// },[])
//   return (
//     <Elements stripe={stripePromise} options={options}>
//       <CheckoutForm />
//     </Elements>
//   );
// };


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
    whatsappNumberHelper: 'Insira o seu número de WhatsApp completo com código de país'
    },
  text: {
    headline: ` O poder do ChatGPT, e outras IAs, diretamente em seu WhatsApp`,
    description: `Utilize o ChatGPT plus, entre outras IAs, diretamente em seu WhatsApp com acesso ilimitado.`,
    paidSuccessCongratulations: `Parabéns!`,
    paidSuccess: `Parabéns! Estamos processando o seu pagamento e você já pode voltar a utilizar o Everylang Pulse com ChatGPT Plus no WhatsApp.`,
    buttonBackToWhatsApp: 'Voltar para o WhatsApp'
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
    whatsappNumberHelper: 'Inform your complete WhatsApp number with country code.'
  },
text: {
  headline: ` The power of ChatGPT, and other AIs, directly on your WhatsApp.`,
  description: `Use ChatGPT plus, among other AIs, directly on your WhatsApp with unlimited access.`,
  paidSuccessCongratulations: `Congratulations!`,
  paidSuccess: `We are processing your payment and you can now return to using Everylang Pulse with ChatGPT Plus on WhatsApp.`,
  buttonBackToWhatsApp: 'Back to WhatsApp'
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
  whatsappNumberHelper } = card;
  const [phone, setPhone] = useState(phoneNumber)

    const createCheckOutSession = async () => {
    // setLoading(true);
    const stripe = await stripePromise;
    const checkoutSession = await api.post("v1/stripe/session", { phoneNumber: phone });

    if (checkoutSession.status !== 200) {
      console.log('erro', checkoutSession)
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
    // setLoading(false);
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

      {/* <Box sx={{ width: 80, height: 80, mt: 5 }}>

      <PlanFreeIcon />
      <PlanStarterIcon />
      <PlanPremiumIcon />
      
      </Box> */}

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
              // multiline
              // rows={3}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              label={whatsappNumber}
              placeholder={whatsappNumberExample}
              helperText={whatsappNumberHelper}
              />
      </Box>
      <Button fullWidth size="large" variant="contained" disabled={!phone} onClick={() => createCheckOutSession()}>
      {labelAction}
      </Button>
      {/* <StripePayment /> */}
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
        <title> Success | Everylang Pulse</title>
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
         {pricingContent[locale].text.paidSuccessCongratulations}
        </Typography>
            </Box>
        </Box>

        <Typography align="center" sx={{ color: 'text.secondary' }}>
        {pricingContent[locale].text.paidSuccess}
        </Typography>

        {/* <Box sx={{ my: 5 }}>
          <Stack direction="row" alignItems="center" justifyContent="flex-end">
            <Typography variant="overline" sx={{ mr: 1.5 }}>
              MONTHLY
            </Typography>

            <Switch />
            <Typography variant="overline" sx={{ ml: 1.5 }}>
              YEARLY (save 10%)
            </Typography>
          </Stack>

          <Typography
            variant="caption"
            align="right"
            sx={{ color: 'text.secondary', display: 'block' }}
          >
            * Plus applicable taxes
          </Typography>
        </Box> */}

        <Box mt={4} display='flex' alignItems='center' alignContent='center' justifyContent='center'>
          
            <Button variant='contained' href="https://wa.me/5511918486569">{pricingContent[locale].text.buttonBackToWhatsApp}</Button>
          
        </Box>
      </Container>
    </>
  );
}
