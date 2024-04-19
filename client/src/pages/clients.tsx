import Box from '@component/Box';
import HoverBox from '@component/HoverBox';
import OtherLayout from '@component/layout/OtherLayout';
import { H2, H4 } from '@component/Typography';
import useAllProductCategories from '@hook/Home/useAllProductCategories';
import useAllClientsByCategory from '@hook/useAllClientsByCategory';
import useProductCount from '@hook/useNoOfProduct';
import useWindowSize from '@hook/useWindowSize';
import Head from 'next/head';
import React, { useState } from 'react';

const ClientsPage = ({ clients }) => {
  const [allLoadedCategory, setAllLoadedCategory] = useState('');

  const loadMoreHandler = (id: string) => {
    if (allLoadedCategory === id) {
      setAllLoadedCategory('');
    } else {
      setAllLoadedCategory(id);
    }
  };

  const width = useWindowSize();
  let noOfClients = 7;
  if (width < 1250) noOfClients = 6;
  if (width < 1170) noOfClients = 5;
  if (width < 1153) noOfClients = 6;
  if (width < 1053) noOfClients = 5;
  if (width < 1041) noOfClients = 6;
  if (width < 936) noOfClients = 5;
  if (width < 880) noOfClients = 7;
  if (width < 710) noOfClients = 6;
  return (
    <>
      <Head>
        <title>Client List- Nobarun International</title>{' '}
      </Head>
      <Box mb="6rem">
        <div className="hero" style={{ marginBottom: '2rem' }}>
          <h1 className="hero__title">Our Valuable Clients</h1>
        </div>
        {clients.map((category) => {
          const length =
            allLoadedCategory === category.categoryName
              ? category.clients.length
              : noOfClients;
          return (
            <Box mb="2rem" key={category.categoryName}>
              <H2 mb="2rem">{category.categoryName}</H2>
              <div className="clients-list_wrapper">
                {category.clients.slice(0, length).map((item, idx) => (
                  <Box
                    key={item.clientName + idx}
                    className="client client_list"
                  >
                    <HoverBox borderRadius={5} className="client__body">
                      <img
                        src={process.env.NEXT_PUBLIC_IMAGE_URL + item.logo}
                        style={{ width: '155px', height: '144.4px' }}
                      />
                    </HoverBox>
                    <H4
                      fontSize="1.4rem"
                      fontWeight="600"
                      className="client__title"
                    >
                      {item.clientName}
                    </H4>
                  </Box>
                ))}
              </div>
              <Box textAlign="right">
                <button
                  className="client_load-btn"
                  disabled={category.clients.length < 7}
                  onClick={() => loadMoreHandler(category.categoryName)}
                >
                  {allLoadedCategory === category.categoryName
                    ? 'Show Less'
                    : 'Load More'}
                </button>
              </Box>
            </Box>
          );
        })}
      </Box>
    </>
  );
};

ClientsPage.layout = OtherLayout;

export async function getStaticProps() {
  let clients=[];
  let categories=[];
  let count=null;
  try {
    clients = await useAllClientsByCategory();
  }
  catch (e) {

  }
  try {
    categories = await useAllProductCategories();
    categories=JSON.parse(JSON.stringify(categories));
  }
  catch (e) {

  }
  try {
    count = await useProductCount();
  }
  catch (e) {

  }
  finally {
    return {
      props: {
        clients,
        categories,
        count,
      },
      revalidate: 30,
    };
  }
}

export default ClientsPage;
