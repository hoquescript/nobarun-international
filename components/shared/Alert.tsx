import React from 'react';
import {
  FaCheckCircle,
  FaInfoCircle,
  FaTimes,
  FaExclamationTriangle,
} from 'react-icons/fa';
interface AlertProps {
  style: any;
  options: any;
  message: any;
  close: any;
}
const Alert = (props: AlertProps) => {
  const {
    style,
    options: { type },
    message,
    close,
  } = props;
  return (
    <div style={style} className={`alert alert_${type}`}>
      <span>
        {type === 'info' && <FaInfoCircle />}
        {type === 'success' && <FaCheckCircle />}
        {type === 'error' && <FaExclamationTriangle />}
      </span>
      <p className="ml-20 mr-60">{message}</p>
      <button className="alert__button" onClick={close}>
        <FaTimes />
      </button>
    </div>
  );
};

export default Alert;
