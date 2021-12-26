import PropTypes from 'prop-types';
// material
import { Grid } from '@mui/material';
import TrashBinDetailCard from './TrashBinDetailCard';

// ----------------------------------------------------------------------

TrashBinDetailList.propTypes = {
  products: PropTypes.array.isRequired
};

export default function TrashBinDetailList({ posts, ...other }) {
  return (
    <Grid container spacing={3} {...other}>
      {posts.map((post) => (
        <Grid key={post.PostID} item xs={12} sm={6} md={3}>
          <TrashBinDetailCard post={post} />
        </Grid>
      ))}
    </Grid>
  );
}
