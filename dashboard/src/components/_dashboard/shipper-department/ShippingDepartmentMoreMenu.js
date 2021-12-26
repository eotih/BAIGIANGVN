/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/label-has-associated-control */
import * as React from 'react';
import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
import editFill from '@iconify/icons-eva/edit-fill';
import { useFormik, Form, FormikProvider } from 'formik';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
// material
import {
  Box,
  Modal,
  Menu,
  MenuItem,
  Stack,
  IconButton,
  Typography,
  ListItemIcon,
  ListItemText,
  TextField
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import axios from '../../../functions/Axios';

// ----------------------------------------------------------------------

export default function ShippingDepartmentMoreMenu(Department) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [role, setRole] = useState([]);
  const handleClose = () => setOpen(false);
  const formik = useFormik({
    initialValues: {
      ShippingDepartmentID: '',
      FullName: '',
      Phone: '',
      Email: '',
      Address: '',
      remember: true
    },
    onSubmit: () => {
      axios
        .post(`Delivery/AddOrEditShippingDepartment`, formik.values)
        .then((res) => {
          if (res.data.Status === 'Updated') {
            alert('Shipper Edited');
            window.location.reload();
          } else {
            alert('Edited Fail');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
  const { handleSubmit, getFieldProps } = formik;
  const handleChange = (event) => {
    setRole(event.target.value);
  };
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4
  };
  const handleOpen = () => {
    formik.setFieldValue('ShippingDepartmentID', Department.dulieu.ShippingDepartmentID);
    formik.setFieldValue('FullName', Department.dulieu.FullName);
    formik.setFieldValue('Phone', Department.dulieu.Phone);
    formik.setFieldValue('Email', Department.dulieu.Email);
    formik.setFieldValue('Address', Department.dulieu.Address);
    setOpen(true);
  };
  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Icon icon={moreVerticalFill} width={20} height={20} />
      </IconButton>

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
        <MenuItem
          onClick={() => {
            if (confirm('Are you sure you want to delete this Shipper?')) {
              axios
                .delete(
                  `Delivery/DeleteShippingDepartment?ShippingDepartmentID=${Department.dulieu.ShippingDepartmentID}`
                )
                .then((res) => {
                  if (res.data.Status === 'Deleted') {
                    alert('ShippingDepartment Deleted');
                    window.location.reload();
                  } else {
                    alert('Shipper Not Deleted');
                  }
                });
            }
          }}
          sx={{ color: 'text.secondary' }}
        >
          <ListItemIcon>
            <Icon icon={trash2Outline} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem onClick={handleOpen} sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Icon icon={editFill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Edit" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        <Modal
          open={open}
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
            '& .MuiSelect-root': { m: 1, width: '25ch' }
          }}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Box sx={style}>
                <Stack spacing={3}>
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                    Edit ShippingDepartment
                  </Typography>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <TextField label="FullName" {...getFieldProps('FullName')} variant="outlined" />
                    <TextField label="Phone" {...getFieldProps('Phone')} variant="outlined" />
                  </Stack>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <TextField label="Email" {...getFieldProps('Email')} variant="outlined" />
                    <TextField label="Address" {...getFieldProps('Address')} variant="outlined" />
                  </Stack>
                  <LoadingButton fullWidth size="large" type="submit" variant="contained">
                    Edit ShippingDepartment
                  </LoadingButton>
                </Stack>
              </Box>
            </Form>
          </FormikProvider>
        </Modal>
      </Menu>
    </>
  );
}
