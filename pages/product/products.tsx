import React, { useMemo, useState, useEffect } from 'react';
import { sub, format } from 'date-fns';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import { FaPlusCircle, FaGripHorizontal, FaList } from 'react-icons/fa';

import TimePeriod from '../../components/controls/period';
import Search from '../../components/controls/search';
import Product from '../../components/products/product';

import styles from '../../styles/pages/products.module.scss';
import Table from '../../components/shared/Table';
import { COLUMNS } from '../../data/column';
import reviews from '../../data/tableData.json';
import useAllProducts from '../../hooks/Products/useAllProducts';
import { PRODUCT_COLUMNS } from '../../data/ProductColumn';
import Link from 'next/link';

const Products = () => {
  const [viewType, setViewType] = useState('grid');
  const [period, setPeriod] = useState(
    `${format(sub(new Date(), { months: 6 }), 'yyyy-MM-dd')} - ${format(
      new Date(),
      'yyyy-MM-dd',
    )}`,
  );
  const [products, setProducts] = useState<any[]>([]);
  const columns = useMemo(() => PRODUCT_COLUMNS, []);
  // const data = useMemo(() => reviews, []);

  useEffect(() => {
    useAllProducts().then((data) => setProducts(data));
  }, []);

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
        <h2 className="heading-primary">{products.length} Results</h2>
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
          <Link href="/product/add-new-product">
            <a className="btn-outline-green small mr-20">
              <FaPlusCircle className="btn-icon-small" />
              Add Product
            </a>
          </Link>
        </div>
      </div>
      <div className="row">
        {viewType === 'grid' ? (
          <>
            {products &&
              products.map((product) => (
                <div className="col-xxl-4 col-xl-6 col-xs-12" key={product.id}>
                  <Product {...product} />
                </div>
              ))}
          </>
        ) : (
          <Table
            columns={columns}
            data={products}
            editHandler={() => {}}
            deleteHandler={() => {}}
          />
        )}
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
