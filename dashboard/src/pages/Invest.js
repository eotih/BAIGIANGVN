// material
import { useEffect, useState } from 'react';
import { Grid, Container } from '@mui/material';
// components
import Page from '../components/Page';
import { Invest, Banks } from '../components/_dashboard/app';
import axios from '../constants/axios';
import { configNormal } from '../context/ConfigHeader';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const [banks, setBanks] = useState([]);
  useEffect(() => {
    axios.get('/bank', configNormal).then((res) => {
      setBanks(res.data);
    });
  }, []);
  return (
    <Page title="Dashboard | Minimal-UI">
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={12}>
            <Invest />
          </Grid>
          {banks.map((bank) => (
            <Grid key={bank._id} item xs={12} sm={6} md={6}>
              <Banks bank={bank} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Page>
  );
}
