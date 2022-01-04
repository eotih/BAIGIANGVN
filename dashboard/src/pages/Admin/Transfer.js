/* eslint-disable no-restricted-globals */
import { useState, useEffect } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import {
  Card,
  Stack,
  Grid,
  Box,
  ListItemText,
  Select,
  Divider,
  OutlinedInput,
  InputAdornment,
  FormControl,
  TextField,
  InputLabel,
  MenuItem,
  CardHeader,
  Link,
  Breadcrumbs,
  Container,
  Typography,
  TablePagination
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Page from '../../components/Page';
// import { TransferListHead, TransferListToolbar } from '../../components/_dashboard/Admin/transfer';

import { getUser, userContext } from '../../context';

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
const PAYMENT_LIST = [
  {
    _id: 1,
    name: 'THANH TOÁN QUA VCB'
  },
  { _id: 2, name: 'THANH TOÁN QUA MOMO' }
];
export default function Transer() {
  const [page, setPage] = useState(0);
  const [email, setEmail] = useState('');
  const [payment, setPayment] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { user, dispatch } = userContext();
  useEffect(() => {
    getUser(dispatch);
  }, [dispatch]);
  const handleChangeUser = (event) => {
    setEmail(event.target.value);
    formik.setFieldValue('email', event.target.value);
  };
  const handleChangePayment = (event) => {
    setPayment(event.target.value);
    formik.setFieldValue('payment', event.target.value);
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
        console.log(formik.values);
        setEmail('');
        setPayment('');
        // await dispatch(createNews(dispatch, formik.values));
        formik.resetForm();
      }
    }
  });
  const { handleSubmit, isSubmitting, getFieldProps } = formik;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Page title="Transfer | Bài Giảng VN">
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
