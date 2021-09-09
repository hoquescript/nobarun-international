import React, { useState } from 'react';
import { FaEye, FaPlus, FaPlusCircle } from 'react-icons/fa';
import Checkbox from '../../components/controls/checkbox';
import Chip from '../../components/controls/chip';

import Chipfield from '../../components/controls/chipfield';
import TextEditor from '../../components/shared/TextEditor';

const AddNewPost = () => {
  const [chips, setChips] = useState<string[]>([]);

  return (
    <div className="container">
      <div className="main__content__header mb-40">
        <h2 className="page-title">Post Editor</h2>
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
      <div id="description">
        <div className="wrapper-section">
          <div className="wrapper-section__title">
            <input
              className="page-headline-input mb-20"
              placeholder="Title of the Blog Post"
              // value="Plastic Aluminum Solar Reflective Motorway Road Studs"
            />
          </div>
          <div className="wrapper-section__content">
            <div className="grid three">
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
                <label htmlFor="">Contact Person</label>
                <select className="custom-input">
                  <option value="1">Shuvo Islam</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>
            </div>
            <div className="grid two">
              <div className="mt-50 mb-20 flex">
                <h4 className="heading-tertiary mr-20">Featured Post</h4>
                <Checkbox />
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
    </div>
  );
};

export default AddNewPost;
