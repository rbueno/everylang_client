import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import PropTypes from 'prop-types';

import IosShareIcon from '@mui/icons-material/IosShare';

import { MyPage } from '../../../myPage'

// eslint-disable-next-line prefer-arrow-callback
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

PreviewDialog.propTypes = {
    page: PropTypes.object,
    open: PropTypes.bool,
    onClose: PropTypes.func,
    handleOpenShareOptions: PropTypes.func
  };
  
export default function PreviewDialog({ page, open, onClose, handleOpenShareOptions }) {
  // const [open, setOpen] = React.useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    onClose(false);
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Visualização
            </Typography>
            <Button startIcon={<IosShareIcon />} variant='outlined' color="inherit" onClick={(e) => handleOpenShareOptions(e)}>
              Compartilhar
            </Button>
          </Toolbar>
        </AppBar>
        <Box>
            <MyPage business={page} />
        </Box>
      </Dialog>
    </div>
  );
}