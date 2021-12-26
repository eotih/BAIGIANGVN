/* eslint-disable react/style-prop-object */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/no-unresolved */
import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import React, { useState, useEffect } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Link,
  Breadcrumbs,
  Container,
  Modal,
  TextField,
  Typography,
  TableContainer,
  TablePagination
} from '@mui/material';
// components
import { styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { getAllShipper } from 'src/functions/Delivery';
import Page from '../../components/Page';
import axios from '../../functions/Axios';
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
import {
  ShipperListHead,
  ShipperListToolbar,
  ShipperMoreMenu
} from '../../components/_dashboard/shipper';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'FullName', label: 'FullName', alignRight: false },
  { id: 'Email', label: 'Email', alignRight: false },
  { id: 'Phone', label: 'Phone', alignRight: false },
  { id: 'Address', label: 'Address', alignRight: false },
  { id: '' }
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
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function User() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [role, setRole] = useState([]);
  const [shipper, setShipper] = useState([]);
  useEffect(() => {
    getAllShipper().then((res) => {
      setIsLoaded(true);
      setShipper(res);
    });
  }, []);
  const handleChange = (event) => {
    setRole(event.target.value);
  };
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - shipper.length) : 0;
  const filteredShipper = applySortFilter(shipper, getComparator(order, orderBy), filterName);
  const isUserNotFound = filteredShipper.length === 0;

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
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
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = shipper.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  const convertRoles = (RoleID) => {
    switch (RoleID) {
      case 1:
        return 'Fullstack';
      case 2:
        return 'Backend';
      case 3:
        return 'Frontend';
      default:
        return 'Slave';
    }
  };
  const Input = styled('input')({
    display: 'none'
  });
  const formik = useFormik({
    initialValues: {
      FullName: '',
      FrontFigure: '',
      Phone: '',
      Email: '',
      Password: '',
      BackSideFigure: '',
      Address: '',
      remember: true
    },
    onSubmit: () => {
      axios
        .post(`Delivery/AddOrEditShipper`, formik.values)
        .then((res) => {
          if (res.data.Status === 'Success') {
            alert('Add Shipper Successfully');
            window.location.reload();
          } else {
            alert('Add Failed');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });

  const { handleSubmit, getFieldProps } = formik;
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (!isLoaded) {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    );
  }
  return (
    <Page title="Shipper | HangnoidiaNhat">
      <Modal
        open={open}
        sx={{
          '& .MuiTextField-root': { m: 1, width: '100%' }
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
                  Add Shipper
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField label="FullName" {...getFieldProps('FullName')} variant="outlined" />
                  <TextField label="Phone" {...getFieldProps('Phone')} variant="outlined" />
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField label="Email" {...getFieldProps('Email')} variant="outlined" />
                  <TextField label="Password" {...getFieldProps('Password')} variant="outlined" />
                  <TextField label="Address" {...getFieldProps('Address')} variant="outlined" />
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
                  <Avatar src={formik.values.FrontFigure} sx={{ width: 50, height: 50 }} />
                  <label htmlFor="contained-button-file">
                    <Input
                      id="contained-button-file"
                      type="file"
                      onChange={(e) => {
                        const { files } = e.target;
                        const reader = new FileReader();
                        reader.readAsDataURL(files[0]);
                        reader.onload = (e) => {
                          formik.setFieldValue('FrontFigure', e.target.result);
                        };
                      }}
                    />
                    <Button variant="contained" component="span">
                      Upload FrontFigure
                    </Button>
                  </label>
                  <Avatar src={formik.values.BackSideFigure} sx={{ width: 50, height: 50 }} />
                  <label htmlFor="contained-button-file2">
                    <Input
                      id="contained-button-file2"
                      type="file"
                      onChange={(e) => {
                        const { files } = e.target;
                        const reader = new FileReader();
                        reader.readAsDataURL(files[0]);
                        reader.onload = (e) => {
                          formik.setFieldValue('BackSideFigure', e.target.result);
                        };
                      }}
                    />
                    <Button variant="contained" component="span">
                      Upload BackSideFigure
                    </Button>
                  </label>
                </Stack>
                <LoadingButton fullWidth size="large" type="submit" variant="contained">
                  Add Shipper
                </LoadingButton>
              </Stack>
            </Box>
          </Form>
        </FormikProvider>
      </Modal>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Shipper
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="inherit" href="/">
                Dashboard
              </Link>
              <Typography color="text.primary">Shipper</Typography>
            </Breadcrumbs>
          </Typography>
          <Button
            onClick={handleOpen}
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Icon icon={plusFill} />}
          >
            New Shipper
          </Button>
        </Stack>

        <Card>
          <ShipperListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <ShipperListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={shipper.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredShipper
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { ShipperID, Address, FullName, Email, Phone } = row;
                      const isItemSelected = selected.indexOf(FullName) !== -1;

                      return (
                        <TableRow
                          hover
                          key={ShipperID}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              onChange={(event) => handleClick(event, FullName)}
                            />
                          </TableCell>
                          <TableCell align="left">{FullName}</TableCell>
                          <TableCell align="left">{Email}</TableCell>
                          <TableCell align="left">{Phone}</TableCell>
                          <TableCell align="left">{Address}</TableCell>
                          <TableCell align="right">
                            <ShipperMoreMenu dulieu={row} />
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
            count={shipper.length}
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
