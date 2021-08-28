import { useFormik } from 'formik';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// material
import { Container, Stack, Typography } from '@material-ui/core';
// components
import Page from '../components/Page';
import { ProductSort, ProductList, ProductFilterSidebar } from '../components/_dashboard/products';
//
import { getMentors } from '../redux/slices/mentor';
import LoadingScreen from '../components/LoadingScreen';

// ----------------------------------------------------------------------

export default function Mentor() {
  const [openFilter, setOpenFilter] = useState(false);
  const dispatch = useDispatch();
  const { mentors, pending } = useSelector((state) => state.mentor);

  const formik = useFormik({
    initialValues: {
      gender: '',
      category: '',
      colors: '',
      priceRange: '',
      rating: ''
    },
    onSubmit: () => {
      setOpenFilter(false);
    }
  });

  const { resetForm, handleSubmit } = formik;

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleResetFilter = () => {
    handleSubmit();
    resetForm();
  };

  useEffect(() => {
    dispatch(getMentors());
  }, []);

  return (
    <Page title="Mentors">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Mentors
        </Typography>

        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              formik={formik}
              isOpenFilter={openFilter}
              onResetFilter={handleResetFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ProductSort />
          </Stack>
        </Stack>

        <ProductList products={mentors} />
        {pending && <LoadingScreen />}
      </Container>
    </Page>
  );
}
