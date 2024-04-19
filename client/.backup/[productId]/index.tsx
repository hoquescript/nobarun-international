import Box from '../../components/Box';
import GoToTop from '../../components/goToTop/GoToTop';
import Grid from '../../components/grid/Grid';
import NavbarLayout from '../../components/layout/NavbarLayout';
import MobileNavigationBar from '../../components/mobile-navigation/MobileNavigationBar';
import AddQuery from '../../components/Product/AddQuery';
import AddReview from '../../components/Product/AddReview';
import Ammenities from '../../components/Product/Ammenities';
import Contacts from '../../components/Product/Contacts';
import CustomerMedia from '../../components/Product/CustomerMedia';
import DesktopStickyBar from '../../components/Product/DesktopStickyBar';
import Features from '../../components/Product/Features';
import MobileStickyBar from '../../components/Product/MobileStickyBar';
import ProductHead from '../../components/Product/ProductHead';
import ProductIntro from '../../components/Product/ProductIntro';
import Questions from '../../components/Product/Questions';
import RelatedProducts from '../../components/Product/RelatedProducts';
import RelatedReview from '../../components/Product/RelatedReview';
import SpecialFeatures from '../../components/Product/SpecialFeatures';
import Specifications from '../../components/Product/Specifications';
import Tags from '../../components/Product/Tags';
import RelatedClients from '../../components/products/RelatedClients';
import AllProductCategories from '../../hooks/Home/useAllProductCategories';
import ProductById from '../../hooks/Product/useProductById';
import ProductCount from '../../hooks/useNoOfProduct';
import useWindowSize from '../../hooks/useWindowSize';
import Client from '../../config/GraphQLRequest';
import { gql } from 'graphql-request';
import setRecentlyViewedProduct from '../../helpers/setRecentlyViewedProduct';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useState } from 'react';

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
  }, [pid]);

  return (
    <Fragment>
      <ProductHead schema={schema} product={product} />
      <AddQuery
        id={pid as string}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        productId={product?.intro?.id as string}
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
            {product?.clients?.length > 0 && (
              <RelatedClients
                clients={product?.clients}
                slides={6}
                isProductDetails
              />
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
  const productId = context.params.productId;
  try {
    //! We have to debug furthermore
    let data = await ProductById(productId);
    data=JSON.parse(JSON.stringify(data));
    const count = await ProductCount();
    let categories = await AllProductCategories();
    categories=JSON.parse(JSON.stringify(categories));

    let imageName=""
    if(data && data.intro && data.intro.featuredImage && data.intro.featuredImage.src){
      let imagePath = data.intro.featuredImage.src.slice(0, 16);
      if(imagePath){
        imageName = imagePath.replace('media/', '');
      }
    }

    const schema = {
      '@context': 'https://schema.org/',
      '@type': 'Product',
      name: data?.intro?.productName,
      // image:
      //   'https://nobarunawsvideouploader.s3.ap-south-1.amazonaws.com/' +
      //   data?.intro?.featuredImage?.src,
      image:`https://nobarunawsvideouploader.s3.ap-south-1.amazonaws.com/media/hallmark-${imageName}.png`,
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
    };

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
  } catch (err) {
    console.log(err);
    return {
      notFound: true,
    };
  }
};

export default ProductDetails;
