import { Stack, Divider, Typography } from '@mui/material';
import GoogleLogin from 'react-google-login';
import axios from '../../constants/axios';
import useToken from '../../services/useToken';
// material

// ----------------------------------------------------------------------

export default function AuthSocial() {
  const { setToken } = useToken();
  const responseGoogle = async (response) => {
    const res = await axios.post('/auth/google', response.profileObj);
    if (res.status === 200) {
      alert('Đăng nhập thành công!');
      setToken(res.data.token);
      window.location.href = '/';
    } else {
      alert('Login failed');
    }
  };
  return (
    <>
      <Stack direction="row" spacing={2}>
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy="single_host_origin"
        />
      </Stack>

      <Divider sx={{ my: 3 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          OR
        </Typography>
      </Divider>
    </>
  );
}
