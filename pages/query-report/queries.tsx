import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { CSVLink } from 'react-csv';
import { sub, format } from 'date-fns';
import { FaPlusCircle } from 'react-icons/fa';

import TimePeriod from '../../components/controls/period';
import Search from '../../components/controls/search';
import Table from '../../components/shared/Table';

import styles from '../../styles/pages/query-report.module.scss';
import { QUERY_COLUMNS } from '../../data/QueryColumn';
import useAllQuery from '../../hooks/Query/useAllQuery';

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

const Queries = () => {
  const router = useRouter();

  const [period, setPeriod] = useState(
    `${format(sub(new Date(), { months: 6 }), 'yyyy-MM-dd')} - ${format(
      new Date(),
      'yyyy-MM-dd',
    )}`,
  );

  const { loading, error, data } = useAllQuery();

  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;

  const csvReport = {
    filename: 'Customers Query.csv',
    headers,
    data,
  };

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
        <h1 className="heading-primary mt-40 mb-40">Customers Query</h1>
        <div>
          <Link href="/query-report/add">
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
          // instance={tableInstance}
          columns={QUERY_COLUMNS}
          data={data}
          editHandler={(id) => {
            // router.push(`/${id}`);
            console.log(id);
          }}
          deleteHandler={(id) => {
            console.log(id);
          }}
        />
      )}
    </div>
  );
};

export default Queries;
