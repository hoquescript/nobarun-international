import React from 'react';
import type { NextPage } from 'next';
import { getSession } from 'next-auth/client';
import { GetServerSideProps } from 'next';
import { AiOutlineAppstore, AiOutlineStar } from 'react-icons/ai';

import styles from '../styles/pages/dashboard.module.scss';
import Summary from '../components/dashboard/Summary';

const Product = () => {
  return (
    <div className={styles.product}>
      <div>
        <img
          src="/images/product-img.jpg"
          alt="Product"
          className={styles.product__image}
        />
      </div>
      <div className="ml-10">
        <h2 className="heading-tertiary">Chocolate Avocado Smoothie</h2>
        <div className="flex">
          <h5>16 Reviews</h5>
          <span className={styles.product__circle}>&nbsp;</span>
          <span className="flex ml-10">
            <AiOutlineStar />
            4.9(71)
          </span>
        </div>
      </div>
      <div className={styles.product__rating} style={{ display: 'none' }}>
        <span className="flex">
          <AiOutlineStar />
          4.9(71)
        </span>
      </div>
    </div>
  );
};

const Home: NextPage = () => {
  return (
    <div className="container center">
      <div className="row">
        <Summary title="Total Products" ammount="13,856" />
        <Summary title="Customer Enquiry" ammount="1,850" />
        <Summary title="Blog Post" ammount="856" />
        <Summary title="Reviews" ammount="35,856" />
      </div>
      <div className="row mt-50">
        <div className="col-4">
          <div className={styles.product_wrapper}>
            <h3 className="heading-secondary">Top Product Enquiry</h3>
            <Product />
            <Product />
            <Product />
            <Product />
          </div>
        </div>
        <div className="col-4">
          <div className={styles.product_wrapper}>
            <h3 className="heading-secondary">Recent Products</h3>
            <Product />
            <Product />
            <Product />
            <Product />
          </div>
        </div>
        <div className="col-4">
          <div className={styles.product_wrapper}>
            <h3 className="heading-secondary">Recent Reviews</h3>
            <Product />
            <Product />
            <Product />
            <Product />
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });
  if (!session) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
export default Home;
