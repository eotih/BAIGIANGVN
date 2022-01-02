// material
import { Box, Grid, Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import { Deposited2, ChangePassword, Money2, ChangeProfile } from '../components/_dashboard/app';
import { accountContext } from '../context/Hooks';

// ----------------------------------------------------------------------

export default function Profile() {
  const account = accountContext();
  const { user } = account;
  return (
    <Page title="Dashboard | Tài khoản">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Thông tin tài khoản</Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={6}>
            <Money2 />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Deposited2 />
          </Grid>

          {account && user && (
            <Grid item xs={12} md={6} lg={6}>
              <ChangeProfile user={user} />
            </Grid>
          )}

          {user.password && (
            <Grid item xs={12} md={6} lg={6}>
              <ChangePassword user={user} />
            </Grid>
          )}
        </Grid>
      </Container>
    </Page>
  );
}
