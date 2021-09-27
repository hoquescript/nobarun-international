import React, { useMemo, useState } from 'react';
import { sub, format } from 'date-fns';
import { FaPlusCircle } from 'react-icons/fa';

import TimePeriod from '../../components/controls/period';
import Search from '../../components/controls/search';
import Table from '../../components/shared/Table';

import styles from '../../styles/pages/query-report.module.scss';
import { BLOG_COLUMNS } from '../../data/BlogColumn';
import tableData from '../../data/tableData.json';
import { useEffect } from 'react';
import useAllBlogCategories from '../../hooks/Blogs/useAllBlogs';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';

const BlogPost = () => {
  const [period, setPeriod] = useState(
    `${format(sub(new Date(), { months: 6 }), 'yyyy-MM-dd')} - ${format(
      new Date(),
      'yyyy-MM-dd',
    )}`,
  );
  const columns = useMemo(() => BLOG_COLUMNS, []);
  const [posts, setPosts] = useState([]);
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
        columns={columns}
        data={posts}
        editHandler={() => {}}
        deleteHandler={() => {}}
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
