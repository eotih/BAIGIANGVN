/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { LoadingButton } from '@mui/lab';
import { useFormik, Form, FormikProvider } from 'formik';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
// material
import { Box, Stack, Card, TextField, Divider, CardHeader } from '@mui/material';
import axios from '../../../constants/axios';
import { configNormal } from '../../../context/ConfigHeader';
// utils
//
// ----------------------------------------------------------------------
ChangePassword.protoType = {
  user: PropTypes.object.isRequired
};
export default function ChangePassword({ user }) {
  const { _id, name, mobile } = user;
  useEffect(() => {
    formik.setFieldValue('_id', _id);
    formik.setFieldValue('name', name);
    formik.setFieldValue('mobile', mobile);
  }, [user]);
  const formik = useFormik({
    initialValues: {
      _id: '',
      name: '',
      mobile: ''
    },
    onSubmit: async () => {
      const { data } = await axios.put(`/user/${_id}`, formik.values, configNormal);
      if (data.status === 'success') {
        alert('Cập nhật thành công');
      } else {
        alert('Có lỗi xảy ra');
      }
    }
  });
  const { handleSubmit, isSubmitting, getFieldProps } = formik;
  return (
    <Card>
      <CardHeader title="Đổi thông tin cá nhân" />
      <Box sx={{ p: 2, textAlign: 'right' }}>
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField fullWidth label="Họ và tên" {...getFieldProps('name')} />
              <TextField fullWidth label="Số điện thoại" {...getFieldProps('mobile')} />
              <Divider />
              <LoadingButton
                loading={isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Đổi thông tin
              </LoadingButton>
            </Stack>
          </Form>
        </FormikProvider>
      </Box>
    </Card>
  );
}
