/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/label-has-associated-control */
import * as React from 'react';
import { Icon } from '@iconify/react';
import { useRef, useState, useEffect } from 'react';
import trash from '@iconify/icons-eva/trash-2-outline';
import { Link as RouterLink } from 'react-router-dom';
import editFill from '@iconify/icons-eva/edit-fill';
import { useFormik, Form, FormikProvider } from 'formik';
import checkmark from '@iconify/icons-eva/checkmark-circle-outline';
import morehorizontalfill from '@iconify/icons-eva/more-horizontal-fill';
import { LoadingButton } from '@mui/lab';
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
  Modal,
  Typography,
  Box,
  Select,
  Stack
} from '@mui/material';
import axios from '../../../functions/Axios';

// material
import { getAllState } from '../../../functions/Component';

// ----------------------------------------------------------------------

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4
};

export default function PostMoreMenu(Post) {
  const { PostID, StateID, Slug } = Post.Post;
  const ref = useRef(null);
  const [state, setState] = useState([]);
  const [state2, setState2] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  // const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleDelete = () => {
    if (confirm('Are you sure you want to delete')) {
      axios.delete(`Article/DeletePost?PostID=${PostID}`).then((res) => {
        if (res.data.Status === 'Deleted') {
          alert('Post deleted successfully');
          window.location.reload();
        } else {
          alert('Post not deleted');
        }
      });
    }
  };
  const handleOpen = () => {
    setOpen(true);
    formik.setFieldValue('StateID', StateID);
    formik.setFieldValue('PostID', PostID);
  };
  const handleChangeState = (e) => {
    formik.setFieldValue('StateID', e.target.value);
    setState2(e.target.value);
  };
  useEffect(() => {
    getAllState().then((res) => {
      setState(res);
    });
  }, []);
  const formik = useFormik({
    initialValues: {
      PostID: '',
      StateID: ''
    },
    onSubmit: () => {
      axios.post('Article/EditStateOfPost', formik.values).then((res) => {
        if (res.data.Status === 'Updated') {
          alert('Edit State Successfully');
          window.location.href = '../';
        } else {
          alert('Edit State Failed');
        }
      });
    }
  });
  const { handleSubmit, getFieldProps } = formik;
  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Icon icon={morehorizontalfill} width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' }
        }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Box sx={style}>
                <Stack spacing={3}>
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                    Edit State
                  </Typography>
                  <Select
                    labelId="select-label"
                    label="State"
                    value={state2}
                    {...getFieldProps('StateID')}
                    variant="outlined"
                    onChange={handleChangeState}
                  >
                    {state.map((item) => (
                      <MenuItem key={item.StateID} value={item.StateID}>
                        {item.Name}
                      </MenuItem>
                    ))}
                  </Select>
                  <LoadingButton size="large" type="submit" variant="contained">
                    Edit State
                  </LoadingButton>
                </Stack>
              </Box>
            </Form>
          </FormikProvider>
        </Modal>
        <MenuItem onClick={handleOpen} sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Icon icon={checkmark} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Restore" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Icon icon={trash} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </>
  );
}
