// @mui
import { Accordion, Typography, AccordionSummary, AccordionDetails } from '@mui/material';
// _mock_
import { _faqs } from '../../_mock/arrays';
// components
import Iconify from '../../components/iconify';
import uuidv4 from '../../utils/uuidv4';
// ----------------------------------------------------------------------

const faqs = [
  {
    id: uuidv4(),
    heading: `O que é o Everylang?`,
    detail: 'O Everylang é uma IA que permite que você pratique um idioma pelo WhatsApp. Conversando com Olivia, sua professora virtual, você pode ter conversas reais e personalizadas, além de exercícios de pronúncia e gramática adaptados às suas necessidades.',
  },
  {
    id: uuidv4(),
    heading: `Como utilizar?`,
    detail: 'É tão simples quanto enviar uma mensagem no WhatsApp. Abra a conta do Everylang, envie uma mensagem para Olivia, e inicie uma conversa ou faça exercícios facilmente.',
  },
  {
    id: uuidv4(),
    heading: `É grátis?`,
    detail: 'Você pode testar gratuitamente. Se gostar, continue utilizando o serviço com um plano mensal ou anual.',
  },
  {
    id: uuidv4(),
    heading: `Quais idiomas posso estudar?`,
    detail: 'Você pode praticar conversação, pronúncia e gramática em inglês, espanhol, francês, alemão, coreano, mandarim e japonês.',
  },
  {
    id: uuidv4(),
    heading: `Serve para o meu nível?`,
    detail: 'O Everylang adapta-se ao seu nível, desde iniciantes até avançados. Pratique sem medo ou julgamento.',
  },
  {
    id: uuidv4(),
    heading: `Já estudo um idioma com um professor ou escola, posso usar o Everylang?`,
    detail: 'Claro! Mostre o Everylang ao seu professor para que ele possa criar exercícios personalizados, potencializando ainda mais suas aulas.',
  }
]

export default function FaqsList() {
  return (
    <div>
      {faqs.map((accordion) => (
        <Accordion key={accordion.id}>
          <AccordionSummary expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}>
            <Typography variant="subtitle1">{accordion.heading}</Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Typography>{accordion.detail}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
