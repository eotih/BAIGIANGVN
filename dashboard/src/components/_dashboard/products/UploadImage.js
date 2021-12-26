/* eslint-disable no-plusplus */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { Stack, Grid, Card, Button, Typography } from '@mui/material';
import React, { useState, memo } from 'react';
import { styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import Avatar from '@mui/material/Avatar';

//--------------------------------------------------------

function UploadImage({ onSubmitProduct }) {
  const [image, setImage] = useState([]);
  const [show, setShow] = useState(false);
  const fileToDataUri = (image) =>
    new Promise((res) => {
      const reader = new FileReader();
      const { type, name, size } = image;
      reader.addEventListener('load', () => {
        res({
          base64: reader.result,
          name,
          type,
          size
        });
      });
      reader.readAsDataURL(image);
    });
  const Input = styled('input')({
    display: 'none'
  });
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card sx={{ p: 5 }}>
            <Stack direction={{ xs: 'column' }} spacing={2}>
              <Typography variant="h3">Upload image for product</Typography>
              <label htmlFor="contained-button-file1">
                <Input
                  accept="image/*"
                  multiple
                  id="contained-button-file1"
                  type="file"
                  onChange={async (e) => {
                    const { files } = e.target;
                    for (let i = 0; i < files.length; i++) {
                      image.push(fileToDataUri(files[i]));
                    }
                    const data = await Promise.all(image);
                    setImage(data);
                  }}
                />
                <Button onClick={() => setShow(!show)} variant="contained" component="span">
                  Upload Image
                </Button>
              </label>
              <Stack direction="row" alignItems="center" justifyContent="center">
                {show && (
                  <Stack direction="row" spacing={2}>
                    {image.map((item, index) => (
                      <Avatar
                        sx={{ width: 56, height: 56 }}
                        key={index}
                        src={item.base64}
                        alt="img"
                      />
                    ))}
                  </Stack>
                )}
              </Stack>
            </Stack>
          </Card>
          <LoadingButton
            onClick={() => onSubmitProduct(image)}
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            sx={{ mt: 5 }}
          >
            Add Product
          </LoadingButton>
        </Grid>
      </Grid>
    </>
  );
}
export default memo(UploadImage);
