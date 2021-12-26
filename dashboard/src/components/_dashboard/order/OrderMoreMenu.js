/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/label-has-associated-control */
import * as React from 'react';
import { Icon } from '@iconify/react';
import { useRef, useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import editFill from '@iconify/icons-eva/edit-fill';
import carfill from '@iconify/icons-eva/car-fill';
import external from '@iconify/icons-eva/external-link-fill';
import { useFormik, Form, FormikProvider } from 'formik';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
// material
import {
  Box,
  Modal,
  Menu,
  MenuItem,
  FormControl,
  IconButton,
  InputLabel,
  Select,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import axios from '../../../functions/Axios';
import { getAllState } from '../../../functions/Component';

// ----------------------------------------------------------------------

export default function OrderMoreMenu(State) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState([]);
  const [states, setStates] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    getAllState().then((res) => {
      setStates(res);
    });
  }, []);
  const formik = useFormik({
    initialValues: {
      StateID: '',
      OrderID: ''
    },
    onSubmit: () => {
      console.log(formik.values);
      axios
        .post('Management/EditStateOfOrder', formik.values)
        .then((res) => {
          if (res.data.Status === 'Updated') {
            alert('State Edited');
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
    formik.setFieldValue('StateID', event.target.value);
    setState(event.target.value);
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
    formik.setFieldValue('StateID', State.dulieu.TrangThai.StateID);
    formik.setFieldValue('OrderID', State.dulieu.OrderID);
    setState(State.dulieu.TrangThai.StateID);
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
            if (confirm('Are you sure you want to delete this Order?')) {
              axios.delete(`Management/DeleteOrder?OrderID=${State.dulieu.OrderID}`).then((res) => {
                if (res.data.Status === 'Deleted') {
                  axios
                    .delete(
                      `Management/DeleteOrderDetailsByOrderID?OrderID=${State.dulieu.OrderID}`
                    )
                    .then((res) => {
                      console.log(res.data.Status);
                    });
                  alert('Order Deleted');
                  window.location.reload();
                } else {
                  alert('Deleted Fail');
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
            '& .MuiTextField-root': { m: 1, width: '25ch' }
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
                    Edit State
                  </Typography>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <FormControl>
                      <InputLabel id="select-label">State</InputLabel>
                      <Select
                        labelId="select-label"
                        label="State"
                        {...getFieldProps('StateID')}
                        variant="outlined"
                        value={state}
                        onChange={handleChange}
                      >
                        {states.map((item) => (
                          <MenuItem key={item.StateID} value={item.StateID}>
                            {item.Name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Stack>
                  <LoadingButton fullWidth size="large" type="submit" variant="contained">
                    Edit State
                  </LoadingButton>
                </Stack>
              </Box>
            </Form>
          </FormikProvider>
        </Modal>
        <MenuItem
          component={RouterLink}
          to="/delivery/tracking-delivery"
          sx={{ color: 'text.secondary' }}
        >
          <ListItemIcon>
            <Icon icon={carfill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Tracking Order" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        <MenuItem
          component={RouterLink}
          to={`detail/${State.dulieu.OrderID}`}
          sx={{ color: 'text.secondary' }}
        >
          <ListItemIcon>
            <Icon icon={external} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="View Detail" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </>
  );
}
