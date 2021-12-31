/* eslint-disable jsx-a11y/label-has-associated-control */
import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { Link as RouterLink } from 'react-router-dom';
import trash from '@iconify/icons-eva/arrow-back-fill';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  Link,
  Breadcrumbs,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  Modal,
  FormControl,
  TextField,
  Box,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  ListItemText,
  TableContainer,
  TablePagination
} from '@mui/material';
import Badge from '@mui/material/Badge';
import { LoadingButton } from '@mui/lab';
// components
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
import {
  TrashbinNewsListHead,
  TrashbinNewsListToolbar,
  TrashbinNewsMoreMenu
} from '../../components/_dashboard/Admin/trash-bin-news';
import {
  getNews,
  restoreNews,
  destroyNews,
  createNews,
  newsContext
} from '../../context/NewsAdminContext';

//

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { _id: 'title', label: 'Title', alignRight: false },
  { _id: 'category', label: 'Category', alignRight: false },
  { _id: 'description', label: 'Description', alignRight: false },
  { _id: '' }
];
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
const CATEGORY_LIST = [
  {
    value: '1',
    label: 'News'
  },
  {
    value: '2',
    label: 'Events'
  },
  {
    value: '3',
    label: 'Announcements'
  }
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
    return filter(array, (_user) => _user.title.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function TrashbinNews() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { news, dispatch } = newsContext();
  const [open, setOpen] = useState(false);
  const [cate, setCategory] = useState([]);
  const handleClose = () => setOpen(false);
  const handleChangeCategory = (event) => {
    formik.setFieldValue('category', event.target.value);
    setCategory(event.target.value);
  };
  useEffect(() => {
    dispatch(getNews(dispatch));
  }, [dispatch]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = news.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      image: '',
      category: ''
    },
    onSubmit: async () => {
      await dispatch(createNews(dispatch, formik.values));
      setOpen(false);
      formik.resetForm();
    }
  });
  const style = {
    position: 'relative',
    borderRadius: '10px',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4
  };
  const { handleSubmit, isSubmitting, getFieldProps } = formik;
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - news.length) : 0;

  const filteredNews = applySortFilter(news, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredNews.length === 0;
  return (
    <Page title="News | Minimal-UI">
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
                  Add News
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField fullWidth label="Title" {...getFieldProps('title')} />
                  <TextField fullWidth label="Image" {...getFieldProps('image')} />
                </Stack>
                <FormControl>
                  <InputLabel id="Field-label">Category</InputLabel>
                  <Select
                    sx={{ bgcolor: '#ffffff', borderRadius: 1 }}
                    labelId="Field-label"
                    id="category"
                    {...getFieldProps('category')}
                    value={cate}
                    name="category"
                    onChange={handleChangeCategory}
                    input={<OutlinedInput label="Category" />}
                    MenuProps={MenuProps}
                  >
                    {CATEGORY_LIST.map((name) => (
                      <MenuItem key={name.value} value={name.label}>
                        <ListItemText primary={name.label} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField fullWidth label="Description" {...getFieldProps('description')} />
                <LoadingButton
                  loading={isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Add News
                </LoadingButton>
              </Stack>
            </Box>
          </Form>
        </FormikProvider>
      </Modal>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" sx={{ mb: 5 }}>
            News
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="inherit" href="/">
                Admin
              </Link>
              <Link underline="hover" color="inherit" href="/admin/news">
                News
              </Link>
              <Typography color="text.primary">Trash_bin</Typography>
            </Breadcrumbs>
          </Typography>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <Badge color="warning">
              <Button
                color="secondary"
                to="../"
                variant="contained"
                component={RouterLink}
                startIcon={<Icon icon={trash} />}
              >
                Quay lại
              </Button>
            </Badge>
          </Stack>
        </Stack>
        <Card>
          <TrashbinNewsListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TrashbinNewsListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={filteredNews.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredNews
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .filter((item) => item.deleted === true)
                    .map((row) => {
                      const { _id, title, category, image, description } = row;
                      const isItemSelected = selected.indexOf(title) !== -1;

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
                              onChange={(event) => handleClick(event, title)}
                            />
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Avatar alt={title} src={image} />
                              <Typography variant="subtitle2" noWrap>
                                {title.slice(0, 50)}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">{category}</TableCell>
                          <TableCell align="left">{description.slice(0, 100)}</TableCell>
                          <TableCell align="right">
                            <TrashbinNewsMoreMenu
                              data={row}
                              dispatch={dispatch}
                              onRestore={restoreNews}
                              onDelete={destroyNews}
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
            count={news.length}
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
