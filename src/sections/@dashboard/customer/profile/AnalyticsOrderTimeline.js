// @mui
import PropTypes from 'prop-types';
import { Card, Typography, CardHeader, CardContent, Box } from '@mui/material';
import { Timeline, TimelineDot, TimelineItem, TimelineContent, TimelineSeparator, TimelineConnector } from '@mui/lab';
// utils
import { fDateTime } from '../../../../utils/formatTime';

// ----------------------------------------------------------------------

AnalyticsOrderTimeline.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  list: PropTypes.array.isRequired,
};

export default function AnalyticsOrderTimeline({ title, subheader, list, ...other }) {
  return (
    <Card {...other}>
      {/* <CardHeader title={title} subheader={subheader} /> */}
      <Box sx={{ ml: 3, mt: 3}}>
          <Typography variant='h6'>{title}</Typography>
          <Typography variant='caption'>{subheader}</Typography>
          </Box>

      <CardContent
        sx={{
          '& .MuiTimelineItem-missingOppositeContent:before': {
            display: 'none',
          },
        }}
      >
        <Timeline>
          {list.map((item, index) => (
            <OrderItem key={item._id} description={item.description} createdAt={item.createdAt} item={item} isLast={index === list.length - 1} />
          ))}
          {
            !list || !list.length && <Box sx={{ display:'flex', justifyContent: 'center' }}>
            <Typography>Sem atividade</Typography>
            </Box>
          }
        </Timeline>
      </CardContent>
    </Card>
  );
}

// ----------------------------------------------------------------------

OrderItem.propTypes = {
  isLast: PropTypes.bool,
  item: PropTypes.shape({
    time: PropTypes.instanceOf(Date),
    title: PropTypes.string,
    type: PropTypes.string,
  }),
};

function OrderItem({ description, createdAt, item, isLast }) {
  const { type, title, time } = item;
  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot
          color='primary'
          // color={
          //   (type === 'order1' && 'primary') ||
          //   (type === 'order2' && 'success') ||
          //   (type === 'order3' && 'info') ||
          //   (type === 'order4' && 'warning') ||
          //   'error'
          // }
        />
        {isLast ? null : <TimelineConnector />}
      </TimelineSeparator>

      <TimelineContent>
        <Typography variant="subtitle2">{description}</Typography>

        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          {fDateTime(createdAt)}
        </Typography>
      </TimelineContent>
    </TimelineItem>
  );
}
