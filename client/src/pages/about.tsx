import Box from '@component/Box';
import OtherLayout from '@component/layout/OtherLayout';
import { H1, Paragraph } from '@component/Typography';
import useAllProductCategories from '@hook/Home/useAllProductCategories';
import useProductCount from '@hook/useNoOfProduct';
import useWindowSize from '@hook/useWindowSize';
import Head from 'next/head';
import React from 'react';

const ProductSearchResult = () => {
  const width = useWindowSize();
  const isTablet = width < 1025;

  return (
    <>
      <Head>
        <title>About Us - Nobarun International</title>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Store',
              name: 'Nobarun International',
              image: 'https://www.nobarunbd.com/assets/images/logo.svg',
              '@id': '',
              url: 'https://www.nobarunbd.com/',
              telephone: '01711-998626',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '01',
                addressLocality: 'Dhaka',
                postalCode: '1206',
                addressCountry: 'BD',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 23.8227481,
                longitude: 90.36253359999999,
              },
              openingHoursSpecification: {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: [
                  'Monday',
                  'Tuesday',
                  'Wednesday',
                  'Thursday',
                  'Saturday',
                  'Sunday',
                ],
                opens: '09:00',
                closes: '18:00',
              },
              sameAs: [
                'https://www.facebook.com/nobaruninternational',
                'https://twitter.com/nobarunbd',
                'https://www.youtube.com/c/NobarunInternational/videos',
                'https://www.youtube.com/c/NobarunInternational/videos',
              ],
            }),
          }}
        />
      </Head>

      <Box p="20px" mb="70px">
        <H1
          textAlign="center"
          mt={isTablet ? '35px' : ''}
          mb={30}
          fontSize="4rem"
        >
          About us
        </H1>
        <Paragraph
          mb="4rem"
          fontSize="2.5rem"
          lineHeight="3.5rem"
          textAlign="justify"
          fontWeight="600"
          color="#7D879C"
        >
          Everything is changing nowadays very fast because time is elapsing.
          Starting from the lifestyle, we see massive improvements in the
          business along with behavior as well. Coping up with this flow, we
          have tried something beyond ordinary which would bring the business to
          a new level. A goal can be achieved when you have a lot of things on
          your plate! This is the reason why we came up re-establishing and
          reforming ourselves as Nobarun International in 2017, which has been
          operating under the name of Projuktishop.com Our objective was always
          to hold a sanctuary in the minds of entrepreneurs.
        </Paragraph>
        <Paragraph
          mb="4rem"
          fontSize="2.5rem"
          lineHeight="3.5rem"
          textAlign="justify"
          fontWeight="600"
          color="#7D879C"
        >
          An office, factory or a corporate house needs a variety of equipment,
          which is why you have to undergo a lot of hassles to find the right
          vendors, which consumes a lot of time and finally the product you are
          going to get may have no assurance about the warranty. To evade the
          complications, we Nobarun International are here where you can get all
          the equipment with a hassle-free experience.
        </Paragraph>
        <Paragraph
          mb="4rem"
          fontSize="2.5rem"
          lineHeight="3.5rem"
          textAlign="justify"
          fontWeight="600"
          color="#7D879C"
        >
          Basically we work and provide service within 3-4 parts. Firstly,
          current state Bangladesh is in, our life has become unstable without
          the safety security systems.With that in mind, we have arch gates,
          luggage scanner, metal detector, anti-shop lifting, flap barrier,
          turnstile gates, safety bollards and relevant security equipment for
          use. We also have wide range of road traffic safety cones like convex
          mirror, parking barriers, traffic cones, lane divider, rubber speed
          breakers and so on to reduce accidents and improve safety on the
          roads.
        </Paragraph>
        <Paragraph
          mb="4rem"
          fontSize="2.5rem"
          lineHeight="3.5rem"
          textAlign="justify"
          fontWeight="600"
          color="#7D879C"
        >
          Moreover, if you are going to open a supermarket or super shop, we can
          provide all the equipment starting from the plan and designs to all
          the products. You will get all the products like gondola racks,
          commercial freezer, chiller, fish cutting machine, meat grinding
          machine, POS system at the counter as well from us with warranty.
        </Paragraph>
        <Paragraph
          mb="4rem"
          fontSize="2.5rem"
          lineHeight="3.5rem"
          textAlign="justify"
          fontWeight="600"
          color="#7D879C"
        >
          A restaurant’s kitchenis its opportunity to stand out and make a
          lasting first impression. Nobarun International is the global name for
          unique and creative goods. It is home to a universe of special,
          extraordinary appliances and gadgets, for unique masterpieces.Launched
          in 2017, Nobarun International offers a wide range of kitchen
          appliances starting from deep fryers, dough mixers, pizza ovens,
          commercial bakery ovens, juice dispensers, juice extractors or juice
          makers, food warmers, grill machines, shawarma machines, ice cream
          machines, coffee maker machines,popcorn makers and all the commercial
          kitchen equipment is there that a restaurant, food court or a place
          relevant to the food needs. Not only for a restaurant,these commercial
          appliances can be used in a commercial place, airport, food court,
          workplace - anywhere. You can also get the technically advanced
          electronics like bike security systems and so on. We decorated the
          product line in a way that it catches the attention of any customer’s
          unique sense of style. Our appliances and accessories are carefully
          curated to provide our customers with the latest models and
          technologies. To keep our customers up-to-date we introduce new
          arrivals in a week, as well as offer the best picks to help any
          indecisive shoppers. In terms of Bangladesh, the demand of commercial
          kitchen appliances are increasing day by day due to the number of
          restaurants and food courts are increasing. So you will need some
          high-quality kitchen accessories with a quality service; then we are
          right here! Just give a call, and then we will be knocking at your
          door! With our variety of top notch brand items and the very best
          equipment for you, Nobarun International provides all the equipment
          and components that you will need in your restaurant, coffee shop or
          food court.
        </Paragraph>
        <Paragraph
          mb="4rem"
          fontSize="2.5rem"
          lineHeight="3.5rem"
          textAlign="justify"
          fontWeight="600"
          color="#7D879C"
        >
          Beside our product lines, we work for to decorate a new and old
          restaurant. We can import products or equipment from abroad if
          necessary within a short period of time. We are such a type of company
          that will be a trustworthy name for you related to business. We are
          developed to provide all our services, equipment and gadgets according
          to your requirements. We will provide you with an idea about the pros
          and cons of a particular equipment or gadget so that you can choose on
          your own or what you need. If you cannot choose, then don’t worry! You
          can leave it on us. We are going to provide the best for you according
          to your budget and space.
        </Paragraph>
        <Paragraph
          mb="4rem"
          fontSize="2.5rem"
          lineHeight="3.5rem"
          textAlign="justify"
          fontWeight="600"
          color="#7D879C"
        >
          Nobarun International is an owner's best place to make the ideal
          investment and it will worth every penny.Nobarun International strives
          to make every purchase a positive experience. Our top priorities are
          excellent customer service, exceptionally quick order processing,
          ultra-fast delivering times, and hassle-free experience with lifetime
          service.
        </Paragraph>
        <Paragraph
          mb="4rem"
          fontSize="2.5rem"
          lineHeight="3.5rem"
          textAlign="justify"
          fontWeight="600"
          color="#7D879C"
        >
          We honor your feedback, whether it is positive or negative and we are
          continuously working to enhance your experience.As a company, we
          strive to lead with our guiding principles and to help spread ideas of
          sustainability and responsibility whose impact can reach far beyond
          our own business.
        </Paragraph>
        <Paragraph
          mb="4rem"
          fontSize="2.5rem"
          lineHeight="3.5rem"
          textAlign="justify"
          fontWeight="600"
          color="#7D879C"
        >
          If you are a first-time visitor or long-standing customer, we hope you
          will be thrilled with every aspect of Nobarun International shopping
          experience.We ask for your blessings so that we can go ahead through
          honesty and by working hard to reach our goal!
        </Paragraph>
      </Box>
    </>
  );
};

ProductSearchResult.layout = OtherLayout;

export async function getStaticProps() {
  let categories=[];
  let count=null;
  try {
    categories = await useAllProductCategories();
    categories=JSON.parse(JSON.stringify(categories));
  }
  catch (e) {

  }
  try {
    count = await useProductCount();
  }
  catch (e) {

  }
  finally {
    return {
      props: {
        categories,
        count,
      },
      revalidate: 30,
    };
  }
}

export default ProductSearchResult;
