/* eslint-disable no-restricted-globals */
import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
import {
  Stack,
  Typography,
  Modal,
  IconButton,
  FormControl,
  OutlinedInput,
  InputLabel,
  Select,
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
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
// material
// ----------------------------------------------------------------------
OrderMoreMenu.propTypes = {
  onEdit: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  error: PropTypes.string,
  styleModal: PropTypes.object,
  MenuProps: PropTypes.object,
  data: PropTypes.object.isRequired
};
const STATE_LIST = [
  {
    value: '1',
    label: 'Pending'
  },
  {
    value: '2',
    label: 'Approved'
  },
  {
    value: '3',
    label: 'Denied'
  }
];
export default function OrderMoreMenu({ data, MenuProps, styleModal, onEdit, dispatch }) {
  const { _id, state } = data;
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [stateData, setState] = useState([]);
  const handleOpen = () => {
    setOpen(true);
    // set value for formik with data
    formik.setFieldValue('state', state);
    formik.setFieldValue('_id', _id);
    setState(state);
  };
  const handleClose = () => setOpen(false);
  const handleChangeState = (event) => {
    formik.setFieldValue('state', event.target.value);
    setState(event.target.value);
  };
  const formik = useFormik({
    initialValues: {
      _id: '',
      state: ''
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
                  Edit Order's State
                </Typography>
                <FormControl>
                  <InputLabel id="Field-label">State</InputLabel>
                  <Select
                    sx={{ bgcolor: '#ffffff', borderRadius: 1 }}
                    labelId="Field-label"
                    id="state"
                    {...getFieldProps('state')}
                    value={stateData}
                    onChange={handleChangeState}
                    input={<OutlinedInput label="State" />}
                    MenuProps={MenuProps}
                  >
                    {STATE_LIST.map((name) => (
                      <MenuItem key={name.value} value={name.label}>
                        <ListItemText primary={name.label} />
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
                  Edit State
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
        <MenuItem
          onClick={handleOpen}
          component={RouterLink}
          to="#"
          sx={{ color: 'text.secondary' }}
        >
          <ListItemIcon>
            <Icon icon={editFill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Edit State" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </>
  );
}
