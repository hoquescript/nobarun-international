import Link from 'next/link';
import React from 'react';
import { AiOutlineStar } from 'react-icons/ai';
import styles from '../../styles/pages/dashboard.module.scss';

interface ProductProps {
  product: {
    id: string;
    productName: string;
    title: string;
    images: string[];
  };
  reviewCount: number;
  ratingAverage: number;
}

const Product = (props: ProductProps) => {
  const { product, reviewCount, ratingAverage } = props;
  return (
    <Link href={`/product/${product.id}`}>
      <a>
        <div className={styles.product}>
          <img
            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${
              product.images && product.images[0]
            }`}
            alt="Product"
            className={styles.product__image}
          />
          <div className="ml-10">
            <h2 className="heading-tertiary">{product.productName}</h2>
            <div className="flex mt-10">
              <h5>{reviewCount} Reviews</h5>
              <span className={styles.product__circle}>&nbsp;</span>
              <span className="flex ml-10">
                <AiOutlineStar />
                {Math.round(ratingAverage)} ({Math.round(reviewCount)})
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
      </a>
    </Link>
  );
};

export default Product;
