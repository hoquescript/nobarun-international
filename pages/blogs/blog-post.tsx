import React, { useMemo, useState, useEffect } from 'react';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import { sub, format } from 'date-fns';
import { FaPlusCircle } from 'react-icons/fa';
import { gql, useMutation } from '@apollo/client';

import TimePeriod from '../../components/controls/period';
import Search from '../../components/controls/search';
import Table from '../../components/shared/Table';

import styles from '../../styles/pages/query-report.module.scss';
import { BLOG_COLUMNS } from '../../data/BlogColumn';
import useAllBlogCategories from '../../hooks/Blogs/useAllBlogs';

const DELETE_BLOG = gql`
  mutation deleteUserById($id: String!) {
    deleteUserById(userId: $id)
  }
`;

const BlogPost = () => {
  const [period, setPeriod] = useState(
    `${format(sub(new Date(), { months: 6 }), 'yyyy-MM-dd')} - ${format(
      new Date(),
      'yyyy-MM-dd',
    )}`,
  );
  const columns = useMemo(() => BLOG_COLUMNS, []);
  const [posts, setPosts] = useState([]);

  const [deleteBlog] = useMutation(DELETE_BLOG);

  useEffect(() => {
    useAllBlogCategories().then((blogs) => setPosts(blogs));
  }, []);

  return (
    <div className={styles.query}>
      <div className="row">
        <div className="col-6">
          <Search />
        </div>
        <div className="col-2">
          <TimePeriod period={period} setPeriod={setPeriod} />
        </div>
      </div>
      <div className={styles.query__btnWrapper}>
        <h1 className="heading-primary mt-40 mb-40">Blog Post (4 post)</h1>
        <div>
          <Link href="/blogs/add-new-post">
            <a className="btn-outline-green small mr-20">
              <FaPlusCircle className="btn-icon-small" />
              Add Post
            </a>
          </Link>
        </div>
      </div>
      <Table
        pageName="blog"
        columns={columns}
        data={posts}
        deleteHandler={(id, idx) => {
          const modifiedData = [...posts];
          modifiedData.splice(idx, 1);
          setPosts(modifiedData);
          deleteBlog({
            variables: {
              id,
            },
          });
        }}
      />
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

export default BlogPost;
