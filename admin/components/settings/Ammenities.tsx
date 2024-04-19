import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useAlert } from 'react-alert';
import { gql, useMutation } from '@apollo/client';

import {
  FaPlusCircle,
  FaEllipsisH,
  FaTrash,
  FaPen,
  FaSave,
} from 'react-icons/fa';
import Modal from '../../components/shared/Modal';
import FileButton from '../controls/file';

export interface IAmenities {
  [x: string]: {
    title: string;
    notes: string;
    image?: string;
    isPublished: boolean;
    isDisabled?: boolean;
    isNewStocks?: true;
  };
}

interface OfficeAmenitiesProps {
  stocks: IAmenities;
  setStocks: any;
  setPage: any;
  postSectionKey: string;
  setPostSectionKey: any;
}

const OfficeAmenities = (props: OfficeAmenitiesProps) => {
  const { stocks, setStocks, setPage, setPostSectionKey } = props;
  const [deleteKey, setDeleteKey] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | 'file',
    url?: string,
  ) => {
    const stock = stocks[id];
    if (event === 'file') {
      stock.image = url as string;
    } else {
      // @ts-ignore
      const { name, value, checked } = event.target;
      if (name === 'isPublished') {
        stock[name] = checked;
      } else {
        // @ts-ignore
        stock[name] = value;
      }
    }
    setStocks({ ...stocks, [id]: stock });
  };

  const saveHandler = async (id: string) => {
    const stock = stocks[id];
    stock.isDisabled = true;
    setStocks({ ...stocks, [id]: stock });
  };

  const editHandler = (id: string) => {
    const stock = stocks[id];
    stock.isDisabled = false;
    setStocks({ ...stocks, [id]: stock });
  };

  const deleteHandler = async (id: string) => {
    const newStocks = Object.keys(stocks).reduce((object, key) => {
      if (key !== id) {
        object[key] = stocks[key];
      }
      return object;
    }, {});
    setStocks(newStocks);
  };

  const openModal = (key) => {
    setShowDeleteModal(true);
    setDeleteKey(key);
  };

  return (
    <div>
      <Modal
        title="301 Redirect"
        modalIsOpen={showDeleteModal}
        setIsOpen={setShowDeleteModal}
        confirmHandler={() => deleteHandler(deleteKey)}
      />
      <div
        className="wrapper-section mt-60"
        style={{ padding: '0 1rem 0 3rem' }}
      >
        <div className="wrapper-section__content">
          <div className="flex sb">
            <h3 className="heading-secondary mt-40 mb-10">Office Amenities</h3>
            <div>
              <button
                type="button"
                className="btn-outline-green mr-20"
                onClick={addNewStockHandler}
              >
                <FaPlusCircle className="btn-icon-small" />
                Add Amenities
              </button>
            </div>
          </div>
          <ul className="mt-40">
            <li>
              <div className="row">
                <div className="col-3">Title</div>
                <div className="col-5">Notes</div>
                <div className="col-1">Image</div>
                <div className="col-2">Status</div>
              </div>
            </li>
            {stocks &&
              Object.keys(stocks).map((key) => (
                <li>
                  <div className="row flex">
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
                      <FileButton
                        page="contact"
                        showMedia
                        postKey={key}
                        setPostSectionKey={setPostSectionKey}
                        setPage={setPage}
                      />
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
                            onClick={() => openModal(key)}
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
      </div>
    </div>
  );
};

export default OfficeAmenities;
