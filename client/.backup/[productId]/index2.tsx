import dynamic from 'next/dynamic'
import Box from '@component/Box';
import GoToTop from '@component/goToTop/GoToTop';
import Grid from '@component/grid/Grid';
import NavbarLayout from '@component/layout/NavbarLayout';
import MobileNavigationBar from '@component/mobile-navigation/MobileNavigationBar';
import AddQuery from '@component/Product/AddQuery';
// import AddReview from '@component/Product/AddReview';
const AddReview = dynamic(
  () => import('../../components/Product/AddReview'),
  { ssr: false }
);
// import Ammenities from '@component/Product/Ammenities';
const Ammenities = dynamic(
  () => import('../../components/Product/Ammenities'),
  { ssr: false }
);
// import Contacts from '@component/Product/Contacts';
const Contacts = dynamic(
  () => import('../../components/Product/Contacts'),
  { ssr: false }
);
// import CustomerMedia from '@component/Product/CustomerMedia';
const CustomerMedia = dynamic(
  () => import('../../components/Product/CustomerMedia'),
  { ssr: false }
);
import DesktopStickyBar from '@component/Product/DesktopStickyBar';
import Features from '@component/Product/Features';
import MobileStickyBar from '@component/Product/MobileStickyBar';
import ProductHead from '@component/Product/ProductHead';
import ProductIntro from '@component/Product/ProductIntro';
// import Questions from '@component/Product/Questions';
const Questions = dynamic(
  () => import('../../components/Product/Questions'),
  { ssr: false }
);
// import RelatedProducts from '@component/Product/RelatedProducts';
const RelatedProducts = dynamic(
  () => import('../../components/Product/RelatedProducts'),
  { ssr: false }
);
// import RelatedReview from '@component/Product/RelatedReview';
const RelatedReview = dynamic(
  () => import('../../components/Product/RelatedReview'),
  { ssr: false }
);
// import SpecialFeatures from '@component/Product/SpecialFeatures';
const SpecialFeatures = dynamic(
  () => import('../../components/Product/SpecialFeatures'),
  { ssr: false }
);
// import Specifications from '@component/Product/Specifications';
const Specifications = dynamic(
  () => import('../../components/Product/Specifications'),
  { ssr: false }
);
// import Tags from '@component/Product/Tags';
const Tags = dynamic(
  () => import('../../components/Product/Tags'),
  { ssr: false }
);
// import RelatedClients from '../../components/products/RelatedClients';
// const RelatedClients = dynamic(
//   () => import('../../components/products/RelatedClients'),
//   { ssr: false }
// );
import useAllProductCategories from '@hook/Home/useAllProductCategories';
import useProductById from '@hook/Product/useProductById';
import useProductCount from '@hook/useNoOfProduct';
import useWindowSize from '@hook/useWindowSize';
import Client from 'config/GraphQLRequest';
import { gql } from 'graphql-request';
import setRecentlyViewedProduct from 'helpers/setRecentlyViewedProduct';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useState } from 'react';
//
import HoverBox from '../../components/HoverBox';
import { H2, H4 } from '../../components/Typography';
import FlexBox from '../../components/FlexBox';
//
const INCREASE_VIEW = gql`
  mutation increaseView($slug: String!) {
    increaseViewCountById(slug: $slug)
  }
`;

