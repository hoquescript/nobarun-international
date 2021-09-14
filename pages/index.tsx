import type { NextPage } from 'next';
import { getSession } from 'next-auth/client';
import { GetServerSideProps } from 'next';
import { AiOutlineAppstore, AiOutlineStar } from 'react-icons/ai';

import styles from '../styles/pages/dashboard.module.scss';

const Summary = () => {
  return (
    <div className={styles.summary}>
      <AiOutlineAppstore className={styles.summary__icon} />
      <div>
        <h2 className="heading-primary">13,856</h2>
        <h5>Total Products</h5>
      </div>
    </div>
  );
};

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
      <div>
        <h2 className="heading-tertiary">Chocolate Avocado Smoothie</h2>
        <h5>16 Reviews</h5>
      </div>
      <div className={styles.product__rating}>
        <AiOutlineStar />
        4.9(71)
      </div>
    </div>
  );
};

const Home: NextPage = () => {
  return (
    <div className={styles.dashboard}>
      <div className="grid four">
        <Summary />
        <Summary />
        <Summary />
        <Summary />
      </div>
      <div className="grid three" style={{ marginTop: '10rem' }}>
        <div className={styles.product_wrapper}>
          <h3 className="heading-secondary">Top Product Enquiry</h3>
          <Product />
          <Product />
          <Product />
          <Product />
        </div>
        <div className={styles.product_wrapper}>
          <h3 className="heading-secondary">Top Product Enquiry</h3>
          <Product />
          <Product />
          <Product />
          <Product />
        </div>
        <div className={styles.product_wrapper}>
          <h3 className="heading-secondary">Top Product Enquiry</h3>
          <Product />
          <Product />
          <Product />
          <Product />
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
