import Box from '@component/Box';
import Carousel from '@component/carousel/Carousel';
import ProductCard1 from '@component/product-cards/ProductCard';
import useWindowSize from '@hook/useWindowSize';
import React from 'react';
import CategorySectionCreator from './CategorySectionCreator';

const CollectionWiseProduct: React.FC<{ collection: any }> = ({
  collection,
}) => {
  let slice: number;
  const width = useWindowSize();
  if (width > 1200) {
    slice = 4;
  } else if (width < 1200 && width > 800) {
    slice = 3;
  } else if (width < 800) {
    slice = 2;
  }

  return (
    <Box mb="8rem">
      {collection && collection.products && collection.products.length ?
        <CategorySectionCreator
          key={collection.name}
          iconName="light"
          title={collection.name}
          seeMoreLink={`/product/collection/${collection.slug}`}
        >
          <Box>
            <Carousel
              // totalSlides={collection?.products?.length}
              totalSlides={4}
              visibleSlides={slice}
              interval={2000}
              autoPlay={true}
              infinite={true}
              arrowButtonClass="collection-arrow"
              leftButtonClass="collection-arrow--left"
              rightButtonClass="collection-arrow--right"
              showArrowOnHover={slice === 2}
            >
              {collection.products.filter((item,index)=>item && index<4).map(
                ({ product, reviewCount, ratingAverage }) => (
                  <Box py="0.25rem" key={product?.id}>
                    <ProductCard1
                      id={product?.id}
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
                ),
              )}
            </Carousel>
          </Box>
        </CategorySectionCreator>
        :
        null
      }
    </Box>
  );
};

export default CollectionWiseProduct;
