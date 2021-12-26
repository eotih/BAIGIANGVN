import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import plusFill from '@iconify/icons-eva/plus-fill';
import trash from '@iconify/icons-eva/trash-2-fill';
import { Icon } from '@iconify/react';
import Badge from '@mui/material/Badge';
// material
import { Container, Stack, Typography, Link, Breadcrumbs, Button, Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
// components
import Page from '../../components/Page';
import { PostSort, PostList, PostCartWidget } from '../../components/_dashboard/post';
//
import { getAllPosts } from '../../functions/Article';

// ----------------------------------------------------------------------

export default function Post() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [post, setPost] = useState([]);
  const [countPostDeleted, setCountPostDeleted] = useState([]);
  useEffect(() => {
    getAllPosts().then((res) => {
      const approved = res.filter((item) => item.StateID !== 4);
      const deleted = res.filter((item) => item.StateID === 4);
      setIsLoaded(true);
      setCountPostDeleted(deleted.length);
      setPost(approved);
    });
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (!isLoaded) {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    );
  }
  return (
    <Page title="Dashboard: Post | Hangnoidianhat">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" sx={{ mb: 5 }}>
            Post
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="inherit" href="/">
                Dashboard
              </Link>
              <Typography color="text.primary">Post</Typography>
            </Breadcrumbs>
          </Typography>
          <Button
            to="./add"
            variant="contained"
            component={RouterLink}
            startIcon={<Icon icon={plusFill} />}
          >
            New Post
          </Button>
        </Stack>
        <Stack
          direction="row"
          flexWrap="wrap-reverse"
          alignItems="center"
          justifyContent="flex-end"
          sx={{ mb: 5 }}
        >
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <PostSort />
            <Badge color="warning" badgeContent={countPostDeleted || '0'}>
              <Button
                color="secondary"
                to="./trash_bin"
                variant="contained"
                component={RouterLink}
                startIcon={<Icon icon={trash} />}
              >
                Trash
              </Button>
            </Badge>
          </Stack>
        </Stack>

        <PostList posts={post} />
        <PostCartWidget />
      </Container>
    </Page>
  );
}
