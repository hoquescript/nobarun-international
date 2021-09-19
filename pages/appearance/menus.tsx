import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { AiOutlineSearch } from 'react-icons/ai';

import MenuDragger from '../../components/appearance/MenuDragger';
import MenuList from '../../components/appearance/MenuList';
import Textfield from '../../components/controls/textfield';
import { TabMenu, TabContent } from '../../components/shared/Tabmenu';

import styles from '../../styles/pages/appearance.module.scss';

const Menus = () => {
  const methods = useForm();
  const [tabValue, setTabValue] = useState('header');

  return (
    <div className="container center">
      <div className="main__content__header mb-40">
        <h2 className="page-title">Menu</h2>
      </div>
      <div className="row">
        <div className="col-8">
          <TabMenu
            menus={['Header', 'Footer']}
            value={tabValue}
            setTabValue={setTabValue}
          >
            <TabContent id="header" value={tabValue}>
              {/* <AccountInfo /> */}
              <MenuDragger />
            </TabContent>
            <TabContent id="footer" value={tabValue}>
              {/* <AccountAccess /> */}
            </TabContent>
          </TabMenu>
        </div>
        <div className="col-4">
          <div>
            <MenuList />
            <FormProvider {...methods}>
              <div className={styles.menu__custom}>
                <h4 className={styles.menu__custom_title}>Custom Link</h4>
                <div className={styles.menu__custom_wrapper}>
                  <div className={styles.menu__custom_input}>
                    <label>Url</label>
                    <input
                      // type={type}
                      className="custom-input"
                      // placeholder={placeholder}
                      // value={value}
                      {...methods.register('url')}
                    />
                  </div>
                  <div className={styles.menu__custom_input}>
                    <label>Link Text</label>
                    <input
                      // type={type}
                      className="custom-input"
                      // placeholder={placeholder}
                      // value={value}
                      {...methods.register('link')}
                    />
                  </div>
                  <div className="center mt-30">
                    <button className="btn-green">Add</button>
                  </div>
                </div>
              </div>
            </FormProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menus;
