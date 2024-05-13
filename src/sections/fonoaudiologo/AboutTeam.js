import PropTypes from 'prop-types';
import { m } from 'framer-motion';
import { useRef } from 'react';
// @mui
import { useTheme, alpha } from '@mui/material/styles';
import { Box, Stack, Card, Button, Container, Typography, IconButton } from '@mui/material';
// _mock_
import { _carouselsMembers, _socials } from '../../_mock/arrays';
// components
import Image from '../../components/image';
import Iconify from '../../components/iconify';
import Carousel, { CarouselArrows } from '../../components/carousel';
import { MotionViewport, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

export default function AboutTeam() {
  const carouselRef = useRef(null);

  const theme = useTheme();

  const carouselSettings = {
    infinite: false,
    arrows: false,
    slidesToShow: 4,
    rtl: Boolean(theme.direction === 'rtl'),
    responsive: [
      {
        breakpoint: 1279,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 959,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  const handlePrev = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };

  return (
   <Box>
     <Container component={MotionViewport} sx={{ textAlign: 'center' }}>

<m.div variants={varFade().inUp}>
        <Typography variant="h3" >
          Grátis
        </Typography>
      </m.div>


<m.div variants={varFade().inUp}>
        <Typography
          sx={{
            mx: 'auto',
            maxWidth: 640,
            color: 'text.secondary',
          }}
        >
          O Everylang é grátis para professores e escolas. Os alunos precisam ter uma assinatura para utilizar.
        </Typography>
      </m.div>
      <Box marginTop={2}>
      <m.div variants={varFade().inUp}>
        <Typography variant="h3" >
        O que é o Everylang?
        </Typography>
      </m.div>
      </Box>
      
      <m.div variants={varFade().inUp}>
        <Typography
          sx={{
            mx: 'auto',
            maxWidth: 640,
            color: 'text.secondary',
          }}
        >
          O Everylang disponibiliza ferramentas com inteligência artificial para que o professor possa criar exercícios de pronúncia e gramática e permitir que seus alunos estudem fazendo o que eles já fazem todos os dias: usar o WhatsApp. Assim, incorporando o estudo em uma rotina que o aluno já tem.
        </Typography>
      </m.div>     
      <m.div variants={varFade().inUp}>
        <Typography variant="h2" sx={{ my: 3 }}>
        Confira os benefícios
        </Typography>
      </m.div>
    </Container>
    {/* <Container component={MotionViewport} sx={{ pb: 10 }}>
    <Box mt={6}>
    <Typography
    variant='h4'
          sx={{
            mx: 'auto',
            maxWidth: 640,
            // color: 'text.secondary',
          }}
        >
          Crie Exercícios de Pronúncia Personalizados
        </Typography>
    <Typography
          sx={{
            mx: 'auto',
            maxWidth: 640,
            color: 'text.secondary',
          }}
        >
          Explicar a pronúncia correta em sala de aula não garante que o aluno consiga praticar posteriormente. Com a Everylang, você cria exercícios de pronúncia personalizados com base nas palavras que o aluno tem mais dificuldade. Ao receber os exercícios, o aluno poderá praticar em seu rítmo após as aulas. Tanto o aluno quanto o professor, recebem um feedback detalhado da pronúncia.
        </Typography>
    </Box>
    <Box mt={6}>
    <Typography
    variant='h4'
          sx={{
            mx: 'auto',
            maxWidth: 640,
            // color: 'text.secondary',
          }}
        >
          Crie Exercícios de Gramática Personalizados
        </Typography>
    <Typography
          sx={{
            mx: 'auto',
            maxWidth: 640,
            color: 'text.secondary',
          }}
        >
          Crie exercícios personalizados de gramática adaptados aos pontos fracos de cada aluno. Nossa IA identifica as regras gramaticais que eles têm mais dificuldade, seja o uso correto dos tempos verbais, a concordância ou as preposições. Ao realizar esses exercícios, os alunos recebem explicações detalhadas e feedback imediato, corrigindo seus erros em tempo real e reforçando o aprendizado. Isso permite que eles pratiquem fora das aulas, melhorando a precisão e a confiança na comunicação, enquanto você obtém insights valiosos sobre suas necessidades para planejar aulas mais eficazes.
        </Typography>
    </Box>
    <Box mt={6}>
    <Typography
    variant='h4'
          sx={{
            mx: 'auto',
            maxWidth: 640,
            // color: 'text.secondary',
          }}
        >
          Desempenho dos alunos
        </Typography>
    <Typography
          sx={{
            mx: 'auto',
            maxWidth: 640,
            color: 'text.secondary',
          }}
        >
          Acompanhe a atividade e o engajamento dos alunos através de uma dashboard completa, obtendo insights valiosos para melhorar suas aulas.
        </Typography>
    </Box>
    <Box mt={6}>
    <Typography
    variant='h4'
          sx={{
            mx: 'auto',
            maxWidth: 640,
            // color: 'text.secondary',
          }}
        >
          Insights valiosos para planejar a sua aula
        </Typography>
    <Typography
          sx={{
            mx: 'auto',
            maxWidth: 640,
            color: 'text.secondary',
          }}
        >
           O Everylang fornece dados detalhados sobre o desempenho e as necessidades específicas de cada aluno. Você pode acompanhar suas áreas de dificuldade em gramática e pronúncia, permitindo identificar padrões de aprendizado e pontos que precisam de reforço. A IA também ajuda a criar exercícios personalizados, adaptados ao nível de cada aluno, tornando seu planejamento mais estratégico e alinhado ao progresso dos estudantes.
        </Typography>
    </Box>
    
    </Container> */}
   </Box>
  );
}

// ----------------------------------------------------------------------

MemberCard.propTypes = {
  member: PropTypes.shape({
    avatar: PropTypes.string,
    name: PropTypes.string,
    role: PropTypes.string,
  }),
};

function MemberCard({ member }) {
  const { name, role, avatar } = member;

  return (
    <Card key={name}>
      <Typography variant="subtitle1" sx={{ mt: 2, mb: 0.5 }}>
        {name}
      </Typography>

      <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
        {role}
      </Typography>

      <Box sx={{ px: 1 }}>
        <Image alt={name} src={avatar} ratio="1/1" sx={{ borderRadius: 2 }} />
      </Box>

      <Stack direction="row" alignItems="center" justifyContent="center" sx={{ p: 2 }}>
        {_socials.map((social) => (
          <IconButton
            key={social.name}
            sx={{
              color: social.color,
              '&:hover': {
                bgcolor: alpha(social.color, 0.08),
              },
            }}
          >
            <Iconify icon={social.icon} />
          </IconButton>
        ))}
      </Stack>
    </Card>
  );
}
