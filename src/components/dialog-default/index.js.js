import PropTypes from 'prop-types';
// @mui
import { Dialog, Button, DialogTitle, DialogActions, DialogContent } from '@mui/material';

// ----------------------------------------------------------------------

DialogDefault.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.node,
  action: PropTypes.node,
  content: PropTypes.node,
  onClose: PropTypes.func,
  onCloseTitle: PropTypes.string,
};

export default function DialogDefault({ title, action, content, open, onClose, onCloseTitle = 'Cancelar', ...other }) {
  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose} {...other}>
      <DialogTitle sx={{ pb: 2 }}>{title}</DialogTitle>

      <DialogContent> 
        {content}
      </DialogContent>

      <DialogActions>
        {action}

        <Button variant="outlined" color="inherit" onClick={onClose}>
          {onCloseTitle}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
