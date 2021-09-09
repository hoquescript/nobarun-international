import React, { useState } from 'react';
import { FaPlus, FaPlusCircle } from 'react-icons/fa';
import Chip from '../../components/controls/chip';

import Chipfield from '../../components/controls/chipfield';
import TextEditor from '../../components/shared/TextEditor';

const AddNewPost = () => {
  const [chips, setChips] = useState<string[]>([]);

  return (
    <div id="description">
      <div className="wrapper-section">
        <div className="wrapper-section__title">
          <h3>Info</h3>
        </div>
        <div className="wrapper-section__content">
          <div className="grid four">
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
          <div className="grid two">
            <h4 className="heading-tertiary mt-50 mb-20">Featured Post</h4>
            <div className="product-images mt-50">
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
          <div className="product-images mt-50">
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
          <input
            className="custom-input large"
            placeholder="Title of the Post"
          />
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
          Add New Section
        </button>
      </div>
      <div className="wrapper-section center">
        <div className="wrapper-section__title flex sb">
          <input
            className="custom-input large"
            placeholder="Title of the Post"
          />
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
          Add New Section
        </button>
      </div>

      <div className="wrapper-section">
        <div className="wrapper-section__title flex sb">
          <h3 className="heading-secondary">Post Tags</h3>
        </div>
        <div className="wrapper-section__content">
          <div className="field mt-20">
            <Chip chips={chips} setChips={setChips} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewPost;
