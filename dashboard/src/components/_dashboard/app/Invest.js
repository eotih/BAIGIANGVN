/* eslint-disable react/prop-types */
// import { useEffect } from 'react';
import Alert from '@mui/material/Alert';
import { useEffect, useState } from 'react';
// material
import { Box, Stack, Card, Divider, Typography } from '@mui/material';
import axios from '../../../constants/axios';
import { configNormal } from '../../../context/ConfigHeader';
// utils
//
import Scrollbar from '../../Scrollbar';
// ----------------------------------------------------------------------

export default function Invest() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get('/notifications', configNormal).then((res) => {
      const activeNotifications = res.data.filter((item) => item.isActive === true);
      setData(activeNotifications);
    });
  }, []);
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
            {data.length > 0 ? (
              data.map((notification) => (
                <Alert key={notification._id} variant="filled" severity={notification.status}>
                  {notification.description}
                </Alert>
              ))
            ) : (
              <Alert variant="filled" severity="info">
                Chưa có thông báo nào
              </Alert>
            )}
          </Stack>
        </Stack>
      </Scrollbar>
    </Card>
  );
}
