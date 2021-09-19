import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
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

const Redirect = () => {
  const [posts, setPosts] = useState({
    [uuid()]: {
      from: '',
      to: '',
      isPublished: false,
      isDisabled: true,
    },
  });

  const addHandler = () => {
    setPosts({
      ...posts,
      [uuid()]: {
        from: '',
        to: '',
        isPublished: true,
        isDisabled: false,
      },
    });
  };

  const saveHandler = (id: string) => {
    const post = posts[id];
    post.isDisabled = true;
    setPosts({ ...posts, [id]: post });
  };

  const editHandler = (id: string) => {
    const post = posts[id];
    post.isDisabled = false;
    setPosts({ ...posts, [id]: post });
  };

  const deleteHandler = (id: string) => {
    const newposts = Object.keys(posts).reduce((object, key) => {
      if (key !== id) {
        object[key] = posts[key];
      }
      return object;
    }, {});
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
          <li>
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
                    <button
                      className="big-icon"
                      onClick={() => deleteHandler(key)}
                    >
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

export default Redirect;
