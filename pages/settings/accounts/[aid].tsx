import React, { useMemo, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm, FormProvider } from 'react-hook-form';

import AccountAccess from '../../../components/settings/AccountAccess';
import AccountInfo from '../../../components/settings/AccountInfo';
import useAdminById from '../../../hooks/Settings/useAdminById';
import { useTypedSelector } from '../../../hooks/useTypedSelector';

import { TabMenu, TabContent } from '../../../components/shared/Tabmenu';

import styles from '../../../styles/pages/admin.module.scss';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';

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

const defaultValues = {
  firstName: '',
  lastName: '',
  displayName: '',
  address: '',
  email: '',
  number: '',
  password: '',
  confirmPassword: '',
  notes: '',
  sendMail: false,
};

interface PermissionProps {
  (key: string): {
    view: boolean;
    edit: boolean;
    delete: boolean;
  };
}

const AddAdmin = () => {
  const router = useRouter();
  const aid = router.query.aid;
  const [tabValue, setTabValue] = useState('information');
  const [images, setImages] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [isPasswordMatched, setIsPasswordMatched] = useState(true);

  console.log(tabValue);
  // @ts-ignore
  const [permission, setPermission] = useState<PermissionProps>(Menu);

  const methods = useForm({
    defaultValues: useMemo(() => defaultValues, [defaultValues]),
  });

  const token = useTypedSelector((state) => state.ui.token);
  useEffect(() => {
    if (aid !== 'add') {
      setIsEditMode(true);
      useAdminById(aid, token).then((data) => {
        methods.reset(data.account);
        setPermission(data.permission);
      });
    }
  }, [token]);

  return (
    <div className={styles.addAdmin}>
      <h1 className="heading-primary ml-5 mb-20">
        {tabValue === 'information' ? 'Add New Admin' : 'Role Detail'}
      </h1>
      <FormProvider {...methods}>
        <TabMenu
          menus={['Information', 'Permission']}
          value={tabValue}
          setTabValue={setTabValue}
        >
          <TabContent id="information" value={tabValue}>
            <AccountInfo
              control={methods.control}
              images={images}
              setImages={setImages}
              setTabValue={setTabValue}
              isPasswordMatched={isPasswordMatched}
            />
          </TabContent>
          <TabContent id="permission" value={tabValue}>
            <AccountAccess
              images={images}
              permission={permission}
              setPermission={setPermission}
              register={methods.register}
              handleSubmit={methods.handleSubmit}
              reset={methods.reset}
              setIsPasswordMatched={setIsPasswordMatched}
              accountId={aid as string}
              isEditMode={isEditMode}
              setTabValue={setTabValue}
              setImages={setImages}
              defaultValues={defaultValues}
              menu={Menu}
            />
          </TabContent>
        </TabMenu>
      </FormProvider>
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

export default AddAdmin;
