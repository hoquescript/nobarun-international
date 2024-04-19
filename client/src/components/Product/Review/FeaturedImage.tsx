import React from 'react';

const FeaturedImage = ({ featuredImage, productTitle, isTablet }) => {
  return (
    <div style={{ textAlign: isTablet ? 'center' : 'left' }}>
      <img
        src={featuredImage}
        alt={productTitle}
        loading="eager"
        className="product__hero-image review__hero-image"
      />
    </div>
  );
};

export default FeaturedImage;
