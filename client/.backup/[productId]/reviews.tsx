import Box from '../../components/Box';
import Grid from '../../components/grid/Grid';
import OtherLayout from '../../components/layout/OtherLayout';
import AddQuery from '../../components/Product/AddQuery';
import AddReview from '../../components/Product/AddReview';
import CustomerMedia from '../../components/Product/CustomerMedia';
import RelatedReview from '../../components/Product/RelatedReview';
import ContactPerson from '../../components/Product/Review/ContactPerson';
import FeaturedImage from '../../components/Product/Review/FeaturedImage';
import ReviewSummary from '../../components/Product/Review/ReviewSummary';
import StarRating from '../../components/Product/Review/StarRating';
import StarReview from '../../components/Product/Review/StarReview';
import AllProductCategories from '../../hooks/Home/useAllProductCategories';
import ReviewsBySlug from '../../hooks/Product/useReviewsBySlug';
import ProductCount from '../../hooks/useNoOfProduct';
import useWindowSize from '../../hooks/useWindowSize';
import { format } from 'date-fns';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import React, { useState } from 'react';

const ReviewsPage = (props) => {
  const {
    schema,
    seoTitle,
    keywords,
    description,
    id,
    productTitle,
    featuredImage,
    contact,
    reviews,
    productCode,
    slug,
  } = props;
  const width = useWindowSize();
  const [isOpen, setIsOpen] = useState(false);
  const isLaptop = width < 1400 && width > 900;
  const isTablet = width < 900;
  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords.join(', ')} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.nobarunbd.com/" />
        <meta property="og:image:url" content={featuredImage} />
        <meta property="og:image:width" content="200" />
        <meta property="og:image:height" content="200" />
        <meta property="og:description" content={description} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </Head>
      <AddQuery
        id={'pid as string'}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        productId={id}
        productName={productTitle}
        productCode={productCode}
        contact={contact}
      />
      <Box my="5rem">
        <Box bg="#fff" mb="3rem">
          <Grid
            container
            alignItems={isLaptop ? 'normal' : 'center'}
            spacing={10}
          >
            {isLaptop ? (
              <Grid item xs={isLaptop ? 6 : 4}>
                <ReviewSummary {...props} isLaptop={isLaptop} />
              </Grid>
            ) : (
              <></>
            )}
            <Grid item xs={isLaptop ? 6 : isTablet ? 12 : 4}>
              <FeaturedImage
                isTablet={isTablet}
                productTitle={productTitle}
                featuredImage={featuredImage}
              />
            </Grid>
            {!isLaptop || isTablet ? (
              <Grid item xs={isLaptop ? 6 : isTablet ? 12 : 4}>
                <StarReview {...props} isTablet={isTablet} />
              </Grid>
            ) : (
              <></>
            )}
            {isLaptop ? (
              <Grid item xs={isLaptop ? 6 : 4}>
                <StarRating {...props} isLaptop={isLaptop} />
              </Grid>
            ) : (
              <></>
            )}
            <Grid item xs={isLaptop ? 6 : isTablet ? 12 : 4}>
              <ContactPerson
                slug={slug}
                productName={productTitle}
                productCode={productCode}
                contact={contact}
                setIsOpen={setIsOpen}
              />
            </Grid>
          </Grid>
        </Box>
        <Grid container spacing={isTablet ? 0 : 10}>
          <Grid item xs={isTablet ? 12 : 8}>
            <RelatedReview
              title="Load All Reviews"
              reviews={reviews}
              slug={slug}
            />
            {isTablet && <CustomerMedia reviews={reviews} />}
            <AddReview productCode={productCode} />
          </Grid>
          {!isTablet ? (
            <Grid item xs={4}>
              <CustomerMedia reviews={reviews} />
            </Grid>
          ) : (
            <></>
          )}
        </Grid>
      </Box>
    </>
  );
};

ReviewsPage.layout = OtherLayout;

const getHallmarkImage = (imageObj: any) => {
  const imagePath = imageObj.slice(0, 16);
  const imageName = imagePath.replace('media/', '');
  const src = `${process.env.NEXT_PUBLIC_IMAGE_URL}media/hallmark-${imageName}.png`;
  return src;
};

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const slug = context.params.productId;
  try {
    //! We have to debug furthermore
    const data = await ReviewsBySlug(slug);
    const categories = await AllProductCategories();
    const count = await ProductCount();

    const reviewSchema = data.reviews.map((review) => ({
      '@type': 'Review',
      name: review.title,
      reviewBody: review.reviewText,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: review.rating,
        bestRating: '5',
        worstRating: '1',
      },
      datePublished: format(new Date(review.createdAt), 'yyyy-MM-dd'),
      author: { '@type': 'Person', name: review.name },
    }));
    const schema = {
      '@context': 'https://schema.org/',
      '@type': 'Product',
      name: data?.productTitle,
      image:
        'https://nobarunawsvideouploader.s3.ap-south-1.amazonaws.com/' +
        data?.featuredImage,
      description: data?.description,
      sku: data?.productCode,
      offers: {
        '@type': 'Offer',
        url: '',
        priceCurrency: 'BDT',
        price: data?.price,
        availability: 'https://schema.org/InStock',
        itemCondition: 'https://schema.org/NewCondition',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: data?.summary?.avgRating,
        bestRating: '5',
        worstRating: '1',
        ratingCount: data?.summary?.noOfReviews,
        reviewCount: data?.summary?.noOfReviews,
      },
      review: reviewSchema,
    };

    return {
      props: {
        ...data,
        schema,
        featuredImage: getHallmarkImage(data.featuredImage),
        slug,
        categories,
        count,
      },
    };
  } catch (err) {
    return {
      notFound: true,
    };
  }
};

export default ReviewsPage;
