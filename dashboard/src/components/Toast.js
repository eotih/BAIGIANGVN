import closeFill from '@iconify/icons-eva/close-fill';
import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import { Icon } from '@iconify/react';
import MuiAlert from '@mui/material/Alert';

export default function Toast({ open, handleCloseToast }) {
  const { vertical, horizontal, isOpen, message, color } = open;
  const Alert = React.forwardRef((props, ref) => (
    <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
  ));
  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical,
          horizontal
        }}
        open={isOpen}
        autoHideDuration={1000}
        onClose={handleCloseToast}
        action={
          <IconButton size="small" onClick={handleCloseToast}>
            <Icon icon={closeFill} />
          </IconButton>
        }
      >
        <Alert onClose={handleCloseToast} severity={color} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}
