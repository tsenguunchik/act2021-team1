import faker from 'faker';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Card, Link, Typography, Stack, Avatar, Tooltip, IconButton } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { Icon } from '@iconify/react';
import { capitalCase } from 'change-case';
import googleFill from '@iconify/icons-eva/google-fill';
import twitterFill from '@iconify/icons-eva/twitter-fill';
import facebookFill from '@iconify/icons-eva/facebook-fill';
import linkedinFill from '@iconify/icons-eva/linkedin-fill';
// import instagramFill from '@iconify/icons-eva/instagram-fill';
import Label from '../../Label';
// ----------------------------------------------------------------------

const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object
};

const SOCIALS = [
  {
    name: 'Facebook',
    value: faker.datatype.number(),
    icon: <Icon icon={facebookFill} color="rgb(24, 119, 242)" width={24} height={24} />
  },
  {
    name: 'Google',
    value: faker.datatype.number(),
    icon: <Icon icon={googleFill} color="rgb(215, 51, 109)" width={24} height={24} />
  },
  {
    name: 'Linkedin',
    value: faker.datatype.number(),
    icon: <Icon icon={linkedinFill} color="#006097" width={24} height={24} />
  },
  {
    name: 'Twitter',
    value: faker.datatype.number(),
    icon: <Icon icon={twitterFill} color="#1C9CEA" width={24} height={24} />
  }
];

export default function ShopProductCard({ product }) {
  const { name, cover, price, colors, status, priceSale } = product;

  return (
    <Card>
      <Box
        sx={{
          pt: '60%',
          position: 'relative'
        }}
      >
        {/* {status && (
          <Label
            variant="filled"
            color={(status === 'Harvard' && 'error') || 'info'}
            sx={{
              zIndex: 9,
              top: 16,
              right: 16,
              position: 'absolute',
              textTransform: 'uppercase'
            }}
          >
            {status}
          </Label>
        )} */}
        <ProductImgStyle alt={name} src={cover} />
        <Avatar
          src="https://minimals.cc/static/mock-images/avatars/avatar_6.jpg"
          alt="photoURL"
          sx={{ margin: 'auto', width: 100, height: 100, position: 'absolute', top: 0, left: 0, bottom: 0, right: 0 }}
        />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }} alignItems="center">
        <Typography variant="subtitle1" noWrap>
          Nasanjargal Binderiya
        </Typography>
        <Typography variant="subtitle1" noWrap>
          Harvard
        </Typography>
        <Stack flexDirection="row">
          {SOCIALS.map((social) => (
            <Tooltip key={social.value} title={capitalCase(social.name)}>
              <IconButton>{social.icon}</IconButton>
            </Tooltip>
          ))}
        </Stack>
      </Stack>
    </Card>
  );
}
