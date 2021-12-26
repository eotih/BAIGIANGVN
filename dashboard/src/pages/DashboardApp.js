import { Box, Grid, Container, Typography } from '@mui/material';
import Page from '../components/Page';
import {
  AppTasks,
  AppBugReports,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppCurrentSubject,
  NoiCom1L,
  NoiCom1L8,
  NoiCom05L,
  MayLocKhongKhi,
  AppConversionRates
} from '../components/_dashboard/app';

export default function DashboardApp() {
  return (
    <Page title="Dashboard | Hàng nội địa Nhật">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hi, Welcome back</Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <NoiCom05L />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <NoiCom1L />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <NoiCom1L8 />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MayLocKhongKhi />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppTasks />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
