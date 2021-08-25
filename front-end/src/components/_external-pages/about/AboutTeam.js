import PropTypes from 'prop-types';
import { useRef } from 'react';
import Slider from 'react-slick';
import { Icon } from '@iconify/react';
import twitterFill from '@iconify/icons-eva/twitter-fill';
import linkedinFill from '@iconify/icons-eva/linkedin-fill';
import facebookFill from '@iconify/icons-eva/facebook-fill';
import roundArrowRightAlt from '@iconify/icons-ic/round-arrow-right-alt';
import instagramFilled from '@iconify/icons-ant-design/instagram-filled';
// material
import { useTheme } from '@material-ui/core/styles';
import { Box, Card, Button, Container, Typography, IconButton } from '@material-ui/core';
// utils
import mockData from '../../../utils/mock-data';
//
import { varFadeIn, varFadeInUp, MotionInView, varFadeInDown } from '../../animate';
import { CarouselControlsArrowsBasic2 } from '../../carousel';

// ----------------------------------------------------------------------

const MOCK_MEMBERS = [...Array(6)].map((_, index) => ({
  id: mockData.id(index),
  name: mockData.name.fullName(index),
  role: mockData.role(index),
  school: mockData.school(index),
  avatar: mockData.image.avatar(index)
}));

// ----------------------------------------------------------------------

MemberCard.propTypes = {
  member: PropTypes.shape({
    id: PropTypes.string,
    avatar: PropTypes.string,
    name: PropTypes.string,
    role: PropTypes.string,
    school: PropTypes.string
  })
};

function MemberCard({ member }) {
  const { name, role, avatar, school } = member;
  return (
    <Card key={name} sx={{ p: 1, mx: 1.5 }}>
      <Box component="img" src={avatar} sx={{ width: '100%', height: '100%', borderRadius: 1.5 }} />
      <Typography variant="subtitle1" sx={{ mt: 2, mb: 0.5 }}>
        {name}
      </Typography>
      <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
        {school}
        <br /> {role}
      </Typography>
      <Box sx={{ mt: 2, mb: 1 }}>
        {[facebookFill, instagramFilled, linkedinFill, twitterFill].map((social, index) => (
          <IconButton key={index}>
            <Icon icon={social} width={20} height={20} />
          </IconButton>
        ))}
      </Box>
    </Card>
  );
}

export default function AboutTeam() {
  const carouselRef = useRef();
  const theme = useTheme();

  const settings = {
    slidesToShow: 4,
    centerMode: true,
    centerPadding: '0 60px',
    rtl: Boolean(theme.direction === 'rtl'),
    responsive: [
      {
        breakpoint: 1920,
        settings: { slidesToShow: 4 }
      },
      {
        breakpoint: 1279,
        settings: { slidesToShow: 3 }
      },
      {
        breakpoint: 959,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 }
      }
    ]
  };

  // const handlePrevious = () => {
  //   carouselRef.current.slickPrev();
  // };

  // const handleNext = () => {
  //   carouselRef.current.slickNext();
  // };

  return (
    <Container maxWidth="lg" sx={{ pb: 10, textAlign: 'center', md: 10 }}>
      {/* <MotionInView variants={varFadeInDown}>
        <Typography component="p" variant="overline" sx={{ mb: 2, color: 'text.secondary' }}>
          Dream team
        </Typography>
      </MotionInView> */}

      <Box sx={{ mt: { xs: 10, md: 15 } }}>
        <MotionInView variants={varFadeInUp}>
          <Typography variant="h2" sx={{ mb: 3 }}>
            Right mentor is the key
          </Typography>
        </MotionInView>

        <MotionInView variants={varFadeInUp}>
          <Typography
            variant="body2"
            fontSize="18px"
            sx={{
              mb: 10,
              mx: 'auto',
              // maxWidth: 700,
              color: (theme) => (theme.palette.mode === 'light' ? 'text.secondary' : 'common.white')
            }}
          >
            With the right mentor, writing a personal statement is no longer as exhausting as it once was.
            <br />
            MentorMatch will be the bridge between you and the right mentor.
          </Typography>
        </MotionInView>

        <Box sx={{ position: 'relative' }}>
          <Slider ref={carouselRef} {...settings}>
            {MOCK_MEMBERS.map((member) => (
              <MotionInView key={member.id} variants={varFadeIn}>
                <MemberCard member={member} />
              </MotionInView>
            ))}
          </Slider>
          {/* <CarouselControlsArrowsBasic2
          onNext={handleNext}
          onPrevious={handlePrevious}
          sx={{ transform: 'translateY(-64px)' }}
        /> */}
        </Box>
        <Button
          variant="outlined"
          color="inherit"
          size="large"
          endIcon={<Icon icon={roundArrowRightAlt} width={24} height={24} />}
          sx={{ mx: 'auto' }}
        >
          View all mentors
        </Button>
      </Box>
    </Container>
  );
}
