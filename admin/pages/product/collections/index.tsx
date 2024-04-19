import React, { useState, useEffect } from 'react';
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
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import { useRouter } from 'next/router';

import styles from '../../../styles/pages/products.module.scss';
import useAllCollections from '../../../hooks/Products/useAllCollections';
import Modal from '../../../components/shared/Modal';
import { useRef } from 'react';
import Loader from '../../../components/shared/Loader';

const DELETE_COLLECTION = gql`
  mutation deleteCollection($id: String!) {
    deleteCollection(collectionId: $id)
  }
`;

const Collections = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [key, setKey] = useState('');
  const [collections, setCollections] =
    useState<{ [key: string]: string | number }[]>();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [deleteCollection] = useMutation(DELETE_COLLECTION);

  useEffect(() => {
    useAllCollections().then((collections) => {
      setCollections(collections);
      setLoading(false);
    });
  }, []);

  const deleteHandler = async (id) => {
    await deleteCollection({
      variables: {
        id,
      },
    });
    router.reload();
  };

  const description = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const text = description.current?.innerText;
    if (text && description.current && text?.length > 70) {
      const value = text.substring(0, 70).concat('...');
      // console.log(object);
      description.current.innerText = value;
    }
  }, []);

  const renderItem = (props) => {
    const { item } = props;
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
          <div className="col-7 flex ct">
            <label htmlFor="isPublished" className={`custom-switch`}>
              <input
                type="checkbox"
                id="isPublished"
                disabled
                defaultChecked={item.isPublished}
              />
              <span>&nbsp;</span>
            </label>
            <span className={`ml-20 ${styles.category__menu}`}>
              <FaEllipsisV />
              <Modal
                title="Product Collection"
                modalIsOpen={showDeleteModal}
                setIsOpen={setShowDeleteModal}
                confirmHandler={() => {
                  deleteHandler(key);
                }}
              />
              <div className="table__action_menu">
                <button
                  onClick={() => {
                    setKey(item.id);
                    setShowDeleteModal(true);
                  }}
                >
                  <FaTrash />
                </button>
                <Link href={`/product/collections/${item.id}`}>
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
    <div className="container center mt-30">
      {loading && <Loader />}
      <div className="flex sb mb-60">
        <h1 className="page-title">Collections</h1>
        <Link href="/product/collections/add">
          <a className="btn-outline-green small mr-20">
            <FaPlusCircle className="btn-icon-small" />
            Add Collection
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
            items={collections}
            renderItem={renderItem}
            collapsed
            maxDepth={1}
            onChange={(items) => {
              // console.log(items);
            }}
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

export default Collections;
