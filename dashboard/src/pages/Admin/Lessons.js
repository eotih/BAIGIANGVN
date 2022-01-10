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
  Avatar,
  Button,
  Checkbox,
  TableRow,
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
import { toastOpen } from '../../components/Toast';
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
import {
  LessonListHead,
  LessonListToolbar,
  LessonMoreMenu
} from '../../components/_dashboard/Admin/lessons';
import { getLesson, createLesson, updateLesson, deleteLesson, lessonContext } from '../../context';
import { getComparator, styleModal } from '../../components/tableListComponents';
//

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { _id: 'name', label: 'Name', alignRight: false },
  { _id: 'subject', label: 'Subject', alignRight: false },
  { _id: 'grade', label: 'Grade', alignRight: false },
  { _id: 'week', label: 'Week', alignRight: false },
  { _id: 'category', label: 'Category', alignRight: false },
  { _id: 'price', label: 'Price', alignRight: false },
  { _id: 'isActive', label: 'isActive', alignRight: false },
  { _id: '' }
];

// ----------------------------------------------------------------------

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

export default function Lesson() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [open, setOpen] = useState(false);
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { lesson, message, status, dispatch } = lessonContext();
  const { openToast, handleOpenToast, renderToast } = toastOpen();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    getLesson(dispatch);
    if (message) {
      handleOpenToast({
        message,
        color: status === 200 ? 'success' : 'error'
      })();
    }
  }, [dispatch, message, status]);
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = lesson.map((n) => n.name);
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

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      image: '',
      price: '',
      week: '',
      subject: '',
      grade: '',
      link: '',
      category: '',
      sale: ''
    },
    onSubmit: async () => {
      await createLesson(dispatch, formik.values);
      formik.resetForm();
      setOpen(false);
    }
  });
  const { handleSubmit, isSubmitting, getFieldProps } = formik;
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - lesson.length) : 0;

  const filteredLessons = applySortFilter(lesson, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredLessons.length === 0;

  return (
    <Page title="Lesson | Bài Giảng VN">
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
                  Add Lesson
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField fullWidth label="Lesson Name" {...getFieldProps('name')} />
                  <TextField fullWidth label="Thể loại" {...getFieldProps('category')} />
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField fullWidth label="Tuần" {...getFieldProps('week')} />
                  <TextField fullWidth label="Môn" {...getFieldProps('subject')} />
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField fullWidth label="Lớp" {...getFieldProps('grade')} />
                  <TextField fullWidth label="Link" {...getFieldProps('link')} />
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField fullWidth label="Giá" {...getFieldProps('price')} />
                  <TextField fullWidth label="Sale" {...getFieldProps('sale')} />
                </Stack>
                <TextField fullWidth label="Image" {...getFieldProps('image')} />
                <TextField
                  fullWidth
                  minRows={3}
                  multiline
                  label="Description"
                  {...getFieldProps('description')}
                />
                <LoadingButton
                  loading={isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Add Lesson
                </LoadingButton>
              </Stack>
            </Box>
          </Form>
        </FormikProvider>
      </Modal>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Lesson
          </Typography>
          <Button
            onClick={handleOpen}
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Icon icon={plusFill} />}
          >
            New Lesson
          </Button>
        </Stack>

        <Card>
          <LessonListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <LessonListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={filteredLessons.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredLessons
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { _id, name, subject, grade, week, category, price, image, isActive } =
                        row;
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
                          <TableCell align="left">{subject}</TableCell>
                          <TableCell align="left">{grade}</TableCell>
                          <TableCell align="left">{week}</TableCell>
                          <TableCell align="left">{category}</TableCell>
                          <TableCell align="left">{price}</TableCell>
                          <TableCell align="left">{isActive ? 'Yes' : 'No'}</TableCell>
                          <TableCell align="right">
                            <LessonMoreMenu
                              data={row}
                              dispatch={dispatch}
                              styleModal={styleModal}
                              onDelete={deleteLesson}
                              onEdit={updateLesson}
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
            count={lesson.length}
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
