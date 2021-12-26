import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { PostMoreMenu } from '.';
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

PostCard.propTypes = {
  product: PropTypes.object
};
const convertState = (state) => {
  if (state === 'NotApproved') {
    return (
      <Label
        variant="filled"
        color="error"
        sx={{
          zIndex: 9,
          top: 16,
          left: 16,
          position: 'absolute',
          textTransform: 'uppercase'
        }}
      >
        Not Approved
      </Label>
    );
  }
  if (state === 'Pending') {
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
        Pending
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
      Approved
    </Label>
  );
};
export default function PostCard({ post }) {
  const { PostID, Title, Thumbnail, TrangThai, LinhVuc, Slug } = post;
  return (
    <Card>
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
          <PostMoreMenu Post={post} />
        </Label>
        {convertState(TrangThai)}
        <ProductImgStyle alt={Title} src={Thumbnail} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link to={`edit/${Slug}`} color="inherit" underline="hover" component={RouterLink}>
          <Typography variant="subtitle2" noWrap>
            {Title}
          </Typography>
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="subtitle1">{LinhVuc}</Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
