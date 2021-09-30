import { getSession } from 'next-auth/client';
import React, { useEffect } from 'react';
import { useTypedDispatch } from '../hooks/useTypedSelector';
import { setAuthToken } from '../store/slices/ui';

import Header from './_header';
import Sidebar from './_sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = (props: LayoutProps) => {
  const { children } = props;

  const dispatch = useTypedDispatch();
  useEffect(() => {
    async function getToken() {
      const session = await getSession();
      if (session) {
        dispatch(setAuthToken(session?.accessToken));
      }
    }
    getToken();
  }, []);

  return (
    <div style={{ overflow: 'hidden', height: '100vh', width: '100vw' }}>
      <Header />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <main
          style={{
            width: '100%',
            height: 'calc(100vh - 7rem)',
            overflow: 'auto',
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
