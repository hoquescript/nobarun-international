import Card from '@component/Card';
import Carousel from '@component/carousel/Carousel';
import FlexBox from '@component/FlexBox';
import HoverBox from '@component/HoverBox';
import { H4 } from '@component/Typography';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const RecentViewedProducts: React.FC = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const products = JSON.parse(localStorage.getItem('recentlyViewed'));
    setProducts(products);
  }, []);

  return (
    <FlexBox py="1.5rem" px="1.5rem" width="100%">
      {products ? (
        <Carousel
          totalSlides={products.length}
          visibleSlides={products.length < 6 ? products.length : 6}
        >
          {products?.map((product) => (
            <Card px="2rem" py="1rem" width="20rem" key={product?.id}>
              <Link href={`/${product.id}`}>
                <a>
                  <HoverBox borderRadius={8} mb="0.5rem">
                    <LazyLoadImage
                      src={process.env.NEXT_PUBLIC_IMAGE_URL + product.image}
                      alt={product.title}
                      effect="blur"
                      width="100%"
                      height="auto"
                    />
                  </HoverBox>
                  <H4 fontWeight="600" fontSize="14px" mb="0.25rem">
                    {product.title}
                  </H4>
                </a>
              </Link>
            </Card>
          ))}
        </Carousel>
      ) : (
        'No Products Recently Viewed'
      )}
    </FlexBox>
  );
};

export default RecentViewedProducts;
