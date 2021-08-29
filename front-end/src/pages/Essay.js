import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Grid, Button, Container, Stack, Typography } from '@material-ui/core';
import Page from '../components/Page';
import { EssayCard, BlogPostsSort, BlogPostsSearch } from '../components/_dashboard/blog';
import POSTS from '../utils/blog';
import BlogAdd from '../components/_dashboard/blog/BlogAdd';
import { getEssays, clearIndicators } from '../redux/slices/essay';
import LoadingScreen from '../components/LoadingScreen';

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' }
];

export default function Blog() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { essays, pending, loaded } = useSelector((state) => state.essay);
  const { myProfile } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getEssays());
  }, []);

  useEffect(() => {
    if (loaded) {
      dispatch(clearIndicators());
    }
  }, [loaded]);

  return (
    <>
      <Page title="Essay">
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              Essays
            </Typography>
            {myProfile.role === 'normal_user' && (
              <Button variant="contained" onClick={() => setOpen(true)} startIcon={<Icon icon={plusFill} />}>
                New Essay
              </Button>
            )}
          </Stack>

          <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
            <BlogPostsSearch posts={essays} />
            <BlogPostsSort options={SORT_OPTIONS} />
          </Stack>

          <Grid container spacing={3}>
            {essays.map((essay, index) => (
              <EssayCard key={essay.id} post={essay} index={index} />
            ))}
          </Grid>
        </Container>
        {pending && <LoadingScreen />}
      </Page>
      <BlogAdd open={open} onClose={(value) => setOpen(value)} />
    </>
  );
}
