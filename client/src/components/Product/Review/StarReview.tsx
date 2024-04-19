import Box from '@component/Box';
import React from 'react';
import ReviewSummary from './ReviewSummary';
import StarRating from './StarRating';

const StarReview = (props) => {
  const {
    productTitle,
    productCode,
    price,
    summary,
    details,
    isLaptop,
    isTablet,
  } = props;
  const className = isLaptop ? 'review_summary' : '';
  return (
    <Box className={className}>
      <ReviewSummary
        productTitle={productTitle}
        productCode={productCode}
        price={price}
        summary={summary}
        isLaptop={false}
        isTablet={isTablet}
      />
      <StarRating details={details} isLaptop={false} />
    </Box>
  );
};

export default StarReview;
