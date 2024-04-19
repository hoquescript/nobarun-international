import Box from '@component/Box';
import FlexBox from '@component/FlexBox';
import Image from '@component/Image';
import ProductCard12 from '@component/product-cards/HeadlineCard';
import Rating from '@component/rating/Rating';
import { Span } from '@component/Typography';
import Link from 'next/link';
import React from 'react';

interface RelatedProductProps {
  products: any[];
}

const RelatedProducts: React.FC<RelatedProductProps> = ({ products }) => {
  return (
    <ProductCard12 title="Related Products">
      <ul>
        {products?.map((product, idx) => (
          <li key={product?.image + idx} style={{ marginBottom: '1.5rem' }}>
            <Link href={product?.slug}>
              <a>
                <FlexBox alignItems="center">
                  <Image
                    src={process.env.NEXT_PUBLIC_IMAGE_URL + product?.image}
                    alt="Related Products"
                    height="80"
                    width="80"
                    borderRadius="10px"
                  />
                  <Box ml="20px">
                    <Span fontSize="18px">{product?.name}</Span>
                    <FlexBox alignItems="center">
                      <Rating
                        value={product?.ratingAverage}
                        color="warn"
                        size="small"
                      />
                      <Span fontSize="14px" ml="5px">
                        ({product?.totalReviewCount || 0})
                      </Span>
                    </FlexBox>
                  </Box>
                </FlexBox>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </ProductCard12>
  );
};

export default RelatedProducts;
