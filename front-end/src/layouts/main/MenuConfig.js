import { Icon } from '@iconify/react';
import homeFill from '@iconify/icons-eva/home-fill';
// routes
import { PATH_PAGE } from '../../routes/paths';

// ----------------------------------------------------------------------

const ICON_SIZE = {
  width: 22,
  height: 22
};

const menuConfig = [
  {
    title: 'Home',
    icon: <Icon icon={homeFill} {...ICON_SIZE} />,
    path: '/'
  },
  {
    title: 'Team',
    icon: <Icon icon={homeFill} {...ICON_SIZE} />,
    path: PATH_PAGE.about
  },
  {
    title: 'Contact us',
    icon: <Icon icon={homeFill} {...ICON_SIZE} />,
    path: PATH_PAGE.contact
  },
  {
    title: 'FAQs',
    icon: <Icon icon={homeFill} {...ICON_SIZE} />,
    path: PATH_PAGE.faqs
  }
];

export default menuConfig;
