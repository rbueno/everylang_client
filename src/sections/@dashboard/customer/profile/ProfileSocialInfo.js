import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Card, CardHeader, Stack, Typography, Box } from '@mui/material';
// components
import Iconify from '../../../../components/Iconify';

// ----------------------------------------------------------------------

const IconStyle = styled(Iconify)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2),
}));

// ----------------------------------------------------------------------

ProfileSocialInfo.propTypes = {
  profile: PropTypes.object,
  customerDetail: PropTypes.object
};

export default function ProfileSocialInfo({ profile, customerDetail }) {
  const { facebookLink, instagramLink, linkedinLink, twitterLink } = profile;
  console.log('get products detail ', customerDetail)

  const SOCIALS = [
    {
      name: 'Linkedin',
      icon: <IconStyle icon={'eva:linkedin-fill'} color="#006097" />,
      href: linkedinLink,
    },
    {
      name: 'Twitter',
      icon: <IconStyle icon={'eva:twitter-fill'} color="#1C9CEA" />,
      href: twitterLink,
    },
    {
      name: 'Instagram',
      icon: <IconStyle icon={'ant-design:instagram-filled'} color="#D7336D" />,
      href: instagramLink,
    },
    {
      name: 'Facebook',
      icon: <IconStyle icon={'eva:facebook-fill'} color="#1877F2" />,
      href: facebookLink,
    },
  ];

  return (
    <Card>
      <CardHeader title="Compra" />
      <Stack spacing={2} sx={{ p: 3 }}>
      <Typography variant="body2">Resumo sobre a compra:</Typography>
        {/* {SOCIALS.map((link) => (
          <Stack key={link.name} direction="row" alignItems="center">
            {link.icon}
            <Link component="span" variant="body2" color="text.primary" noWrap>
              {link.href}
            </Link>
          </Stack>
        ))} */}
        {customerDetail?.productsResume?.map((product) => (
          <Stack key={product.name} direction="column" >
            {product.name && <Box sx={{ display: 'flex', flexDirection: 'column', mb: 2 }}>
              <Typography strong variant="body2"><strong>Nome:</strong></Typography>
              <Typography variant="body2">{product.name}</Typography>
            </Box>}
            {product.price && <Box sx={{ display: 'flex', flexDirection: 'column', mb: 2 }}>
              <Typography variant='body2'><strong>Preço:</strong> </Typography>
              <Typography variant="body2">R$ {(Number(product.price) / 100).toFixed(2).replace('.', ',')}</Typography>
            </Box>}
            {product.detail && <Box sx={{ display: 'flex', flexDirection: 'column', mb: 2 }}>
              <Typography variant="body2"><strong>Detalhe:</strong> </Typography>
              <Typography variant="body2">{product.detail}</Typography>
            </Box>}
          </Stack>
        ))}

        {
          !customerDetail?.productsResume || !customerDetail?.productsResume.length && <Stack direction="column">
          <Box sx={{ display: 'flex', flexDirection: 'column', mb: 2 }}>
            <Typography strong variant="body2"><strong>Nome:</strong></Typography>
            <Typography variant="body2">Não informado</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', mb: 2 }}>
            <Typography variant='body2'><strong>Preço:</strong> </Typography>
            <Typography variant="body2">Não informado</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', mb: 2 }}>
            <Typography variant="body2"><strong>Detalhe:</strong> </Typography>
            <Typography variant="body2">Não informado</Typography>
          </Box>
        </Stack>
        }
       
      </Stack>
    </Card>
  );
}
