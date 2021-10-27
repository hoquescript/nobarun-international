import Clients from '@component/home-1/Clients';
import FeaturedCategories from '@component/home-1/FeaturedCategories';
import SpecialCollections from '@component/home-1/SpecialCollections';
import Testimonials from '@component/home-1/Testimonials';
import Slider from '../components/home-1/Slider';
import AppLayout from '../components/layout/AppLayout';

const IndexPage = () => {
  return (
    <main>
      <Slider />
      <Clients />
      <FeaturedCategories />
      <SpecialCollections />
      <Testimonials />
      {/* <Features /> */}
    </main>
  );
};

IndexPage.layout = AppLayout;

export default IndexPage;
