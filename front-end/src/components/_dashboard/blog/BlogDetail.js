import faker from 'faker';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import { Link as RouterLink } from 'react-router-dom';
import shareFill from '@iconify/icons-eva/share-fill';
import messageCircleFill from '@iconify/icons-eva/message-circle-fill';
import { alpha, styled } from '@material-ui/core/styles';
import { Stack, Link, Card, Grid, Avatar, Typography, CardContent, Divider, CardHeader } from '@material-ui/core';
import {
  Timeline,
  TimelineItem,
  TimelineContent,
  TimelineConnector,
  TimelineSeparator,
  TimelineDot
} from '@material-ui/lab';
import { fDate, fDateTime } from '../../../utils/formatTime';
import POSTS from '../../../utils/essay';
import BlogPostCard from './BlogPostCard';

const TIMELINES = [
  {
    title: '1983, orders, $4220',
    time: faker.date.past(),
    type: 'order1'
  },
  {
    title: '12 Invoices have been paid',
    time: faker.date.past(),
    type: 'order2'
  },
  {
    title: 'Order #37745 from September',
    time: faker.date.past(),
    type: 'order3'
  },
  {
    title: 'New order placed #XF-2356',
    time: faker.date.past(),
    type: 'order4'
  },
  {
    title: 'New order placed #XF-2346',
    time: faker.date.past(),
    type: 'order5'
  }
];

// ----------------------------------------------------------------------

const CardMediaStyle = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 3 / 4)'
});

const AvatarStyle = styled(Avatar)(({ theme }) => ({
  zIndex: 9,
  width: 32,
  height: 32,
  position: 'absolute',
  left: theme.spacing(3),
  bottom: theme.spacing(-2)
}));

const CoverImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

// ----------------------------------------------------------------------

BlogDetail.propTypes = {
  post: PropTypes.object.isRequired,
  index: PropTypes.number
};

function OrderItem({ item, isLast }) {
  const { type, title, time } = item;
  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot
          sx={{
            bgcolor:
              (type === 'order1' && 'primary.main') ||
              (type === 'order2' && 'success.main') ||
              (type === 'order3' && 'info.main') ||
              (type === 'order4' && 'warning.main') ||
              'error.main'
          }}
        />
        {isLast ? null : <TimelineConnector />}
      </TimelineSeparator>
      <TimelineContent>
        <Typography variant="subtitle2">{title}</Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          {fDateTime(time)}
        </Typography>
      </TimelineContent>
    </TimelineItem>
  );
}

export default function BlogDetail({ post, index }) {
  const { cover, title, view, comment, share, author, createdAt } = post;
  const latestPostLarge = index === 0;

  return (
    <>
      <Card sx={{ position: 'relative' }}>
        <CardMediaStyle
          sx={{
            ...(latestPostLarge && {
              pt: 'calc(70% * 4 / 3)',
              '&:after': {
                top: 0,
                content: "''",
                width: '100%',
                height: '100%',
                position: 'absolute',
                bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72)
              }
            }),
            ...(latestPostLarge && {
              pt: {
                xs: 'calc(70% * 4 / 3)',
                sm: 'calc(70% * 3 / 4.66)'
              }
            })
          }}
        >
          <AvatarStyle
            alt={author.name}
            src={author.avatarUrl}
            sx={{
              ...(latestPostLarge && {
                zIndex: 9,
                top: 24,
                left: 24,
                width: 40,
                height: 40
              })
            }}
          />

          <Typography variant="h6" sx={{ position: 'absolute', zIndex: 9, top: 32, left: 75 }}>
            Nasnajargal Binderiya
          </Typography>

          <CoverImgStyle alt={title} src={cover} />
        </CardMediaStyle>

        <CardContent
          sx={{
            pt: 4,
            ...(latestPostLarge && {
              bottom: 40,
              height: '50%',
              position: 'absolute'
            })
          }}
        >
          <Typography gutterBottom variant="caption" sx={{ color: 'text.disabled', display: 'block' }}>
            {fDate(createdAt)}
          </Typography>

          <Typography
            color="inherit"
            variant="h1"
            sx={{
              color: 'common.white'
            }}
          >
            {title}
          </Typography>
        </CardContent>
      </Card>

      <Grid container spacing={3} pt={4}>
        <Grid item xs={8}>
          <Card>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={3}>
                  <Typography sx={{ color: 'primary.main' }} variant="h6">
                    University:
                  </Typography>
                </Grid>

                <Grid item xs={8}>
                  <Typography variant="subheading">Harvard</Typography>
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              <Grid container spacing={3} pt={3}>
                <Grid item xs={3}>
                  <Typography sx={{ color: 'primary.main' }} variant="h6">
                    Intro:
                  </Typography>
                </Grid>

                <Grid item xs={8}>
                  <Typography variant="subheading">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                    industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type
                    and scrambled it to make a type specimen book.
                  </Typography>
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              <Grid container spacing={3} pt={3}>
                <Grid item xs={3}>
                  <Typography sx={{ color: 'primary.main' }} variant="h6">
                    Google doc link:
                  </Typography>
                </Grid>

                <Grid item xs={8}>
                  <Link
                    href="https://docs.google.com/document/d/1zf9EHHwZrZPURljcVIcFTxUfBZIOwxj36cctOM3Yfnw/edit"
                    target="_blank"
                    sx={{
                      lineHeight: 2,
                      display: 'flex',
                      alignItems: 'center',
                      color: 'text.primary',
                      '& > div': { display: 'inherit' }
                    }}
                  >
                    <Typography noWrap>
                      https://docs.google.com/document/d/1zf9EHHwZrZPURljcVIcFTxUfBZIOwxj36cctOM3Yfnw/edit
                    </Typography>
                  </Link>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card
            sx={{
              '& .MuiTimelineItem-missingOppositeContent:before': {
                display: 'none'
              }
            }}
          >
            <CardHeader title="Order Timeline" />
            <CardContent>
              <Timeline sx={{ p: 0 }}>
                {TIMELINES.map((item, index) => (
                  <OrderItem key={item.title} item={item} isLast={index === TIMELINES.length - 1} />
                ))}
              </Timeline>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Typography variant="h4" sx={{ mt: 10, mb: 4 }}>
        Recent posts
      </Typography>

      <Grid container spacing={3}>
        {POSTS.map((post, index) => (
          <BlogPostCard key={post.id} post={post} index={index} />
        ))}
      </Grid>
    </>
  );
}
