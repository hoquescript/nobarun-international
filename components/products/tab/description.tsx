import React from 'react';
import { FaPlus, FaPlusCircle } from 'react-icons/fa';

import Chipfield from '../../controls/chipfield';
import Textfield from '../../controls/textfield';
import TextEditor from '../../shared/TextEditor';

const Description = () => {
  return (
    <div id="description">
      <div className="wrapper-section">
        <div className="wrapper-section__title">
          <input
            className="page-headline-input mb-30"
            placeholder="Product Name"
            // value="Plastic Aluminum Solar Reflective Motorway Road Studs"
          />
        </div>
        <div className="wrapper-section__content">
          <div className="grid four mb-60">
            <div className="field">
              <label htmlFor="">Cateogory</label>
              <select className="custom-input">
                <option value="1">Car Parking Management</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="">Collection</label>
              <select className="custom-input">
                <option value="1">Flash Sale</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="">Stock Status</label>
              <select className="custom-input">
                <option value="1">Ready Stock</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="">Contact Person</label>
              <select className="custom-input">
                <option value="1">Shuvo Islam</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>
          </div>
          <div className="product-specs mt-30 mb-50">
            <div>
              <p>25.60</p>
              <span>Price</span>
            </div>
            <div>
              <p>29.99</p>
              <span>Original Prce</span>
            </div>
            <div>
              <p>10%</p>
              <span>Discount</span>
            </div>
            <div>
              <p>Nl3449494</p>
              <span>Product Code</span>
            </div>
          </div>
          <div className="mb-50">
            <Chipfield />
          </div>
          <div className="product-images">
            <figure>
              <button type="button" className="remove-image">
                <i className="times-icon"></i>
              </button>
              <img src="/images/product-img.jpg" alt="" />
            </figure>
            <figure>
              <button type="button" className="remove-image">
                <i className="times-icon"></i>
              </button>
              <img src="/images/product-img.jpg" alt="" />
            </figure>
            <figure>
              <button type="button" className="remove-image">
                <i className="times-icon"></i>
              </button>
              <img src="/images/product-img.jpg" alt="" />
            </figure>
            <figure>
              <button type="button" className="remove-image">
                <i className="times-icon"></i>
              </button>
              <img src="/images/product-img.jpg" alt="" />
            </figure>
            <div className="product-images">
              <input
                type="file"
                id="product"
                accept="image/*, video/*"
                style={{ display: 'none', height: '71px' }}
                // onChange={(e) => imageUploadHandler(e)}
              />

              <label
                className="add-new-image"
                htmlFor="product"
                style={{ height: '71px' }}
              >
                {/* <i className="plus-icon" onClick={imageUploader}></i> */}
                <FaPlus />
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="wrapper-section center">
        <div className="wrapper-section__title flex sb">
          <h3 className="heading-secondary">Key Points of Product</h3>
          <div className="flex">
            <div className="product-images">
              <input
                type="file"
                id="product"
                accept="image/*, video/*"
                style={{ display: 'none', height: '71px' }}
                // onChange={(e) => imageUploadHandler(e)}
              />
              <label
                className="add-new-image"
                htmlFor="product"
                style={{ height: '71px' }}
              >
                <FaPlus />
              </label>
            </div>
          </div>
        </div>
        <div className="wrapper-section__content">
          <div className="field mt-20">
            <TextEditor />
          </div>
        </div>
        <button type="button" className="btn-outline-green mt-20 mb-20">
          <FaPlusCircle className="btn-icon-small" />
          Add New Point
        </button>
      </div>
      <div className="wrapper-section">
        <div className="wrapper-section__title">
          <h3 className="heading-secondary">Feature List</h3>
        </div>
        <div className="wrapper-section__content">
          <div className="field mt-20">
            <TextEditor />
          </div>
        </div>
      </div>
      <div className="wrapper-section">
        <div className="wrapper-section__title">
          <h3 className="heading-secondary">Specification</h3>
        </div>
        <div className="wrapper-section__content">
          <div className="field mt-20">
            <TextEditor />
          </div>
        </div>
      </div>
      <div className="wrapper-section">
        <div className="wrapper-section__title flex sb">
          <h3 className="heading-secondary">Question Title</h3>
          <button type="button" className="btn-outline-green">
            <FaPlusCircle className="btn-icon-small" />
            Add Question
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

export default Description;