const ProductDetails = ({ schema, slug, product, reviews }) => {
  const router = useRouter();
  const pid = router.query.productId;
  const [active, setActive] = useState(false);

  const width = useWindowSize();
  const isTabPhone = width < 900;
  const hasReviews = reviews && reviews.length > 0;

  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const handleStickyBar = () => {
      if (window.scrollY >= 150) {
        setActive(true);
      } else {
        setActive(false);
      }
    };
    window.addEventListener('scroll', handleStickyBar);
  }, []);

  useEffect(() => {
    Client.request(INCREASE_VIEW, { slug: pid });
    setRecentlyViewedProduct(pid, product);
  }, []);


  return (
    <Fragment>
      <ProductHead schema={schema} product={product} />
      <AddQuery
        id={pid as string}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        // productId={product?.intro?.id as string}
        productName={product?.intro?.productName}
        productCode={product?.intro?.productCode}
        contact={product?.contact}
      />
      <GoToTop showBelow={250} />
      <MobileNavigationBar
        product={{ ...product, slug: pid }}
        phone={product?.contact?.whatsAppNumber}
        setIsOpen={setIsOpen}
      />
      <DesktopStickyBar
        product={product}
        active={active}
        setIsOpen={setIsOpen}
        reviewLength={product.intro.review}
      />
      <MobileStickyBar
        product={product}
        active={active}
        setIsOpen={setIsOpen}
        reviewLength={product.intro.review}
      />
      <Grid container>
        <Grid item lg={width > 1600 ? 9 : 8} xs={width > 900 ? 8 : 12}>
          <Box mr={width > 900 ? '1rem' : '0'}>
            <section id="details">
              <ProductIntro data={product?.intro} />
            </section>
            {/*{product?.clients?.length > 0 && (*/}
              {/*<RelatedClients*/}
                {/*clients={product?.clients}*/}
                {/*slides={6}*/}
                {/*isProductDetails*/}
              {/*/>*/}
            {/*)}*/}
            {product?.clients?.length > 0 &&(
              <Box pt="1em" mb="2rem">
                <FlexBox justifyContent="center" alignItems="center" mb="1em">
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
                <Grid container spacing={4}>
                  {product.clients.map((item,index) => (
                    <Grid
                      item
                      lg={2}
                      md={2}
                      sm={2}
                      key={index+1}>
                      <Box className="client client_related" mr="1rem">
                        <HoverBox borderRadius={5} className="client__body">
                          <img
                            data-src={process.env.NEXT_PUBLIC_IMAGE_URL + item.imgUrl}
                            alt={`Nobarun-Client-${item.title}`}
                            className="client__image lazyload"
                          />
                        </HoverBox>
                        <H4 fontSize="1.4rem" fontWeight="600" className="client__title">
                          {item.title}
                        </H4>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}

            {isTabPhone && product?.contact && (
              <>
                <Contacts
                  slug={slug}
                  productName={product?.intro?.productName}
                  productCode={product?.intro?.productCode}
                  contact={product?.contact}
                  setIsOpen={setIsOpen}
                />
                <Ammenities contact={product?.contact} />
              </>
            )}
            {product?.keyPoints &&
            product?.keyPoints.length === 1 &&
            product?.keyPoints[0].title === '' &&
            product?.keyPoints[0].content === '' ? (
              <span>&nbsp;</span>
            ) : (
              <section id="keypoints">
                <Features features={product?.keyPoints} />
              </section>
            )}
          </Box>
        </Grid>
        <Grid item lg={width > 1600 ? 3 : 4} xs={width > 900 ? 4 : 12}>
          {!isTabPhone && product?.contact && (
            <Contacts
              slug={slug}
              productName={product?.intro?.productName}
              productCode={product?.intro?.productCode}
              contact={product?.contact}
              setIsOpen={setIsOpen}
            />
          )}
          {!isTabPhone && <Ammenities contact={product?.contact} />}
          {product?.features && (
            <SpecialFeatures features={product?.features} />
          )}
          {product?.specifications && (
            <Specifications specifications={product?.specifications} />
          )}
          {product?.relatedProducts && product?.relatedProducts.length > 0 && (
            <RelatedProducts products={product?.relatedProducts} />
          )}
        </Grid>
        <Grid item lg={width > 1600 ? 9 : 8} xs={width > 900 ? 8 : 12}>
          <Box mr={width > 900 ? '1rem' : '0'}>
            {product?.questions &&
            product?.questions.length === 1 &&
            product?.questions[0].title === '' &&
            product?.questions[0].question === '' ? (
              <span>&nbsp;</span>
            ) : (
              <section id="questions">
                <Questions questions={product?.questions} />
              </section>
            )}
          </Box>
        </Grid>
        <Grid item lg={width > 1600 ? 3 : 4} xs={width > 900 ? 4 : 12}>
          {product?.tags && product?.tags.length > 0 && (
            <Tags chips={product?.tags} />
          )}
        </Grid>
        <Grid item lg={width > 1600 ? 9 : 8} xs={width > 900 ? 8 : 12}>
          <Box mr={width > 900 ? '1rem' : '0'}>
            <section id="reviews">
              {hasReviews && (
                <RelatedReview
                  title="Read all reviews"
                  slug={pid}
                  reviews={reviews}
                />
              )}
            </section>
            <section id="addQuote">
              <AddReview productCode={product.intro.productCode} />
            </section>
          </Box>
        </Grid>
        <Grid item lg={width > 1600 ? 3 : 4} xs={width > 900 ? 4 : 12}>
          {hasReviews && <CustomerMedia reviews={reviews} />}
        </Grid>
      </Grid>
    </Fragment>
  );
};

ProductDetails.layout = NavbarLayout;

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  context.res.setHeader(
    'Cache-Control',
    'public, s-maxage=30, stale-while-revalidate=59'
  );
  const productId = context.params.productId;
  let data:any=[];
  let count=0;
  let categories=[];
  let schema={};
  try {
    data = await useProductById(productId);
  }
  catch (e) {

  }
  try {
    count = await useProductCount();
  }
  catch (e) {

  }
  try {
    categories = await useAllProductCategories();
  }
  catch (e) {

  }
  try {
    categories = JSON.parse(JSON.stringify(categories));
    let imageName = "";
    if (data && data.intro && data.intro.featuredImage && data.intro.featuredImage.src) {
      let imagePath = data.intro.featuredImage.src.slice(0, 16);
      if (imagePath) {
        imageName = imagePath.replace('media/', '');
      }
    }
    schema = {
      '@context': 'https://schema.org/',
      '@type': 'Product',
      name: data?.intro?.productName,
      // image:
      //   'https://nobarunawsvideouploader.s3.ap-south-1.amazonaws.com/' +
      //   data?.intro?.featuredImage?.src,
      image: `https://nobarunawsvideouploader.s3.ap-south-1.amazonaws.com/media/hallmark-${imageName}.png`,
      description: data?.seo?.description,
      sku: data?.intro?.productCode,
      // offers: {
      //   '@type': 'Offer',
      //   url: '',
      //   priceCurrency: 'BDT',
      //   price: data?.intro?.price,
      //   availability: 'https://schema.org/InStock',
      //   itemCondition: 'https://schema.org/NewCondition',
      // },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: data?.intro?.rating,
        bestRating: '5',
        worstRating: '1',
        reviewCount: data?.intro?.review,
      },
    }
  }
  finally {
      return {
        props: {
          slug: productId,
          product: data,
          schema,
          count,
          categories,
          reviews: data?.reviews,
          isError: false,
        },
      };
    }
};

export default ProductDetails;
