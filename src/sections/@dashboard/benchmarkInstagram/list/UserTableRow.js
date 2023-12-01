import PropTypes from 'prop-types';
import { useState } from 'react';
import { format } from 'date-fns'
// @mui
import {
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  MenuItem,
  TableCell,
  IconButton,
  Typography,
} from '@mui/material';
// components
import Label from '../../../../components/label';
import Iconify from '../../../../components/iconify';
import MenuPopover from '../../../../components/menu-popover';
import ConfirmDialog from '../../../../components/confirm-dialog';
import { fDate } from '../../../../utils/formatTime';

// ----------------------------------------------------------------------

UserTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onSelectRow: PropTypes.func,
  onAnalyticRow: PropTypes.func,
};

export default function UserTableRow({ row, selected, onSelectRow, onAnalyticRow }) {
  const { score, rank, benchmarkProfileId, profile } = row;
  console.log('row', row)

  const [openConfirm, setOpenConfirm] = useState(false);

  const [openPopover, setOpenPopover] = useState(null);

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  return (
      <TableRow hover selected={selected}>
            
        <TableCell align="left">
          <Label
            variant="soft"
            color='success'
          >
            {rank}
          </Label>
        </TableCell>

        <TableCell>
          <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar alt='avatar' src={profile.avatarUrl} />
            <Stack>
            <Typography variant="subtitle2" noWrap>
            {profile.name}
            </Typography>
            <Typography variant="subtitle2" noWrap>
            {`@${profile.username}`}
            </Typography>
            </Stack>
          </Stack>
        </TableCell>

        <TableCell align="left">
          <Label
            variant="soft"
            color='success'
          >
            {score}
          </Label>
        </TableCell>

        <TableCell>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Button onClick={() => onAnalyticRow()}>Analisar</Button>
          </Stack>
        </TableCell>

      </TableRow>
   
  );
}
