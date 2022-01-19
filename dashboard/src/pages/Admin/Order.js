/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { filter } from 'lodash';
import { useState, useEffect } from 'react';
import { sentenceCase } from 'change-case';
// material
import {
  Card,
  Table,
  Stack,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Avatar,
  Container,
  Typography,
  TableContainer,
  TablePagination
} from '@mui/material';
// components
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import { toastOpen } from '../../components/Toast';
import Label from '../../components/Label';
import SearchNotFound from '../../components/SearchNotFound';
import {
  OrderListHead,
  OrderListToolbar,
  OrderMoreMenu
} from '../../components/_dashboard/Admin/order';
import { getOrder, orderContext, updateOrder } from '../../context';
import { numberWithCommas } from '../../utils/formatMoney';
import { getComparator, styleModal, MenuProps } from '../../components/tableListComponents';

const TABLE_HEAD = [
  { _id: 'name', label: 'Name', alignRight: false },
  { _id: 'lessons', label: 'Lessons', alignRight: false },
  { _id: 'combos', label: 'Combos', alignRight: false },
  { _id: 'totalPrice', label: 'Total', alignRight: false },
  { _id: 'note', label: 'Note', alignRight: false },
  { _id: 'state', label: 'State', alignRight: false },
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

export default function Order() {
  const [page, setPage] = useState(0);
  const [orderFilter, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('state');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { order, status, message, dispatchOrder } = orderContext();
  const { openToast, handleOpenToast, renderToast } = toastOpen();
  useEffect(() => {
    getOrder(dispatchOrder);
    // if have message
    if (message) {
      handleOpenToast({
        message,
        color: status === 200 ? 'success' : 'error'
      })();
    }
  }, [dispatchOrder, message, status]);
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && orderFilter === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = orderFilter.map((n) => n.description);
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - order.length) : 0;

  const filteredOrder = applySortFilter(order, getComparator(orderFilter, orderBy), filterName);

  const isUserNotFound = filteredOrder.length === 0;

  return (
    <Page title="Bank | Bài Giảng VN">
      {openToast.isOpen === true && renderToast()}
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Order
          </Typography>
        </Stack>

        <Card>
          <OrderListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <OrderListHead
                  order={orderFilter}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={filteredOrder.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredOrder
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { _id, user, state, note, totalPrice, combos, lessons } = row;
                      const isItemSelected = selected.indexOf(user.name) !== -1;
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
                              onChange={(event) => handleClick(event, user.name)}
                            />
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Avatar alt={user.name} src={user.image} />
                              <Typography variant="subtitle2" noWrap>
                                {user.name}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">
                            {lessons.map((res) => (
                              <Label variant="filled" color="info" key={res._id}>
                                {res.name}
                              </Label>
                            ))}
                          </TableCell>
                          <TableCell align="left">
                            {combos.map((res) => (
                              <Label variant="filled" color="info" key={res._id}>
                                {res.name}
                              </Label>
                            ))}
                          </TableCell>
                          <TableCell align="left">{numberWithCommas(totalPrice)} VND</TableCell>
                          <TableCell align="left">{note}</TableCell>
                          <TableCell align="left">
                            <Label
                              variant="ghost"
                              color={
                                (state === 'Pending' && 'warning') ||
                                (state === 'Denied' && 'error') ||
                                'success'
                              }
                            >
                              {sentenceCase(state)}
                            </Label>
                          </TableCell>
                          <TableCell align="right">
                            <OrderMoreMenu
                              data={row}
                              MenuProps={MenuProps}
                              styleModal={styleModal}
                              dispatch={dispatchOrder}
                              onEdit={updateOrder}
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
            count={order.length}
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
