import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';

import AccountAccess from '../../../components/settings/AccountAccess';
import AccountInfo from '../../../components/settings/AccountInfo';

import { TabMenu, TabContent } from '../../../components/shared/Tabmenu';

import styles from '../../../styles/pages/admin.module.scss';

const Menu = {
  Dashboard: {
    view: false,
    edit: false,
    delete: false,
  },
  Product: {
    view: false,
    edit: false,
    delete: false,
  },
  Blogs: {
    view: false,
    edit: false,
    delete: false,
  },
  Review: {
    view: false,
    edit: false,
    delete: false,
  },
  Appearance: {
    view: false,
    edit: false,
    delete: false,
  },
  Settings: {
    view: false,
    edit: false,
    delete: false,
  },
};

interface PermissionProps {
  (key: string): {
    view: boolean;
    edit: boolean;
    delete: boolean;
  };
}

const AddAdmin = () => {
  const methods = useForm();
  const router = useRouter();
  console.log(router.query.aid);
  const [tabValue, setTabValue] = useState('information');
  const [isPasswordMatched, setIsPasswordMatched] = useState(false);
  // @ts-ignore
  const [permission, setPermission] = useState<PermissionProps>(Menu);

  return (
    <div className={styles.addAdmin}>
      <h1 className="heading-primary ml-5 mb-20">
        {tabValue === 'information' ? 'Add New Admin' : 'Role Detail'}
      </h1>
      {tabValue !== 'information' && (
        <h4 className="heading-tertiary ml-20 mb-20">Sr. Organizer</h4>
      )}
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
            <AccountAccess
              permission={permission}
              setPermission={setPermission}
              register={methods.register}
              handleSubmit={methods.handleSubmit}
              setIsPasswordMatched={setIsPasswordMatched}
            />
          </TabContent>
        </TabMenu>
      </FormProvider>
    </div>
  );
};

export default AddAdmin;
