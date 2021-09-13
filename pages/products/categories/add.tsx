import React from 'react';
import { FaEye, FaPlus, FaPlusCircle } from 'react-icons/fa';
import Textfield from '../../../components/controls/textfield';
import TextEditor from '../../../components/shared/TextEditor';

import styles from '../../../styles/pages/products.module.scss';

const AddCategory = () => {
  return (
    <div className={styles.addProduct}>
      <div
        className="main__content__header"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h2 className="heading-primary">Add Category</h2>
        <div>
          <label htmlFor="publish" className="custom-switch ml-auto">
            <input type="checkbox" id="publish" />
            <span>Publish</span>
          </label>
          <button type="button" className="btn-icon-white ml-20">
            <FaEye />
          </button>
        </div>
      </div>
      <div className="wrapper-section">
        <div className="wrapper-section__content">
          <div className="grid one mb-20">
            <Textfield label="Name" placeholder="Enter Category Name" />
          </div>
          <div className="grid one mb-20">
            <Textfield label="Slug" placeholder="Enter Category Slug" />
          </div>
          <div className="grid three mb-20">
            <div className="field">
              <label htmlFor="">Collection</label>
              <select className="custom-input">
                <option value="1">Flash Sale</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="wrapper-section">
        <div className="wrapper-section__title flex sb">
          <h3 className="heading-secondary">Description</h3>
          <button type="button" className="btn-outline-green">
            <FaPlusCircle className="btn-icon-small" />
            Add Description
          </button>
        </div>
        <div className="wrapper-section__content">
          <div className="field mt-20">
            <TextEditor />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
