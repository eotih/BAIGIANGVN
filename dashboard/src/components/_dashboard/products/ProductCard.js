/* eslint-disable no-nested-ternary */
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { LoadingButton } from '@mui/lab';
// material
import {
  Box,
  Card,
  Link,
  Typography,
  Stack,
  Modal,
  Divider,
  CardMedia,
  TextField
} from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
import { fCurrency } from '../../../utils/formatNumber';
import Scrollbar from '../../Scrollbar';
//
import Label from '../../Label';
import { styleModal } from '../../tableListComponents';

// import ColorPreview from '../../ColorPreview';

// ----------------------------------------------------------------------

const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});
const styleCard = {
  transition: 'all 0.3s ease-in-out',
  // hover and scale
  '&:hover': {
    zIndex: 3,
    cursor: 'pointer',
    transform: 'scale(1.3)',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
    transition: 'all 0.3s ease-in-out'
  }
};
const hoverZoomIn = {
  '&:hover': {
    zIndex: 3,
    cursor: 'pointer',
    transform: 'scale(1.3)',
    transition: 'all 0.3s ease-in-out'
  }
};
// ----------------------------------------------------------------------
ShopProductCard.propTypes = {
  product: PropTypes.object
};

export default function ShopProductCard({ product }) {
  const { name, image, price, sale, description, week, grade, category, subject } = product;
  const [open, setOpen] = useState(false);
  const [openModalConfirm, setOpenModalConfirm] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const totalPrice = (price * 80) / 100;
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);
  const handleLoadMore = () => setLoadMore(true);
  const handleShowLess = () => setLoadMore(false);
  const handleOpenModalConfirm = () => setOpenModalConfirm(true);
  const handleCloseModalConfirm = () => setOpenModalConfirm(false);
  // const handleSubmitBuyCourse = () => {
  //   alert('Nhìn cc');
  // };
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      image: '',
      price: '',
      week: '',
      subject: '',
      grade: '',
      link: '',
      category: '',
      sale: ''
    },
    onSubmit: async () => {
      // await createLesson(dispatch, formik.values);
      console.log(formik.values);
      // formik.resetForm();
      // handleCloseModal();
      // handleCloseModalConfirm();
    }
  });
  const { handleSubmit, isSubmitting, getFieldProps } = formik;
  const styleBoxModal = {
    position: 'relative',
    display: 'flex',
    overflow: 'hidden',
    borderRadius: '20px',
    // maxWidth: '70%',
    // minWidth: '50%',
    // width: '100%',
    // height: '100%',
    margin: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4
  };
  const styleBigModal = {
    borderRadius: '20px',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'fixed'
  };
  const ScrollbarStyle = {
    position: 'relative',
    display: 'flex',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '20px'
  };
  return (
    <Card sx={styleCard}>
      <Modal
        keepMounted // Better open performance on mobile.
        open={open}
        sx={styleBigModal}
        onClose={() => handleCloseModal()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Scrollbar sx={ScrollbarStyle}>
          <Box sx={styleBoxModal}>
            <Stack
              sx={{
                width: '100%',
                height: '100%'
              }}
              spacing={2}
            >
              <Stack direction={{ xs: 'column', sm: 'column' }} spacing={2}>
                <Label
                  variant="filled"
                  onClick={() => handleCloseModal()}
                  color="error"
                  sx={{
                    zIndex: 9,
                    top: 16,
                    right: 16,
                    // transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      zIndex: 3,
                      cursor: 'pointer',
                      transform: 'scale(1.3)',
                      transition: 'all 0.3s ease-in-out'
                    },
                    position: 'absolute',
                    textTransform: 'uppercase'
                  }}
                >
                  X
                </Label>
                <Card>
                  <CardMedia
                    position="absolute"
                    component="iframe"
                    height="450px"
                    minWidth="100%"
                    type="video/mp4"
                    // controls
                    // autoPlay
                    // src="https://www.youtube.com/embed/FPNgfdKHCh4"
                  />
                </Card>
              </Stack>
              <Divider />
              <Stack direction={{ xs: 'column', sm: 'column' }} spacing={2}>
                <Stack direction={{ xs: 'column' }} spacing={1}>
                  <Typography variant="h5">{name}</Typography>
                  <Stack direction={{ xs: 'row' }} spacing={1}>
                    <Label sx={hoverZoomIn} variant="filled" color="primary">
                      Tuần: {week}
                    </Label>
                    <Label sx={hoverZoomIn} variant="filled" color="secondary">
                      Lớp: {grade}
                    </Label>
                    <Label sx={hoverZoomIn} variant="filled" color="error">
                      Thể loại: {category}
                    </Label>
                    <Label sx={hoverZoomIn} variant="filled" color="warning">
                      Môn học: {subject}
                    </Label>
                  </Stack>
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'column' }} spacing={2}>
                  <Stack direction={{ xs: 'column' }} spacing={2}>
                    <Typography variant="h5">Mô tả</Typography>
                    {loadMore === false && description.length > 300 ? (
                      <Typography variant="body">
                        {description.slice(0, 300)}...
                        <Typography
                          onClick={() => handleLoadMore()}
                          sx={{ cursor: 'pointer' }}
                          variant="body2"
                        >
                          {' '}
                          Xem thêm
                        </Typography>
                      </Typography>
                    ) : loadMore === true ? (
                      <Typography variant="body">
                        {description}
                        <Typography
                          onClick={() => handleShowLess()}
                          sx={{ cursor: 'pointer' }}
                          variant="body2"
                        >
                          {' '}
                          Thu hồi
                        </Typography>
                      </Typography>
                    ) : (
                      <Typography variant="body">{description}</Typography>
                    )}
                  </Stack>
                  <Divider />
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
                      onClick={() => handleOpenModalConfirm()}
                      size="large"
                      type="submit"
                      variant="contained"
                    >
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
          </Box>
        </Scrollbar>
      </Modal>
      <Modal
        keepMounted // Better open performance on mobile.
        open={openModalConfirm}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onClose={() => handleCloseModalConfirm()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Box sx={styleModal}>
              <Stack spacing={2}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Add Lesson
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField fullWidth label="Lesson Name" {...getFieldProps('name')} />
                  <TextField fullWidth label="Thể loại" {...getFieldProps('category')} />
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField fullWidth label="Tuần" {...getFieldProps('week')} />
                  <TextField fullWidth label="Môn" {...getFieldProps('subject')} />
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField fullWidth label="Lớp" {...getFieldProps('grade')} />
                  <TextField fullWidth label="Link" {...getFieldProps('link')} />
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField fullWidth label="Giá" {...getFieldProps('price')} />
                  <TextField fullWidth label="Sale" {...getFieldProps('sale')} />
                </Stack>
                <TextField fullWidth label="Image" {...getFieldProps('image')} />
                <TextField
                  fullWidth
                  minRows={3}
                  multiline
                  label="Description"
                  {...getFieldProps('description')}
                />
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <LoadingButton
                    loading={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Add Lesson
                  </LoadingButton>
                  <LoadingButton
                    onClick={() => handleCloseModalConfirm()}
                    color="error"
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Hủy
                  </LoadingButton>
                </Stack>
              </Stack>
            </Box>
          </Form>
        </FormikProvider>
      </Modal>
      <Card onClick={() => handleOpenModal()}>
        <Box sx={{ pt: '100%', position: 'relative' }}>
          {sale && (
            <Label
              variant="filled"
              color={sale && 'info'}
              sx={{
                zIndex: 9,
                top: 16,
                right: 16,
                position: 'absolute',
                textTransform: 'uppercase'
              }}
            >
              Sale {sale} %
            </Label>
          )}
          <ProductImgStyle alt={name} src={image} />
        </Box>
        <Stack spacing={2} sx={{ p: 3 }}>
          <Link to="#" color="inherit" underline="hover" component={RouterLink}>
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Link>

          <Stack direction="row" alignItems="center" justifyContent="space-between">
            {/* <ColorPreview colors={colors} /> */}
            <Typography variant="subtitle1">
              <Typography
                component="span"
                variant="body1"
                sx={{
                  color: 'text.disabled',
                  textDecoration: 'line-through'
                }}
              >
                {price && fCurrency(price)}
              </Typography>
              &nbsp;
              {fCurrency(totalPrice)} VND
            </Typography>
          </Stack>
        </Stack>
      </Card>
    </Card>
  );
}
