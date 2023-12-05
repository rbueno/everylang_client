// next
import Head from 'next/head';
// @mui
import { Container, Typography } from '@mui/material';
// layouts
import MainLayout from '../layouts/main';

// sections
import { AboutHero, AboutWhat, AboutTeam, AboutVision, AboutTestimonials } from '../sections/about';

// ----------------------------------------------------------------------

AboutPage.getLayout = (page) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function AboutPage() {
  return (
    <>
      <Head>
        <title> Termos de uso e Política de Privacidade | Everylang</title>
      </Head>

      <Container>
      <Typography variant="h2" sx={{ mb: 3 }}>
      Termos de Uso e Política de Privacidade do Pulse
              </Typography>
            

<Typography>Bem-vindo(a) ao Pulse, inteligência artificial do Everylang. Leia atentamente estes termos de uso e política de privacidade antes de usar o Pulse da Everylang.</Typography>
            
              <h2>1. Aceitação dos Termos de Uso e Política de Privacidade</h2>
<Typography>Ao usar o Pulse, você concorda em cumprir e estar sujeito a estes termos de uso e política de privacidade, bem como às leis e regulamentos aplicáveis. Se você não concorda com estes termos, não use o Pulse.</Typography>

<h2>2. Uso do Pulse</h2>
<Typography>O Pulse é fornecido gratuitamente e permite que os usuários interajam com um chatbot. Ao usar o Pulse, você concorda em não usá-lo de maneira que possa danificar, desabilitar, sobrecarregar ou prejudicar a plataforma.</Typography>

<h2>3. Propriedade Intelectual</h2>
<Typography>Todos os direitos autorais, marcas comerciais, patentes e outros direitos de propriedade intelectual relacionados ao Pulse pertencem exclusivamente à empresa proprietária do aplicativo. O usuário não tem permissão para reproduzir, distribuir ou criar trabalhos derivados do Pulse sem autorização prévia por escrito.</Typography>

<h2>4. Isenção de Responsabilidade</h2>
<Typography>O Pulse é fornecido como está, sem garantia de qualquer tipo, expressa ou implícita. A empresa proprietária do Pulse não garante que o aplicativo atenderá às suas necessidades ou que será ininterrupto, seguro ou livre de erros.</Typography>

<h2>5. Limitação de Responsabilidade</h2>
<Typography>Em nenhuma circunstância, a empresa proprietária do Pulse será responsável por danos diretos, indiretos, punitivos, incidentais, especiais ou consequenciais decorrentes ou relacionados ao uso ou incapacidade de uso do Pulse.</Typography>

<h2>6. Alterações nos Termos de Uso e Política de Privacidade</h2>
<Typography>A empresa proprietária do Pulse pode atualizar estes termos de uso e política de privacidade periodicamente para refletir mudanças em nossas práticas de coleta, uso e compartilhamento de informações. Ao continuar a usar o Pulse após a publicação das alterações, você concorda em cumprir os termos atualizados.</Typography>

<h2>7. Contato</h2>
<Typography>Se você tiver alguma dúvida sobre estes termos de uso e política de privacidade, entre em contato conosco pelo e-mail contato@everylang.co.</Typography>

<h2>8. Lei Aplicável</h2>
<Typography>Estes termos de uso e política de privacidade serão regidos e interpretados de acordo com as leis brasileiras.</Typography>

<Typography>Ao utilizar o Pulse, você declara ter lido e compreendido estes termos </Typography>

      </Container>
      
              
            

      {/* <AboutVision />

      <Divider orientation="vertical" sx={{ my: 10, mx: 'auto', width: 2, height: 40 }} />

      <AboutTeam />

      <AboutTestimonials /> */}
    </>
  );
}
