import Box from '@component/Box';
import Carousel from '@component/carousel/Carousel';
import Container from '@component/Container';
import FlexBox from '@component/FlexBox';
import HoverBox from '@component/HoverBox';
import { H2, H4 } from '@component/Typography';
import useWindowSize from '@hook/useWindowSize';
import React from 'react';
// import { LazyLoadImage } from 'react-lazy-load-image-component';

interface ClientProps {
  slides?: number;
  isProductDetails?: boolean;
  clients?: any[];
}
const Clients: React.FC<ClientProps> = ({ isProductDetails, clients }) => {
  const width = useWindowSize();
  const slices =
    width > 1700
      ? 10
      : width > 1500
      ? 9
      : width > 1200
      ? 8
      : width > 1000
      ? 7
      : width > 800
      ? 6
      : width > 650
      ? 5
      : 4;

  const ClientList = clients.map((item, ind) => (
    <Box key={item.title + ind} className="client client_related">
      <HoverBox borderRadius={5} className="client__body">
        {/*<LazyLoadImage*/}
          {/*src={process.env.NEXT_PUBLIC_IMAGE_URL + item.imgUrl}*/}
          {/*alt={item.title}*/}
          {/*effect="blur"*/}
          {/*width="118px"*/}
          {/*height="110px"*/}
        {/*/>*/}
        <img
          data-src={process.env.NEXT_PUBLIC_IMAGE_URL + item.imgUrl}
          alt={item.title}
          width={118}
          height={110}
          className="lazyload"/>
      </HoverBox>
      <H4 fontSize="1.4rem" fontWeight="600" className="client__title">
        {item.title}
      </H4>
    </Box>
  ));

  return (
    <Box
      pt={isProductDetails ? '4rem' : '3rem'}
      pb={isProductDetails ? '4rem' : '3rem'}
    >
      <FlexBox justifyContent="center" alignItems="center" mb="3rem">
        <FlexBox alignItems="center">
          <H2
            fontWeight="600"
            fontSize="26px"
            textAlign="center"
            lineHeight="1"
          >
            Our Clients
          </H2>
        </FlexBox>
      </FlexBox>
      <Container pb="1rem">
        <Box mb="-0.25rem">
          {/* <FlexBox justifyContent="space-between">{ClientList}</FlexBox> */}
          <Carousel
            totalSlides={clients?.length}
            visibleSlides={slices}
            autoPlay={10 < clients?.length}
            infinite={10 < clients?.length}
            showArrow={false}
          >
            {ClientList}
          </Carousel>
        </Box>
      </Container>
    </Box>
  );
};

export default Clients;
