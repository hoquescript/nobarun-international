import React, { useState } from 'react';
import { FaEye } from 'react-icons/fa';
import About from '../../components/products/tab/about';
import Variants from '../../components/products/tab/variants';
import { TabContent, TabMenu } from '../../components/shared/Tabmenu';
import styles from '../../styles/pages/products.module.scss';

const AddProduct = () => {
  const [tabValue, setTabValue] = useState('about');
  console.log(tabValue);
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
        <h2 className="heading-primary">Product Editor</h2>
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
      <TabMenu
        menus={['About', 'Specifications', 'SEO', 'Variants']}
        value={tabValue}
        setTabValue={setTabValue}
      >
        <TabContent id="about" value={tabValue}>
          <About />
        </TabContent>
        {/* <h1>Hello</h1> */}
        <TabContent id="variants" value={tabValue}>
          <Variants />
        </TabContent>
      </TabMenu>
    </div>
  );
};

export default AddProduct;
