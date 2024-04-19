import Box from '@component/Box';
import useWindowSize from '@hook/useWindowSize';
import React, { useEffect, useState } from 'react';
import Grid from '../grid/Grid';
import ProductCard1 from '../product-cards/ProductCard';

export interface ProductCard1ListProps {
  products: any;
  filters: string[];
}

const ProductCard1List: React.FC<ProductCard1ListProps> = ({
  products,
  filters,
}) => {
  const [slices, setSlices] = useState(0);
  const width = useWindowSize();
  const MAX_INITIAL_DISPLAY = width < 769 ? 6 : 9;

  useEffect(() => {
    width < 769 ? setSlices(6) : setSlices(9);
  }, [width]);

  return (
    <Box>
      <Grid container spacing={6}>
        {products
          ?.filter((p) =>
            filters.length > 0
              ? filters.includes(p?.productData?.product?.stockStatus?.title)
              : p,
          )
          .slice(0, slices)
          .map(
            ({ productData: { product, reviewCount, ratingAverage } }, ind) => (
              <Grid item lg={4} md={4} sm={6} xs={6} key={ind}>
                <Box py="0.25rem" key={product?.id}>
                  <ProductCard1
                    id={product?.slug}
                    imgUrl={product?.featured}
                    title={product?.productName}
                    rating={ratingAverage}
                    noOfRating={reviewCount}
                    categoryName={product?.populatedCategory?.name}
                    categoryIcon={product?.populatedCategory?.icon}
                    price={250}
                    off={product.discount}
                    key={product.id}
                  />
                </Box>
              </Grid>
            ),
          )}
      </Grid>
      {products.length > MAX_INITIAL_DISPLAY && (
        <Box textAlign="center" mt="4rem">
          <button
            className="client_load-btn"
            onClick={() => {
              if (slices < products.length) setSlices(products.length);
              else if (slices === products.length)
                setSlices(MAX_INITIAL_DISPLAY);
            }}
          >
            {slices === products.length ? 'Show Less' : 'Load More'}
          </button>
        </Box>
      )}
    </Box>
  );
};

export default ProductCard1List;
