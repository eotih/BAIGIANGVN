/* eslint-disable react-hooks/exhaustive-deps */
import { Icon } from '@iconify/react';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import shoppingCartFill from '@iconify/icons-eva/shopping-cart-fill';
import { useNavigate } from 'react-router-dom';
// material
import { Form, FormikProvider } from 'formik';
import closeFill from '@iconify/icons-eva/close-fill';
import { styled } from '@mui/material/styles';
import {
  Box,
  Badge,
  Stack,
  Drawer,
  CardContent,
  Card,
  Divider,
  IconButton,
  Typography,
  FormGroup
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Scrollbar from '../../Scrollbar';
import Label from '../../Label';
import { numberWithCommas } from '../../../utils/formatMoney';
import { orderContext, createOrder } from '../../../context';
import { toastOpen } from '../../Toast';

// ----------------------------------------------------------------------
export const FILTER_GENDER_OPTIONS = ['Men', 'Women', 'Kids'];
const RootStyle = styled('div')(({ theme }) => ({
  zIndex: 999,
  right: 0,
  display: 'flex',
  cursor: 'pointer',
  position: 'fixed',
  alignItems: 'center',
  top: theme.spacing(16),
  height: theme.spacing(5),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(1.25),
  boxShadow: theme.customShadows.z20,
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.paper,
  borderTopLeftRadius: theme.shape.borderRadiusMd,
  borderBottomLeftRadius: theme.shape.borderRadiusMd,
  transition: theme.transitions.create('opacity'),
  '&:hover': { opacity: 0.72 }
}));

// ----------------------------------------------------------------------
CartWidget.propTypes = {
  isOpenCart: PropTypes.bool,
  onOpenCart: PropTypes.func,
  onCloseCart: PropTypes.func,
  listCart: PropTypes.array,
  deleteCart: PropTypes.func,
  formik: PropTypes.object
};

export default function CartWidget({
  listCart,
  deleteCart,
  isOpenCart,
  onOpenCart,
  onCloseCart,
  formik
}) {
  const [totalPrice, setTotalPrice] = useState(0);
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  const { message, status, dispatchOrder } = orderContext();
  const { openToast, handleOpenToast, renderToast } = toastOpen();
  useEffect(() => {
    if (listCart[0]) {
      const { lessons, combos, totalPrice, user } = listCart[0];
      if (lessons && combos) {
        setCount(lessons.length + combos.length);
      } else if (lessons) {
        setCount(lessons.length);
      } else if (combos) {
        setCount(combos.length);
      }
      setTotalPrice(user.money - totalPrice);
    }
  }, [listCart]);
  useEffect(() => {
    if (message) {
      handleOpenToast({
        message,
        color: status === 200 ? 'success' : 'error'
      })();
    }
  }, [message]);
  const handleSubmitBuy = () => {
    createOrder(dispatchOrder, listCart[0]);
    setTimeout(() => navigate('/dashboard/donhang'), 1000);
  };
  const handleChangeButtons = () => {
    const array = {
      color: 'default',
      buttonText: 'Mua ngay'
    };
    let { color, buttonText } = array;
    if (totalPrice < 0) {
      color = 'warning';
      buttonText = 'Nạp tiền';
    } else {
      color = 'primary';
      buttonText = 'Mua ngay';
    }
    return (
      <>
        <LoadingButton
          onClick={() => (totalPrice >= 0 ? handleSubmitBuy() : console.log(456))}
          fullWidth
          color={color}
          size="large"
          variant="contained"
        >
          {buttonText}
        </LoadingButton>
      </>
    );
  };
  const handleChangeBalance = () => {
    const array = {
      color: 'default',
      text: 'Số dư'
    };
    let { color, text } = array;
    if (totalPrice < 0) {
      color = 'warning';
      text = 'Còn thiếu:';
    } else {
      color = 'primary';
      text = 'Số dư:';
    }
    return (
      <>
        <Stack justifyContent="space-between" direction={{ xs: 'row', sm: 'row' }} spacing={2}>
          <Typography variant="h6">{text} </Typography>
          <Label color={color} variant="filled">
            {numberWithCommas(totalPrice)} VND
          </Label>
        </Stack>
      </>
    );
  };

  return (
    <>
      {openToast.isOpen === true && renderToast()}
      <RootStyle>
        <Badge onClick={onOpenCart} showZero badgeContent={count} color="error" max={99}>
          <Icon icon={shoppingCartFill} width={24} height={24} />
        </Badge>
      </RootStyle>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate>
          <Drawer
            anchor="right"
            open={isOpenCart}
            onClose={onCloseCart}
            PaperProps={{
              sx: { width: 300, border: 'none', overflow: 'hidden' }
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ px: 1, py: 2 }}
            >
              <Stack direction="row" spacing={1}>
                <Typography variant="subtitle1" sx={{ ml: 1 }}>
                  Giỏ hàng
                </Typography>
                <Icon icon={shoppingCartFill} width={24} height={24} />
              </Stack>
              <IconButton onClick={onCloseCart}>
                <Icon icon={closeFill} width={20} height={20} />
              </IconButton>
            </Stack>

            <Divider />

            <Scrollbar>
              <Stack spacing={3} sx={{ p: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Danh sách Combo
                </Typography>
                <FormGroup>
                  {listCart[0] && listCart[0].combos && listCart[0].combos.length > 0 ? (
                    listCart[0].combos.map((combo) => (
                      <Card
                        key={combo._id}
                        xs={{
                          mb: 2,
                          width: '100%',
                          maxWidth: '100%',
                          minWidth: '100%'
                        }}
                      >
                        <Stack direction="column" spacing={2}>
                          <img src={combo.image} alt={combo.name} sx={{ width: 151 }} spacing={2} />
                          <Stack direction={{ xs: 'row', sm: 'row' }} spacing={2}>
                            <CardContent sx={{ flex: '0 1 auto' }}>
                              <Typography variant="subtitle1" gutterBottom>
                                {combo.name}
                              </Typography>
                              <Typography variant="subtitle2" gutterBottom>
                                {combo.price}
                              </Typography>
                              <IconButton
                                onClick={() => {
                                  console.log(combo._id);
                                }}
                              >
                                <Icon icon={closeFill} width={20} height={20} />
                              </IconButton>
                            </CardContent>
                          </Stack>
                        </Stack>
                      </Card>
                    ))
                  ) : (
                    <Typography variant="subtitle">Không có combo nào</Typography>
                  )}
                </FormGroup>
                <Divider />
              </Stack>
              <Stack spacing={3} sx={{ p: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Danh sách Khóa học
                </Typography>
                <FormGroup>
                  {listCart[0] && listCart[0].lessons ? (
                    listCart[0].lessons.map((lesson) => (
                      <Card
                        xs={{
                          mb: 2,
                          width: '100%',
                          maxWidth: '100%',
                          minWidth: '100%'
                        }}
                        key={lesson._id}
                      >
                        <Stack direction="column" spacing={2}>
                          <img
                            src={lesson.image}
                            alt={lesson.name}
                            sx={{ width: 151 }}
                            spacing={2}
                          />
                          <Stack direction={{ xs: 'row', sm: 'row' }} spacing={2}>
                            <CardContent sx={{ flex: '0 1 auto' }}>
                              <Typography variant="subtitle1" gutterBottom>
                                {lesson.name}
                              </Typography>
                              <Typography variant="subtitle2" gutterBottom>
                                {lesson.price}
                              </Typography>
                              <IconButton
                                onClick={() => {
                                  deleteCart(lesson._id);
                                }}
                              >
                                <Icon icon={closeFill} width={20} height={20} />
                              </IconButton>
                            </CardContent>
                          </Stack>
                        </Stack>
                      </Card>
                    ))
                  ) : (
                    <Typography variant="subtitle">Không có khóa học nào</Typography>
                  )}
                </FormGroup>
                <Divider />
              </Stack>
            </Scrollbar>
            <Box sx={{ p: 3 }}>
              <Stack mb={2} spacing={2}>
                <Stack
                  justifyContent="space-between"
                  direction={{ xs: 'row', sm: 'row' }}
                  spacing={2}
                >
                  <Typography variant="h6">Khả dụng: </Typography>
                  <Label color="primary" variant="filled">
                    {listCart[0] && listCart[0].user && listCart[0].user.money
                      ? numberWithCommas(listCart[0].user.money)
                      : 0}{' '}
                    VND
                  </Label>
                </Stack>
                <Stack
                  justifyContent="space-between"
                  direction={{ xs: 'row', sm: 'row' }}
                  spacing={2}
                >
                  <Typography variant="h6">Tiền tài liệu: </Typography>
                  <Label color="error" variant="filled">
                    -{' '}
                    {listCart[0] && listCart[0].totalPrice
                      ? numberWithCommas(listCart[0].totalPrice)
                      : 0}{' '}
                    VND
                  </Label>
                </Stack>
                <Divider />
                {handleChangeBalance()}
              </Stack>
              <Stack
                direction={{
                  xs: 'column',
                  justifyContent: 'end',
                  marginTop: 'auto',
                  sm: 'row'
                }}
                spacing={2}
              >
                {handleChangeButtons()}
                <LoadingButton
                  onClick={() => onCloseCart()}
                  color="error"
                  size="large"
                  variant="contained"
                >
                  Hủy
                </LoadingButton>
              </Stack>
            </Box>
          </Drawer>
        </Form>
      </FormikProvider>
    </>
  );
}
