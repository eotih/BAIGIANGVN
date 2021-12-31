/* eslint-disable react/prop-types */
// import { useEffect } from 'react';
// import Alert from '@mui/material/Alert';

// material
import { Box, Stack, Card, Divider, Typography, Avatar } from '@mui/material';
import { accountContext } from '../../../context/Hooks';
// utils
//
import Scrollbar from '../../Scrollbar';
// ----------------------------------------------------------------------

export default function Banks({ bank }) {
  const { name, logo, chinhanh, stk } = bank;
  const account = accountContext();
  return (
    <Card>
      <Scrollbar>
        <Stack spacing={3} sx={{ p: 3, pr: 3 }}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Box sx={{ width: '100%' }}>
              <Typography variant="h6">Thông tin ngân hàng</Typography>
              <Typography variant="body2">Nạp tiền vào tài khoản của bạn.</Typography>
            </Box>
          </Stack>
        </Stack>
      </Scrollbar>

      <Divider />
      <Scrollbar>
        <Stack sx={{ p: 3, pr: 3 }}>
          <Stack direction="row">
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column'
              }}
            >
              <Avatar
                sx={{
                  width: '100%',
                  maxWidth: '200px',
                  height: 'auto'
                }}
                variant="square"
                src={logo}
                alt={name}
              />
            </Box>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'end',
                justifyContent: 'center',
                flexDirection: 'column'
              }}
            >
              <Typography variant="body">
                <b>Tên ngân hàng:</b> {name}
              </Typography>
              <Typography variant="body">
                <b>Số tài khoản:</b> {stk}
              </Typography>
              <Typography variant="body">
                <b>Chi nhánh:</b> {chinhanh}
              </Typography>
              <Typography variant="body">
                <b>ND Chuyển Khoản:</b>
              </Typography>
              <Typography variant="body">NAPTIEN {account.account.email}</Typography>
            </Box>
          </Stack>
        </Stack>
      </Scrollbar>
    </Card>
  );
}
