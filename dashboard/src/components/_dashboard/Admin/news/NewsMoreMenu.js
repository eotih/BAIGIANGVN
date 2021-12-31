/* eslint-disable no-restricted-globals */
import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
import {
  Stack,
  Typography,
  Modal,
  FormControl,
  IconButton,
  TextField,
  Box,
  InputLabel,
  Select,
  Menu,
  MenuItem,
  OutlinedInput,
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
NewsMoreMenu.propTypes = {
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  CATEGORY_LIST: PropTypes.array.isRequired,
  MenuProps: PropTypes.object.isRequired,
  style: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired
};

export default function NewsMoreMenu({
  data,
  onDelete,
  onEdit,
  dispatch,
  CATEGORY_LIST,
  style,
  MenuProps
}) {
  const { _id, title, description, category, image } = data;
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [cate, setCategory] = useState([]);
  const [open, setOpen] = useState(false);
  const handleChangeCategory = (event) => {
    formik.setFieldValue('category', event.target.value);
    setCategory(event.target.value);
  };
  const handleOpen = () => {
    setOpen(true);
    // set value for formik with data
    formik.setFieldValue('title', title);
    formik.setFieldValue('description', description);
    formik.setFieldValue('category', category);
    formik.setFieldValue('image', image);
    formik.setFieldValue('_id', _id);
    setCategory(category);
  };
  const handleClose = () => setOpen(false);
  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this user?')) {
      await dispatch(onDelete(dispatch, id));
    }
  };

  const formik = useFormik({
    initialValues: {
      _id: '',
      title: '',
      description: '',
      image: '',
      category: ''
    },
    onSubmit: async () => {
      await dispatch(onEdit(dispatch, formik.values));
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
            <Box sx={style}>
              <Stack spacing={2}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Edit Lesson
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField fullWidth label="Title" {...getFieldProps('title')} />
                  <TextField fullWidth label="Image" {...getFieldProps('image')} />
                </Stack>
                <FormControl>
                  <InputLabel id="Field-label">Category</InputLabel>
                  <Select
                    sx={{ bgcolor: '#ffffff', borderRadius: 1 }}
                    labelId="Field-label"
                    id="category"
                    {...getFieldProps('category')}
                    value={cate}
                    name="category"
                    onChange={handleChangeCategory}
                    input={<OutlinedInput label="Category" />}
                    MenuProps={MenuProps}
                  >
                    {CATEGORY_LIST.map((name) => (
                      <MenuItem key={name.value} value={name.label}>
                        <ListItemText primary={name.label} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
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
