import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import {
  FaPlusCircle,
  FaHome,
  FaEllipsisH,
  FaTrash,
  FaPen,
  FaGripVertical,
} from 'react-icons/fa';
import Textfield from '../../components/controls/textfield';

const StockItem = () => {
  return (
    <li>
      <div className="row flex">
        <div className="col-1">
          <FaGripVertical />
        </div>
        <div className="col-3">
          <h3 className="custom-input">Ready Stock</h3>
        </div>
        <div className="col-5">
          <h3 className="custom-input">Notes</h3>
        </div>
        <div className="col-1">
          <figure>
            <img src="/images/product-img.jpg" alt="" />
          </figure>
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
  );
};

type IStockStatus = {
  id: string;
  title: string;
  description: string;
  image: string;
  isPublished: boolean;
}[];

const StockStatus = () => {
  const [stocks, setStocks] = useState([
    {
      id: '1',
      title: 'Ready Stock',
      description: 'Hello Notes',
      image: '',
      isPublished: true,
    },
  ]);
  const [newStocks, setNewStocks] = useState<IStockStatus>([]);

  const addNewStockHandler = () => {
    setNewStocks([
      ...newStocks,
      {
        id: uuid(),
        title: '',
        description: '',
        image: '',
        isPublished: true,
      },
    ]);
  };

  return (
    <div className="container center">
      <div className="flex sb">
        <h1 className="heading-primary mt-40 mb-40">Stock Status</h1>
        <div>
          <button
            type="button"
            className="btn-outline-green mr-20"
            onClick={addNewStockHandler}
          >
            <FaPlusCircle className="btn-icon-small" />
            Add Stock
          </button>
        </div>
      </div>
      <ul className="mt-40">
        <li className="mb-40">
          <div className="row">
            <div className="col-1">&nbsp;</div>
            <div className="col-3">Title</div>
            <div className="col-5">Notes</div>
            <div className="col-1">Image</div>
            <div className="col-2">Status</div>
          </div>
        </li>
        <StockItem />
        <StockItem />
        <StockItem />
      </ul>
    </div>
  );
};

export default StockStatus;
