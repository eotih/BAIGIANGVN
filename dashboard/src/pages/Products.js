/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useFormik } from 'formik';
import { useState, useEffect } from 'react';
// material
import { Container, Stack, Typography, Modal, Box, CardMedia, Card, Divider } from '@mui/material';
import { Carousel } from '3d-react-carousal';
import { LoadingButton } from '@mui/lab';
import Label from '../components/Label';
// components
import Page from '../components/Page';
import {
  ProductSort,
  ProductList,
  ProductCartWidget,
  ProductFilterSidebar
} from '../components/_dashboard/products';
import { styleModal } from '../components/tableListComponents';
//
// import Scrollbar from '../components/Scrollbar';
import { getLesson, lessonContext, comboContext, getCombo } from '../context';

// ----------------------------------------------------------------------

export default function Product() {
  const [openFilter, setOpenFilter] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const handleCloseModal = () => setOpenModal(false);
  const handleOpenModal = () => setOpenModal(true);
  const { lesson, dispatch } = lessonContext();
  const { combo, dispatchCombo } = comboContext();
  const [comboLesson, setComboLesson] = useState([]);

  useEffect(() => {
    getLesson(dispatch);
    getCombo(dispatchCombo);
  }, [dispatch, dispatchCombo]);

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

  const handleShowModal = () => (
    <Modal
      keepMounted // Better open performance on mobile.
      open={openModal}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      onClose={() => handleCloseModal()}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={styleModal}>
        <Stack spacing={2}>
          <Stack spacing={2}>
            <Card>
              <CardMedia
                position="absolute"
                component="img"
                height="auto"
                width="100%"
                src={comboLesson.image}
              />
            </Card>
          </Stack>
          <Divider />

          <Stack direction={{ xs: 'column', sm: 'column' }} spacing={2}>
            <Stack direction={{ xs: 'row' }} spacing={1}>
              <Typography variant="h5">{comboLesson.name}</Typography>
              <Label variant="filled" color="error">
                HOT COMBO !!!
              </Label>
            </Stack>
            <Stack direction={{ xs: 'column', sm: 'column' }} spacing={2}>
              <Stack direction={{ xs: 'column' }} spacing={2}>
                <Typography variant="h5">Bao gồm</Typography>
                {comboLesson.lessons.map((item, index) => (
                  <Stack key={index} direction="row" spacing={2}>
                    <Stack direction="column" spacing={2}>
                      <Typography variant="h6">{index}</Typography>
                    </Stack>
                    <Stack direction="column" spacing={2}>
                      <Typography variant="h6">{item.name}</Typography>
                    </Stack>
                  </Stack>
                ))}
              </Stack>
              <Divider />
              <Stack
                direction={{
                  xs: 'column',
                  justifyContent: 'space-between',
                  marginTop: 'auto',
                  sm: 'row'
                }}
                spacing={2}
              >
                <LoadingButton color="error" size="large" type="submit" variant="contained">
                  Giá chỉ còn 239k !
                </LoadingButton>
                <Stack
                  direction={{
                    xs: 'column',
                    justifyContent: 'end',
                    marginTop: 'auto',
                    sm: 'row'
                  }}
                  spacing={2}
                >
                  <LoadingButton size="large" type="submit" variant="contained">
                    Tải xuống ngay !
                  </LoadingButton>
                  <LoadingButton
                    onClick={() => handleCloseModal()}
                    color="error"
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Hủy
                  </LoadingButton>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
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

  return (
    <Page title="Dashboard: Products | Sản phẩm">
      {openModal === true && handleShowModal()}
      <Container maxWidth>
        <Stack>
          <Typography variant="h4" sx={{ mb: 5 }}>
            Gói combo
          </Typography>
          <Carousel
            sx={{
              width: '100%',
              height: 'auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            slides={combo.map((slide) => (
              <img
                onClick={() => {
                  setComboLesson(slide);
                  handleOpenModal();
                }}
                style={{ cursor: 'pointer' }}
                key={slide._id}
                src={slide.image}
                alt={slide.name}
              />
            ))}
          />
        </Stack>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Sản phẩm khác
        </Typography>
        <Stack
          direction="row"
          flexWrap="wrap-reverse"
          alignItems="center"
          justifyContent="flex-end"
          sx={{ mb: 5 }}
        >
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              formik={formik}
              isOpenFilter={openFilter}
              onResetFilter={handleResetFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ProductSort />
          </Stack>
        </Stack>
        <Stack>
          <ProductList products={lesson} />
          <ProductCartWidget />
        </Stack>
      </Container>
    </Page>
  );
}
