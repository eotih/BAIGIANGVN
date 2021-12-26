import { useFormik } from 'formik';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
// material
import { Container, Stack, Typography, Link, Breadcrumbs } from '@mui/material';
// components
import Page from '../../components/Page';
import {
  TrashBinDetailSort,
  TrashBinDetailList,
  TrashBinCartWidget
} from '../../components/_dashboard/trash_bin';
//
import { getAllPosts } from '../../functions/Article';

// ----------------------------------------------------------------------

export default function ProductDetails() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [post, setPost] = useState([]);
  useEffect(() => {
    getAllPosts().then((res) => {
      const approved = res.filter((item) => item.StateID === 4);
      setIsLoaded(true);
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
    <Page title="Dashboard: Trash bin | Minimal-UI">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Trash bin
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              Dashboard
            </Link>
            <Link underline="hover" color="inherit" href="../">
              Post
            </Link>
            <Typography color="text.primary">Trash bin</Typography>
          </Breadcrumbs>
        </Typography>

        <Stack
          direction="row"
          flexWrap="wrap-reverse"
          alignItems="center"
          justifyContent="flex-end"
          sx={{ mb: 5 }}
        >
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <TrashBinDetailSort />
          </Stack>
        </Stack>

        <TrashBinDetailList posts={post} />
        <TrashBinCartWidget />
      </Container>
    </Page>
  );
}
