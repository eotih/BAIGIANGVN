/* eslint-disable no-plusplus */
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
  TableRow,
  Avatar,
  Autocomplete,
  TableBody,
  TableCell,
  Container,
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
  ComboListHead,
  ComboListToolbar,
  ComboMoreMenu
} from '../../components/_dashboard/Admin/combo';
import {
  getCombo,
  createCombo,
  comboContext,
  getLessonNotInCombo,
  updateCombo,
  deleteCombo,
  lessonContext
} from '../../context';
import { getComparator, styleModal, MenuProps } from '../../components/tableListComponents';

const TABLE_HEAD = [
  { _id: 'name', label: 'Name', alignRight: false },
  { _id: 'price', label: 'Total price', alignRight: false },
  { _id: 'description', label: 'Description', alignRight: false },
  { _id: 'lessons', label: 'Lessons', alignRight: false },
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
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Combo() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('createdAt');
  const [open, setOpen] = useState(false);
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { combo, status, message, dispatchCombo } = comboContext();
  const { lesson, dispatch } = lessonContext();
  const { openToast, handleOpenToast, renderToast } = toastOpen();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    getCombo(dispatchCombo);
    getLessonNotInCombo(dispatch);
    // if have message
    if (message) {
      handleOpenToast({
        message,
        color: status === 200 ? 'success' : 'error'
      })();
    }
  }, [dispatchCombo, message, status]);
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = combo.map((n) => n.description);
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
  const handleChangeLesson = (event, value) => {
    const newValue = value.map((item) => item._id);
    formik.setFieldValue('lessons', newValue);
  };
  const handleClear = () => {
    formik.resetForm();
    setOpen(false);
    setSubmitting(false);
  };
  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      image: '',
      sale: '',
      description: '',
      lessons: ''
    },
    onSubmit: async () => {
      await createCombo(dispatchCombo, formik.values);
      handleClear();
    }
  });
  const { handleSubmit, isSubmitting, getFieldProps, setSubmitting } = formik;
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - combo.length) : 0;

  const filteredCombo = applySortFilter(combo, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredCombo.length === 0;

  return (
    <Page title="Combo | B??i Gi???ng VN">
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
                  Add Combo
                </Typography>
                <Stack spacing={2}>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <TextField fullWidth label="Name" {...getFieldProps('name')} />
                    <TextField fullWidth label="Sale" {...getFieldProps('sale')} />
                  </Stack>
                  <TextField fullWidth label="Image" {...getFieldProps('image')} />
                  <TextField
                    minRows={3}
                    multiline
                    fullWidth
                    label="Description"
                    {...getFieldProps('description')}
                  />
                  <Autocomplete
                    multiple
                    id="tags-outlined"
                    options={lesson}
                    isOptionEqualToValue={(option, value) => option._id === value._id}
                    getOptionLabel={(option) => option.name}
                    onChange={(event, value) => {
                      handleChangeLesson(event, value);
                    }}
                    filterSelectedOptions
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="M??n h???c"
                        placeholder="Favorites"
                        {...getFieldProps('lessons')}
                      />
                    )}
                  />
                </Stack>
                <LoadingButton
                  loading={isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Add Combo
                </LoadingButton>
              </Stack>
            </Box>
          </Form>
        </FormikProvider>
      </Modal>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Combo Lesson
          </Typography>
          <Button
            onClick={handleOpen}
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Icon icon={plusFill} />}
          >
            New Combo
          </Button>
        </Stack>

        <Card>
          <ComboListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <ComboListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={filteredCombo.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredCombo
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { _id, name, image, description, price, lessons } = row;
                      const isItemSelected = selected.indexOf(name) !== -1;
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
                              onChange={(event) => handleClick(event, name)}
                            />
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Avatar alt={name} src={image} />
                              <Typography variant="subtitle2" noWrap>
                                {name}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">{price}</TableCell>
                          <TableCell align="left">{description}</TableCell>
                          <TableCell align="left">
                            {lessons.map((res) => `${res._id} || `)}
                          </TableCell>
                          <TableCell align="right">
                            <ComboMoreMenu
                              data={row}
                              lesson={lesson}
                              MenuProps={MenuProps}
                              styleModal={styleModal}
                              dispatch={dispatchCombo}
                              onDelete={deleteCombo}
                              onEdit={updateCombo}
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
            count={combo.length}
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
