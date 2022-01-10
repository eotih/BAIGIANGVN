/* eslint-disable react/prop-types */
import { useEffect } from 'react';
// material
import { Box, Stack, Card, Divider, Typography, Avatar } from '@mui/material';
// utils
//
import Scrollbar from '../../Scrollbar';
import { get5News, newsContext } from '../../../context';
import { fDateTimeSuffix } from '../../../utils/formatTime';
// ----------------------------------------------------------------------

function NewsItem({ news }) {
  const { image, title, description, createdAt, user } = news;
  return (
    <Stack>
      {news ? (
        <>
          <Stack sx={{ p: 2, pr: 2 }} direction="row" alignItems="center" spacing={2}>
            <Box
              component="img"
              alt={title}
              src={user.image}
              sx={{ width: 48, height: 48, borderRadius: 1.5 }}
            />
            <Box sx={{ minWidth: 240 }}>
              <Typography variant="subtitle2" noWrap>
                {user.name}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                {fDateTimeSuffix(createdAt)}
              </Typography>
            </Box>
          </Stack>
          <Divider />
          <Stack spacing={2} sx={{ p: 2, pr: 2 }}>
            <Stack direction="row" alignItems="center">
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <Typography variant="body">{description}</Typography>
                <Avatar
                  sx={{
                    width: '100%',
                    pt: 2,
                    borderRadius: 2,
                    height: 'auto'
                  }}
                  variant="square"
                  src={image}
                  alt={title}
                />
              </Box>
            </Stack>
          </Stack>
        </>
      ) : (
        <Box sx={{ p: 2, pr: 2 }}>
          <Typography variant="subtitle2" noWrap>
            Loading...
          </Typography>
        </Box>
      )}
    </Stack>
  );
}

export default function NewPosts() {
  const { news, dispatch } = newsContext();
  useEffect(() => {
    get5News(dispatch);
  }, [dispatch]);
  return (
    <Stack spacing={2}>
      <Box>
        <Typography variant="h4">Tin tức mới nhất!</Typography>
      </Box>
      {news
        .filter((res) => res.deleted === false)
        .map((news) => (
          <Card key={news._id}>
            <Scrollbar>
              <Stack spacing={2} sx={{ p: 2, pr: 2 }}>
                <NewsItem key={news._id} news={news} />
              </Stack>
            </Scrollbar>
            <Divider />
          </Card>
        ))}
    </Stack>
  );
}
