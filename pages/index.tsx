import React from 'react';
import type { NextPage } from 'next';
import { getSession } from 'next-auth/client';
import { GetServerSideProps } from 'next';

import styles from '../styles/pages/dashboard.module.scss';
import Summary from '../components/dashboard/Summary';
import Product from '../components/dashboard/product';
import useRootQuery from '../hooks/useRootQuery';

interface HomeProps {
  summary: {
    totalProducts: string;
    totalQueries: string;
    totalPosts: string;
    totalReviews: string;
  };
  enquiries: any;
  recentProducts: any;
  recentReviews: any;
}
const Home: NextPage<HomeProps> = (props) => {
  const { summary, enquiries, recentProducts, recentReviews } = props;
  return (
    <div className="container center">
      <div className="row">
        <Summary title="Total Products" ammount={summary.totalProducts} />
        <Summary title="Customer Enquiry" ammount={summary.totalQueries} />
        <Summary title="Blog Post" ammount={summary.totalPosts} />
        <Summary title="Reviews" ammount={summary.totalReviews} />
      </div>
      <div className="row mt-50">
        <div className="col-4">
          <div className={styles.product_wrapper}>
            <h3 className="heading-secondary">Top Product Enquiry</h3>
            {enquiries.map((query) => (
              <Product {...query} />
            ))}
          </div>
        </div>
        <div className="col-4">
          <div className={styles.product_wrapper}>
            <h3 className="heading-secondary">Recent Products</h3>
            {recentProducts.map((product) => (
              <Product {...product} />
            ))}
          </div>
        </div>
        <div className="col-4">
          <div className={styles.product_wrapper}>
            <h3 className="heading-secondary">Recent Reviews</h3>
            {recentReviews.map((product) => (
              <Product {...product} />
            ))}
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
  const token = await getSession(context);
  // @ts-ignore
  const data = await useRootQuery(token.accessToken);
  return {
    props: data,
  };
};
export default Home;

// {
//   summary: {
//     totalProducts: 10,
//     totalQueries: 8,
//     totalPosts: 20,
//     totalReviews: 80,
//   },
// },
// };
