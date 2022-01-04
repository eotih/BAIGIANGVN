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

//

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { _id: 'description', label: 'Description', alignRight: false },
  { _id: 'type', label: 'Type', alignRight: false },
  { _id: 'status', label: 'Status', alignRight: false },
  { _id: 'isActive', label: 'isActive', alignRight: false },
  { _id: '' }
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

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
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};
const TYPE_LIST = [
  { _id: '1', type: 'success' },
  { _id: '2', type: 'info' },
  { _id: '3', type: 'warning' },
  { _id: '4', type: 'error' }
];
const STATUS_LIST = [
  { _id: '1', status: 'Thông báo' },
  { _id: '2', status: 'Thông tin' },
  { _id: '3', status: 'Cảnh báo' },
  { _id: '4', status: 'Lỗi' }
];
export default function Notifications() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [open, setOpen] = useState(false);
  const [filterName, setFilterName] = useState('');
  const [type, setType] = useState('');
  const [status, setStatus] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { notifications, message, dispatch } = notificationsContext();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    getNotifications(dispatch);
  }, [dispatch]);
  const handleChangeType = (event) => {
    setType(event.target.value);
    formik.setFieldValue('type', event.target.value);
  };
  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
    formik.setFieldValue('status', event.target.value);
  };
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = notifications.map((n) => n.name);
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

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const style = {
    position: 'relative',
    borderRadius: '10px',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4
  };
  const formik = useFormik({
    initialValues: {
      status: '',
      description: '',
      type: ''
    },
    onSubmit: async () => {
      await createNotifications(dispatch, formik.values);
      console.log(message);
      setOpen(false);
    }
  });
  const { handleSubmit, isSubmitting, getFieldProps } = formik;
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - notifications.length) : 0;

  const filteredNotifications = applySortFilter(
    notifications,
    getComparator(order, orderBy),
    filterName
  );

  const isUserNotFound = filteredNotifications.length === 0;

  return (
    <Page title="Notifications | Bài Giảng VN">
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
                    value={status}
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
                    value={type}
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
