import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useAlert } from 'react-alert';
import { gql, useMutation } from '@apollo/client';

import {
  FaPlusCircle,
  FaEllipsisH,
  FaTrash,
  FaPen,
  FaGripVertical,
  FaSave,
  FaTimes,
} from 'react-icons/fa';
import useAllStockStatus from '../../hooks/Settings/useAllStockStatus';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import { BoxFileupload } from '../../components/controls/fileUpload';
import Modal from '../../components/shared/Modal';

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
  mutation editStockStatus($data: EditStockStatus!) {
    editStockStatus(data: $data)
  }
`;

const DELETE_STOCK_STATUS = gql`
  mutation deleteStockStatus($id: String!) {
    deleteAStockStatus(stockStatusId: $id)
  }
`;

const StockStatus = () => {
  const alert = useAlert();
  const [stocks, setStocks] = useState<IStock>({});
  const [deleteKey, setDeleteKey] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [createStock, createState] = useMutation(CREATE_STOCK_STATUS);
  const [editStock, editState] = useMutation(EDIT_STOCK_STATUS);
  const [deleteStock, deleteState] = useMutation(DELETE_STOCK_STATUS);

  useEffect(() => {
    useAllStockStatus().then((data) => {
      setStocks(data);
    });
  }, []);

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

    const stockStatus = {
      title: stock.title,
      notes: stock.notes,
      image: stock.image,
      isPublished: stock.isPublished,
    };

    const editStockStatus = {
      editId: id,
      editableObject: stockStatus,
    };

    if (stock.isNewStocks) {
      await createStock({
        variables: {
          data: stockStatus,
        },
      });
      if (!createState.error) {
        alert.success('Saved Stock Status Successfully');
      } else {
        alert.error(createState.error.message);
      }
    } else {
      await editStock({
        variables: {
          data: editStockStatus,
        },
      });
      if (!editState.error) {
        alert.info('Edited Stock Status Successfully');
      } else {
        alert.error(editState.error.message);
      }
    }
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
    await deleteStock({
      variables: {
        id,
      },
    });
    if (!deleteState.error) {
      alert.info('Deleted Stock Status Successfully');
    } else {
      alert.error(deleteState.error.message);
    }

    setStocks(newStocks);
  };

  const removeImage = (id) => {
    const stock = stocks[id];
    stock.image = '';
    setStocks({ ...stocks, [id]: stock });
  };

  const openModal = (key) => {
    setShowDeleteModal(true);
    setDeleteKey(key);
  };

  return (
    <div className="container center">
      <Modal
        title="301 Redirect"
        modalIsOpen={showDeleteModal}
        setIsOpen={setShowDeleteModal}
        confirmHandler={() => deleteHandler(deleteKey)}
      />
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
                <div className="product-images">
                  {stocks[key].image ? (
                    <figure>
                      <button
                        type="button"
                        className="remove-image"
                        disabled={stocks[key].isDisabled}
                        onClick={() => removeImage(key)}
                      >
                        <FaTimes />
                      </button>
                      <img
                        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${stocks[key].image}`}
                        alt=""
                      />
                    </figure>
                  ) : (
                    <BoxFileupload
                      disabled={stocks[key].isDisabled}
                      onChangeHandler={(url) =>
                        handleChangeInput(key, 'file', url)
                      }
                    />
                  )}
                </div>
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
                    <button className="big-icon" onClick={() => openModal(key)}>
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
export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });
  if (!session) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};

export default StockStatus;
