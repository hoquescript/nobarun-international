import React, { useMemo, useState } from 'react';
import { sub, format } from 'date-fns';
import { FaPlusCircle, FaGripHorizontal, FaList } from 'react-icons/fa';

import TimePeriod from '../../components/controls/period';
import Search from '../../components/controls/search';
import Product from '../../components/products/product';

import styles from '../../styles/pages/products.module.scss';
import ProductList from '../../components/products/ProductList/ProductList';
import Table from '../../components/shared/Table';
import { COLUMNS } from '../../data/column';
import reviews from '../../data/tableData.json';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';

const Products = () => {
  const [viewType, setViewType] = useState('grid');
  const [period, setPeriod] = useState(
    `${format(sub(new Date(), { months: 6 }), 'yyyy-MM-dd')} - ${format(
      new Date(),
      'yyyy-MM-dd',
    )}`,
  );

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => reviews, []);

  return (
    <div className="container center">
      <div className="row mb-30">
        <div className="col-6">
          <Search />
        </div>
        <div className="col-2">
          <TimePeriod period={period} setPeriod={setPeriod} />
        </div>
      </div>

      <div className={styles.products__header}>
        <h2 className="heading-primary">50 Results</h2>
        <div className={styles.products__viewWrapper}>
          <div className="sort-by">
            <span className="mr-10">Sort by</span>
            <select className="custom-input" style={{ padding: '1rem' }}>
              <option value="">Name</option>
              <option value="">Date</option>
              <option value="">Stock Id</option>
            </select>
          </div>
          <div className={styles.products__btnWrapper}>
            <button
              className={styles.products__view_btn}
              onClick={() => setViewType('grid')}
            >
              <FaGripHorizontal className="mr-10" />
              Card
            </button>
            <button
              className={styles.products__view_btn}
              onClick={() => setViewType('list')}
            >
              <FaList className="mr-10" />
              List
            </button>
          </div>
        </div>
        <div>
          <button type="button" className="btn-outline-green mr-20">
            <FaPlusCircle className="btn-icon-small" />
            Add Query
          </button>
        </div>
      </div>
      <div className="row">
        {viewType === 'grid' ? (
          <>
            <div className="col-xxl-4 col-xl-6 col-xs-12">
              <Product />
            </div>
            <div className="col-xxl-4 col-xl-6 col-xs-12">
              <Product />
            </div>
            <div className="col-xxl-4 col-xl-6 col-xs-12">
              <Product />
            </div>
            <div className="col-xxl-4 col-xl-6 col-xs-12">
              <Product />
            </div>
            <div className="col-xxl-4 col-xl-6 col-xs-12">
              <Product />
            </div>
            <div className="col-xxl-4 col-xl-6 col-xs-12">
              <Product />
            </div>
            <div className="col-xxl-4 col-xl-6 col-xs-12">
              <Product />
            </div>
            <div className="col-xxl-4 col-xl-6 col-xs-12">
              <Product />
            </div>
            <div className="col-xxl-4 col-xl-6 col-xs-12">
              <Product />
            </div>
          </>
        ) : (
          <Table
            columns={columns}
            data={data}
            editHandler={() => {}}
            deleteHandler={() => {}}
          />
        )}

        {/* <div className="col-4"></div> */}
        {/* <div className="col-4">
        <Product />
      </div> */}
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

export default Products;
