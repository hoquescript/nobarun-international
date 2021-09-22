import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { FaEye, FaSave } from 'react-icons/fa';
import Description from '../../components/products/tab/description';
import SEO from '../../components/products/tab/seo';
import { TabContent, TabMenu } from '../../components/shared/Tabmenu';
import Toolbar from '../../components/shared/Toolbar';
import styles from '../../styles/pages/products.module.scss';

const AddProduct = () => {
  const [tabValue, setTabValue] = useState('description');

  const methods = useForm();
  const KeyPoint = useState([
    {
      id: '',
      title: '',
      content: '',
      images: [],
    },
  ]);
  const question = useState([
    {
      id: '',
      title: '',
      question: '',
    },
  ]);

  const [features, setFeatures] = useState('');
  const [specification, setSpecification] = useState('');
  const [keywords, setKeywords] = useState<string[]>([]);

  const handleAddProduct = (data: any) => {
    console.log(data);
    console.log(KeyPoint[0]);
    console.log(question[0]);
  };
  return (
    <div className="container">
      <Toolbar />
      <FormProvider {...methods}>
        <div>
          <div
            className="main__content__header"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <h2 className="page-title">Product Editor</h2>
            <div>
              <label htmlFor="publish" className="custom-switch ml-auto">
                <input type="checkbox" id="publish" />
                <span>Publish</span>
              </label>
              <button type="button" className="btn-icon-white ml-20">
                <FaEye />
              </button>
              <button
                type="button"
                className="btn-icon-white ml-20"
                onClick={methods.handleSubmit(handleAddProduct)}
              >
                <FaSave />
              </button>
            </div>
          </div>
          <TabMenu
            menus={['Description', 'SEO']}
            value={tabValue}
            setTabValue={setTabValue}
          >
            <TabContent id="description" value={tabValue}>
              <Description
                register={methods.register}
                keyPointState={KeyPoint}
                question={question}
                setFeatures={setFeatures}
                setSpecification={setSpecification}
              />
            </TabContent>
            <TabContent id="seo" value={tabValue}>
              <SEO
                register={methods.register}
                control={methods.control}
                chips={keywords}
                setChips={setKeywords}
              />
            </TabContent>
          </TabMenu>
        </div>
      </FormProvider>
    </div>
  );
};

export default AddProduct;
