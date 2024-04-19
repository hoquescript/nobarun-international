import ProductCard12 from '@component/product-cards/HeadlineCard';
import React from 'react';

interface SpecificationsProps {
  specifications: string;
}

const Specifications: React.FC<SpecificationsProps> = ({ specifications }) => {
  return (
    <ProductCard12 title="Product Specification">
      <div
        className="product__specification"
        dangerouslySetInnerHTML={{ __html: specifications }}
      ></div>
    </ProductCard12>
  );
};

export default Specifications;
