import faker from 'faker';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useSnackbar } from 'notistack5';
import { useDispatch, useSelector } from 'react-redux';
import { alpha, styled } from '@material-ui/core/styles';
import { Icon } from '@iconify/react';
import {
  Stack,
  Link,
  Card,
  Grid,
  Avatar,
  Typography,
  CardContent,
  Divider,
  CardHeader,
  Button,
  Alert,
  AlertTitle
} from '@material-ui/core';
import closeFill from '@iconify/icons-eva/close-fill';
import {
  Timeline,
  TimelineItem,
  TimelineContent,
  TimelineConnector,
  TimelineSeparator,
  TimelineDot
} from '@material-ui/lab';
import { fDate, fDateTime } from '../../../utils/formatTime';
import EssayCard from './BlogPostCard';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
import { MIconButton } from '../../@material-extend';
import { changeReviewStatus, changeDoneStatus, clearIndicators } from '../../../redux/slices/essay';

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
  const { essay_status, created_at } = item;

  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot
          sx={{
            bgcolor:
              (essay_status === 'reviewing' && 'primary.main') ||
              (essay_status === 'done' && 'success.main') ||
              (essay_status === 'created' && 'info.main')
          }}
        />
        {isLast ? null : <TimelineConnector />}
      </TimelineSeparator>
      <TimelineContent>
        <Typography variant="subtitle2">{essay_status}</Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          {fDateTime(created_at)}
        </Typography>
      </TimelineContent>
    </TimelineItem>
  );
}

export default function BlogDetail({ post, index }) {
  const { cover, personal_note, author, created_at } = post;
  const dispatch = useDispatch();
  const { loaded, currentEssay } = useSelector((state) => state.essay);
  const { myProfile } = useSelector((state) => state.user);
  const latestPostLarge = index === 0;
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    if (loaded && isMountedRef.current) {
      enqueueSnackbar('Thank you for your participation', {
        variant: 'success',
        action: (key) => (
          <MIconButton size="small" onClick={() => closeSnackbar(key)}>
            <Icon icon={closeFill} />
          </MIconButton>
        )
      });

      dispatch(clearIndicators());
    }
  }, [loaded, isMountedRef]);

  const handleReview = () => {
    dispatch(changeReviewStatus(post.id));
  };

  const handleDone = () => {
    dispatch(changeDoneStatus(post.id));
  };

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
            {post.author.name}
          </Typography>

          <CoverImgStyle alt={personal_note} src={cover} />
        </CardMediaStyle>

        <CardContent
          sx={{
            pt: 4,
            ...(latestPostLarge && {
              bottom: 0,
              position: 'absolute'
            })
          }}
        >
          <Typography gutterBottom variant="caption" sx={{ color: 'text.disabled', display: 'block' }}>
            {fDate(created_at)}
          </Typography>

          <Typography
            color="inherit"
            variant="h1"
            sx={{
              color: 'common.white'
            }}
          >
            {personal_note}
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
                  <Typography variant="subheading">{post.university_name}</Typography>
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
                  <Typography variant="subheading">{post.essay_intro}</Typography>
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
                    href={post.google_doc_link}
                    target="_blank"
                    sx={{
                      lineHeight: 2,
                      display: 'flex',
                      alignItems: 'center',
                      color: 'text.primary',
                      '& > div': { display: 'inherit' }
                    }}
                  >
                    <Typography noWrap>{post.google_doc_link}</Typography>
                  </Link>
                </Grid>
              </Grid>

              {myProfile.role === 'mentor' && (
                <Stack pt={6} flexDirection="row" justifyContent="space-evenly">
                  {currentEssay.log.length === 1 && (
                    <Button onClick={() => handleReview()} variant="contained">
                      I will review this essay
                    </Button>
                  )}

                  {currentEssay.log.length === 2 && (
                    <Button onClick={() => handleDone()} variant="contained">
                      Finished reviewing this essay
                    </Button>
                  )}

                  {currentEssay.log.length === 3 && (
                    <Alert severity="success">
                      <AlertTitle>This essay has been reviewed successfully</AlertTitle>
                    </Alert>
                  )}
                </Stack>
              )}
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
            <CardHeader title="Essay Timeline" />
            <CardContent>
              <Timeline sx={{ p: 0 }}>
                {currentEssay.log.map((item, index) => (
                  <OrderItem key={item.id} item={item} isLast={index === currentEssay.log.length - 1} />
                ))}
              </Timeline>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Typography variant="h4" sx={{ mt: 10, mb: 4 }}>
        Recent essays
      </Typography>

      <Grid container spacing={3}>
        {post.otherEssays.map((post, index) => (
          <EssayCard key={post.id} post={post} index={index} />
        ))}
      </Grid>
    </>
  );
}
