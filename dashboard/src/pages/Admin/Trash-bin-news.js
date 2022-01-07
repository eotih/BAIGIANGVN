/* eslint-disable jsx-a11y/label-has-associated-control */
import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
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
  TableContainer,
  TablePagination
} from '@mui/material';
import Badge from '@mui/material/Badge';
import Toast from '../../components/Toast';
// components
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
import {
  TrashbinNewsListHead,
  TrashbinNewsListToolbar,
  TrashbinNewsMoreMenu
} from '../../components/_dashboard/Admin/trash-bin-news';
import { getNews, restoreNews, destroyNews, newsContext } from '../../context';
import { getComparator } from '../../components/tableListComponents';
//

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { _id: 'title', label: 'Title', alignRight: false },
  { _id: 'category', label: 'Category', alignRight: false },
  { _id: 'description', label: 'Description', alignRight: false },
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
  const [openToast, setOpenToast] = useState({
    isOpen: false,
    vertical: 'top',
    message: '',
    color: '',
    horizontal: 'right'
  });
  const handleOpenToast = (newState) => () => {
    setOpenToast({ isOpen: true, ...newState });
  };
  const handleCloseToast = () => {
    setOpenToast({ ...openToast, isOpen: false });
  };
  const { news, status, message, dispatch } = newsContext();
  useEffect(() => {
    dispatch(getNews(dispatch));
    if (message) {
      handleOpenToast({
        isOpen: true,
        message,
        color: status === 200 ? 'success' : 'error',
        vertical: 'top',
        horizontal: 'right'
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
      const newSelecteds = news.map((n) => n.name);
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - news.length) : 0;

  const filteredNews = applySortFilter(news, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredNews.length === 0;
  return (
    <Page title="Trashbin | Bài Giảng VN">
      {openToast.isOpen === true && <Toast open={openToast} handleCloseToast={handleCloseToast} />}
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
