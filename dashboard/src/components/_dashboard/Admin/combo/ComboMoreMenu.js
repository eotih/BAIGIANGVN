/* eslint-disable no-restricted-globals */
import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
import {
  Stack,
  Typography,
  Modal,
  IconButton,
  TextField,
  Autocomplete,
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
ComboMoreMenu.propTypes = {
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  error: PropTypes.string,
  styleModal: PropTypes.object,
  lesson: PropTypes.array.isRequired,
  data: PropTypes.object.isRequired
};
export default function ComboMoreMenu({ data, lesson, onDelete, styleModal, onEdit, dispatch }) {
  const { _id, name, image, description, price, lessons } = data;
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [setNewLesson] = useState('');
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
    formik.setFieldValue('name', name);
    formik.setFieldValue('description', description);
    formik.setFieldValue('price', price);
    formik.setFieldValue('image', image);
    formik.setFieldValue('lessons', lessons);
    setNewLesson(lessons);
    formik.setFieldValue('_id', _id);
  };
  const handleClose = () => setOpen(false);
  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this bank?')) {
      await onDelete(dispatch, id);
    }
  };
  const handleChangeLesson = (event, value) => {
    // if remove item set removed item to newLesson
    console.log('value', value);
    console.log('event', event.target.value);
    // const newValue = value.map((item) => item._id);
    // formik.setFieldValue('lessons', newValue);
  };
  const formik = useFormik({
    initialValues: {
      _id: '',
      name: '',
      price: '',
      image: '',
      description: '',
      lessons: ''
    },
    onSubmit: async () => {
      await onEdit(dispatch, formik.values);
    }
  });
  const { handleSubmit, isSubmitting, getFieldProps } = formik;
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
            <Box sx={styleModal}>
              <Stack spacing={2}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Edit Combo
                </Typography>
                <Stack spacing={2}>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <TextField fullWidth label="Name" {...getFieldProps('name')} />
                    <TextField fullWidth label="Image" {...getFieldProps('image')} />
                  </Stack>
                  <TextField
                    minRows={3}
                    multiline
                    fullWidth
                    label="Description"
                    {...getFieldProps('description')}
                  />
                  <Autocomplete
                    multiple
                    id="tags-outlined"
                    options={lesson}
                    defaultValue={lessons}
                    isOptionEqualToValue={(option, value) => option._id === value._id}
                    getOptionLabel={(option) => option.name}
                    onChange={(event, value) => {
                      handleChangeLesson(event, value);
                    }}
                    filterSelectedOptions
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Môn học"
                        placeholder="Favorites"
                        {...getFieldProps('lessons')}
                      />
                    )}
                  />
                </Stack>
                <LoadingButton
                  loading={isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Edit Combo
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
