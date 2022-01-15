import PropTypes from 'prop-types';
// material
import { Grid } from '@mui/material';
import ShopProductCard from './ProductCard';

// ----------------------------------------------------------------------

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
  addLessonsToCart: PropTypes.func.isRequired
};

export default function ProductList({ addLessonsToCart, products, ...other }) {
  return (
    <Grid container spacing={3} {...other}>
      {products.map((product) => (
        <Grid key={product._id} item xs={12} sm={6} md={3}>
          <ShopProductCard addLessonsToCart={addLessonsToCart} product={product} />
        </Grid>
      ))}
    </Grid>
  );
}
