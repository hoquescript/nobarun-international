import React, { useState } from 'react';
import { FaEye } from 'react-icons/fa';
import Description from '../../components/products/tab/description';
import SEO from '../../components/products/tab/seo';
import { TabContent, TabMenu } from '../../components/shared/Tabmenu';
import Toolbar from '../../components/shared/Toolbar';
import styles from '../../styles/pages/products.module.scss';

const AddProduct = () => {
  const [tabValue, setTabValue] = useState('description');
  console.log(tabValue);
  return (
    <>
      <Toolbar />
      <div className={styles.addProduct}>
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
          </div>
        </div>
        <TabMenu
          menus={['Description', 'SEO']}
          value={tabValue}
          setTabValue={setTabValue}
        >
          <TabContent id="description" value={tabValue}>
            <Description />
          </TabContent>
          <TabContent id="seo" value={tabValue}>
            <SEO />
          </TabContent>
        </TabMenu>
      </div>
    </>
  );
};

export default AddProduct;
