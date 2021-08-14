// material
import { styled } from '@material-ui/core/styles';
// components
import Page from '../components/Page';
import { LandingHero, LandingMinimal, LandingAdvertisement } from '../components/_external-pages/landing';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)({
  height: '100%'
});

const ContentStyle = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: theme.palette.background.default
}));

// ----------------------------------------------------------------------

export default function LandingPage() {
  return (
    <RootStyle title="Test 1" id="move_top">
      <LandingHero />
      <ContentStyle>
        <LandingMinimal />
        <LandingAdvertisement />
      </ContentStyle>
    </RootStyle>
  );
}
