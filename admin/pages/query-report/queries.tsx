import React, { useState } from 'react';
import Link from 'next/link';
import { CSVLink } from 'react-csv';
import { sub, format, isWithinInterval } from 'date-fns';
import { FaPlusCircle } from 'react-icons/fa';
import { useAlert } from 'react-alert';

import TimePeriod from '../../components/controls/period';
import Search from '../../components/controls/search';
import Table from '../../components/shared/Table';

import styles from '../../styles/pages/query-report.module.scss';
import { QUERY_COLUMNS } from '../../data/QueryColumn';
import useAllQuery from '../../hooks/Query/useAllQuery';
import { gql, useMutation } from '@apollo/client';
import { useEffect } from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import Loader from '../../components/shared/Loader';

const headers = [
  { label: 'Full Name', key: 'name' },
  { label: 'Date', key: 'date' },
  { label: 'Message', key: 'message' },
  { label: 'Address', key: 'address' },
  { label: 'Email ID', key: 'email' },
  { label: 'Phone', key: 'phone' },
  { label: 'SKU', key: 'SKU' },
  { label: 'Notes', key: 'notes' },
];

const DELETE_QUERY = gql`
  mutation deleteQueryById($id: String!) {
    removeQueryUserById(queryUserId: $id)
  }
`;
const Queries = () => {
  const alert = useAlert();

  const [data, setData] = useState([]);
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

  const [deleteQuery, deleteState] = useMutation(DELETE_QUERY);

  const token = useTypedSelector((state) => state.ui.token);
  useEffect(() => {
    useAllQuery(token).then((data) => {
      setData(data);
      setLoading(false);
    });
  }, [token]);

  const csvReport = {
    filename: 'Customers Query.csv',
    headers,
    data,
  };

  const filterData = (rows, ids, query) => {
    const param = query.search.toLowerCase();
    return rows.filter((row) => {
      return (
        row.values?.name.toLowerCase().includes(param) &&
        isWithinInterval(new Date(row.values?.createdAt), {
          start: query.range.startDate,
          end: query.range.endDate,
        })
      );
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
        <h1 className="heading-primary mt-40 mb-40">Customers Query</h1>
        <div>
          <Link href="/query-report/add-new-query">
            <a className="btn-outline-green small mr-20">
              <FaPlusCircle className="btn-icon-small" />
              Add Query
            </a>
          </Link>
          <CSVLink {...csvReport}>
            <button type="button" className="btn-outline-green">
              <FaPlusCircle className="btn-icon-small" />
              Export
            </button>
          </CSVLink>
        </div>
      </div>
      {data && (
        <Table
          filter={{ search, range: selectionRange[0] }}
          pageName="query"
          title="Queries"
          columns={QUERY_COLUMNS}
          data={data}
          globalFilterFn={filterData}
          deleteHandler={async (id, idx) => {
            const modifiedData = [...data];
            modifiedData.splice(idx, 1);
            setData(modifiedData);

            await deleteQuery({
              variables: {
                id,
              },
            });

            if (!deleteState.error) {
              alert.error('Deleted Query Report Successfully');
            } else {
              alert.error(deleteState.error.message);
            }
          }}
        />
      )}
    </div>
  );
};

export default Queries;
