import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { gql, useQuery, useMutation } from '@apollo/client';

import {
  FaPlusCircle,
  FaHome,
  FaEllipsisH,
  FaTrash,
  FaPen,
  FaGripVertical,
  FaSave,
} from 'react-icons/fa';

interface IStock {
  [x: string]: {
    title: string;
    notes: string;
    image: string;
    isPublished: boolean;
    isDisabled: boolean;
    isNewStocks?: true;
  };
}
const CREATE_STOCK_STATUS = gql`
  mutation addNewStockStatus($data: CreateNewStockStatus!) {
    createNewStockStatus(data: $data) {
      title
    }
  }
`;

const EDIT_STOCK_STATUS = gql`
  mutation addNewStockStatus($data: CreateNewStockStatus!) {
    createNewStockStatus(data: $data) {
      title
    }
  }
`;

const StockStatus = () => {
  const [stocks, setStocks] = useState<IStock>({
    [uuid()]: {
      title: 'Ready Stock',
      notes: 'Hello Notes',
      image: '',
      isPublished: true,
      isDisabled: true,
    },
  });

  const [createStock, createStockStatus] = useMutation(CREATE_STOCK_STATUS);
  const [editStock, editStockStatus] = useMutation(EDIT_STOCK_STATUS);

  const addNewStockHandler = () => {
    setStocks({
      [uuid()]: {
        title: '',
        notes: '',
        image: '',
        isPublished: true,
        isDisabled: false,
        isNewStocks: true,
      },
      ...stocks,
    });
  };

  const handleChangeInput = (
    id: string,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    // @ts-ignore
    const { name, value, checked } = event.target;
    const stock = stocks[id];
    if (name === 'isPublished') {
      stock[name] = checked;
    } else {
      // @ts-ignore
      stock[name] = value;
    }
    setStocks({ ...stocks, [id]: stock });
  };

  const saveHandler = (id: string) => {
    const stock = stocks[id];
    stock.isDisabled = true;

    const stockStatus = {
      title: stock.title,
      notes: stock.notes,
      image: stock.image,
      isPublished: stock.isPublished,
    };

    stock.isNewStocks
      ? createStock({
          variables: {
            data: stockStatus,
          },
        })
      : editStock({
          variables: {
            data: {},
          },
        });

    setStocks({ ...stocks, [id]: stock });
  };

  const editHandler = (id: string) => {
    const stock = stocks[id];
    stock.isDisabled = false;
    setStocks({ ...stocks, [id]: stock });
  };

  const deleteHandler = (id: string) => {
    const newStocks = Object.keys(stocks).reduce((object, key) => {
      if (key !== id) {
        object[key] = stocks[key];
      }
      return object;
    }, {});
    setStocks(newStocks);
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
        {Object.keys(stocks).map((key) => (
          <li>
            <div className="row flex">
              <div className="col-1">
                <FaGripVertical />
              </div>
              <div className="col-3">
                <div className="field">
                  <input
                    type="text"
                    className="custom-input"
                    placeholder="Title"
                    name="title"
                    disabled={stocks[key].isDisabled}
                    value={stocks[key].title}
                    onChange={(e) => handleChangeInput(key, e)}
                  />
                </div>
              </div>
              <div className="col-5">
                <div className="field">
                  <input
                    type="text"
                    className="custom-input"
                    placeholder="Notes"
                    name="notes"
                    disabled={stocks[key].isDisabled}
                    value={stocks[key].notes}
                    onChange={(e) => handleChangeInput(key, e)}
                  />
                </div>
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
                }}
              >
                <label htmlFor={key} className="custom-switch">
                  <input
                    type="checkbox"
                    id={key}
                    name="isPublished"
                    disabled={stocks[key].isDisabled}
                    checked={stocks[key].isPublished}
                    onChange={(e) => handleChangeInput(key, e)}
                  />
                  <span>&nbsp;</span>
                </label>
                <span
                  className="table__icon menu"
                  style={{ marginLeft: '3rem', visibility: 'visible' }}
                >
                  <FaEllipsisH />
                  <div className="table__action_menu">
                    <button
                      className="big-icon"
                      onClick={() => deleteHandler(key)}
                    >
                      <FaTrash />
                    </button>
                    <button
                      onClick={
                        stocks[key].isDisabled
                          ? (e) => editHandler(key)
                          : (e) => saveHandler(key)
                      }
                    >
                      {stocks[key].isDisabled ? <FaPen /> : <FaSave />}
                    </button>
                  </div>
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StockStatus;
