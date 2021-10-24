import Link from 'next/link';
import React from 'react';
import { AiOutlineAppstore } from 'react-icons/ai';
import styles from '../../styles/pages/dashboard.module.scss';

interface SummaryProps {
  title: string;
  ammount: string | number;
  icon?: React.ReactNode;
  redirects: string;
}
const Summary = (props: SummaryProps) => {
  const { title, ammount, icon, redirects } = props;
  return (
    <Link href={redirects}>
      <a className="col-xxl-3 col-lg-6">
        <div className={styles.summary}>
          <AiOutlineAppstore className={styles.summary__icon} />
          <div>
            <h2 className="heading-primary">{ammount}</h2>
            <h5>{title}</h5>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default Summary;
