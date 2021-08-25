import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@material-ui/core/styles';
import { Box, Card, Container, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Page from '../../components/Page';
import { MHidden } from '../../components/@material-extend';
import { ConfirmForm } from '../../components/authentication/confirm';

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

export default function Confirm() {
  const { myProfile } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (myProfile === null) {
      navigate('/auth/register');
    }
  }, []);

  return (
    <RootStyle title="Confirm">
      <MHidden width="mdDown">
        <SectionStyle>
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
            Please check your email!
          </Typography>
          <img alt="confirm" src="/static/illustrations/illustration_register.png" />
        </SectionStyle>
      </MHidden>

      <Container>
        <ContentStyle>
          <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h4" gutterBottom>
                Verification process
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>
                We have emailed a 6-digit confirmation code to {myProfile?.email}, please enter the code in below box to
                verify your account.
              </Typography>
            </Box>
          </Box>

          <ConfirmForm />
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
