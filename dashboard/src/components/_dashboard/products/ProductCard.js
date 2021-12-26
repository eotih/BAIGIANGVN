import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ProductMoreMenu } from '.';
// utils
import { fCurrency } from '../../../utils/formatNumber';
//
import Label from '../../Label';

// ----------------------------------------------------------------------

const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object
};
const convertQuantity = (quantity) => {
  if (quantity === 0) {
    return (
      <>
        <Label
          variant="filled"
          color="warning"
          sx={{
            zIndex: 9,
            top: 16,
            left: 16,
            position: 'absolute',
            textTransform: 'uppercase'
          }}
        >
          Low stock
        </Label>
      </>
    );
  }
  if (quantity < 5) {
    return (
      <Label
        variant="filled"
        color="warning"
        sx={{
          zIndex: 9,
          top: 16,
          left: 16,
          position: 'absolute',
          textTransform: 'uppercase'
        }}
      >
        Low stock
      </Label>
    );
  }
  return (
    <Label
      variant="filled"
      color="success"
      sx={{
        zIndex: 9,
        top: 16,
        left: 16,
        position: 'absolute',
        textTransform: 'uppercase'
      }}
    >
      In stock
    </Label>
  );
};
const convertPriceToPriceSale = (price, priceSale) => price - price * priceSale;
export default function ShopProductCard({ product }) {
  const { ProductID, Name, Thumbnail, Price, Discount, ThuongHieu, Quantity, Slug } = product;
  return (
    <Card sx={{ height: '100%' }}>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        <Label
          variant="filled"
          sx={{
            zIndex: 9,
            top: 16,
            right: 16,
            position: 'absolute',
            textTransform: 'uppercase'
          }}
        >
          <ProductMoreMenu Product={product} />
        </Label>
        {convertQuantity(Quantity)}
        <ProductImgStyle alt={Name} src={Thumbnail} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link to={`./edit/${Slug}`} color="inherit" underline="hover" component={RouterLink}>
          <Typography variant="subtitle2" noWrap>
            {Name}
          </Typography>
          <img alt="thuong hieu" style={{ width: '100px', height: '100%' }} src={ThuongHieu} />
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="subtitle1">
            <Typography
              component="span"
              variant="body1"
              sx={{
                color: 'text.disabled',
                textDecoration: 'line-through'
              }}
            >
              {Price && fCurrency(Price)}
            </Typography>
            &nbsp;
            {fCurrency(convertPriceToPriceSale(Price, Discount))}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
