// material
import { alpha, useTheme, styled } from '@material-ui/core/styles';
import { Box, Grid, Card, Container, Typography, Paper, useMediaQuery } from '@material-ui/core';
//
import { varFadeInUp, MotionInView, varFadeInDown } from '../../animate';

// ----------------------------------------------------------------------

const CARDS = [
  {
    icon: '/static/landing/meeting.svg',
    title: 'Meet with the successful essay writers who got into their dream schools',
    description: ''
  },
  {
    icon: '/static/landing/feedback.svg',
    title: 'Get personalized feedback tailored to your essay',
    description: ''
  },
  {
    icon: '/static/landing/easy.svg',
    title: 'Easy and simple way to share your essays with the mentors',
    description: ''
  }
];

const STEP_CARDS = [
  // {
  //   label: 'Sign up/Log in to MentorMatch',
  //   icon: '/static/landing/signup.svg'
  // },
  {
    label: 'Press Request Now',
    icon: '/static/landing/instruc_button.svg'
  },
  {
    label: 'Enter your personal information',
    icon: '/static/landing/personal-info.svg'
  },
  {
    label: 'Choose either Public or Private',
    icon: '/static/landing/choice.svg'
  },
  {
    label: 'Choose your mentor if Private is selected',
    icon: '/static/landing/mentors.svg'
  },
  {
    label: 'Submit your request',
    icon: '/static/landing/submit.svg'
  },
  {
    label: 'Get notified when your essay is reviewed',
    icon: '/static/landing/email.svg'
  }
];

const shadowIcon = (color) => `drop-shadow(2px 2px 2px ${alpha(color, 0.48)})`;

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(10),
  [theme.breakpoints.up('md')]: {
    paddingBottom: theme.spacing(15)
  }
}));

const BoxStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(10),
  [theme.breakpoints.up('md')]: {
    paddingBottom: theme.spacing(15)
  }
}));

const CardStyle = styled(Card)(({ theme }) => {
  const shadowCard = (opacity) =>
    theme.palette.mode === 'light'
      ? alpha(theme.palette.grey[500], opacity)
      : alpha(theme.palette.common.black, opacity);

  return {
    maxWidth: 280, // 380
    minHeight: 300, // 440
    margin: 'auto',
    textAlign: 'center',
    padding: theme.spacing(10, 5, 0),
    boxShadow: `-40px 40px 80px 0 ${shadowCard(0.48)}`,
    [theme.breakpoints.up('md')]: {
      boxShadow: 'none',
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800]
    },
    '&.cardLeft': {
      [theme.breakpoints.up('md')]: { marginTop: -60 }
    },
    '&.cardCenter': {
      [theme.breakpoints.up('md')]: {
        marginTop: -100,
        backgroundColor: theme.palette.background.paper,
        boxShadow: `-40px 40px 80px 0 ${shadowCard(0.4)}`,
        '&:before': {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
          content: "''",
          margin: 'auto',
          position: 'absolute',
          width: 'calc(100% - 40px)',
          height: 'calc(100% - 40px)',
          borderRadius: theme.shape.borderRadiusMd,
          backgroundColor: theme.palette.background.paper
          // boxShadow: `-20px 20px 40px 0 ${shadowCard(0.12)}`
        }
      }
    }
  };
});

const CardIconStyle = styled('img')(({ theme }) => ({
  width: 80,
  height: 80,
  margin: 'auto',
  // color: (theme) => theme.palette.common.white,
  // marginTop: theme.spacing(3),
  marginBottom: theme.spacing(10),
  filter: shadowIcon(theme.palette.primary.main)
}));

// StepCards.propTypes = {
//   category: PropTypes.object
// };
// ----------------------------------------------------------------------

export default function LandingMinimalHelps() {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  return (
    <RootStyle>
      <Container maxWidth="lg">
        <Box sx={{ mb: { xs: 10, md: 20 } }}>
          {/* <MotionInView variants={varFadeInUp}>
            <Typography component="p" variant="overline" sx={{ mb: 2, color: 'text.secondary', textAlign: 'center' }}>
              MentorMatch
            </Typography>
          </MotionInView> */}
          <MotionInView variants={varFadeInDown}>
            <Typography variant="h2" sx={{ textAlign: 'center' }}>
              What is MentorMatch?
            </Typography>
            <Typography variant="body1" fontSize="18px" sx={{ textAlign: 'left' }}>
              <br />
              Writing a college admission essay has been a struggle for many high school students, but it is not
              anymore!
              <br />
              <br /> Expressing who you are in a 650-word essay can be an overwhelming task for any 18-year-old high
              shcool student, not to mention the significance it has on deciding their future. Given the unique features
              of personal statement, we believe the experts of personal statement are the people who have written the
              successful ones before and got accepted to their dream schools.
              <br />
              <br /> MentorMatch is a platform where high school students can connect with college students or alumni
              and get personalized feedback on their essays.
            </Typography>
          </MotionInView>
        </Box>

        <Grid container spacing={isDesktop ? 10 : 5}>
          {CARDS.map((card, index) => (
            <Grid key={card.title} item xs={12} md={4}>
              <MotionInView variants={varFadeInUp}>
                <CardStyle className={(index === 0 && 'cardLeft') || (index === 1 && 'cardCenter')}>
                  <CardIconStyle
                    src={card.icon}
                    alt={card.title}
                    sx={{
                      ...(index === 0 && {
                        filter: (theme) => shadowIcon(theme.palette.info.main)
                      }),
                      ...(index === 1 && {
                        filter: (theme) => shadowIcon(theme.palette.error.main)
                      })
                    }}
                  />
                  <Typography variant="h6" paragraph sx={{ textAlign: 'center' }}>
                    {card.title}
                  </Typography>
                  <Typography sx={{ color: isLight ? 'text.secondary' : 'common.white' }}>
                    {card.description}
                  </Typography>
                </CardStyle>
              </MotionInView>
            </Grid>
          ))}
        </Grid>
        <BoxStyle>
          <Box sx={{ mb: { xs: 10, md: 10 } }}>
            <MotionInView variants={varFadeInDown}>
              <Typography variant="h2" sx={{ textAlign: 'center' }}>
                How does MentorMatch work?
              </Typography>

              <Typography variant="body1" fontSize="18px">
                <br />
                In MentorMatch, you can submit your essay in two ways - Direct and Public. Through the Direct path, you
                can choose the mentor whose feedback you want to get; however, you will be in a queue and it might take
                longer for some mentors to read your essay. On the other hand, the Public path gives an opportunity to
                receive feedback faster for the available mentors read essays on a first-come-first-serve basis. Once
                your mentor gives feedback on your essay, you will be notified via email.
              </Typography>
            </MotionInView>
          </Box>

          <Grid container spacing={3} sx={{ mb: { xs: 10, md: 0 } }}>
            {STEP_CARDS.map((card) => (
              <Grid item key={card.label} xs={12} sm={4} md={2}>
                <Paper
                  sx={{
                    px: 2,
                    height: 260,
                    display: 'flex',
                    textAlign: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    boxShadow: (theme) => theme.customShadows.z8
                  }}
                >
                  <Box component="img" src={card.icon} sx={{ mb: 2, width: 80, height: 80 }} />
                  <Typography variant="subtitle2">{card.label}</Typography>
                </Paper>
              </Grid>
            ))}
            {/* <CardIconStyle src="/static/landing/arrow.svg" /> */}
          </Grid>
        </BoxStyle>
      </Container>
    </RootStyle>
  );
}
