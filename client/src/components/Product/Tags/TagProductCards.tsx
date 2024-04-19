import Box from '@component/Box';
import useWindowSize from '@hook/useWindowSize';
import React, { useEffect, useState } from 'react';
import Grid from '../../grid/Grid';
import ProductCard1 from '../../product-cards/ProductCard';

export interface ProductCard1ListProps {
  selectedCategory: string;
  products: any;
  filters: string[];
}

const TagsProductCard: React.FC<ProductCard1ListProps> = ({
  selectedCategory,
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
          ?.filter((product) => {
            return selectedCategory === ''
              ? product
              : product?.category?.name === selectedCategory;
          })
          ?.filter((product) =>
            filters.length > 0
              ? filters.includes(product?.stockStatus)
              : product,
          )
          .slice(0, slices)
          .map((product, ind) => (
            <Grid item lg={4} sm={6} xs={12} key={ind}>
              <Box py="0.25rem" key={product?.id}>
                <ProductCard1
                  id={product?.slug}
                  imgUrl={product?.featuredImage}
                  title={product?.name}
                  rating={product?.avgReview}
                  noOfRating={product?.noOfRating}
                  categoryName={product?.category?.name}
                  categoryIcon={product?.category?.icon}
                />
              </Box>
            </Grid>
          ))}
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

export default TagsProductCard;
