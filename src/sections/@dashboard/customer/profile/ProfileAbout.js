import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Card, Typography, CardHeader, Stack, Box } from '@mui/material';
// components
import Iconify from '../../../../components/Iconify';
import BadgeIcon from '@mui/icons-material/Badge';
import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

// ----------------------------------------------------------------------

const IconStyle = styled(Iconify)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2),
}));

// ----------------------------------------------------------------------

ProfileAbout.propTypes = {
  profile: PropTypes.object,
  customerDetail: PropTypes.object
};

export default function ProfileAbout({ profile, customerDetail }) {
  const { quote, country, email, role, company, school } = profile;

  return (
    <Card>
      {/* <CardHeader title="Sobre" /> */}
      <Stack spacing={2} sx={{ p: 3 }}>
      <Typography variant='h6'>{customerDetail?.name || 'Nome não informado'}</Typography>
        {/* <Typography variant="body2">Resumo sobre o contato:</Typography> */}

        {/* <Stack direction="row">
          <BadgeIcon sx={{ mr: 1}}/>
          <Typography variant='body2'>{customerDetail?.name || 'Não informado'}</Typography>
        </Stack> */}

        <Stack direction="row">
          <EmailIcon sx={{ mr: 1}}/>
          <Typography variant='body2'>{customerDetail?.email || 'Não informado'}</Typography>
        </Stack>

        <Stack direction="row">
          <WhatsAppIcon sx={{ mr: 1}}/>
          <Typography variant='body2'>{customerDetail?.mobilePhone || 'Não informado'}</Typography>
        </Stack>

       
      </Stack>
    </Card>
  );
}
