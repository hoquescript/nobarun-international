import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useAlert } from 'react-alert';
import { gql, useMutation } from '@apollo/client';
import {
  FaArrowLeft,
  FaArrowRight,
  FaEllipsisH,
  FaHome,
  FaPen,
  FaPlusCircle,
  FaSave,
  FaTrash,
} from 'react-icons/fa';

import styles from '../../styles/pages/admin.module.scss';
import useAllRedirects from '../../hooks/Settings/useAllRedirects';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import Modal from '../../components/shared/Modal';

const CREATE_REDIRECT = gql`
  mutation createRedirect($data: CreateRedirect!) {
    createNewRedirect(data: $data) {
      id
    }
  }
`;
const EDIT_REDIRECT = gql`
  mutation editRedirect($data: EditRedirect!) {
    editRedirect(data: $data)
  }
`;
const DELETE_REDIRECT = gql`
  mutation deleteRedirects($id: String!) {
    deleteRedirect(collectionId: $id)
  }
`;

const Redirect = () => {
  const alert = useAlert();
  const [posts, setPosts] = useState({});
  const [deleteKey, setDeleteKey] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [createRedirect, createState] = useMutation(CREATE_REDIRECT);
  const [editingRedirect, editState] = useMutation(EDIT_REDIRECT);
  const [deleteRedirect, deleteState] = useMutation(DELETE_REDIRECT);

  useEffect(() => {
    useAllRedirects().then((data) => {
      setPosts(data);
    });
  }, []);

  const addHandler = () => {
    setPosts({
      [uuid()]: {
        from: '',
        to: '',
        isPublished: true,
        isDisabled: false,
        isNewRedirect: true,
      },
      ...posts,
    });
  };

  const saveHandler = async (id: string) => {
    const post = posts[id];
    post.isDisabled = true;

    const redirects = {
      redirectFrom: post.from,
      redirectTo: post.to,
      isPublished: post.isPublished,
    };

    const editRedirect = {
      editId: id,
      editableObject: redirects,
    };

    if (post.isNewRedirect) {
      await createRedirect({
        variables: {
          data: redirects,
        },
      });
      if (!createState.error) {
        alert.success('Saved Redirects Successfully');
      } else {
        alert.error(createState.error.message);
      }
    } else {
      await editingRedirect({
        variables: {
          data: editRedirect,
        },
      });
      if (!editState.error) {
        alert.info('Edited Redirects Successfully');
      } else {
        alert.error(editState.error.message);
      }
    }
    setPosts({ ...posts, [id]: post });
  };

  const editHandler = (id: string) => {
    const post = posts[id];
    post.isDisabled = false;
    setPosts({ ...posts, [id]: post });
  };

  const deleteHandler = async (id: string) => {
    const newposts = Object.keys(posts).reduce((object, key) => {
      if (key !== id) {
        object[key] = posts[key];
      }
      return object;
    }, {});
    await deleteRedirect({
      variables: {
        id,
      },
    });
    if (!deleteState.error) {
      alert.info('Deleted Redirects Successfully');
    } else {
      alert.error(deleteState.error.message);
    }
    setPosts(newposts);
  };

  const handleChangeInput = (
    id: string,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    // @ts-ignore
    const { name, value, checked } = event.target;
    const post = posts[id];
    if (name === 'isPublished') {
      post[name] = checked;
    } else {
      // @ts-ignore
      post[name] = value;
    }
    setPosts({ ...posts, [id]: post });
  };

  const openModal = (key) => {
    setShowDeleteModal(true);
    setDeleteKey(key);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage; //5
  const indexOfFirstPost = indexOfLastPost - postsPerPage; // 5-5
  const currentPosts = Object.keys(posts).slice(
    indexOfFirstPost,
    indexOfLastPost,
  );

  const pageNumbers: number[] = [];
  const totalPosts = Object.keys(posts).length;
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container center">
      <Modal
        title="301 Redirect"
        modalIsOpen={showDeleteModal}
        setIsOpen={setShowDeleteModal}
        confirmHandler={() => deleteHandler(deleteKey)}
      />
      <div className="flex sb">
        <h1 className="heading-primary mt-40 mb-40">301 Redirect</h1>
        <div>
          <button
            type="button"
            className="btn-outline-green mr-20"
            onClick={addHandler}
          >
            <FaPlusCircle className="btn-icon-small" />
            Add Redirect
          </button>
        </div>
      </div>
      <ul className="mt-40">
        <li>
          <div className="row">
            <div className="col-5">From</div>
            <div className="col-5">To</div>
            <div className="col-2">Status</div>
          </div>
        </li>
        {currentPosts.map((key) => (
          <li key={key}>
            <div className="row flex">
              <div className="col-5">
                <div className="field video" style={{ position: 'relative' }}>
                  <FaHome className="video__icon" />
                  <input
                    type="text"
                    className="custom-input video__input"
                    placeholder="Redirected From"
                    name="from"
                    disabled={posts[key].isDisabled}
                    value={posts[key].from}
                    onChange={(e) => handleChangeInput(key, e)}
                  />
                </div>
              </div>
              <div className="col-5">
                <div className="field video" style={{ position: 'relative' }}>
                  <FaHome className="video__icon" />
                  <input
                    type="text"
                    className="custom-input video__input"
                    placeholder="Redirected To"
                    name="to"
                    disabled={posts[key].isDisabled}
                    value={posts[key].to}
                    onChange={(e) => handleChangeInput(key, e)}
                  />
                </div>
              </div>
              <div
                className="col-2"
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  transform: 'translateY(10px)',
                }}
              >
                <label htmlFor={key} className="custom-switch">
                  <input
                    type="checkbox"
                    id={key}
                    name="isPublished"
                    disabled={posts[key].isDisabled}
                    checked={posts[key].isPublished}
                    onChange={(e) => handleChangeInput(key, e)}
                  />
                  <span>&nbsp;</span>
                </label>
                <span
                  className="table__icon menu"
                  style={{ marginLeft: '3rem', visibility: 'visible' }}
                >
                  <FaEllipsisH />
                  <div className="table__action_menu">
                    <button className="big-icon" onClick={() => openModal(key)}>
                      <FaTrash />
                    </button>
                    <button
                      className="big-icon"
                      onClick={
                        posts[key].isDisabled
                          ? (e) => editHandler(key)
                          : (e) => saveHandler(key)
                      }
                    >
                      {posts[key].isDisabled ? <FaPen /> : <FaSave />}
                    </button>
                  </div>
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <nav className={styles.pagination}>
        <ul className={styles.pagination__list}>
          <li className={styles.pagination__item}>
            <button
              className={styles.pagination__button}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              <FaArrowLeft />
            </button>
          </li>

          {pageNumbers.map((number) => (
            <li key={number} className={styles.pagination__item}>
              <button
                className={`${styles.pagination__button} ${
                  number === currentPage ? styles.pagination__button_active : ''
                }`}
                onClick={() => paginate(number)}
              >
                {number}
              </button>
            </li>
          ))}
          <li className={styles.pagination__item}>
            <button
              className={styles.pagination__button}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              <FaArrowRight />
            </button>
          </li>
        </ul>
      </nav>
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

export default Redirect;
