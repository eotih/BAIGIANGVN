/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/label-has-associated-control */
import * as React from 'react';
import { Icon } from '@iconify/react';
import { useRef, useState, useEffect } from 'react';
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
  IconButton,
  ListItemIcon,
  InputLabel,
  FormControl,
  ListItemText,
  Stack,
  Typography,
  TextField,
  Select,
  Button,
  Avatar
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import axios from '../../../functions/Axios';
import { getAllRole } from '../../../functions/Component';

// ----------------------------------------------------------------------

export default function AccountMoreMenu(Account) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [role, setRole] = useState([]);
  const [roles, setRoles] = useState([]);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    getAllRole().then((res) => {
      setRoles(res);
    });
  }, []);
  const formik = useFormik({
    initialValues: {
      AccountID: '',
      FullName: '',
      Image: '',
      Phone: '',
      Email: '',
      Password: '',
      RoleID: '',
      Address: '',
      remember: true
    },
    onSubmit: () => {
      axios
        .post('Organization/AddOrEditAccount', formik.values)
        .then((res) => {
          if (res.data.Status === 'Updated') {
            alert('Account Edited');
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
    formik.setFieldValue('RoleID', event.target.value);
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
  const Input = styled('input')({
    display: 'none'
  });
  const handleOpen = () => {
    formik.setFieldValue('AccountID', Account.dulieu.AccountID);
    formik.setFieldValue('FullName', Account.dulieu.FullName);
    formik.setFieldValue('Image', Account.dulieu.Image);
    formik.setFieldValue('Phone', Account.dulieu.Phone);
    formik.setFieldValue('Email', Account.dulieu.Email);
    formik.setFieldValue('Password', Account.dulieu.Password);
    formik.setFieldValue('Address', Account.dulieu.Address);
    formik.setFieldValue('RoleID', Account.dulieu.RoleID);
    setRole(Account.dulieu.RoleID);
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
            if (confirm('Are you sure you want to delete this account?')) {
              axios
                .delete(`Organization/DeleteAccount?AccountID=${Account.dulieu.AccountID}`)
                .then((res) => {
                  if (res.data.Status === 'Deleted') {
                    alert('Account Deleted');
                    window.location.reload();
                  } else {
                    alert('Account Not Deleted');
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
                    Edit Account
                  </Typography>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <TextField label="FullName" {...getFieldProps('FullName')} variant="outlined" />
                    <TextField label="Phone" {...getFieldProps('Phone')} variant="outlined" />
                  </Stack>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <TextField label="Email" {...getFieldProps('Email')} variant="outlined" />
                    <TextField
                      type="password"
                      label="Password"
                      {...getFieldProps('Password')}
                      variant="outlined"
                    />
                  </Stack>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <TextField label="Address" {...getFieldProps('Address')} variant="outlined" />
                    <FormControl>
                      <InputLabel id="select-label">Role</InputLabel>
                      <Select
                        labelId="select-label"
                        label="Role"
                        {...getFieldProps('RoleID')}
                        variant="outlined"
                        value={role}
                        onChange={handleChange}
                      >
                        {roles.map((item) => (
                          <MenuItem key={item.RoleID} value={item.RoleID}>
                            {item.RoleName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Stack>
                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={2}
                    justifyContent="flex-end"
                  >
                    <Avatar src={formik.values.Image} sx={{ width: 50, height: 50 }} />
                    <label htmlFor="contained-button-file">
                      <Input
                        id="contained-button-file"
                        type="file"
                        onChange={(e) => {
                          const { files } = e.target;
                          const reader = new FileReader();
                          reader.readAsDataURL(files[0]);
                          reader.onload = (e) => {
                            formik.setFieldValue('Image', e.target.result);
                          };
                        }}
                      />
                      <Button variant="contained" component="span">
                        Upload Image
                      </Button>
                    </label>
                  </Stack>
                  <LoadingButton fullWidth size="large" type="submit" variant="contained">
                    Edit Account
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
