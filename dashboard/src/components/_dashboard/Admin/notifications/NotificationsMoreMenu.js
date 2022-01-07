/* eslint-disable no-restricted-globals */
import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
import {
  Stack,
  Typography,
  OutlinedInput,
  Modal,
  FormControl,
  IconButton,
  TextField,
  Select,
  InputLabel,
  Box,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import PropTypes from 'prop-types';
import { useFormik, Form, FormikProvider } from 'formik';
import editFill from '@iconify/icons-eva/edit-fill';
import { Link as RouterLink } from 'react-router-dom';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
// material
// ----------------------------------------------------------------------
NotificationsMoreMenu.propTypes = {
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  error: PropTypes.string,
  STATUS_LIST: PropTypes.array.isRequired,
  TYPE_LIST: PropTypes.array.isRequired,
  MenuProps: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired
};
export default function NotificationsMoreMenu({
  data,
  onDelete,
  onEdit,
  STATUS_LIST,
  MenuProps,
  TYPE_LIST,
  dispatch
}) {
  const { _id, type, status, description, isActive } = data;
  const [type2, setType2] = useState('');
  const [status2, setStatus2] = useState('');
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const handleChangeType = (event) => {
    setType2(event.target.value);
    formik.setFieldValue('type', event.target.value);
  };
  const handleChangeStatus = (event) => {
    setStatus2(event.target.value);
    formik.setFieldValue('status', event.target.value);
  };
  const handleOpen = () => {
    setOpen(true);
    // set value for formik with data
    formik.setFieldValue('description', description);
    formik.setFieldValue('type', type);
    formik.setFieldValue('status', status);
    formik.setFieldValue('isActive', isActive);
    formik.setFieldValue('_id', _id);
    setStatus2(status);
    setType2(type);
  };
  const handleClose = () => setOpen(false);
  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this user?')) {
      await onDelete(dispatch, id);
    }
  };

  const formik = useFormik({
    initialValues: {
      _id: '',
      type: '',
      isActive: '',
      status: '',
      description: ''
    },
    onSubmit: async () => {
      await onEdit(dispatch, formik.values);
    }
  });
  const { handleSubmit, isSubmitting, getFieldProps } = formik;

  const style = {
    position: 'relative',
    borderRadius: '10px',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4
  };
  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Icon icon={moreVerticalFill} width={20} height={20} />
      </IconButton>
      <Modal
        open={open}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Box sx={style}>
              <Stack spacing={2}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Edit Notifications
                </Typography>
                <TextField fullWidth label="Description" {...getFieldProps('description')} />
                <FormControl>
                  <InputLabel id="Field-label">Status</InputLabel>
                  <Select
                    sx={{ bgcolor: '#ffffff', borderRadius: 1 }}
                    labelId="Field-label"
                    id="status"
                    {...getFieldProps('status')}
                    value={status2}
                    onChange={handleChangeStatus}
                    input={<OutlinedInput label="Status" />}
                    MenuProps={MenuProps}
                  >
                    {STATUS_LIST.map((name) => (
                      <MenuItem key={name._id} value={name.status}>
                        <ListItemText primary={name.status} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl>
                  <InputLabel id="Field-label">Thể loại</InputLabel>
                  <Select
                    sx={{ bgcolor: '#ffffff', borderRadius: 1 }}
                    labelId="Field-label"
                    id="type"
                    {...getFieldProps('type')}
                    value={type2}
                    onChange={handleChangeType}
                    input={<OutlinedInput label="Thể loại" />}
                    MenuProps={MenuProps}
                  >
                    {TYPE_LIST.map((name) => (
                      <MenuItem key={name._id} value={name.type}>
                        <ListItemText primary={name.type} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <LoadingButton
                  loading={isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Edit Notifications
                </LoadingButton>
              </Stack>
            </Box>
          </Form>
        </FormikProvider>
      </Modal>
      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={() => handleDelete(_id)} sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Icon icon={trash2Outline} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem
          onClick={handleOpen}
          component={RouterLink}
          to="#"
          sx={{ color: 'text.secondary' }}
        >
          <ListItemIcon>
            <Icon icon={editFill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Edit" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </>
  );
}
