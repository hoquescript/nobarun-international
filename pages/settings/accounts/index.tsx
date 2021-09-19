import React, { useState } from 'react';
import { sub, format } from 'date-fns';
import { FaPlusCircle } from 'react-icons/fa';

import TimePeriod from '../../../components/controls/period';
import Search from '../../../components/controls/search';
import Table from '../../../components/shared/Table';

import styles from '../../../styles/pages/query-report.module.scss';

const Queries = () => {
  const [period, setPeriod] = useState(
    `${format(sub(new Date(), { months: 6 }), 'yyyy-MM-dd')} - ${format(
      new Date(),
      'yyyy-MM-dd',
    )}`,
  );
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
        <h1 className="heading-primary mt-40 mb-40">All Admins</h1>
        <div>
          <a href="/settings/accounts/form" className="btn-outline-green mr-20">
            <FaPlusCircle className="btn-icon-small" />
            Add Admin
          </a>
        </div>
      </div>
      <Table />
    </div>
  );
};

export default Queries;
