/* eslint-disable no-restricted-globals */
import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
import * as Yup from 'yup';
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
import { useFormik, Form, FormikProvider } from 'formik';
import editFill from '@iconify/icons-eva/edit-fill';
import { Link as RouterLink } from 'react-router-dom';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
// material
// ----------------------------------------------------------------------

export default function UserMoreMenu({ data, onDelete, onEdit, dispatch }) {
  const { _id, name, email, mobile } = data;
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
    formik.setFieldValue('name', name);
    formik.setFieldValue('email', email);
    formik.setFieldValue('mobile', mobile);
    formik.setFieldValue('_id', _id);
  };
  const handleClose = () => setOpen(false);
  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this user?')) {
      await dispatch(onDelete(dispatch, id));
    }
  };
  const RegisterSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Quá ngắn!').max(50, 'Quá dài!').required('Vui lòng nhập họ và tên'),
    mobile: Yup.string()
      .min(10, 'Quá ngắn!')
      .max(10, 'Quá dài!')
      .required('Vui lòng nhập số điện thoại'),
    email: Yup.string()
      .email('Email phải là một địa chỉ email hợp lệ')
      .required('Vui lòng nhập email')
  });
  const formik = useFormik({
    initialValues: {
      _id: '',
      name: '',
      email: '',
      mobile: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: async () => {
      await dispatch(onEdit(dispatch, formik.values));
      formik.resetForm();
      setOpen(false);
    }
  });
  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

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
              <Stack spacing={1}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Edit User
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField
                    fullWidth
                    label="Họ và tên"
                    {...getFieldProps('name')}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                  />

                  <TextField
                    fullWidth
                    label="Số điện thoại"
                    {...getFieldProps('mobile')}
                    error={Boolean(touched.mobile && errors.mobile)}
                    helperText={touched.mobile && errors.mobile}
                  />
                </Stack>

                <TextField
                  fullWidth
                  autoComplete="username"
                  type="email"
                  label="Email address"
                  {...getFieldProps('email')}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                />

                <LoadingButton
                  loading={isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Edit User
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
