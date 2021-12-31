import { Icon } from '@iconify/react';
// material
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
// utils
import { fCurrency } from '../../../utils/formatNumber';
import { accountContext } from '../../../context/Hooks';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.primary.darker,
  backgroundColor: theme.palette.primary.lighter
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  color: theme.palette.primary.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0)} 0%, ${alpha(
    theme.palette.primary.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------

export default function Money() {
  const account = accountContext();
  return (
    <RootStyle>
      <IconWrapperStyle>
        <Icon icon="dashicons:money-alt" width={24} height={24} />
      </IconWrapperStyle>
      <Typography variant="h3">{fCurrency(account.user.money)} VND</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Số dư
      </Typography>
    </RootStyle>
  );
}