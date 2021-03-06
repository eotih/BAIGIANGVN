// material
import { Box, Grid, Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import { Deposited, NewPosts, Money, SaleLesson } from '../components/_dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  return (
    <Page title="Dashboard | Bài Giảng VN">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hi, Welcome back</Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={6}>
            <Money />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Deposited />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <NewPosts />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <SaleLesson />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
