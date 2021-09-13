import React from 'react';
import {
  FaEllipsisH,
  FaHome,
  FaPen,
  FaPlusCircle,
  FaTrash,
} from 'react-icons/fa';

const Redirect = () => {
  return (
    <div className="container center">
      <div className="flex sb">
        <h1 className="heading-primary mt-40 mb-40">301 Redirect</h1>
        <div>
          <button type="button" className="btn-outline-green mr-20">
            <FaPlusCircle className="btn-icon-small" />
            Add Redirect
          </button>
        </div>
      </div>
      <ul className="mt-40">
        <li>
          <div className="row">
            <div className="col-5">From</div>
            <div className="col-5">To</div>
            <div className="col-2">Status</div>
          </div>
        </li>
        <li>
          <div className="row flex">
            <div className="col-5">
              <div className="field video" style={{ position: 'relative' }}>
                <FaHome className="video__icon" />
                <input
                  type="text"
                  className="custom-input video__input"
                  placeholder="Redirected From"
                />
              </div>
            </div>
            <div className="col-5">
              <div className="field video" style={{ position: 'relative' }}>
                <FaHome className="video__icon" />
                <input
                  type="text"
                  className="custom-input video__input"
                  placeholder="Redirected To"
                />
              </div>
            </div>
            <div
              className="col-2"
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                transform: 'translateY(10px)',
              }}
            >
              <label htmlFor="publish" className="custom-switch">
                <input type="checkbox" id="publish" />
                <span>&nbsp;</span>
              </label>
              <span
                className="table__icon menu"
                style={{ marginLeft: '3rem', visibility: 'visible' }}
              >
                <FaEllipsisH />
                <div className="table__action_menu">
                  <button>
                    <FaTrash />
                  </button>
                  <button>
                    <FaPen />
                  </button>
                </div>
              </span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Redirect;
