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
  ProductDetailSort,
  ProductDetailList,
  ProductDetailCartWidget,
  ProductDetailFilterSidebar
} from '../../components/_dashboard/product_details';
//
import { GetProductImageByProductName } from '../../functions/Management';

// ----------------------------------------------------------------------

export default function ProductDetails() {
  const { slug } = useParams();
  const [error, setError] = useState(null);
  const [openFilter, setOpenFilter] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [product, setProduct] = useState([]);
  useEffect(() => {
    GetProductImageByProductName(slug).then((res) => {
      setProduct(res);
      setIsLoaded(true);
    });
  }, []);
  const formik = useFormik({
    initialValues: {
      gender: '',
      category: '',
      colors: '',
      priceRange: '',
      rating: ''
    },
    onSubmit: () => {
      setOpenFilter(false);
    }
  });

  const { resetForm, handleSubmit } = formik;

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleResetFilter = () => {
    handleSubmit();
    resetForm();
  };
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
    <Page title="Dashboard: Products Detail | Minimal-UI">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Products Detail
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              Dashboard
            </Link>
            <Link underline="hover" color="inherit" href="../">
              Products
            </Link>
            <Typography color="text.primary">Detail / {slug}</Typography>
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
            <ProductDetailFilterSidebar
              formik={formik}
              isOpenFilter={openFilter}
              onResetFilter={handleResetFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ProductDetailSort />
          </Stack>
        </Stack>

        <ProductDetailList products={product} />
        <ProductDetailCartWidget />
      </Container>
    </Page>
  );
}
