import Box from '@component/Box';
import IconButton from '@component/buttons/IconButton';
import Card from '@component/Card';
import FlexBox from '@component/FlexBox';
import Grid from '@component/grid/Grid';
import Hidden from '@component/hidden/Hidden';
import Icon from '@component/icon/Icon';
import OtherLayout from '@component/layout/OtherLayout';
import CollectionFilterCard from '@component/Product/Collection/CollectionFilterCard';
import CollectionProductCard from '@component/Product/Collection/ProductCollectionCard';
import Sidenav from '@component/sidenav/Sidenav';
import { H5, Paragraph } from '@component/Typography';
import useProductsByCollection from '@hook/Product/useProductsByCollectionName';
import useProductCount from '@hook/useNoOfProduct';
import useWindowSize from '@hook/useWindowSize';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import React, { useState } from 'react';

const CollectionsPage = ({
  collectionName,
  products,
  stockStatus,
  categories,
}) => {
  const [filters, setFilters] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const width = useWindowSize();
  const isTablet = width < 1025;

  return (
    <>
      <Head>
        <title>
          {collectionName + " Collection's Products Price in Bangladesh"}
        </title>
      </Head>

      <Box pt="20px" mb="5rem">
        <FlexBox
          p="1.25rem"
          flexWrap="wrap"
          justifyContent="space-between"
          alignItems="center"
          mb="55px"
          elevation={5}
          as={Card}
        >
          <div>
            <H5>{collectionName}</H5>
            <Paragraph color="text.muted">
              {products.length} results found
            </Paragraph>
          </div>
          <FlexBox alignItems="center" flexWrap="wrap">
            {isTablet && (
              <Sidenav
                position="left"
                scroll={true}
                handle={
                  <IconButton size="small">
                    <Icon>options</Icon>
                  </IconButton>
                }
              >
                <CollectionFilterCard
                  filters={filters}
                  setFilters={setFilters}
                  slug={selectedCategory}
                  categories={categories}
                  setSelectedCategory={setSelectedCategory}
                  stockStatus={stockStatus}
                />
              </Sidenav>
            )}
          </FlexBox>
        </FlexBox>
        <Grid container spacing={6}>
          <Hidden as={Grid} item lg={3} xs={12} down={1024}>
            {/* <ProductFilterCard /> */}
            <CollectionFilterCard
              filters={filters}
              setFilters={setFilters}
              slug={selectedCategory}
              categories={categories}
              setSelectedCategory={setSelectedCategory}
              stockStatus={stockStatus}
            />
          </Hidden>

          <Grid item lg={9} xs={12}>
            <CollectionProductCard
              selectedCategory={selectedCategory}
              products={products}
              filters={filters}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

CollectionsPage.layout = OtherLayout;

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const slug = context.params.collectionSlug;
  try {
    const data = await useProductsByCollection(slug);
    const count = await useProductCount();
    if (data)
      return {
        props: {
          collectionName: data.products.collectionName,
          products: data.products.products,
          stockStatus: data.stocks,
          categories: data.categories,
          count,
        },
      };
    else {
      return {
        notFound: true,
      };
    }
  } catch (err) {
    return {
      notFound: true,
    };
  }
};

export default CollectionsPage;
