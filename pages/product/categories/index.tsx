import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { v4 as uuid } from 'uuid';

import {
  FaGripVertical,
  FaEllipsisV,
  FaTrash,
  FaPen,
  FaPlusCircle,
} from 'react-icons/fa';
import Nestable from 'react-nestable';
import 'react-nestable/dist/styles/index.css';
import Togglebar from '../../../components/controls/togglebar';

import styles from '../../../styles/pages/products.module.scss';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import useProductCategoryTree from '../../../hooks/Products/useProductCategoryTree';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import Modal from '../../../components/shared/Modal';

interface renderItemProps {
  item: any;
  index: any;
  collapseIcon: any;
  handler: any;
}

const SET_CATEGORIES_TREE = gql`
  mutation setCategoriesTree($items: [CreateNewCategoryInput!]!) {
    setCategoriesTree(items: $items)
  }
`;

const DELETE_CATEGORY = gql`
  mutation deleteCategory($id: String!) {
    deleteCategory(categoryId: $id)
  }
`;

const Categories = () => {
  const [categoryItem, setCategoryItem] = useState();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [createCategory] = useMutation(SET_CATEGORIES_TREE);
  const [deleteCategory] = useMutation(DELETE_CATEGORY);

  useEffect(() => {
    useProductCategoryTree().then((data) => setCategoryItem(data));
  }, []);

  const setCategoryTreeHandler = (dragInfo) => {
    const { items } = dragInfo;
    setCategoryItem(items);
    createCategory({
      variables: {
        items,
      },
    });
  };

  const deleteHandler = (id) => {
    deleteCategory({
      variables: {
        id,
      },
    });
  };

  const renderItem = (props: renderItemProps) => {
    const { item, index, collapseIcon, handler } = props;
    return (
      <div className="row">
        <div className="col-1 flex ct" style={{ cursor: 'move' }}>
          <FaGripVertical className="mb-20" />
        </div>
        <div className="col-3">
          <h3 className="custom-input">{item.name}</h3>
        </div>
        <div className="col-5">
          <div
            className="custom-input"
            dangerouslySetInnerHTML={{ __html: item.description }}
          />
        </div>
        <div className="col-3 row">
          <div className="col-5">
            <figure className={`${styles.category__image} center`}>
              <img src="/images/product-img.jpg" alt="" />
            </figure>
          </div>
          <div className="col-7 flex">
            <label htmlFor="publish" className="custom-switch">
              <input
                type="checkbox"
                id="publish"
                defaultChecked={item.isPublished}
              />
              <span>&nbsp;</span>
            </label>
            <span className={`ml-20 ${styles.category__menu}`}>
              <FaEllipsisV />
              <Modal
                title="Blog Category"
                modalIsOpen={showDeleteModal}
                setIsOpen={setShowDeleteModal}
                confirmHandler={() => deleteHandler(item._id)}
              />
              <div className="table__action_menu">
                <button
                  onClick={() => {
                    setShowDeleteModal(true);
                    console.log('object');
                  }}
                >
                  <FaTrash />
                </button>
                <Link href={`/blogs/categories/${item._id}`}>
                  <a>
                    <FaPen />
                  </a>
                </Link>
              </div>
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container center">
      <div className="flex sb mb-60">
        <h1 className="heading-primary">Categories</h1>
        <Link href="/product/categories/add">
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
          <div className="col-5 center">Image</div>
          <div className="col-7 center">Status</div>
        </div>
        <div className="col-12">
          <Nestable
            items={categoryItem}
            threshold={20}
            renderItem={renderItem}
            onChange={setCategoryTreeHandler}
          />
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

export default Categories;
