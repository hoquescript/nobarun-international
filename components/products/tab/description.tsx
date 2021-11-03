import React, { useEffect, useState } from 'react';
import { UseFormRegister, FieldValues } from 'react-hook-form';
import useAllProductCode from '../../../hooks/Products/useAllProductCode';
import Chip from '../../controls/chip';

import Combobox from '../../controls/combobox';
import FileButton from '../../controls/file';
import Textfield from '../../controls/textfield';
import TextEditor from '../../shared/TextEditor';
import KeyPoints from '../AddProduct/KeyPoints';
import Pricing from '../AddProduct/Pricing';
import ProductCode from '../AddProduct/ProductCode';
import Questions from '../AddProduct/Questions';
import RelatedProducts from '../AddProduct/RelatedProduct';
import SlugGenerator from '../AddProduct/SlugGenerator';

interface DescriptionProps {
  register: UseFormRegister<FieldValues>;
  keyPointState: [any, any];
  question: [any, any];
  tagState: any;
  features: string;
  setFeatures: React.Dispatch<React.SetStateAction<string>>;
  specification: string;
  setSpecification: React.Dispatch<React.SetStateAction<string>>;
  setTabValue: any;
  info: any;
  relatedProducts: { id: string; value: string }[];
  setRelatedProducts: any;
  getValues: any;
  setValue: any;
  control: any;
  setPage: any;
  setPostSectionKey: any;
}
const Description = (props: DescriptionProps) => {
  const {
    register,
    getValues,
    setValue,
    control,
    keyPointState,
    question,
    tagState: [tags, setTags],
    features,
    setFeatures,
    specification,
    setSpecification,
    setTabValue,
    info,
    relatedProducts,
    setRelatedProducts,
    setPage,
    setPostSectionKey,
  } = props;

  const [productCodes, setProductCodes] = useState([]);

  useEffect(() => {
    useAllProductCode().then((data) => {
      setProductCodes(data);
    });
  }, []);

  return (
    <div id="description">
      <div className="wrapper-section">
        <div className="wrapper-section__content">
          <div className="row">
            <SlugGenerator control={control} setValue={setValue} />
            <div className="col-12">
              <Textfield name="banglaVersionLink" label="Bangla Version" />
            </div>
          </div>
          <div className="row mt-10 mb-20">
            <div className="col-3">
              <Combobox
                name="category"
                label="Category"
                required
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
          <div className="row mb-20">
            <Pricing
              control={control}
              setValue={setValue}
              getValues={getValues}
            />

            <div className="col-3">
              <ProductCode register={register} productCodes={productCodes} />
            </div>
          </div>
          <div className="mb-20">
            <div className={`field`}>
              <label>Related Products</label>
              <RelatedProducts
                productCodes={productCodes}
                chips={relatedProducts}
                setChips={setRelatedProducts}
              />
            </div>
          </div>
          {/* <div className="mb-20">
            <div className={`field`}>
              <label>Related Clients</label>
              <RelatedProducts
                productCodes={productCodes}
                chips={relatedProducts}
                setChips={setRelatedProducts}
              />
            </div>
          </div> */}
          <div className="mb-20">
            <div className={`field`}>
              <label>Upload Media</label>
              <FileButton page={'pMain'} showMedia setPage={setPage} />
            </div>
          </div>
        </div>
      </div>
      <KeyPoints
        keyPointState={keyPointState}
        setPage={setPage}
        setPostSectionKey={setPostSectionKey}
      />
      <div className="wrapper-section">
        <div
          className="wrapper-section__title"
          style={{ marginBottom: '-2rem' }}
        >
          <h3 className="heading-secondary">Feature List</h3>
        </div>
        <div className="wrapper-section__content">
          <div className="field mt-20">
            <TextEditor
              value={features}
              onChange={(content) => {
                setFeatures(content);
              }}
            />
          </div>
        </div>
      </div>
      <div className="wrapper-section">
        <div
          className="wrapper-section__title"
          style={{ marginBottom: '-2rem' }}
        >
          <h3 className="heading-secondary">Specification</h3>
        </div>
        <div className="wrapper-section__content">
          <div className="field mt-20">
            <TextEditor value={specification} onChange={setSpecification} />
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
