import PropTypes from 'prop-types';
// @mui
import { alpha, useTheme } from '@mui/material/styles';
import { Card, Typography, Box, IconButton } from '@mui/material';
// utils
import { bgGradient } from '../../../../utils/cssStyles';
import { fShortenNumber } from '../../../../utils/formatNumber';
// components
import Iconify from '../../../../components/iconify';

// ----------------------------------------------------------------------

HomeOptions.propTypes = {
  sx: PropTypes.object,
  icon: PropTypes.object,
  color: PropTypes.string,
  title: PropTypes.string,
  total: PropTypes.number,
};

export default function HomeOptions({
  title,
  total,
  icon,
  color = 'primary',
  sx,
  ...other
}) {
  const theme = useTheme();

  return (
    <Card
      sx={{
        py: other.py || 5,
        boxShadow: 0,
        textAlign: 'center',
        color: theme.palette[color].darker,
        bgcolor: theme.palette[color].lighter,
        ...sx,
      }}
      {...other}
    >
      {
        icon && <>
        <Box mb={2}>
      <IconButton
      sx={{
        // mb: 3,
        // p: 2.5,
        // width: 64,
        // height: 64,
        // borderRadius: '50%',
        color: theme.palette[color].dark,
        ...bgGradient({
          direction: '135deg',
          startColor: `${alpha(theme.palette[color].dark, 0)} 0%`,
          endColor: `${alpha(theme.palette[color].dark, 0.24)} 100%`,
        }),
      }}
      >{icon}
      </IconButton>
      </Box>
        </>
      }
      

      <Typography variant="h3">{fShortenNumber(total)}</Typography>

      <Typography variant="subtitle2" sx={{ opacity: 0.64 }}>
        {title}
      </Typography>
    </Card>
  );
}
