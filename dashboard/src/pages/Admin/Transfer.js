/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-globals */
import { filter } from 'lodash';
import { useState, useEffect } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import {
  Card,
  Table,
  Stack,
  Checkbox,
  Link,
  Breadcrumbs,
  TableRow,
  InputAdornment,
  TableBody,
  TableCell,
  Container,
  Typography,
  FormControl,
  CardHeader,
  Grid,
  TextField,
  Box,
  InputLabel,
  Divider,
  Select,
  MenuItem,
  OutlinedInput,
  ListItemText,
  TableContainer,
  TablePagination
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Page from '../../components/Page';
import { TransferListHead, TransferListToolbar } from '../../components/_dashboard/Admin/transfer';
import { MenuProps, getComparator } from '../../components/tableListComponents';
import SearchNotFound from '../../components/SearchNotFound';
import Scrollbar from '../../components/Scrollbar';
import { toastOpen } from '../../components/Toast';
import {
  getUser,
  getTransaction,
  createTransaction,
  userContext,
  transactionContext
} from '../../context';
import { fDateTime } from '../../utils/formatTime';
import { fCurrency } from '../../utils/formatNumber';

const PAYMENT_LIST = [
  {
    _id: 1,
    name: 'THANH TOÁN QUA VCB'
  },
  { _id: 2, name: 'THANH TOÁN QUA MOMO' }
];
const TABLE_HEAD = [
  { _id: 'email', label: 'Email', alignRight: false },
  { _id: 'balance', label: 'Balance', alignRight: false },
  { _id: 'payment', label: 'Payment', alignRight: false },
  { _id: 'createdAt', label: 'Thời gian', alignRight: false }
];
function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.email.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}
export default function Transfer() {
  const [page, setPage] = useState(0);
  const [email, setEmail] = useState('');
  const [payment, setPayment] = useState('');
  const [selected, setSelected] = useState([]);
  const [order, setOrder] = useState('asc');
  const [filterName, setFilterName] = useState('');
  const [moneyInput, setMoneyInput] = useState('');
  const [orderBy, setOrderBy] = useState('email');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { user, dispatch } = userContext();
  const { transaction, message, status, dispatchTransaction } = transactionContext();
  const { openToast, handleOpenToast, renderToast } = toastOpen();
  useEffect(() => {
    getUser(dispatch);
    getTransaction(dispatchTransaction);
    if (message) {
      handleOpenToast({
        message,
        color: status === 200 ? 'success' : 'error'
      })();
    }
  }, [dispatch, dispatchTransaction, message, status]);
  const handleChangeUser = (event) => {
    setEmail(event.target.value);
    formik.setFieldValue('email', event.target.value);
  };
  const handleChangePayment = (event) => {
    setPayment(event.target.value);
    formik.setFieldValue('payment', event.target.value);
  };
  const handleClear = () => {
    formik.resetForm();
    setEmail('');
    setPayment('');
  };
  const handleChangeMoney = (event) => {
    setMoneyInput(event.target.value);
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
  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const formik = useFormik({
    initialValues: {
      email: '',
      payment: '',
      deposit_amount: ''
    },
    onSubmit: async () => {
      if (
        confirm(
          `Bạn có chắc chắn muốn chuyển ${formik.values.deposit_amount} cho ${email} ${payment} `
        )
      ) {
        await createTransaction(dispatchTransaction, formik.values);
        handleClear();
      }
    }
  });
  const { handleSubmit, isSubmitting, getFieldProps } = formik;
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = transaction.map((n) => n.email);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - transaction.length) : 0;

  const filteredTransaction = applySortFilter(
    transaction,
    getComparator(order, orderBy),
    filterName
  );
  const isUserNotFound = filteredTransaction.length === 0;
  return (
    <Page title="Transfer | Bài Giảng VN">
      {openToast.isOpen === true && renderToast()}
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" sx={{ mb: 5 }}>
            Transfer
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="inherit" href="/">
                Admin
              </Link>
              <Typography color="text.primary">Transfer</Typography>
            </Breadcrumbs>
          </Typography>
        </Stack>
        <Grid container spacing={3}>
          <Grid item xs={12} md={5}>
            <Card>
              <CardHeader title="Chuyển tiền" />
              <Box sx={{ p: 2 }}>
                <FormikProvider value={formik}>
                  <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                      <FormControl>
                        <InputLabel id="Field-label">Khách hàng</InputLabel>
                        <Select
                          sx={{ bgcolor: '#ffffff', borderRadius: 1 }}
                          labelId="Field-label"
                          id="email"
                          name={email}
                          {...getFieldProps('email')}
                          value={email}
                          onChange={handleChangeUser}
                          input={<OutlinedInput label="Khách hàng" />}
                          MenuProps={MenuProps}
                        >
                          {user.map((name) => (
                            <MenuItem key={name._id} value={name.email}>
                              <ListItemText primary={name.email} />
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <TextField
                        fullWidth
                        InputProps={{
                          endAdornment: <InputAdornment position="start">VND</InputAdornment>
                        }}
                        value={fCurrency(moneyInput)}
                        handleSubmit={handleChangeMoney}
                        label="Số tiền nạp"
                        {...getFieldProps('deposit_amount')}
                      />
                      <FormControl>
                        <InputLabel id="Field-label">Hình thức thanh toán</InputLabel>
                        <Select
                          sx={{ bgcolor: '#ffffff', borderRadius: 1 }}
                          labelId="Field-label"
                          id="payment"
                          {...getFieldProps('payment')}
                          value={payment}
                          name={payment}
                          onChange={handleChangePayment}
                          input={<OutlinedInput label="Hình thức thanh toán" />}
                          MenuProps={MenuProps}
                        >
                          {PAYMENT_LIST.map((name) => (
                            <MenuItem key={name._id} value={name.name}>
                              <ListItemText primary={name.name} />
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <Divider />
                      <LoadingButton
                        loading={isSubmitting}
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                      >
                        Chuyển tiền
                      </LoadingButton>
                    </Stack>
                  </Form>
                </FormikProvider>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} md={7}>
            <Card>
              <TransferListToolbar
                numSelected={selected.length}
                filterName={filterName}
                onFilterName={handleFilterByName}
              />

              <Scrollbar>
                <TableContainer sx={{ minWidth: 800 }}>
                  <Table>
                    <TransferListHead
                      order={order}
                      orderBy={orderBy}
                      headLabel={TABLE_HEAD}
                      rowCount={filteredTransaction.length}
                      numSelected={selected.length}
                      onRequestSort={handleRequestSort}
                      onSelectAllClick={handleSelectAllClick}
                    />
                    <TableBody>
                      {filteredTransaction
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row) => {
                          const { _id, email, account_balance: balance, payment, createdAt } = row;
                          const isItemSelected = selected.indexOf(email) !== -1;

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
                                  onChange={(event) => handleClick(event, email)}
                                />
                              </TableCell>
                              <TableCell align="left">{email}</TableCell>
                              <TableCell align="left">{fCurrency(balance)} VND</TableCell>
                              <TableCell align="left">{payment}</TableCell>
                              <TableCell align="left">{fDateTime(createdAt)}</TableCell>
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
                count={user.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
