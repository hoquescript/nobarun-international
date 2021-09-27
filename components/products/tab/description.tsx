import React, { useState } from 'react';
import { UseFormRegister, FieldValues } from 'react-hook-form';
import Chip from '../../controls/chip';

import Chipfield from '../../controls/chipfield';
import Combobox from '../../controls/combobox';
import FileButton from '../../controls/file';
import TextEditor from '../../shared/TextEditor';
import KeyPoints, { IKeyPoints } from '../AddProduct/KeyPoints';
import Questions, { IQuestions } from '../AddProduct/Questions';
import RelatedProducts from '../AddProduct/RelatedProduct';

interface DescriptionProps {
  register: UseFormRegister<FieldValues>;
  keyPointState: [
    IKeyPoints[],
    React.Dispatch<React.SetStateAction<IKeyPoints[]>>,
  ];
  question: [IQuestions[], React.Dispatch<React.SetStateAction<IQuestions[]>>];
  tagState: any;
  setFeatures: React.Dispatch<React.SetStateAction<string>>;
  setSpecification: React.Dispatch<React.SetStateAction<string>>;
  setTabValue: any;
  productsImage: string[];
  info: any;
  relatedProducts: string[];
  setRelatedProducts: any;
}
const Description = (props: DescriptionProps) => {
  const {
    register,
    keyPointState,
    question,
    tagState: [tags, setTags],
    setFeatures,
    setSpecification,
    setTabValue,
    productsImage,
    info,
    relatedProducts,
    setRelatedProducts,
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
                options={info.categories || []}
              />
            </div>
            <div className="col-3">
              <Combobox
                name="collectionName"
                label="Collection"
                options={info.collections || []}
              />
            </div>
            <div className="col-3">
              <Combobox
                name="stockStatus"
                label="Stock Status"
                options={info.stocks || []}
              />
            </div>
            <div className="col-3">
              <Combobox
                name="contactPerson"
                label="Contact Person"
                options={info.contacts || []}
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
            <RelatedProducts
              chips={relatedProducts}
              setChips={setRelatedProducts}
            />
          </div>
          <div className="product-images">
            {productsImage.map((src) => (
              <figure>
                <button type="button" className="remove-image">
                  <i className="times-icon"></i>
                </button>
                <img src={src} alt="" />
              </figure>
            ))}
            <FileButton />
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
      <div className="wrapper-section">
        <div className="wrapper-section__title flex sb">
          <h3 className="heading-secondary">Product Tags</h3>
        </div>
        <div className="wrapper-section__content">
          <div className="field mt-20">
            <Chip chips={tags} setChips={setTags} />
          </div>
        </div>
      </div>
      <div className="center mt-40 mb-30">
        <button className="btn-green" onClick={() => setTabValue('seo')}>
          Next Page
        </button>
      </div>
    </div>
  );
};

export default Description;
