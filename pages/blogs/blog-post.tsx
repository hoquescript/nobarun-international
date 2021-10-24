import React, { useMemo, useState, useEffect } from 'react';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import { sub, format, isWithinInterval } from 'date-fns';
import { FaPlusCircle } from 'react-icons/fa';
import { gql, useMutation } from '@apollo/client';
import { useAlert } from 'react-alert';

import TimePeriod from '../../components/controls/period';
import Search from '../../components/controls/search';
import Table from '../../components/shared/Table';

import styles from '../../styles/pages/query-report.module.scss';
import { BLOG_COLUMNS } from '../../data/BlogColumn';
import useAllBlogCategories from '../../hooks/Blogs/useAllBlogs';
import Loader from '../../components/shared/Loader';

const DELETE_BLOG = gql`
  mutation deleteUserById($id: String!) {
    deleteUserById(userId: $id)
  }
`;

const BlogPost = () => {
  const alert = useAlert();

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [period, setPeriod] = useState(
    `${format(sub(new Date(), { months: 6 }), 'yyyy-MM-dd')} - ${format(
      new Date(),
      'yyyy-MM-dd',
    )}`,
  );
  const [selectionRange, setSelectionRange] = useState([
    {
      startDate: sub(new Date(), { months: 6 }),
      endDate: new Date(),
      key: 'Periods',
    },
  ]);

  const columns = useMemo(() => BLOG_COLUMNS, []);
  const [posts, setPosts] = useState([]);

  const [deleteBlog, deleteState] = useMutation(DELETE_BLOG);

  useEffect(() => {
    useAllBlogCategories().then((blogs) => {
      setPosts(blogs);
      setLoading(false);
    });
  }, []);

  const filterData = (rows, ids, query) => {
    const param = query.search.toLowerCase();
    return rows.filter((row) => {
      return row.values?.postTitle.toLowerCase().includes(param);
      // &&
      // isWithinInterval(new Date(row.values?.createdAt), {
      //   start: query.range.startDate,
      //   end: query.range.endDate,
      // })
    });
  };

  return (
    <div className={styles.query}>
      {loading && <Loader />}
      <div className="row">
        <div className="col-6">
          <Search search={search} setSearch={setSearch} />
        </div>
        <div className="col-2">
          <TimePeriod
            period={period}
            setPeriod={setPeriod}
            selectionRange={selectionRange}
            setSelectionRange={setSelectionRange}
          />
        </div>
      </div>
      <div className={styles.query__btnWrapper}>
        <h1 className="heading-primary mt-40 mb-40">
          Blog Post ({posts.length || 0} post)
        </h1>
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
        filter={{ search, range: selectionRange[0] }}
        globalFilterFn={filterData}
        pageName="blog"
        columns={columns}
        data={posts}
        deleteHandler={async (id, idx) => {
          const modifiedData = [...posts];
          modifiedData.splice(idx, 1);
          setPosts(modifiedData);

          await deleteBlog({
            variables: {
              id,
            },
          });

          if (!deleteState.error) {
            alert.error('Deleted Blog Successfully');
          } else {
            alert.error(deleteState.error.message);
          }
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
