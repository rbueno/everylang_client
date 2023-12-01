import PropTypes from 'prop-types';
// @mui
import { Card, Typography, Box } from '@mui/material';

// ----------------------------------------------------------------------

BookingWidgetSummary.propTypes = {
  icon: PropTypes.node,
  sx: PropTypes.object,
  title: PropTypes.string,
  total: PropTypes.number,
};

export default function BookingWidgetSummary({ title, total, sx, ...other }) {
  return (
    <Card
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: 2,
        pl: 3,
        ...sx,
      }}
      {...other}
    >
      <div>
        <Typography variant="h3">{total}</Typography>

        <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
          {title}
        </Typography>
      </div>

     
    </Card>
  );
}
