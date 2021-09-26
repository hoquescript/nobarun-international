import { getSession } from 'next-auth/client';
import React from 'react';
import { useEffect } from 'react';
import Client from '../config/GraphqlClient';

import Header from './_header';
import Sidebar from './_sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = (props: LayoutProps) => {
  const { children } = props;
  // useEffect(() => {
  //   getSession().then((session) => {
  //     Client.setHeader('authorization', `Bearer ${session?.accessToken}`);
  //   });
  // });
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
