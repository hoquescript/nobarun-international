import React from 'react';
import { AiOutlineAppstore } from 'react-icons/ai';
import styles from '../../styles/pages/dashboard.module.scss';

interface SummaryProps {
  title: string;
  ammount: string | number;
  icon?: React.ReactNode;
}
const Summary = (props: SummaryProps) => {
  const { title, ammount, icon } = props;
  return (
    <div className={styles.summary}>
      <AiOutlineAppstore className={styles.summary__icon} />
      <div>
        <h2 className="heading-primary">{ammount}</h2>
        <h5>{title}</h5>
      </div>
    </div>
  );
};

export default Summary;
