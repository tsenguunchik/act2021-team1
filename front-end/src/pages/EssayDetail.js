import { useEffect } from 'react';
import faker from 'faker';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Button, Container, Stack, Typography } from '@material-ui/core';
import Page from '../components/Page';
import BlogDetail from '../components/_dashboard/blog/BlogDetail';
import { getCurrentEssay, clearCurrentEssay } from '../redux/slices/essay';
import { mockImgCover } from '../layouts/dashboard/mockImages';
import LoadingScreen from '../components/LoadingScreen';

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

export default function Essay() {
  const dispatch = useDispatch();
  const { essayId } = useParams();
  const { currentEssay, pending } = useSelector((state) => state.essay);

  useEffect(() => {
    dispatch(getCurrentEssay(essayId));

    return () => dispatch(clearCurrentEssay());
  }, []);

  return (
    <>
      {pending || currentEssay === null ? (
        <LoadingScreen />
      ) : (
        <Page title={currentEssay?.personal_note}>
          <Container>
            <BlogDetail key={currentEssay?.id} post={currentEssay} index={0} />
          </Container>
        </Page>
      )}
    </>
  );
}
