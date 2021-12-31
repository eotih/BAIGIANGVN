/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { Icon } from '@iconify/react';
import { Link as RouterLink } from 'react-router-dom';
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
// material
import { Box, Stack, Link, Card, Button, Divider, Typography, CardHeader } from '@mui/material';
// utils
//
import Scrollbar from '../../Scrollbar';
import { get5News, newsContext } from '../../../context/NewsAdminContext';
// ----------------------------------------------------------------------

function NewsItem({ news }) {
  const { image, title, description, createdAt } = news;
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Box
        component="img"
        alt={title}
        src={image}
        sx={{ width: 48, height: 48, borderRadius: 1.5 }}
      />
      <Box sx={{ minWidth: 240 }}>
        <Link to="#" color="inherit" underline="hover" component={RouterLink}>
          <Typography variant="subtitle2" noWrap>
            {title}
          </Typography>
        </Link>
        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
          {description}
        </Typography>
      </Box>
      <Typography variant="caption" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}>
        {createdAt}
      </Typography>
    </Stack>
  );
}

export default function NewPosts() {
  const { news, dispatch } = newsContext();
  useEffect(() => {
    dispatch(get5News(dispatch));
  }, [dispatch]);
  return (
    <Card>
      <CardHeader title="Tin tức mới nhất!" />

      <Scrollbar>
        <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
          {news.map((news) => (
            <NewsItem key={news.title} news={news} />
          ))}
        </Stack>
      </Scrollbar>

      <Divider />

      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button
          to="/dashboard/news"
          size="small"
          color="inherit"
          component={RouterLink}
          endIcon={<Icon icon={arrowIosForwardFill} />}
        >
          Xem tất cả
        </Button>
      </Box>
    </Card>
  );
}
