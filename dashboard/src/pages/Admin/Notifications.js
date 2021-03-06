/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';
import { useState, useEffect } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  Button,
  Checkbox,
  InputLabel,
  TableRow,
  ListItemText,
  MenuItem,
  TableBody,
  TableCell,
  OutlinedInput,
  Container,
  FormControl,
  Select,
  Typography,
  Modal,
  TextField,
  Box,
  TableContainer,
  TablePagination
} from '@mui/material';
// components
import { LoadingButton } from '@mui/lab';
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import { toastOpen } from '../../components/Toast';
import SearchNotFound from '../../components/SearchNotFound';
import {
  NotificationsListHead,
  NotificationsListToolbar,
  NotificationsMoreMenu
} from '../../components/_dashboard/Admin/notifications';
import {
  getNotifications,
  createNotifications,
  updateNotifications,
  deleteNotifications,
  notificationsContext
} from '../../context';
import { getComparator, styleModal, MenuProps } from '../../components/tableListComponents';

const TABLE_HEAD = [
  { _id: 'description', label: 'Description', alignRight: false },
  { _id: 'type', label: 'Type', alignRight: false },
  { _id: 'status', label: 'status', alignRight: false },
  { _id: 'isActive', label: 'isActive', alignRight: false },
  { _id: '' }
];

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.type.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}
const TYPE_LIST = [
  { _id: '1', type: 'Th??ng b??o' },
  { _id: '2', type: 'Th??ng tin' },
  { _id: '3', type: 'C???nh b??o' },
  { _id: '4', type: 'L???i' }
];
const STATUS_LIST = [
  { _id: '1', status: 'success' },
  { _id: '2', status: 'info' },
  { _id: '3', status: 'warning' },
  { _id: '4', status: 'error' }
];
export default function Notifications() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('createdAt');
  const [open, setOpen] = useState(false);
  const [filterName, setFilterName] = useState('');
  const [type, setType] = useState('');
  const [statusList, setStatusList] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { notifications, status, message, dispatch } = notificationsContext();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { openToast, handleOpenToast, renderToast } = toastOpen();
  useEffect(() => {
    getNotifications(dispatch);
    if (message) {
      handleOpenToast({
        message,
        color: status === 200 ? 'success' : 'error'
      })();
    }
  }, [dispatch, message, status]);
  const handleChangeType = (event) => {
    setType(event.target.value);
    formik.setFieldValue('type', event.target.value);
  };
  const handleChangeStatusList = (event) => {
    setStatusList(event.target.value);
    formik.setFieldValue('status', event.target.value);
  };
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = notifications.map((n) => n.description);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClear = () => {
    formik.resetForm();
    setOpen(false);
    setType('');
    setStatusList('');
    setSubmitting(false);
  };
  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const formik = useFormik({
    initialValues: {
      status: '',
      description: '',
      type: ''
    },
    onSubmit: async () => {
      await createNotifications(dispatch, formik.values);
      handleClear();
    }
  });
  const { handleSubmit, isSubmitting, getFieldProps, setSubmitting } = formik;
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - notifications.length) : 0;

  const filteredNotifications = applySortFilter(
    notifications,
    getComparator(order, orderBy),
    filterName
  );

  const isUserNotFound = filteredNotifications.length === 0;

  return (
    <Page title="Notifications | B??i Gi???ng VN">
      {openToast.isOpen === true && renderToast()}
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
                  Add Notifications
                </Typography>
                <TextField fullWidth label="Description" {...getFieldProps('description')} />
                <FormControl>
                  <InputLabel id="Field-label">Status</InputLabel>
                  <Select
                    sx={{ bgcolor: '#ffffff', borderRadius: 1 }}
                    labelId="Field-label"
                    id="status"
                    {...getFieldProps('status')}
                    value={statusList}
                    onChange={handleChangeStatusList}
                    input={<OutlinedInput label="status" />}
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
                  <InputLabel id="Field-label">Th??? lo???i</InputLabel>
                  <Select
                    sx={{ bgcolor: '#ffffff', borderRadius: 1 }}
                    labelId="Field-label"
                    id="type"
                    {...getFieldProps('type')}
                    value={type}
                    onChange={handleChangeType}
                    input={<OutlinedInput label="Th??? lo???i" />}
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
                  Add Notifications
                </LoadingButton>
              </Stack>
            </Box>
          </Form>
        </FormikProvider>
      </Modal>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Notifications
          </Typography>
          <Button
            onClick={handleOpen}
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Icon icon={plusFill} />}
          >
            New Notifications
          </Button>
        </Stack>

        <Card>
          <NotificationsListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <NotificationsListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={filteredNotifications.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredNotifications
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { _id, description, status, type, isActive } = row;
                      const isItemSelected = selected.indexOf(description) !== -1;
                      return (
                        <TableRow
                          hover
                          key={_id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              onChange={(event) => handleClick(event, description)}
                            />
                          </TableCell>
                          <TableCell align="left">{description}</TableCell>
                          <TableCell align="left">{type}</TableCell>
                          <TableCell align="left">{status}</TableCell>
                          <TableCell align="left">{isActive ? 'Yes' : 'No'}</TableCell>
                          <TableCell align="right">
                            <NotificationsMoreMenu
                              data={row}
                              TYPE_LIST={TYPE_LIST}
                              MenuProps={MenuProps}
                              STATUS_LIST={STATUS_LIST}
                              dispatch={dispatch}
                              onDelete={deleteNotifications}
                              onEdit={updateNotifications}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={notifications.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
