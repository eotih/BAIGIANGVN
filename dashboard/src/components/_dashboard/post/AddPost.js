/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-plusplus */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  Container,
  Stack,
  Typography,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CardHeader,
  Button,
  Card,
  Grid,
  Avatar,
  ListItemText,
  OutlinedInput
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import axios from '../../../functions/Axios';
import { getAllField } from '../../../functions/Article';
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

export default function AddPost() {
  const [field, setField] = useState([]);
  const [field2, setField2] = useState([]);
  const handleChange = (event) => {
    formik.setFieldValue('FieldID', event.target.value);
    setField(event.target.value);
  };
  useEffect(() => {
    getAllField().then((res) => {
      setField2(res);
    });
  }, []);
  const handleEditorChange = (content) => {
    formik.setFieldValue('Details', content);
  };
  const Input = styled('input')({
    display: 'none'
  });
  const formik = useFormik({
    initialValues: {
      FieldID: '',
      Title: '',
      Details: '',
      Thumbnail: ''
    },
    onSubmit: () => {
      axios.post(`Article/AddOrEditPost`, formik.values).then((res) => {
        if (res.data.Status === 'Success') {
          alert('Add Post Successfully');
          window.location.reload();
        } else {
          alert('Add Post Failed');
        }
      });
    }
  });

  const { handleSubmit, getFieldProps } = formik;
  return (
    <Page title="Dashboard: Add Post ">
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h3" sx={{ mb: 5 }}>
            Create new Post
          </Typography>
        </Stack>
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                  <Card>
                    <CardHeader
                      avatar={
                        <Avatar aria-label="recipe" style={{ backgroundColor: '#ffa500' }}>
                          <i className="fas fa-pencil-alt" />
                        </Avatar>
                      }
                      title="Title"
                      subheader="Title"
                    />
                    <Box sx={{ p: 3 }}>
                      <Stack direction={{ xs: 'column' }} spacing={2}>
                        <TextField
                          {...getFieldProps('Title')}
                          label="Title"
                          sx={{ bgcolor: '#ffffff', borderRadius: 1 }}
                          variant="outlined"
                        />
                        <Typography variant="h7">Post Description</Typography>
                        <SunEditor
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
                              ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
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
                      </Stack>
                    </Box>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={8} md={4}>
                  <Card sx={{ p: 3, pb: 1 }}>
                    <Stack direction={{ xs: 'column' }} spacing={3}>
                      <FormControl>
                        <InputLabel id="Field-label">Field</InputLabel>
                        <Select
                          sx={{ bgcolor: '#ffffff', borderRadius: 1 }}
                          labelId="Field-label"
                          id="Field"
                          {...getFieldProps('FieldID')}
                          value={field}
                          onChange={handleChange}
                          input={<OutlinedInput label="Field" />}
                          MenuProps={MenuProps}
                        >
                          {field2.map((name, i) => (
                            <MenuItem key={name.FieldID} value={name.FieldID}>
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
                  <LoadingButton
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    sx={{ mt: 5 }}
                  >
                    Add Post
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
