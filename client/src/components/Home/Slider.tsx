import Box from '@component/Box';
import CarouselCard1 from '@component/carousel-cards/CarouselCard1';
import Carousel from '@component/carousel/Carousel';
import Container from '@component/Container';
import Navbar from '@component/navbar/Navbar';
import useWindowSize from '@hook/useWindowSize';
import React, { Fragment, useEffect,useRef, useState } from 'react';

const Slider: React.FC<{ categories: any[] }> = ({ categories }) => {
  const width = useWindowSize();
  const [height, setHeight] = useState(400);
  const isTablet = width < 1025;
  const heroContainer = useRef<HTMLDivElement>(null);
  // useLayoutEffect(() => {
  useEffect(() => {
    const rect = heroContainer?.current?.getBoundingClientRect();
    setHeight(rect.height);
  }, [heroContainer?.current?.offsetHeight]);

  return (
    <Fragment>
      <Navbar navListOpen={true} height={height} categories={categories} />
      <Box bg="gray.white" mt={isTablet ? '2.5rem' : ''}>
        <Container ref={heroContainer}>
          <Carousel
            totalSlides={6}
            visibleSlides={1}
            infinite={true}
            autoPlay={true}
            showDots={true}
            interval={4000}
            dotClass="hero-slider"
            showArrow={false}
            spacing="0px">
            {[
              '/assets/images/banners/1 Bakery-Equipment-nobarun.webp',
              '/assets/images/banners/2 Slaughterhouse-Equipment-4.webp',
              '/assets/images/banners/3 Supermarket-Equipment-with-logo.webp',
              '/assets/images/banners/4 Slaughterhouse-Equipment.webp',
              '/assets/images/banners/5 Metal-Detector-&-Scanning-System.webp',
              '/assets/images/banners/6-Slaughterhouse-Equipment-nobarun.webp',
            ].map((link) => (
              <CarouselCard1 link={link} key={link} />
            ))}
          </Carousel>
        </Container>
      </Box>
    </Fragment>
  );
};

export default Slider;
