// material
import { Grid, Container } from '@mui/material';
// components
import Page from '../components/Page';
import { Invest, Banks } from '../components/_dashboard/app';

// ----------------------------------------------------------------------
const BANKS = [
  {
    _id: 1,
    name: 'Vietcombank',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMfNk6zAcaLml_DFyTrHBQOxd8ProoicKgdeSEwiQwhRfEYmlFXyKTblMq1SKA5Pp1k6I&usqp=CAU',
    stk: '0251002770560',
    chinhanh: 'Bình tây'
  },
  {
    _id: 2,
    name: 'Momo',
    logo: 'https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png',
    stk: '0906213807',
    chinhanh: 'Lưu Ý: Ghi đúng nội dung'
  }
];
export default function DashboardApp() {
  return (
    <Page title="Dashboard | Minimal-UI">
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={12}>
            <Invest />
          </Grid>
          {BANKS.map((bank) => (
            <Grid key={bank._id} item xs={12} sm={6} md={6}>
              <Banks bank={bank} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Page>
  );
}
