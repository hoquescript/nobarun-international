import React, { useState } from 'react';
import { sub, format } from 'date-fns';

import Textfield from '../../components/controls/textfield';
import TimePeriod from '../../components/controls/period';
import Search from '../../components/controls/search';
import styles from '../../styles/pages/query-report.module.scss';

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
      <h1 className="heading-primary mt-40 mb-40">Customers Query</h1>
      <div className="grid two mb-20">
        <Textfield label="Full Name" placeholder="Enter your Name" />
        <Textfield type="tel" label="Phone" placeholder="Enter your Number" />
      </div>
      <div className="grid two mb-20">
        <Textfield type="email" label="Email" placeholder="Enter your Email" />
        <Textfield label="Address" placeholder="Enter your Address" />
      </div>
      <div className="grid two mb-20">
        <Textfield label="Phone" placeholder="Enter your Number" />
        <Textfield label="Company Name" placeholder="Enter your Company Name" />
      </div>
      <div className="center mt-30">
        <button className="btn-green">Save</button>
      </div>
    </div>
  );
};

export default Queries;
