import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';

import AccountAccess from '../../../components/settings/AccountAccess';
import AccountInfo from '../../../components/settings/AccountInfo';

import { TabMenu, TabContent } from '../../../components/shared/Tabmenu';

import styles from '../../../styles/pages/admin.module.scss';

const AddAdmin = () => {
  const methods = useForm();
  const [tabValue, setTabValue] = useState('information');

  return (
    <div className={styles.addAdmin}>
      <h1 className="heading-primary ml-5 mb-40">Add New Admin</h1>
      <FormProvider {...methods}>
        <TabMenu
          menus={['Information', 'Permission']}
          value={tabValue}
          setTabValue={setTabValue}
        >
          <TabContent id="information" value={tabValue}>
            <AccountInfo />
          </TabContent>
          <TabContent id="permission" value={tabValue}>
            <AccountAccess />
          </TabContent>
        </TabMenu>
      </FormProvider>
    </div>
  );
};

export default AddAdmin;
