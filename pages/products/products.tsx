import React from 'react';
import { FaEye, FaStar } from 'react-icons/fa';

import Textfield from '../../components/controls/textfield';
import Togglebar from '../../components/controls/togglebar';

import styles from '../../styles/pages/shop.module.scss';

const Product = () => (
  <div className={styles.product}>
    <h3 className="heading-tertiary">Multipurpose Commercial Masala</h3>
    <div className="row">
      <figure className="col-4">
        <img src="/images/blender.png" alt="" />
      </figure>
      <div className="col-8">
        <div>
          <input
            type="text"
            className="custom-input"
            value="Commercial Kitchen"
            disabled
          />
          {/* <Togglebar /> */}
        </div>
        <p>Our Multipurpose Commercial Masala Spice Grinding Machine</p>
        <h4>
          SKU
          <input
            type="text"
            className="custom-input"
            value="R5003y32"
            disabled
          />
        </h4>
      </div>
      <div className="col-12">
        <div className={styles.product__info}>
          <span className={styles.product__meta}>
            <span></span>
            Shuvo Islam
          </span>
          <span className={styles.product__meta}>
            <FaEye />
            3.5k
          </span>
          <span className={styles.product__meta}>
            <FaStar />
            4.9 (71)
          </span>
        </div>
      </div>
    </div>
  </div>
);
const ProdcutPreview = () => {
  return (
    <div className="product">
      <div className="product__title">
        <h4>Almonds</h4>
        <div className="dropdown">
          <button
            type="button"
            className="btn-icon-fade btn-icon-small dropdown__toggle"
          >
            <i className="ellipsis-v-icon"></i>
          </button>
          <div className="dropdown__menu">
            <ul>
              <li>
                <a href="#">
                  <i className="pen-icon"></i>
                  Edit
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="clone-icon"></i>
                  Clone
                </a>
              </li>
              <li>
                <a href="#" className="text-red">
                  <i className="trash-icon"></i>
                  Delete
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <figure className="product__img">
        <img src="images/product-img.jpg" alt="" />
      </figure>
      <div className="product__content">
        <div className="d-flex align-items-center">
          <div className="product__tags">
            <span className="product__tags__tag">ingredients</span>
          </div>
          <label htmlFor="publish2" class="custom-switch ml-auto">
            <input type="checkbox" id="publish2" />
            <span>&nbsp;</span>
          </label>
        </div>
        <p>Organic whole soaked</p>
      </div>
      <div className="product__footer">
        <img src="images/company-logo.svg" alt="" />
        <div className="product__footer__actions">
          <button
            type="button"
            className="btn-icon-fade btn-icon-small show-panel"
            data-target="#item-coupons-panel"
          >
            <i className="ticket-alt-icon"></i>
          </button>
          <button
            type="button"
            className="btn-icon-fade btn-icon-small show-panel"
            data-target="#tags-panel"
          >
            <i className="tags-icon"></i>
          </button>
          <button type="button" className="btn-icon-fade btn-icon-small">
            <i className="layer-plus-icon"></i>
          </button>
          <button type="button" className="btn-icon-fade btn-icon-small">
            <i className="chart-bar-icon"></i>
          </button>
        </div>
      </div>
    </div>
  );
};
const Products = () => {
  return (
    <div className="row ml-50 mt-50">
      <div className="col-4">
        <Product />
      </div>
      <div className="col-4">
        <ProdcutPreview />
      </div>
      {/* <div className="col-4">
        <Product />
      </div> */}
    </div>
  );
};

export default Products;
