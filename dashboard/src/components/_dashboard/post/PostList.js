import PropTypes from 'prop-types';
// material
import { Grid } from '@mui/material';
import PostCard from './PostCard';

// ----------------------------------------------------------------------

PostList.propTypes = {
  posts: PropTypes.array.isRequired
};

export default function PostList({ posts, ...other }) {
  return (
    <Grid container spacing={3} {...other}>
      {posts.map((post) => (
        <Grid key={post.PostID} item xs={12} sm={6} md={3}>
          <PostCard post={post} />
        </Grid>
      ))}
    </Grid>
  );
}
