import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

import {
  FaGripVertical,
  FaEllipsisV,
  FaTrash,
  FaPen,
  FaPlusCircle,
} from 'react-icons/fa';
import Nestable from 'react-nestable';
import 'react-nestable/dist/styles/index.css';

import styles from '../../../styles/pages/products.module.scss';
import { gql, useMutation } from '@apollo/client';
import useProductCategoryTree from '../../../hooks/Products/useProductCategoryTree';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import Modal from '../../../components/shared/Modal';
import { useRouter } from 'next/router';
import Loader from '../../../components/shared/Loader';

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
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const [key, setKey] = useState('');
  const [categoryItem, setCategoryItem] = useState();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [createCategory] = useMutation(SET_CATEGORIES_TREE);
  const [deleteCategory] = useMutation(DELETE_CATEGORY);

  useEffect(() => {
    useProductCategoryTree().then((data) => {
      setCategoryItem(data);
      setLoading(false);
    });
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

  const deleteHandler = async (id) => {
    await deleteCategory({
      variables: {
        id,
      },
    });
    setLoading(true);
    router.reload();
  };

  const description = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const text = description.current?.innerText;
    if (text && description.current && text?.length > 70) {
      const value = text.substring(0, 70).concat('...');
      description.current.innerText = value;
    }
  }, []);

  const renderItem = (props: renderItemProps) => {
    const { item } = props;
    return (
      <div className="row">
        {loading && <Loader />}
        <div className="col-1 flex ct" style={{ cursor: 'move' }}>
          <FaGripVertical className="mb-20" />
        </div>
        <div className="col-3">
          <h3 className="custom-input">{item.name}</h3>
        </div>
        <div className="col-5">
          <div
            className="custom-input"
            ref={description}
            dangerouslySetInnerHTML={{ __html: item.description }}
          />
        </div>
        <div className="col-3 row">
          <div className="col-5">
            <figure className={`${styles.category__image} center`}>
              <img
                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${item.image}`}
                alt=""
              />
            </figure>
          </div>
          <div className="col-7 flex">
            <label htmlFor="isPublished" className="custom-switch">
              <input
                type="checkbox"
                id="isPublished"
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
                confirmHandler={() => deleteHandler(key)}
              />
              <div className="table__action_menu">
                <button
                  onClick={() => {
                    setKey(item._id);
                    setShowDeleteModal(true);
                  }}
                >
                  <FaTrash />
                </button>
                <Link href={`/product/categories/${item._id}`}>
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
