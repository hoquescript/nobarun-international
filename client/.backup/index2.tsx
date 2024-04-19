import { gql } from "@apollo/client";
import client from '../config/ApolloClient';
import GoToTop from '@component/goToTop/GoToTop';
import Clients from '@component/Home/Clients';
import CollectionWiseProduct from '@component/Home/CollectionWiseProduct';
import FeaturedCategories from '@component/Home/FeaturedCategories';
import Testimonials from '@component/Home/Testimonials';
import useAllProductCategories from '@hook/Home/useAllProductCategories';
// import Head from 'next/head';
import React from 'react';
import Slider from '../components/Home/Slider';
import AppLayout from '../components/layout/AppLayout';

const IndexPage = ({
  clients,
  categories,
  featuredCategories,
  collections,
}) => {
  return (
    <>
      {/*<Head>*/}
        {/*<meta*/}
          {/*name="description"*/}
          {/*content="Call Us ☎01711998626☎ Supplier of Electronic Security,Parking Safety,Super Shop Equipment &amp; Commercial Kitchen Equipment in Bangladesh"*/}
        {/*/>*/}
        {/*<meta name="keywords" content="Supplier of Electronic Safety Security Items, Parking Equipment, Super Shop Equipment, Slaughterhouse Equipment & Commercial Kitchen Equipment in Bangladesh"/>*/}
        {/*<meta name="author" content="John Doe"/>*/}
        {/*<title>Nobarun International</title>*/}
      {/*</Head>*/}
      <main>
        <GoToTop showBelow={250} />
        <Slider categories={categories} />
        <Clients slides={8} clients={clients} />
        <FeaturedCategories categories={featuredCategories} />
        {collections && collections.length && collections.map((item,index)=><CollectionWiseProduct collection={item} key={index+1}/>)}
        <Testimonials />
      </main>
    </>
  );
};
//
IndexPage.layout = AppLayout;
//
export async function getStaticProps() {
  let categories=[];
  let clients=[];
  let count=null;
  let collections=[];
  let featuredCategories=[];
  try {
    categories = await useAllProductCategories();
    categories=JSON.parse(JSON.stringify(categories));
    featuredCategories = categories.filter(
      (category) => category.isFeatured,
    );
  }
  catch (e) {

  }
  try {
    let { data } = await client.query({
      query: gql`
        query getFeaturedClients {
          getAllFeaturedClients {
            id
            title: clientName
            imgUrl: logo
          }
        }
      `,
    });
    clients=data.getAllFeaturedClients;
  }
  catch (e) {

  }
  try {
    let { data } = await client.query({
      query: gql`
         query getCollectionWiseProduct {
            getAllPopulatedCollection {
              name
              slug
              products {
                product {
                  id: slug
                  productName
                  discount
                  featured
                  populatedCategory {
                    name
                    icon
                  }
                }
                reviewCount
                ratingAverage
              }
            }
          }
      `,
    });
    collections=data.getAllPopulatedCollection;
  }
  catch (e) {

  }
  finally {
    return {
      props: {
        clients,
        categories,
        featuredCategories,
        collections,
        count,
      },
      revalidate: 30,
    };
  }
}

export default IndexPage;
