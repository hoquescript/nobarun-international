import ProductCard12 from '@component/product-cards/HeadlineCard';
import React from 'react';

interface FeaturesProps {
  features: string;
}
const SpecialFeatures: React.FC<FeaturesProps> = ({ features }) => {
  return (
    <ProductCard12 title="Product Special Features">
      {
        <div
          className="product__features"
          dangerouslySetInnerHTML={{ __html: features.replace('&nbsp;', '') }}
        ></div>
      }
    </ProductCard12>
  );
};

export default SpecialFeatures;
