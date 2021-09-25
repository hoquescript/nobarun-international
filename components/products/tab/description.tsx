import React, { useState } from 'react';
import { UseFormRegister, FieldValues } from 'react-hook-form';
import { FaMinus, FaPlus, FaPlusCircle, FaSave } from 'react-icons/fa';

import Chipfield from '../../controls/chipfield';
import Combobox from '../../controls/combobox';
import TextEditor from '../../shared/TextEditor';
import KeyPoints, { IKeyPoints } from '../AddProduct/KeyPoints';
import Questions, { IQuestions } from '../AddProduct/Questions';

interface DescriptionProps {
  register: UseFormRegister<FieldValues>;
  keyPointState: [
    IKeyPoints[],
    React.Dispatch<React.SetStateAction<IKeyPoints[]>>,
  ];
  question: [IQuestions[], React.Dispatch<React.SetStateAction<IQuestions[]>>];
  setFeatures: React.Dispatch<React.SetStateAction<string>>;
  setSpecification: React.Dispatch<React.SetStateAction<string>>;
  setTabValue: any;
}
const Description = (props: DescriptionProps) => {
  const {
    register,
    keyPointState,
    question,
    setFeatures,
    setSpecification,
    setTabValue,
  } = props;

  return (
    <div id="description">
      <div className="wrapper-section">
        <div className="wrapper-section__title">
          <input
            className="page-headline-input mb-30"
            placeholder="Product Name"
            {...register('productName')}
          />
        </div>
        <div className="wrapper-section__content">
          <div className="row mb-60">
            <div className="col-3">
              <Combobox
                name="category"
                label="Category"
                options={['Car Parking Management', '2', '3']}
              />
            </div>
            <div className="col-3">
              <Combobox
                name="collection"
                label="Collection"
                options={['Flash Sale', '2', '3']}
              />
            </div>
            <div className="col-3">
              <Combobox
                name="stockStatus"
                label="Stock Status"
                options={['Ready Stock', '2', '3']}
              />
            </div>
            <div className="col-3">
              <Combobox
                name="contactPerson"
                label="Contact Person"
                options={['Shuvo Islam', '2', '3']}
              />
            </div>
          </div>
          <div className="product-specs mt-30 mb-50">
            <div>
              <input
                type="text"
                className="custom-input medium mb-10 center"
                {...register('price')}
              />
              <span>Price</span>
            </div>
            <div>
              <input
                type="text"
                className="custom-input medium mb-10 center"
                {...register('originalPrice')}
              />
              <span>Original Price</span>
            </div>
            <div>
              <input
                type="text"
                className="custom-input medium mb-10 center"
                {...register('discount')}
              />
              <span>Discount</span>
            </div>
            <div>
              <input
                type="text"
                className="custom-input medium mb-10 center"
                {...register('productCode')}
              />
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
      <KeyPoints keyPointState={keyPointState} />
      <div className="wrapper-section">
        <div className="wrapper-section__title">
          <h3 className="heading-secondary">Feature List</h3>
        </div>
        <div className="wrapper-section__content">
          <div className="field mt-20">
            <TextEditor setValue={setFeatures} />
          </div>
        </div>
      </div>
      <div className="wrapper-section">
        <div className="wrapper-section__title">
          <h3 className="heading-secondary">Specification</h3>
        </div>
        <div className="wrapper-section__content">
          <div className="field mt-20">
            <TextEditor setValue={setSpecification} />
          </div>
        </div>
      </div>
      <Questions question={question} />
      <div className="center mt-40 mb-30">
        <button className="btn-green" onClick={() => setTabValue('seo')}>
          Next Page
        </button>
      </div>
    </div>
  );
};

export default Description;
