import faker from 'faker';
import { Grid, Button, Container, Stack, Typography } from '@material-ui/core';
import Page from '../components/Page';
import BlogDetail from '../components/_dashboard/blog/BlogDetail';

import { mockImgCover } from '../layouts/dashboard/mockImages';

const post = {
  id: faker.datatype.uuid(),
  cover: mockImgCover(1),
  title: 'Whiteboard Templates By Industry Leaders',
  createdAt: faker.date.past(),
  view: faker.datatype.number(),
  comment: faker.datatype.number(),
  share: faker.datatype.number(),
  favorite: faker.datatype.number(),
  author: {
    name: faker.name.findName(),
    avatarUrl: `/static/mock-images/avatars/avatar_${1}.jpg`
  }
};

export default function Blog() {
  return (
    <Page title="Essay detail">
      <Container>
        <BlogDetail key={post.id} post={post} index={0} />
      </Container>
    </Page>
  );
}
