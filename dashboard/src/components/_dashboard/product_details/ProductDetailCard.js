import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
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
      <Label
        variant="filled"
        color="error"
        sx={{
          zIndex: 9,
          top: 16,
          right: 16,
          position: 'absolute',
          textTransform: 'uppercase'
        }}
      >
        Out of stock
      </Label>
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
          right: 16,
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
        right: 16,
        position: 'absolute',
        textTransform: 'uppercase'
      }}
    >
      In stock
    </Label>
  );
};
export default function ShopProductCard({ product }) {
  const { ProductName, Image1, ImageID } = product;
  return (
    <Card sx={{ height: '100%' }}>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        <ProductImgStyle alt={ProductName} src={Image1} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link to="#" color="inherit" underline="hover" component={RouterLink}>
          <Typography variant="subtitle2" noWrap>
            Hình {ProductName} {ImageID}
          </Typography>
        </Link>
      </Stack>
    </Card>
  );
}
