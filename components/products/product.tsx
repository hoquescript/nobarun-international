import React from 'react';
import { FaEye, FaStar } from 'react-icons/fa';

import styles from '../../styles/pages/products.module.scss';
import Togglebar from '../controls/togglebar';

const Product = () => (
  <div className={styles.product}>
    <h3 className="heading-tertiary">Multipurpose Commercial Masala</h3>
    <div className="row mt-20">
      <figure className="col-4">
        <img src="/images/blender.png" alt="" />
      </figure>
      <div className="col-8">
        <div className="flex mb-20">
          <input
            type="text"
            className="custom-input small mr-20"
            value="Commercial Kitchen"
            disabled
            style={{ width: '20rem' }}
          />
          <Togglebar />
        </div>
        <p>Our Multipurpose Commercial Masala Spice Grinding Machine</p>
        <h4>
          SKU
          <input
            type="text"
            className="custom-input small ml-20 mt-20"
            style={{ width: '12rem' }}
            value="R5003y32"
            disabled
          />
        </h4>
      </div>
      {/* <div className="col-12"> */}
      <div className={styles.product__info}>
        <span className={styles.product__meta}>
          <span></span>
          <h5 style={{ color: '#e81f1f' }}>Shuvo Islam</h5>
        </span>
        <span className={styles.product__meta}>
          <FaEye className="mr-10" />
          3.5k
        </span>
        <span className={styles.product__meta}>
          <FaStar className="mr-10 mb-5" />
          4.9 (71)
        </span>
      </div>
      {/* </div> */}
    </div>
  </div>
);

export default Product;
