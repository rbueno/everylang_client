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
      Termos de Uso e Política de Privacidade do Everylang
              </Typography>
            </Container>

<Container>
      <Typography variant="h2" sx={{ mb: 3 }}>
      Termos de Uso
              </Typography>
<Typography>Bem-vindo ao Everylang, uma plataforma inovadora que integra o ChatGPT ao WhatsApp para proporcionar uma experiência de interação única. Ao acessar e usar o Everylang, você concorda em ficar vinculado por estes Termos de Uso. Por favor, leia-os cuidadosamente.</Typography>
            
              <h2>1. Conformidade com as Regras</h2>
<Typography>Como usuário da Everylang, você deve utilizar o serviço de acordo com todos os termos de serviço, diretrizes e políticas aplicáveis do WhatsApp, assim como as regras e regulamentos do ChatGPT. Isso inclui evitar o envio de spam, a disseminação de conteúdos mal-intencionados e qualquer outra prática que possa ser considerada abusiva ou ilegal.</Typography>

<h2>2. Acesso ao Serviço</h2>
<Typography>Para acessar o serviço da Everylang, você deve possuir uma conta válida no WhatsApp e seguir as instruções fornecidas pela Everylang para conectar-se ao ChatGPT através desta plataforma.</Typography>

<h2>3. Comportamento do Usuário</h2>
<Typography>Você é inteiramente responsável por todas as suas comunicações e interações através da Everylang. Deve respeitar as leis aplicáveis e os direitos de terceiros ao usar este serviço.</Typography>

<h2>4. Restrições de Uso</h2>
<Typography>{`Não é permitido utilizar a Everylang para:\n\n
   - Realizar atividades ilegais;\n
   - Infringir direitos de propriedade intelectual;\n
   - Transmitir conteúdo difamatório, ofensivo ou discriminatório;\n
   - Carregar ou transmitir vírus ou outros códigos maliciosos;\n
   - Tentar interferir nos sistemas de rede conectados a Everylang.`}</Typography>

<h2>Limitação de Responsabilidade</h2>
<Typography>{`- A Everylang não se responsabiliza pelo conteúdo das interações realizadas entre o usuário e o ChatGPT através do WhatsApp.\n
- A Everylang não monitora as comunicações e não tem controle sobre as ações dos usuários. Consequentemente, não será responsabilizada por qualquer uso indevido do serviço.\n
- A Everylang não é responsável por qualquer dano direto, indireto, incidental, consequencial ou punitivo que possa ocorrer devido ao uso do serviço.
`}</Typography>

<h2>Alterações nos Termos de Uso</h2>
<Typography>A Everylang reserva-se o direito de alterar estes Termos de Uso a qualquer momento. As mudanças serão efetivas imediatamente após a publicação dos Termos revisados na plataforma. O seu uso contínuo do serviço após quaisquer alterações constitui aceitação dos novos Termos.</Typography>
</Container>

<Container>
      <Typography variant="h2" sx={{ mb: 3 }}>
      Política de Privacidade
              </Typography>
            

<Typography>Esta Política de Privacidade está destinada a informar os usuários da plataforma Everylang ("Plataforma"), um serviço que integra o ChatGPT ao WhatsApp, sobre a coleta, uso, proteção e direitos referentes a seus dados pessoais. Ao utilizar a Everylang, o usuário concorda com a coleta e uso de informações de acordo com esta Política.</Typography>
            
              <h2>1. Conformidade com regras do ChatGPT e WhatsApp</h2>
<Typography>A Everylang opera em conformidade com as regras e políticas de privacidade do ChatGPT e do WhatsApp. Para garantir a proteção de dados na interação com esses serviços, todos os usuários devem revisar e aderir às respectivas políticas de privacidade fornecidas por essas plataformas.</Typography>

<h2>2. Coleta de Dados</h2>
<Typography>A Everylang coleta informações submetidas pelo usuário, incluindo, mas não se limitando a, mensagens trocadas através do WhatsApp com o ChatGPT. Esta coleta é essencial para fornecer a aplicação de serviço encontrada na Plataforma Everylang.</Typography>

<h2>3. Uso de Dados</h2>
<Typography>Os dados coletados são utilizados exclusivamente para permitir que a funcionalidade de comunicação com o ChatGPT via WhatsApp seja realizada. Além disso, informações não identificáveis podem ser usadas para análise de desempenho, melhorias na plataforma e para cumprir com obrigações legais.</Typography>

<h2>4. Compartilhamento de Dados</h2>
<Typography>A Everylang não compartilha dados pessoais com terceiros, exceto conforme necessário para prover o serviço integrado com o ChatGPT ou conforme exigido por lei. Isso inclui a passagem das suas mensagens ao WhatsApp e ao ChatGPT para que a comunicação seja possível.</Typography>

<h2>5. Responsabilidade do Usuário</h2>
<Typography>Cabe ao usuário garantir que o uso do serviço da Everylang esteja em conformidade com todas as regras e leis aplicáveis. A Everylang não se responsabiliza por qualquer uso impróprio ou ilegal da Plataforma por parte dos usuários.</Typography>

<h2>6. Segurança de Dados</h2>
<Typography>A Everylang implementa medidas técnicas e organizacionais para proteger os dados dos usuários contra acesso não autorizado, alteração, divulgação ou destruição. Ainda assim, nenhum método de transmissão pela internet ou de armazenamento eletrônico é 100% seguro.</Typography>

<h2>7. Acesso e Controle dos Dados Pessoais</h2>
<Typography>Os usuários podem exercer seus direitos de acessar, corrigir, excluir ou restringir o uso de seus dados pessoais conforme as leis aplicáveis. Para maiores informações, contate a equipe da Everylang através dos meios disponibilizados pela plataforma.</Typography>

<h2>8. Alterações na Política de Privacidade:</h2>
<Typography>A Everylang reserva-se o direito de alterar esta Política de Privacidade a qualquer momento. Recomendamos que os usuários revisitem esta Política periodicamente para se manterem informados sobre qualquer mudança.</Typography>

</Container>

<Container>
<h2>Lei Aplicável</h2>
<Typography>Estes termos de uso e política de privacidade serão regidos e interpretados de acordo com as leis brasileiras.</Typography>

<Typography>Ao utilizar o Everylang, você declara ter lido e compreendido estes termos de uso e política de privacidade</Typography>
</Container>

      
      
              
            

      {/* <AboutVision />

      <Divider orientation="vertical" sx={{ my: 10, mx: 'auto', width: 2, height: 40 }} />

      <AboutTeam />

      <AboutTestimonials /> */}
    </>
  );
}
