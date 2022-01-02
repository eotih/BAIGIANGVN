/* eslint-disable react/prop-types */
import { LoadingButton } from '@mui/lab';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { Box, Stack, Card, TextField, Divider, CardHeader } from '@mui/material';
// utils
//
// ----------------------------------------------------------------------

export default function ChangePassword() {
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
      console.log('submit');
    }
  });
  const { handleSubmit, isSubmitting, getFieldProps } = formik;
  return (
    <Card>
      <CardHeader title="Đổi mật khẩu" />
      <Box sx={{ p: 2, textAlign: 'right' }}>
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField fullWidth label="Mật khẩu cũ" {...getFieldProps('name')} />
              <TextField fullWidth label="Mật khẩu mới" {...getFieldProps('category')} />
              <TextField fullWidth label="Nhập lại mật khẩu mới" {...getFieldProps('subject')} />
              <Divider />
              <LoadingButton
                loading={isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Đổi mật khẩu
              </LoadingButton>
            </Stack>
          </Form>
        </FormikProvider>
      </Box>
    </Card>
  );
}
