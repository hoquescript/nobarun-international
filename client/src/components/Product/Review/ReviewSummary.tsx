import Box from '@component/Box';
import FlexBox from '@component/FlexBox';
import Rating from '@component/rating/Rating';
import { H1, Span, H4, H2, SemiSpan } from '@component/Typography';
import React from 'react';

const ReviewSummary = ({
  productTitle,
  productCode,
  price,
  summary,
  isLaptop,
  isTablet,
}) => {
  return (
    <>
      <Box
        mt={isLaptop ? '9rem' : ''}
        mb="2rem"
        textAlign={isLaptop || isTablet ? 'center' : 'left'}
      >
        <H1 fontSize="3.2rem">{productTitle}</H1>
        <Span fontSize="1.8rem" color="#000">
          Product Code: {productCode}
        </Span>
        {price && <H4 color="#EC1C24">Price: {price}</H4>}
      </Box>
      <FlexBox
        mt={isLaptop ? '5rem' : ''}
        mb="2rem"
        flexDirection="column"
        alignItems="center"
      >
        <H2 mb="1rem" fontWeight="3.2rem" color="#323357">
          Customer reviews
        </H2>
        <FlexBox
          alignItems="center"
          justifyContent="center"
          backgroundColor="#F5F8FF"
          p="1.5rem 1rem"
          borderRadius="10rem"
          width="30rem"
        >
          <Rating value={summary?.avgRating} color="warn" size="large" />
          <Span ml="1rem">
            {Math.round(summary?.avgRating * 10) / 10} out of 5
          </Span>
        </FlexBox>
        <SemiSpan mt="1rem" fontSize="16px" color="#595B71">
          {summary?.noOfReviews} customer ratings
        </SemiSpan>
      </FlexBox>
    </>
  );
};

export default ReviewSummary;
