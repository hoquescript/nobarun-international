import Box from '@component/Box';
import IconButton from '@component/buttons/IconButton';
import Card from '@component/Card';
import FlexBox from '@component/FlexBox';
import Grid from '@component/grid/Grid';
import Hidden from '@component/hidden/Hidden';
import Icon from '@component/icon/Icon';
import OtherLayout from '@component/layout/OtherLayout';
import CollectionFilterCard from '@component/Product/Collection/CollectionFilterCard';
import TagsProductCard from '@component/Product/Tags/TagProductCards';
import Sidenav from '@component/sidenav/Sidenav';
import { H5, Paragraph } from '@component/Typography';
import useProductsByTag from '@hook/Product/useProductsByTag';
import useProductCount from '@hook/useNoOfProduct';
import useWindowSize from '@hook/useWindowSize';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import React, { useState } from 'react';

const TagsPage = ({ tags, products, stocks: stockStatus, categories }) => {
  const [filters, setFilters] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const width = useWindowSize();
  const isTablet = width < 1025;

  return (
    <>
      <Head>
        <title>{tags + ' Dhaka Archives - Nobarun International'}</title>
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
            <H5>{tags}</H5>
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
            <CollectionFilterCard
              filters={filters}
              setFilters={setFilters}
              slug={selectedCategory}
              categories={categories}
              setSelectedCategory={setSelectedCategory}
              stockStatus={null}
            />
          </Hidden>

          <Grid item lg={9} xs={12}>
            <TagsProductCard
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

TagsPage.layout = OtherLayout;

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const tagsId = context.params?.tagsId;
  try {
    const REGEX = /-/gim;
    const data = await useProductsByTag(tagsId?.replace(REGEX, ' '));
    const count = await useProductCount();

    if (data)
      return {
        props: {
          tags: tagsId?.replace(REGEX, ' '),
          count,
          categories: data?.categories,
          ...data,
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

export default TagsPage;
