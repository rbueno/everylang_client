import PropTypes from 'prop-types';
// @mui
import { Card, Stack, Typography, Divider, Alert, AlertTitle, Box } from '@mui/material';
// utils
import { fNumber } from '../../../../utils/formatNumber';
import { getMuiColorByStatus } from '../../../../utils/getMuiColorByStatus';

// ----------------------------------------------------------------------

ProfileFollowInfo.propTypes = {
  profile: PropTypes.shape({
    follower: PropTypes.number,
    following: PropTypes.number
  }),
  customerDetail: PropTypes.shape({
    status: PropTypes.string,
    dealStatus: PropTypes.string
  })
};

export default function ProfileFollowInfo({ customerDetail }) {

  return (
    <Card sx={{ py: 3 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignContent: 'center', alignItems: 'center' }}  spacing={2}>
      <Alert icon={false} severity={getMuiColorByStatus(customerDetail?.dealStatus || 'info')} sx={{ width: '90%', mb: 2 }}>
        <AlertTitle>Deal stage</AlertTitle>
        <strong>{customerDetail?.dealStatus}</strong>
      </Alert>
      <Alert icon={false} severity='info' sx={{ width: '90%' }}>
        <AlertTitle>Deal status</AlertTitle>
        <strong>{customerDetail?.status}</strong>
      </Alert>
    </Box>
    </Card>
  );
}
