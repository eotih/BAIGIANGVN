import PropTypes from 'prop-types';
// material
import { Grid } from '@mui/material';
import ShopProductCard from './ProductDetailCard';

// ----------------------------------------------------------------------

ProductDetailList.propTypes = {
  products: PropTypes.array.isRequired
};

export default function ProductDetailList({ products, ...other }) {
  return (
    <Grid container spacing={3} {...other}>
      {products.map((product) => (
        <Grid key={product.ImageID} item xs={12} sm={6} md={3}>
          <ShopProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}
