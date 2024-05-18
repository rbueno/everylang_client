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
  Box
} from '@mui/material';
// components
import Label from '../../../../components/label';
import Iconify from '../../../../components/iconify';
import MenuPopover from '../../../../components/menu-popover';
import ConfirmDialog from '../../../../components/confirm-dialog';
import { fDate } from '../../../../utils/formatTime';
import translate from 'src/utils/translate';

import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

// ----------------------------------------------------------------------

UserTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  onSelectRow: PropTypes.func,
};

export default function UserTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow }) {
  const { fullName, phoneNumber, languageLevel, learningLanguage } = row;

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
    <>
      <TableRow hover selected={selected} onClick={() => {
            onEditRow()
          }}>
        <TableCell>
          <Box>
            <Typography variant="subtitle2" noWrap>
            {fullName}
            </Typography>

          <Button startIcon={<OpenInNewIcon />} variant='contained' size='small' onClick={() => onEditRow()}>Abrir</Button>
          </Box>
        </TableCell>

        
        <TableCell align="left">
          {/* <Label
            variant="soft"
            color='success'
          >
          </Label> */}
            <Button
            // color="green"
            size="small"
            variant="contained"
            startIcon={<WhatsAppIcon/>}
            target="_blank"
            rel="noopener"
            href={`https://wa.me/${phoneNumber}?text=oi`}
            sx={{ backgroundColor: '#128c7e' }}
          >
            {phoneNumber}
          </Button>
          
          </TableCell>
       
       
        {/* <TableCell align="left">
          <Label
            variant="soft"
            color='success'
          >
            
          </Label></TableCell> */}


          <TableCell align="left">

        <Label
            variant="outlined"
            // color='success'
            sx={{ color: '#7635dc'}}
          >
            {translate('languageLevel', languageLevel)}
          </Label>
         

         </TableCell>



          <TableCell align="left">
        
        <Label
            variant="outlined"
            // color='success'
            sx={{ color: '#7635dc'}}
          >
            {translate('learningLanguage', learningLanguage)}
          </Label>
        
            
         </TableCell>
        
{/*         
          <TableCell align="left">
        <Stack direction="row" alignItems="center" spacing={2}>
          <Button variant='contained' onClick={() => onEditRow()}>Abrir</Button>
            </Stack>
         </TableCell> */}

        {/* <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {format(new Date(createdAt), 'dd/MM/yy')}
        
        </TableCell> */}


        {/* <TableCell>{format(new Date(row.checkIn), 'dd MMM yyyy')}</TableCell> */}

        {/* <TableCell align="right">
          <IconButton color={openPopover ? 'inherit' : 'default'} onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell> */}
      </TableRow>

      {/* <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            onEditRow();
            handleClosePopover();
          }}
        >
          <Iconify icon="eva:edit-fill" />
          Abrir
        </MenuItem>
      </MenuPopover> */}
    </>
  );
}
