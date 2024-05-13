// next
import Head from 'next/head';
// @mui
import { Box, Container } from '@mui/material';
// layouts
import MainLayout from '../layouts/main';
// sections
import { AboutHero, AboutWhat, AboutTeam, AboutVision, AboutTestimonials, ContactForm } from '../sections/fonoaudiologo';

import {
  HomeBannerSchool,
  TextLeft,
  TextRight,
} from '../sections/home';




const homeContent = [
  { 
    textPosition: 'left',
    headText: 'Crie Exercícios de Pronúncia Personalizados',
    bodyText: 'Explicar a pronúncia correta em sala de aula não garante que o aluno consiga praticar posteriormente. Com a Everylang, você cria exercícios de pronúncia personalizados com base nas palavras que o aluno tem mais dificuldade. Ao receber os exercícios, o aluno poderá praticar em seu rítmo após as aulas. Tanto o aluno quanto o professor, recebem um feedback detalhado da pronúncia.',
    imageURL: '/assets/images/school/everylang_school_pronunciation.png'
  },
  { 
    textPosition: 'right',
    headText: 'Crie Exercícios de Gramática Personalizados',
    bodyText: 'Edutar gramática pode ser uma tarefa desafiadora para boa parte dos alunos. Com a Everylang, essa tarefa é incorporado em algo que ele já faz todos os dias, conversar no WhatsApp. Assim, ele irá realizar exercícios personalizados para a suas próprias dificuldades, recebendo feedback a cada exercício.',
    imageURL: '/assets/images/school/everylang_school_grammar.png'
  },
  { 
    textPosition: 'left',
    headText: 'Desempenho dos alunos',
    bodyText: 'Através de uma dashboard completa, você consegue acompanhar as atividades e o engajamento dos alunos. Confira atividades diárias, totais de atividades, lições em andamento e outras informações que com relatório do desempenho geral ou individual dos alunos.',
    imageURL: '/assets/images/school/everylang_students_performance.png'
  },
  { 
    textPosition: 'right',
    headText: 'Insights valiosos para planejar a sua aula',
    bodyText: 'O Everylang fornece dados detalhados sobre o desempenho e as necessidades específicas de cada aluno. Você pode acompanhar suas áreas de dificuldade em gramática e pronúncia, permitindo identificar padrões de aprendizado e pontos que precisam de reforço. A IA também ajuda a criar exercícios personalizados, adaptados ao nível de cada aluno, tornando seu planejamento mais estratégico e alinhado ao progresso dos estudantes.',
    imageURL: '/assets/images/school/everylang_insight.png'
  },
]


// ----------------------------------------------------------------------

AboutPage.getLayout = (page) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>Everylang | professores e escola</title>
      </Head>

      <HomeBannerSchool />

      {/* <AboutWhat /> */}

      {/* <AboutVision /> */}

      {/* <Divider orientation="vertical" sx={{ my: 10, mx: 'auto', width: 2, height: 40 }} /> */}

      <AboutTeam />
      <Box marginTop={6}>
      {
          homeContent.map((item) => (<Box key={item.id}>
            {item.textPosition === 'left' ? <TextLeft content={item} /> : <TextRight content={item} />}
          </Box>))
        }
      </Box>
      <Box mb={4}>
      <Container sx={{ textAlign: 'center' }}>
<ContactForm />

</Container>
      </Box>

      {/* <AboutTestimonials /> */}
    </>
  );
}
