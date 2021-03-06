/* eslint-disable react-hooks/exhaustive-deps */
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
import { toastOpen } from '../components/Toast';
//
// import Scrollbar from '../components/Scrollbar';
import {
  getLesson,
  lessonContext,
  comboContext,
  getCombo,
  getCart,
  deleteCart,
  createOrUpdateCart,
  cartContext
} from '../context';

// ----------------------------------------------------------------------

export default function Product() {
  const [openFilter, setOpenFilter] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [comboLesson, setComboLesson] = useState([]);
  const handleCloseModal = () => setOpenModal(false);
  const handleOpenModal = () => setOpenModal(true);
  const { lesson, dispatch } = lessonContext();
  const { combo, dispatchCombo } = comboContext();
  const { cart, message, status, dispatchCart } = cartContext();
  const { openToast, handleOpenToast, renderToast } = toastOpen();
  useEffect(() => {
    getCart(dispatchCart);
    if (message) {
      handleOpenToast({
        message,
        color: status === 200 ? 'success' : 'error'
      })();
    }
  }, [dispatchCart, message]);
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
  const handleAddComboToCart = (item) => {
    createOrUpdateCart(dispatchCart, {
      combos: item._id
    });
    handleCloseModal();
  };
  const handleAddLessonsToCart = (item) => {
    createOrUpdateCart(dispatchCart, {
      lessons: item._id
    });
    handleCloseModal();
  };
  // const handleRemoveComboToCart = (item) => {
  //   deleteCart(dispatchCart, {
  //     combos: item._id
  //   });
  //   handleCloseModal();
  // };
  // const handleRemoveLessonsToCart = (item) => {
  //   deleteCart(dispatchCart, {
  //     lessons: item._id
  //   });
  //   handleCloseModal();
  // };
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
                <Typography variant="h5">Bao g???m</Typography>
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
                  Gi?? ch??? c??n 239k !
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
                  <LoadingButton
                    onClick={() => handleAddComboToCart(comboLesson)}
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Th??m v??o gi??? h??ng
                  </LoadingButton>
                  <LoadingButton
                    onClick={() => handleCloseModal()}
                    color="error"
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    H???y
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
  const handleOpenCart = () => {
    setOpenCart(true);
  };

  const handleCloseCart = () => {
    setOpenCart(false);
  };

  const handleResetCart = () => {
    handleSubmit();
    resetForm();
  };
  return (
    <Page title="Dashboard: Products | S???n ph???m">
      {openModal === true && handleShowModal()}
      {openToast.isOpen === true && renderToast()}
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          G??i combo
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
        <Typography variant="h4" sx={{ mb: 5 }}>
          S???n ph???m kh??c
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
        <ProductList addLessonsToCart={handleAddLessonsToCart} products={lesson} />
        <ProductCartWidget
          listCart={cart}
          deleteCart={deleteCart}
          formik={formik}
          isOpenCart={openCart}
          onResetCart={handleResetCart}
          onOpenCart={handleOpenCart}
          onCloseCart={handleCloseCart}
        />
      </Container>
    </Page>
  );
}
