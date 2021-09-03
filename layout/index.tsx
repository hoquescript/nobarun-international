import React from 'react';

import Header from './_header';
import Sidebar from './_sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = (props: LayoutProps) => {
  const { children } = props;
  return (
    <>
      <Header />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <main style={{ width: '100%' }}>{children}</main>
      </div>
    </>
  );
};

export default Layout;
