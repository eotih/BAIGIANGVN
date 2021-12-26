/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  Container,
  Stack,
  Typography,
  Box,
  TextField,
  FormControl,
  Breadcrumbs,
  Link,
  InputLabel,
  Select,
  MenuItem,
  Input,
  CardHeader,
  Button,
  Card,
  Grid,
  Avatar,
  ListItemText,
  OutlinedInput
} from '@mui/material';
import { useFormik, Form, FormikProvider } from 'formik';
import SunEditor from 'suneditor-react';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import axios from '../../../functions/Axios';
import { getProductBySlug } from '../../../functions/Management';
import { getAllBrands, getAllCategory } from '../../../functions/Component';
import Page from '../../Page';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

export default function EditProduct() {
  const { slug } = useParams();
  const [category, setCategory] = useState([]);
  const [category2, setCategory2] = useState([]);
  const [brand, setBrand] = useState([]);
  const [content, setContent] = useState('');
  const [description, setDescription] = useState('');
  const [brand2, setBrand2] = useState([]);
  const handleChangeCategory = (event) => {
    formik.setFieldValue('CategoryID', event.target.value);
    setCategory(event.target.value);
  };
  const handleChangeBrand = (event) => {
    formik.setFieldValue('BrandID', event.target.value);
    setBrand(event.target.value);
  };
  useEffect(() => {
    getAllCategory().then((res) => {
      setCategory2(res);
    });
    getAllBrands().then((res) => {
      setBrand2(res);
    });
    getProductBySlug(slug)
      .then((res) => {
        formik.setFieldValue('Name', res.Name);
        formik.setFieldValue('ProductID', res.ProductID);
        formik.setFieldValue('AccountID', res.AccountID);
        formik.setFieldValue('CategoryID', res.CategoryID);
        formik.setFieldValue('Details', res.Details);
        formik.setFieldValue('Description', res.Description);
        formik.setFieldValue('Price', res.Price);
        formik.setFieldValue('BrandID', res.BrandID);
        formik.setFieldValue('Thumbnail', res.Thumbnail);
        formik.setFieldValue('Discount', res.Discount);
        formik.setFieldValue('Quantity', res.Quantity);
        formik.setFieldValue('ImportPrice', res.ImportPrice);
        formik.setFieldValue('Sold', res.Sold);
        setBrand(res.BrandID);
        setCategory(res.CategoryID);
        setContent(res.Details);
        setDescription(res.Description);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleEditorChange = (content) => {
    formik.setFieldValue('Details', content);
  };
  const handleEditorChangeDescription = (content) => {
    formik.setFieldValue('Description', content);
  };
  const Input = styled('input')({
    display: 'none'
  });
  const formik = useFormik({
    initialValues: {
      Name: '',
      ProductID: '',
      CategoryID: '',
      Description: '',
      AccountID: '',
      Price: '',
      BrandID: '',
      Thumbnail: '',
      Discount: '',
      Quantity: '',
      ImportPrice: '',
      Details: ''
    },
    onSubmit: () => {
      axios.post(`Management/AddOrEditProduct`, formik.values).then((res) => {
        if (res.data.Status === 'Updated') {
          alert('Edit Product Successfully');
          window.location.href = '../';
        } else {
          alert('Edit Product Failed');
        }
      });
    }
  });
  const { handleSubmit, getFieldProps } = formik;
  return (
    <Page title="Dashboard: Add Products ">
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h3" sx={{ mb: 5 }}>
            Edit product
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="inherit" href="/">
                Dashboard
              </Link>
              <Link underline="hover" color="inherit" href="../">
                Post
              </Link>
              <Typography color="text.primary">Edit / {slug}</Typography>
            </Breadcrumbs>
          </Typography>
        </Stack>
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                  <Card sx={{ p: 3, pb: 1 }}>
                    <Stack direction={{ xs: 'column' }} spacing={2}>
                      <Typography variant="h7">Product Name</Typography>
                      <TextField
                        disabled
                        {...getFieldProps('Name')}
                        sx={{ bgcolor: '#ffffff', borderRadius: 1 }}
                        variant="outlined"
                      />
                      <Typography variant="h7">Product Description</Typography>
                      <Stack direction={{ xs: 'row' }} spacing={2}>
                        {content && (
                          <SunEditor
                            setContents={content}
                            onChange={handleEditorChange}
                            autoFocus
                            height="100%"
                            setOptions={{
                              showPathLabel: false,
                              minHeight: '50vh',
                              maxHeight: '50vh',
                              placeholder: 'Enter your text here!!!',
                              buttonList: [
                                ['undo', 'redo'],
                                ['font', 'fontSize', 'formatBlock'],
                                ['paragraphStyle'],
                                [
                                  'bold',
                                  'underline',
                                  'italic',
                                  'strike',
                                  'subscript',
                                  'superscript'
                                ],
                                ['fontColor', 'hiliteColor'],
                                ['removeFormat'],
                                '/', // Line break
                                ['outdent', 'indent'],
                                ['align', 'horizontalRule', 'list', 'lineHeight'],
                                ['table', 'link', 'image']
                              ],
                              formats: ['p', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
                              font: [
                                'Arial',
                                'Calibri',
                                'Comic Sans',
                                'Courier',
                                'Garamond',
                                'Georgia',
                                'Impact',
                                'Lucida Console',
                                'Palatino Linotype',
                                'Segoe UI',
                                'Tahoma',
                                'Times New Roman',
                                'Trebuchet MS'
                              ]
                            }}
                            // {...getFieldProps('Details')}
                            variant="outlined"
                          />
                        )}
                        {description && (
                          <SunEditor
                            setContents={description}
                            onChange={handleEditorChangeDescription}
                            autoFocus
                            height="100%"
                            setOptions={{
                              showPathLabel: false,
                              minHeight: '50vh',
                              maxHeight: '50vh',
                              placeholder: 'Enter your text here!!!',
                              buttonList: [
                                ['undo', 'redo'],
                                ['font', 'fontSize', 'formatBlock'],
                                ['paragraphStyle'],
                                [
                                  'bold',
                                  'underline',
                                  'italic',
                                  'strike',
                                  'subscript',
                                  'superscript'
                                ],
                                ['fontColor', 'hiliteColor'],
                                ['removeFormat'],
                                '/', // Line break
                                ['outdent', 'indent'],
                                ['align', 'horizontalRule', 'list', 'lineHeight'],
                                ['table', 'link', 'image']
                              ],
                              formats: ['p', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
                              font: [
                                'Arial',
                                'Calibri',
                                'Comic Sans',
                                'Courier',
                                'Garamond',
                                'Georgia',
                                'Impact',
                                'Lucida Console',
                                'Palatino Linotype',
                                'Segoe UI',
                                'Tahoma',
                                'Times New Roman',
                                'Trebuchet MS'
                              ]
                            }}
                            // {...getFieldProps('Details')}
                            variant="outlined"
                          />
                        )}
                      </Stack>
                    </Stack>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={8} md={4}>
                  <Card sx={{ p: 3, pb: 1 }}>
                    <Stack direction={{ xs: 'column' }} spacing={3}>
                      <FormControl>
                        <InputLabel id="Brand-label">Brand</InputLabel>
                        <Select
                          sx={{ bgcolor: '#ffffff', borderRadius: 1 }}
                          labelId="BrandID-label"
                          label="Brand"
                          id="BrandID"
                          {...getFieldProps('Brand')}
                          value={brand}
                          onChange={handleChangeBrand}
                          input={<OutlinedInput label="Brand" />}
                          MenuProps={MenuProps}
                        >
                          {brand2.map((name, i) => (
                            <MenuItem key={name.BrandID} value={name.BrandID}>
                              <ListItemText primary={name.Name} />
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <FormControl>
                        <InputLabel id="Category-label">Category</InputLabel>
                        <Select
                          sx={{ bgcolor: '#ffffff', borderRadius: 1 }}
                          labelId="CategoryID-label"
                          label="Category"
                          id="CategoryID"
                          {...getFieldProps('CategoryID')}
                          value={category}
                          onChange={handleChangeCategory}
                          input={<OutlinedInput label="Category" />}
                          MenuProps={MenuProps}
                        >
                          {category2.map((name, i) => (
                            <MenuItem key={name.CategoryID} value={name.CategoryID}>
                              <ListItemText primary={name.Name} />
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <Stack direction="row" alignItems="center" justifyContent="center">
                        <label htmlFor="contained-button-file">
                          <Input
                            id="contained-button-file"
                            type="file"
                            onChange={(e) => {
                              const { files } = e.target;
                              const reader = new FileReader();
                              reader.readAsDataURL(files[0]);
                              reader.onload = (e) => {
                                formik.setFieldValue('Thumbnail', e.target.result);
                              };
                            }}
                          />
                          <Button variant="contained" component="span">
                            Upload Thumbnail
                          </Button>
                        </label>
                        <Avatar
                          src={formik.values.Thumbnail}
                          sx={{ width: '100px', height: '100%', ml: 5 }}
                        />
                      </Stack>
                    </Stack>
                  </Card>
                  <Card sx={{ p: 3, mt: 5 }}>
                    <Stack direction={{ xs: 'row' }} spacing={2} justifyContent="center">
                      <Stack direction={{ xs: 'row' }} spacing={2}>
                        <TextField
                          type="number"
                          sx={{ bgcolor: '#ffffff', borderRadius: 1 }}
                          label="Price"
                          {...getFieldProps('Price')}
                          variant="outlined"
                        />
                        <TextField
                          type="number"
                          sx={{ bgcolor: '#ffffff', borderRadius: 1 }}
                          label="Discount %"
                          {...getFieldProps('Discount')}
                          variant="outlined"
                        />
                      </Stack>
                    </Stack>
                  </Card>
                  <LoadingButton
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    sx={{ mt: 5 }}
                  >
                    Edit Product
                  </LoadingButton>
                </Grid>
              </Grid>
            </Box>
          </Form>
        </FormikProvider>
      </Container>
    </Page>
  );
}
