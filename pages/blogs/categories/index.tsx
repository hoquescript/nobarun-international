import React, { useEffect } from 'react';
import Link from 'next/link';
import {
  FaGripVertical,
  FaEllipsisV,
  FaTrash,
  FaPen,
  FaPlusCircle,
} from 'react-icons/fa';
import Nestable from 'react-nestable';
import { gql, useMutation } from '@apollo/client';

import 'react-nestable/dist/styles/index.css';

import Togglebar from '../../../components/controls/togglebar';

import styles from '../../../styles/pages/products.module.scss';
import { useState } from 'react';
import useBlogCategoriesTree from '../../../hooks/Blogs/useBlogCategoriesTree';

const renderItem = (props) => {
  const { item, index, collapseIcon, handler } = props;
  console.log(props);
  return (
    <div className="row">
      <div className="col-1 flex ct" style={{ cursor: 'move' }}>
        <FaGripVertical className="mb-20" />
      </div>
      <div className="col-3">
        <h3 className="custom-input">{item.name}</h3>
      </div>
      <div className="col-5">
        <h3 className="custom-input">{item.description}</h3>
      </div>
      <div className="col-3 row">
        <div className="col-5">
          <figure className={`${styles.category__image} center`}>
            <img src="/images/product-img.jpg" alt="" />
          </figure>
        </div>
        <div className="col-7 flex ct">
          <label htmlFor={'publish'} className={`custom-switch`}>
            <input
              type="checkbox"
              id="publish"
              // checked={checked}
              // {...register(name, { required })}
            />
            <span>&nbsp;</span>
          </label>
          <span className={`ml-20 ${styles.category__menu}`}>
            <FaEllipsisV />
            <div className="table__action_menu">
              <button>
                <FaTrash />
              </button>
              <button>
                <FaPen />
              </button>
            </div>
          </span>
        </div>
      </div>
    </div>
  );
};

const SET_CATEGORIES_TREE = gql`
  mutation setCategoriesTree($items: [CreateNewCategoryInput!]!) {
    setCategoriesTree(items: $items)
  }
`;

const Categories = () => {
  const [items, setItems] = useState([]);

  const [createCategory] = useMutation(SET_CATEGORIES_TREE);

  useEffect(() => {
    useBlogCategoriesTree().then((category) => setItems(category));
  }, []);

  const setCategoryTreeHandler = (dragInfo) => {
    const { items } = dragInfo;
    setItems(items);
    createCategory({
      variables: {
        items,
      },
    });
  };
  return (
    <div className="container center">
      <div className="flex sb mb-60">
        <h1 className="heading-primary">Categories</h1>
        <Link href="/blogs/categories/add">
          <a className="btn-outline-green small mr-20">
            <FaPlusCircle className="btn-icon-small" />
            Add Category
          </a>
        </Link>
      </div>
      <div className="row">
        <div className="col-1" />
        <div className="col-3 center">Name</div>
        <div className="col-5 center">Description</div>
        <div className="col-3 row">
          <div className="col-6 center">Image</div>
          <div className="col-6 center">Status</div>
        </div>
        <div className="col-12">
          <Nestable
            items={items}
            renderItem={renderItem}
            onChange={setCategoryTreeHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default Categories;
