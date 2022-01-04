import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { Link as RouterLink } from 'react-router-dom';
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
// material
import { Box, Stack, Link, Card, Button, Divider, Typography, CardHeader } from '@mui/material';
// utils
//
import Scrollbar from '../../Scrollbar';

// ----------------------------------------------------------------------
import { getLesson, lessonContext } from '../../../context';
// ----------------------------------------------------------------------

SaleLesson.propTypes = {
  lesson: PropTypes.object.isRequired
};

function SaleLesson({ lesson }) {
  const { image, name, week, createdAt, grade } = lesson;
  const convertTime = (time) => {
    const currentDate = new Date();
    const createdDate = new Date(time);
    const diff = currentDate.getTime() - createdDate.getTime();
    const hour = Math.floor(diff / (1000 * 60 * 60));
    return hour;
  };
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Box
        component="img"
        alt={name}
        src={image}
        sx={{ width: 48, height: 48, borderRadius: 1.5 }}
      />
      <Box sx={{ minWidth: 240 }}>
        <Link to="#" color="inherit" underline="hover" component={RouterLink}>
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </Link>
        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
          Tuần: {week}, Lớp: {grade}
        </Typography>
      </Box>
      <Typography variant="caption" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}>
        {convertTime(createdAt)} tiếng trước
      </Typography>
    </Stack>
  );
}

export default function AppOrderTimeline() {
  const { lesson, dispatch } = lessonContext();
  useEffect(() => {
    dispatch(getLesson(dispatch));
  }, [dispatch]);
  return (
    <Card>
      <CardHeader title="Sản phẩm đang sale!" />

      <Scrollbar>
        <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
          {lesson
            .filter((item) => item.sale > 0)
            .map((lesson) => (
              <SaleLesson key={lesson._id} lesson={lesson} />
            ))}
        </Stack>
      </Scrollbar>

      <Divider />

      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button
          to="/dashboard/products"
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
