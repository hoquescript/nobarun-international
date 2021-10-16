import React, { useState, useMemo, useEffect } from 'react';
import { sub, format, isWithinInterval } from 'date-fns';
import { FaPlusCircle } from 'react-icons/fa';
import { gql, useMutation } from '@apollo/client';

import TimePeriod from '../../../components/controls/period';
import Search from '../../../components/controls/search';
import Table from '../../../components/shared/Table';

import styles from '../../../styles/pages/query-report.module.scss';
import { ADMIN_COLUMNS } from '../../../data/AdminColumn';
import useAllAdmin from '../../../hooks/Settings/useAllAdmin';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import Loader from '../../../components/shared/Loader';

const DELETE_ADMIN = gql`
  mutation deleteUserById($id: String!) {
    deleteUserById(userId: $id)
  }
`;

const Accounts = () => {
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

  const [deleteAdmin] = useMutation(DELETE_ADMIN);
  const token = useTypedSelector((state) => state.ui.token);

  const [admins, setAdmins] = useState([]);
  useEffect(() => {
    useAllAdmin(token).then((admin) => {
      setAdmins(admin);
      setLoading(false);
    });
  }, [token]);

  const columns = useMemo(() => ADMIN_COLUMNS, []);

  const filterData = (rows, ids, query) => {
    const param = query.search.toLowerCase();
    return rows.filter((row) => {
      return row.values?.fullName.toLowerCase().includes(param);
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
        <h1 className="heading-primary mt-40 mb-40">All Admins</h1>
        <div>
          <a href="/settings/accounts/add" className="btn-outline-green mr-20">
            <FaPlusCircle className="btn-icon-small" />
            Add Admin
          </a>
        </div>
      </div>
      <Table
        pageName="account"
        filter={{ search, range: selectionRange[0] }}
        globalFilterFn={filterData}
        columns={columns}
        data={admins}
        deleteHandler={(id, idx) => {
          const modifiedData = [...admins];
          modifiedData.splice(idx, 1);
          setAdmins(modifiedData);
          deleteAdmin({
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

export default Accounts;
