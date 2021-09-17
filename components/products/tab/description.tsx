import React, { useState } from 'react';
import { UseFormRegister, FieldValues } from 'react-hook-form';
import { FaPlus, FaPlusCircle } from 'react-icons/fa';

import Chipfield from '../../controls/chipfield';
import Combobox from '../../controls/combobox';
import TextEditor from '../../shared/TextEditor';

interface DescriptionProps {
  register: UseFormRegister<FieldValues>;
  keyPointState: [
    {
      id: string;
      title: string;
      content: string;
      images: never[];
    }[],
    React.Dispatch<
      React.SetStateAction<
        {
          id: string;
          title: string;
          content: string;
          images: never[];
        }[]
      >
    >,
  ];
  question: [
    {
      id: string;
      title: string;
      question: string;
    }[],
    React.Dispatch<
      React.SetStateAction<
        {
          id: string;
          title: string;
          question: string;
        }[]
      >
    >,
  ];
  setFeatures: React.Dispatch<React.SetStateAction<string>>;
  setSpecification: React.Dispatch<React.SetStateAction<string>>;
}
const Description = (props: DescriptionProps) => {
  const {
    register,
    keyPointState: [keyPoints, setKeyPoints],
    question: [questions, setQuestions],
    setFeatures,
    setSpecification,
  } = props;

  const onKeyPointsContentChange = (
    idx: number,
    key: 'title' | 'content',
    value: string,
  ) => {
    const points = [...keyPoints];
    points[idx][key] = value;
    setKeyPoints(points);
  };

  const addKeyPoints = () => {
    setKeyPoints([
      ...keyPoints,
      {
        id: '',
        title: '',
        content: '',
        images: [],
      },
    ]);
  };

  const onQuestionsChange = (
    idx: number,
    key: 'title' | 'question',
    value: string,
  ) => {
    const questionArr = [...questions];
    questionArr[idx][key] = value;
    setQuestions(questionArr);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: '',
        title: '',
        question: '',
      },
    ]);
  };

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
          <div className="grid four mb-60">
            <Combobox
              name="category"
              label="Category"
              options={['Car Parking Management', '2', '3']}
            />
            <Combobox
              name="collection"
              label="Collection"
              options={['Flash Sale', '2', '3']}
            />
            <Combobox
              name="stockStatus"
              label="Stock Status"
              options={['Ready Stock', '2', '3']}
            />
            <Combobox
              name="contactPerson"
              label="Contact Person"
              options={['Shuvo Islam', '2', '3']}
            />
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
      {keyPoints.map((point, idx) => (
        <div className="wrapper-section center" key={idx}>
          <div className="wrapper-section__title flex sb">
            <input
              className="custom-input large"
              placeholder="Key Points of Product"
              onChange={(e) =>
                onKeyPointsContentChange(idx, 'title', e.target.value)
              }
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
              <TextEditor
                multiple
                onChange={(content: string) =>
                  onKeyPointsContentChange(idx, 'content', content)
                }
              />
            </div>
          </div>
          <button
            type="button"
            className="btn-outline-green mt-20 mb-20"
            onClick={addKeyPoints}
          >
            <FaPlusCircle className="btn-icon-small" />
            Add New Point
          </button>
          <button type="button" className="btn-outline-green mt-20 ml-20 mb-20">
            <FaPlusCircle className="btn-icon-small" />
            Delete Point
          </button>
        </div>
      ))}
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
      <div className="wrapper-section">
        {questions.map((question, idx) => (
          <div className="mb-40">
            <div className="wrapper-section__title flex sb">
              <input
                className="custom-input large"
                placeholder="Question Title"
                onChange={(e) =>
                  onQuestionsChange(idx, 'title', e.target.value)
                }
              />
              <div>
                <button
                  type="button"
                  className="btn-outline-green"
                  onClick={addQuestion}
                >
                  <FaPlusCircle className="btn-icon-small" />
                  Add Question
                </button>
                <button type="button" className="ml-20 btn-outline-green">
                  <FaPlusCircle className="btn-icon-small" />
                  Delete Question
                </button>
              </div>
            </div>
            <div className="wrapper-section__content">
              <div className="field mt-20">
                <TextEditor
                  onChange={(content: string) =>
                    onQuestionsChange(idx, 'question', content)
                  }
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Description;
