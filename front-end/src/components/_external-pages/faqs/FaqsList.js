import { Icon } from '@iconify/react';
import arrowIosDownwardFill from '@iconify/icons-eva/arrow-ios-downward-fill';
// material
import { Accordion, Typography, AccordionSummary, AccordionDetails } from '@material-ui/core';
// utils
import mockData from '../../../utils/mock-data';
//
import { varFadeInUp, MotionInView } from '../../animate';

// ----------------------------------------------------------------------

const MOCK_FAQS = [...Array(8)].map((_, index) => ({
  id: mockData.id(index),
  value: `panel${index + 1}`,
  heading: `Questions ${index + 1}`,
  detail: mockData.text.description(index)
}));

const FAQS = [
  {
    value: 1,
    heading: 'What is a personal statement?',
    detail:
      'A personal statement is a 650-word essay on Common App that is required by most prestigious colleges and universities. It is the space where students can express themselves in any angle they wanted on their college application.'
  },
  {
    value: 2,
    heading: 'What is MentorMatch?',
    detail:
      'MentorMatch is a platform where high school students can get help from current college students or alumni on their personal statements and/or other application essays.'
  },
  {
    value: 3,
    heading: 'Can I choose my mentor?',
    detail:
      'Yes, you can. When you are submitting your essay, choose the Direct path which lets you to choose your mentor.'
  },
  {
    value: 4,
    heading: 'When should I expect to receive my feedback once I submitted my essay?',
    detail:
      'The expected date to receive your feedback depends on the path you chose and varies from mentor to mentor. If the Public path is chosen, the first available mentor will read your essay and provide you feedback in 2-4 days. On the other hand, for the Direct path, it depends on how many people have sent their essays to your mentor ahead of you.'
  },
  {
    value: 5,
    heading: 'Can I get feedback on my supplement essays?',
    detail: 'Yes, you can, but make sure to include the essay prompt on top of your Google Docs.'
  },
  {
    value: 6,
    heading: 'How much does it cost for one essay?',
    detail:
      'MentorMatch is a non-profit platform whose sole purpose is to help more students study in the US. MentorMatch is created and maintained with the help of our generous mentors who voluntarily reviews students essays and shares their expertise with the future generations. Hats off to our mentors!'
  },
  {
    value: 7,
    heading: 'How to become a mentor?',
    detail:
      'In order to become a mentor, you should be a current student or an alumna/alumnus of US colleges and universities and have certain experience in writing personal statement. If you think you qualify to become a mentor, send us an email to amsa.amox@gmail.com. '
  }
];

// ----------------------------------------------------------------------

export default function FaqsList() {
  return (
    <MotionInView variants={varFadeInUp}>
      {FAQS.map((accordion) => (
        <Accordion key={accordion.value}>
          <AccordionSummary expandIcon={<Icon icon={arrowIosDownwardFill} width={20} height={20} />}>
            <Typography variant="subtitle1">{accordion.heading}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{accordion.detail}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </MotionInView>
  );
}
