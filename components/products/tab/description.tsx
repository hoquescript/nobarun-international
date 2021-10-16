import React, { useEffect, useState } from 'react';
import { UseFormRegister, FieldValues } from 'react-hook-form';
import useAllProductCode from '../../../hooks/Products/useAllProductCode';
import Chip from '../../controls/chip';

import Combobox from '../../controls/combobox';
import FileButton from '../../controls/file';
import TextEditor from '../../shared/TextEditor';
import KeyPoints from '../AddProduct/KeyPoints';
import Pricing from '../AddProduct/Pricing';
import ProductCode from '../AddProduct/ProductCode';
import Questions from '../AddProduct/Questions';
import RelatedProducts from '../AddProduct/RelatedProduct';

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
  relatedProducts: string[];
  setRelatedProducts: any;
  setValue: any;
  control: any;
  setPage: any;
  setPostSectionKey: any;
}
const Description = (props: DescriptionProps) => {
  const {
    register,
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
      const products = data.map((product) => product.value);
      setProductCodes(products);
    });
  }, []);

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
                required
                options={info.stocks || []}
              />
            </div>
            <div className="col-3">
              <Combobox
                name="contactPerson"
                label="Contact Person"
                required
                options={info.contacts || []}
              />
            </div>
          </div>
          <div className="product-specs mt-30 mb-50">
            <Pricing
              register={register}
              control={control}
              setValue={setValue}
            />
            <ProductCode register={register} productCodes={productCodes} />
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
