import React, { useState } from 'react';
import { sub, format } from 'date-fns';
import { FaPlusCircle } from 'react-icons/fa';

import TimePeriod from '../../components/controls/period';
import Search from '../../components/controls/search';
import styles from '../../styles/pages/query-report.module.scss';
import Table from '../../components/shared/Table';
import Checkbox from '../../components/controls/checkbox';
import Radio from '../../components/controls/radio';

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
        <h1 className="heading-primary mt-40 mb-40">Customers Query</h1>
        <div>
          <button type="button" className="btn-outline-green mr-20">
            <FaPlusCircle className="btn-icon" />
            Add Query
          </button>
          <button type="button" className="btn-outline-green">
            <FaPlusCircle className="btn-icon" />
            Export
          </button>
        </div>
      </div>
      {/* <Checkbox>
        <h5>
          I agree to the <a href="#">Terms & Conditions</a>
        </h5>
      </Checkbox>
      <Radio>
        <div className="content mb-20">
          <h5>Standard</h5>
        </div>
      </Radio>
      <button className="btn-green">
        <AiOutlineSearch className="mr-10" /> Save
      </button> */}
      <Table />
    </div>
  );
};

export default Queries;
