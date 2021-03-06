/* eslint-disable no-restricted-globals */
import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
import {
  Stack,
  Typography,
  Modal,
  IconButton,
  TextField,
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
LessonMoreMenu.propTypes = {
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  error: PropTypes.string,
  styleModal: PropTypes.object,
  data: PropTypes.object.isRequired
};
export default function LessonMoreMenu({ data, onDelete, onEdit, dispatch, styleModal }) {
  const {
    _id,
    name,
    subject,
    grade,
    week,
    category,
    price,
    image,
    isActive,
    sale,
    link,
    description
  } = data;
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
    // set value for formik with data
    formik.setFieldValue('name', name);
    formik.setFieldValue('subject', subject);
    formik.setFieldValue('grade', grade);
    formik.setFieldValue('week', week);
    formik.setFieldValue('category', category);
    formik.setFieldValue('description', description);
    formik.setFieldValue('price', price);
    formik.setFieldValue('link', link);
    formik.setFieldValue('sale', sale);
    formik.setFieldValue('image', image);
    formik.setFieldValue('isActive', isActive);
    formik.setFieldValue('_id', _id);
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
      name: '',
      description: '',
      image: '',
      price: '',
      week: '',
      subject: '',
      grade: '',
      link: '',
      category: '',
      sale: ''
    },
    onSubmit: async () => {
      await onEdit(dispatch, formik.values);
      formik.resetForm();
      setOpen(false);
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
                  Edit Lesson
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField fullWidth label="Lesson Name" {...getFieldProps('name')} />
                  <TextField fullWidth label="Th??? lo???i" {...getFieldProps('category')} />
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField fullWidth label="Tu???n" {...getFieldProps('week')} />
                  <TextField fullWidth label="M??n" {...getFieldProps('subject')} />
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField fullWidth label="L???p" {...getFieldProps('grade')} />
                  <TextField fullWidth label="Link" {...getFieldProps('link')} />
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField fullWidth label="Gi??" {...getFieldProps('price')} />
                  <TextField fullWidth label="Sale" {...getFieldProps('sale')} />
                </Stack>
                <TextField fullWidth label="Image" {...getFieldProps('image')} />
                <TextField fullWidth label="Description" {...getFieldProps('description')} />
                <LoadingButton
                  loading={isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Edit Lesson
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
