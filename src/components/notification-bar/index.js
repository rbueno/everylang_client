import { useState } from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function NotificationBar({ notificationBarConfig, handleCloseNotificationBar }) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    handleCloseNotificationBar(null);
  };

  console.log('notificationBarConfig', notificationBarConfig)
  console.log('!!notificationBarConfig?.text', !!notificationBarConfig?.text)

  return (
    <div>
      <Snackbar 
        open={!!notificationBarConfig?.text}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: notificationBarConfig?.vertical || 'top', horizontal: notificationBarConfig?.horizontal || 'right' }}
      >
        <Alert
          onClose={handleClose}
          severity={notificationBarConfig?.severity || 'success'}
          variant={notificationBarConfig?.variant || 'filled' }
          sx={{ width: notificationBarConfig?.width || '100%' }}
        >
          {notificationBarConfig?.text}
        </Alert>
      </Snackbar>
    </div>
  );
}
