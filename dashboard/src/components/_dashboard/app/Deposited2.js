import { Card, Typography, Box, Stack, Avatar } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import { fCurrency } from '../../../utils/formatNumber';
import { accountContext } from '../../../context/Hooks';

// ----------------------------------------------------------------------

export default function Money() {
  const account = accountContext();
  return (
    <Card>
      <Stack spacing={3} sx={{ p: 1, pr: 1 }}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography component="div" variant="h3">
                {fCurrency(account.user.deposited)} VND
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" component="div">
                Số tiền đã nạp
              </Typography>
            </CardContent>
          </Box>
          <Box>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'end',
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
                  src="../../../assets/images/flymoney.png"
                />
              </Box>
            </CardContent>
          </Box>
        </Stack>
      </Stack>
    </Card>
  );
}
