/* eslint-disable react/prop-types */
// import { useEffect } from 'react';
import Alert from '@mui/material/Alert';

// material
import { Box, Stack, Card, Divider, Typography } from '@mui/material';
// utils
//
import Scrollbar from '../../Scrollbar';
// ----------------------------------------------------------------------
const NOTIFICATIONS = [
  // {
  //   id: 1,
  //   description:
  //     'Vui Lòng Nạp Đúng Cú Pháp Nạp Tiền Để được nhận tiền nhanh nhất. Sau 15 Phút chưa thấy tiền vào tài khoản thì liên hệ ADMIN để được hỗ trợ!',
  //   status: 'warning'
  // },
  {
    id: 1,
    description: 'Đây là cảnh báo',
    status: 'warning'
  },
  {
    id: 1,
    description: 'Đây là thông báo',
    status: 'success'
  },
  {
    id: 1,
    description: 'Đây là lỗi của bạn',
    status: 'error'
  },
  {
    id: 1,
    description: 'Đây là thông tin',
    status: 'info'
  }
];
export default function Invest() {
  return (
    <Card>
      <Scrollbar>
        <Stack spacing={3} sx={{ p: 3, pr: 3 }}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Box sx={{ width: '100%' }}>
              <Typography variant="h6">Chú ý!</Typography>
              {/* <Typography variant="body2">Nạp tiền vào tài khoản của bạn.</Typography> */}
            </Box>
          </Stack>
        </Stack>
      </Scrollbar>

      <Divider />
      <Scrollbar>
        <Stack sx={{ p: 2, pr: 2 }}>
          <Stack direction="column" spacing={2}>
            {NOTIFICATIONS.map((notification) => (
              <Alert key={notification.id} variant="filled" severity={notification.status}>
                {notification.description}
              </Alert>
            ))}
          </Stack>
        </Stack>
      </Scrollbar>
    </Card>
  );
}
