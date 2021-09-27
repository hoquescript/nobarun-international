import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { v4 as uuid } from 'uuid';

import MenuDragger from '../../components/appearance/MenuDragger';
import MenuList from '../../components/appearance/MenuList';
import { TabMenu, TabContent } from '../../components/shared/Tabmenu';

import styles from '../../styles/pages/appearance.module.scss';

const items = [
  {
    id: uuid(),
    label: 'Pages',
    url: 'https://amarstock.com',
    isOpen: false,
    isHeader: false,
    isFooter: false,
    children: [
      {
        id: uuid(),
        label: 'Collection',
        url: 'https://bigly24.com',
        isOpen: false,
        isHeader: false,
        isFooter: false,
      },
    ],
  },
  {
    id: uuid(),
    label: 'Custom Link',
    url: 'https://nobarun.com',
    isOpen: false,
    isHeader: false,
    isFooter: false,
  },
];

const Menus = () => {
  const { register, handleSubmit } = useForm();
  const [tabValue, setTabValue] = useState('header');

  const [menus, setMenus] = useState(items);
  const menuAddHandler = (data) => {
    setMenus([...menus, { id: uuid(), ...data, isOpen: false }]);
  };
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
              <MenuDragger items={menus} setItems={setMenus} />
            </TabContent>
            <TabContent id="footer" value={tabValue}>
              {/* <AccountAccess /> */}
            </TabContent>
          </TabMenu>
        </div>
        <div className="col-4">
          <div style={{ padding: '1rem 3rem' }}>
            <MenuList menuFor={tabValue} menus={menus} />
            <div className={styles.menu__custom}>
              <h4 className={styles.menu__custom_title}>Custom Link</h4>
              <div className={styles.menu__custom_wrapper}>
                <div className={styles.menu__custom_input}>
                  <label>Url</label>
                  <input className="custom-input" {...register('url')} />
                </div>
                <div className={styles.menu__custom_input}>
                  <label>Link Text</label>
                  <input className="custom-input" {...register('label')} />
                </div>
                <div className="center mt-30">
                  <button
                    className="btn-green"
                    onClick={handleSubmit(menuAddHandler)}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });
  if (!session) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};

export default Menus;
