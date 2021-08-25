import { motion } from 'framer-motion';
// material
import { styled } from '@material-ui/core/styles';
import { Box, Container, Typography, Grid } from '@material-ui/core';
//
import { varFadeIn, varWrapEnter, varFadeInRight, TextAnimate } from '../../animate';

// ----------------------------------------------------------------------

const CONTACTS = [
  {
    country: 'Mongolia',
    address: 'Hayag2',
    phoneNumber: '99992139'
  },
  {
    country: 'USA',
    address: 'Address2',
    phoneNumber: '(444) 555-1111'
  },
  {
    country: 'Canada',
    address: 'test2',
    phoneNumber: '31231'
  },
  {
    country: 'Moscow',
    address: 'address2',
    phoneNumber: '8282828282'
  }
];

const RootStyle = styled(motion.div)(({ theme }) => ({
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundImage: 'url(/static/overlay.svg), url(/static/contact/hero.jpg)',
  padding: theme.spacing(10, 0),
  [theme.breakpoints.up('md')]: {
    height: 560,
    padding: 0
  }
}));

const ContentStyle = styled('div')(({ theme }) => ({
  textAlign: 'center',
  [theme.breakpoints.up('md')]: {
    textAlign: 'left',
    position: 'absolute',
    bottom: theme.spacing(10)
  }
}));

// ----------------------------------------------------------------------

export default function ContactHero() {
  return (
    <RootStyle initial="initial" animate="animate" variants={varWrapEnter}>
      <Container maxWidth="lg" sx={{ position: 'relative', height: '100%' }}>
        <ContentStyle>
          <Box sx={{ display: 'inline-flex', color: 'primary.main' }} variants={varFadeInRight}>
            <TextAnimate text="Contact" sx={{ mr: 2 }} />
            <TextAnimate text="us" />
          </Box>

          <motion.div variants={varFadeInRight}>
            <Typography
              variant="h4"
              sx={{
                mt: 5,
                color: 'common.white',
                fontWeight: 'fontWeightMedium'
              }}
            >
              Write something
              <br /> cool
            </Typography>
          </motion.div>

          {/* <Box sx={{ display: 'inline-flex', color: 'common.white' }}>
            <TextAnimate text="to" sx={{ mr: 2 }} />
            <TextAnimate text="find" sx={{ mr: 2 }} />
            <TextAnimate text="us?" />
          </Box> 
          <Grid container spacing={5} sx={{ mt: 5, color: 'common.white' }}>
            {CONTACTS.map((contact) => (
              <Grid key={contact.country} item xs={12} sm={6} md={3} lg={2} sx={{ pr: { md: 5 } }}>
                <motion.div variants={varFadeIn}>
                  <Typography variant="h6" paragraph>
                    {contact.country}
                  </Typography>
                </motion.div>
                <motion.div variants={varFadeInRight}>
                  <Typography variant="body2">
                    {contact.address}
                    <br /> {contact.phoneNumber}
                  </Typography>
                </motion.div>
              </Grid>
            ))}
          </Grid> */}
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
