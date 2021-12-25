import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { FaPen, FaEye, FaStar, FaTrash } from 'react-icons/fa';
import { BiDotsVerticalRounded } from 'react-icons/bi';

import Modal from '../../shared/Modal';
import styles from '../../../styles/pages/products.module.scss';
import { Router, useRouter } from 'next/router';
import abbrNum from '../../../helpers/abbrNum';

const Product = (props) => {
  const {
    id,
    productName,
    category,
    slug,
    productCode,
    price,
    image,
    viewCount,
    isPublished,
    contactPerson,
    noOfReview,
    avgRating,
    deleteHandler,
  } = props;

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const descriptionRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const text = descriptionRef.current?.innerText;
    if (text && descriptionRef.current && text?.length > 20) {
      const value = text.substring(0, 20).concat('...');
      descriptionRef.current.innerText = value;
    }
  }, []);

  const onClickHandler = (evt) => {
    // if (!evt.target) {
    //   evt.target = evt.srcElement; //extend target property for IE
    // }
    // if (['BUTTON', 'svg', 'path'].includes(evt.target.tagName)) return;

    setShowDropdown(false);
    // router.push({
    //   pathname: '/product/[productId]',
    //   query: { productId: id },
    // });
  };
  return (
    <div
      className="product"
      style={{ flexDirection: 'column' }}
      onClick={onClickHandler}
    >
      <div
        className="product__title"
        style={{ justifyContent: 'space-between', width: '100%' }}
      >
        <h4>{productName}</h4>
        <Modal
          title="Confirmation Alert"
          modalIsOpen={showDeleteModal}
          setIsOpen={setShowDeleteModal}
          confirmHandler={() => {
            deleteHandler();
          }}
        />
        <div className="dropdown">
          <button
            type="button"
            className="btn-icon-fade btn-icon-small dropdown__toggle"
            onClick={(e) => {
              e.stopPropagation();
              setShowDropdown(true);
            }}
          >
            <BiDotsVerticalRounded />
          </button>
          <div
            className="dropdown__menu"
            style={{ transform: showDropdown ? 'scale(1)' : 'scale(0)' }}
          >
            <ul>
              <li style={{ cursor: 'pointer' }}>
                <Link
                  href={{
                    pathname: '/product/[slug]',
                    query: { slug: slug },
                  }}
                >
                  <a
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowDropdown(false);
                    }}
                  >
                    <FaPen />
                    Edit
                  </a>
                </Link>
              </li>
              <li style={{ cursor: 'pointer' }}>
                <a
                  className="text-red"
                  onClick={(e) => {
                    setShowDropdown(false);
                    setShowDeleteModal(true);
                  }}
                >
                  <FaTrash />
                  Delete
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', width: '100%', height: 120 }}>
        <figure className="product__img">
          <img src={image} alt={`product-image-${id}`} />
        </figure>

        <div className="product__content">
          <div className="d-flex align-items-center">
            <div className="product__tags">
              <span className="product__tags__tag">{category}</span>
            </div>
            <label htmlFor="product" className={`custom-switch`}>
              <input
                type="checkbox"
                id="isPublished"
                defaultChecked={isPublished}
              />
              <span>&nbsp;</span>
            </label>
          </div>
          <h4>
            Price
            <input
              type="text"
              className="custom-input small ml-10 mb-20 mt-20"
              style={{ width: '12rem', textAlign: 'center' }}
              value={price}
              disabled
            />
          </h4>
          <h4>
            SKU
            <input
              type="text"
              className="custom-input small ml-20"
              style={{ width: '12rem', textAlign: 'center' }}
              value={productCode}
              disabled
            />
          </h4>
        </div>
      </div>

      <div className="product__footer">
        <div className={styles.product__info}>
          <span className={styles.product__meta}>
            <span></span>
            <h5 style={{ color: '#e81f1f' }}>{contactPerson || 'Anonymous'}</h5>
          </span>
          <a
            href={`https://nobarunbd.vercel.app/${slug}`}
            target="_blank"
            className={styles.product__meta}
          >
            <FaEye className="mr-10" />
            {viewCount ? abbrNum(viewCount, 1) : '0'}
          </a>
          <span className={styles.product__meta}>
            <FaStar className="mr-10 mb-5" />
            {avgRating} ({noOfReview})
          </span>
        </div>
      </div>
    </div>
  );
};

export default Product;
