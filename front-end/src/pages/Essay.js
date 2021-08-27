import { useState } from 'react';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Grid, Button, Container, Stack, Typography } from '@material-ui/core';
import Page from '../components/Page';
import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from '../components/_dashboard/blog';
import POSTS from '../utils/blog';
import BlogAdd from '../components/_dashboard/blog/BlogAdd';

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' }
];

export default function Blog() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Page title="Essay">
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              Essays
            </Typography>
            <Button variant="contained" onClick={() => setOpen(true)} startIcon={<Icon icon={plusFill} />}>
              New Essay
            </Button>
          </Stack>

          <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
            <BlogPostsSearch posts={POSTS} />
            <BlogPostsSort options={SORT_OPTIONS} />
          </Stack>

          <Grid container spacing={3}>
            {POSTS.map((post, index) => (
              <BlogPostCard key={post.id} post={post} index={index} />
            ))}
          </Grid>
        </Container>
      </Page>
      <BlogAdd open={open} onClose={(value) => setOpen(value)} />
    </>
  );
}
