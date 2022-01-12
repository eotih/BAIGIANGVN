import { Icon } from '@iconify/react';
import PropTypes from 'prop-types';
import shoppingCartFill from '@iconify/icons-eva/shopping-cart-fill';
// material
import { Form, FormikProvider } from 'formik';
import closeFill from '@iconify/icons-eva/close-fill';
import { styled } from '@mui/material/styles';
import {
  Box,
  Badge,
  Stack,
  Drawer,
  Checkbox,
  Divider,
  IconButton,
  FormControlLabel,
  Typography,
  FormGroup
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Scrollbar from '../../Scrollbar';
import Label from '../../Label';

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
  formik: PropTypes.object
};

export default function CartWidget({ isOpenCart, onOpenCart, onCloseCart, formik }) {
  const { values, getFieldProps } = formik;
  return (
    <>
      <RootStyle>
        <Badge onClick={onOpenCart} showZero badgeContent={0} color="error" max={99}>
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
              sx: { width: 280, border: 'none', overflow: 'hidden' }
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
                <div>
                  <Typography variant="subtitle1" gutterBottom>
                    Danh sách sản phẩm
                  </Typography>
                  <FormGroup>
                    {FILTER_GENDER_OPTIONS.map((item) => (
                      <FormControlLabel
                        key={item}
                        control={
                          <Checkbox
                            {...getFieldProps('gender')}
                            value={item}
                            checked={values.gender.includes(item)}
                          />
                        }
                        label={item}
                      />
                    ))}
                  </FormGroup>
                </div>
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
                    31213213
                  </Label>
                </Stack>
                <Stack
                  justifyContent="space-between"
                  direction={{ xs: 'row', sm: 'row' }}
                  spacing={2}
                >
                  <Typography variant="h6">Tiền tài liệu: </Typography>
                  <Label color="error" variant="filled">
                    - 12312313
                  </Label>
                </Stack>
                <Divider />
                <Stack
                  justifyContent="space-between"
                  direction={{ xs: 'row', sm: 'row' }}
                  spacing={2}
                >
                  <Typography variant="h6">Số dư </Typography>
                  <Label color="primary" variant="filled">
                    2343242
                  </Label>
                </Stack>
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
                <LoadingButton size="large" type="submit" variant="contained">
                  Thanh toán
                </LoadingButton>
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
